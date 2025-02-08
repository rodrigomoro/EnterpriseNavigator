import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Minus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { generateSEPAXML, downloadSEPAFile } from '@/lib/sepa';

const generateMandateReference = (studentId: string) => {
  const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
  return `MANDATE-${studentId}-${timestamp}`;
};

const payerSchema = z.object({
  type: z.enum(['student', 'scholarship', 'government', 'institution', 'bank', 'other']),
  name: z.string().optional(),
  paymentMethod: z.enum([
    'credit_card',
    'bank_transfer',
    'cash',
    'direct_debit',
    'paypal',
    'google_pay',
    'apple_pay',
    'stripe'
  ]),
  referenceNumber: z.string().optional(),
  coverageType: z.enum(['percentage', 'amount']),
  coverage: z.number().min(0),
  notes: z.string().optional(),
  paymentPlan: z.enum(['single', 'installments']).optional(),
  installments: z.number().optional(),
  bankAccount: z.object({
    iban: z.string().regex(/^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/, 'Invalid IBAN format').optional(),
    bic: z.string().regex(/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/, 'Invalid BIC/SWIFT format').optional(),
    accountHolder: z.string().optional(),
    mandateReference: z.string().optional(),
    mandateDate: z.string().optional(),
  }).optional(),
});

const paymentSchema = z.object({
  selectedFees: z.array(z.string()).min(1, 'Please select at least one fee'),
  payers: z.array(payerSchema).min(1, 'At least one payer is required'),
  additionalNotes: z.string().optional(),
  paymentPlan: z.enum(['single', 'installments']),
  numberOfInstallments: z.number().nullable().optional(),
}).refine((data) => {
  if (data.paymentPlan === 'installments') {
    return typeof data.numberOfInstallments === 'number' && data.numberOfInstallments > 0;
  }
  return true;
}, {
  message: "Number of installments is required and must be greater than 0 for installment plans",
  path: ["numberOfInstallments"]
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

interface ReceiptFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: PaymentFormValues & { totalAmount: number }) => void;
  studentName: string;
  studentId: string; 
  moduleAssignments: Array<{
    moduleId: string;
    groupId: string;
    cost?: number;
  }>;
  isBulkAction?: boolean;
  selectedEnrollments?: string[] | null;
  availableFees: Array<{ 
    id: string;
    name: string;
    amount: number;
    description?: string;
  }>;
}

export function ReceiptFormDialog({
  open,
  onOpenChange,
  onSubmit,
  studentName,
  moduleAssignments,
  isBulkAction,
  selectedEnrollments,
  studentId,
  availableFees, 
}: ReceiptFormDialogProps) {
  const [selectedFees, setSelectedFees] = useState<string[]>([]);

  const tuitionFee = moduleAssignments?.reduce((sum, module) => sum + (module.cost || 500), 0) || 0;
  const moduleDetails = moduleAssignments?.map(module => ({
    cost: module.cost || 500
  })) || [];

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      selectedFees: [],
      payers: [{
        type: 'student',
        paymentMethod: 'credit_card',
        coverageType: 'percentage',
        coverage: 100,
        paymentPlan: 'single',
        bankAccount: {
          iban: '',
          bic: '',
          accountHolder: '',
          mandateReference: '',
          mandateDate: new Date().toISOString().split('T')[0],
        },
      }],
      additionalNotes: '',
      paymentPlan: 'single',
      numberOfInstallments: undefined,
    },
  });

  const calculateTotal = (selectedFeeIds: string[]) => {
    return availableFees 
      .filter(fee => selectedFeeIds.includes(fee.id))
      .reduce((sum, fee) => sum + fee.amount, 0);
  };

  const calculateMonthlyAmount = (total: number, installments: number) => {
    return total / installments;
  };

  const handleSubmit = (data: PaymentFormValues) => {
    const totalAmount = calculateTotal(data.selectedFees);

    const totalCoverage = data.payers.reduce((sum, payer) => {
      if (payer.coverageType === 'percentage') {
        return sum + payer.coverage;
      } else {
        return sum + (payer.coverage / totalAmount * 100);
      }
    }, 0);

    if (Math.abs(totalCoverage - 100) > 0.01) {
      form.setError('payers', {
        type: 'custom',
        message: 'Total coverage must equal 100% of the fees'
      });
      return;
    }

    const directDebitPayers = data.payers.filter(
      payer => payer.paymentMethod === 'direct_debit' && payer.bankAccount
    );

    const institutionDetails = {
      creditorId: 'ES12ZZZ12345678',
      creditorName: 'Educational Institution',
      creditorIBAN: 'ES1234567890123456789012',
      creditorBIC: 'BANKESM1XXX'
    };

    directDebitPayers.forEach(payer => {
      if (payer.bankAccount) {
        const paymentAmount = payer.coverageType === 'percentage'
          ? (totalAmount * payer.coverage / 100)
          : payer.coverage;

        const sepaXML = generateSEPAXML(
          institutionDetails.creditorId,
          institutionDetails.creditorName,
          institutionDetails.creditorIBAN,
          institutionDetails.creditorBIC,
          payer.bankAccount,
          {
            amount: paymentAmount,
            description: `Payment for ${studentName} - ${moduleAssignments?.length} modules`,
            dueDate: new Date().toISOString().split('T')[0]
          }
        );

        downloadSEPAFile(sepaXML, `sepa-direct-debit-${payer.bankAccount.mandateReference}.xml`);
      }
    });

    onSubmit({
      ...data,
      totalAmount,
    });
  };

  const paymentMethods = [
    { id: 'credit_card', name: 'Credit Card' },
    { id: 'bank_transfer', name: 'Bank Transfer' },
    { id: 'cash', name: 'Cash' },
    { id: 'direct_debit', name: 'Direct Debit' },
    { id: 'paypal', name: 'PayPal' },
    { id: 'google_pay', name: 'Google Pay' },
    { id: 'apple_pay', name: 'Apple Pay' },
    { id: 'stripe', name: 'Stripe' },
  ];

  const payerTypes = [
    { id: 'student', name: 'Student' },
    { id: 'scholarship', name: 'Scholarship' },
    { id: 'government', name: 'Government' },
    { id: 'institution', name: 'Institution' },
    { id: 'bank', name: 'Bank' },
    { id: 'other', name: 'Other' },
  ];

  const installmentOptions = [
    { value: 6, label: '6 months' },
    { value: 12, label: '12 months' },
    { value: 36, label: '36 months' },
  ];

  const renderBankAccountFields = (index: number) => {
    const showBankFields = form.watch(`payers.${index}.paymentMethod`) === 'direct_debit';

    if (!showBankFields) return null;

    useEffect(() => {
      if (showBankFields && !form.watch(`payers.${index}.bankAccount.mandateReference`)) {
        form.setValue(
          `payers.${index}.bankAccount.mandateReference`,
          generateMandateReference(studentId || 'TEMP')
        );
      }
    }, [showBankFields, studentId]);

    return (
      <div className="space-y-4 border rounded-lg p-4 bg-muted/50">
        <h4 className="font-medium">Bank Account Details</h4>
        <FormField
          control={form.control}
          name={`payers.${index}.bankAccount.accountHolder`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Holder Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter account holder name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`payers.${index}.bankAccount.iban`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>IBAN</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter IBAN" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`payers.${index}.bankAccount.bic`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>BIC/SWIFT</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter BIC/SWIFT code" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`payers.${index}.bankAccount.mandateReference`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mandate Reference</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter SEPA mandate reference"
                  disabled
                />
              </FormControl>
              <p className="text-sm text-muted-foreground">
                Auto-generated unique reference for this direct debit mandate
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`payers.${index}.bankAccount.mandateDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mandate Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Payment Details</DialogTitle>
          <DialogDescription>
            {isBulkAction
              ? `Select payment method and fees for ${selectedEnrollments?.length} enrollments`
              : `Select applicable fees and payment method for ${studentName}'s enrollment
                ${moduleAssignments?.length > 1 ? ` (${moduleAssignments.length} modules)` : ''}`
            }
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <ScrollArea className="h-[60vh] pr-4">
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="paymentPlan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Plan</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select payment plan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="single">Single Payment</SelectItem>
                          <SelectItem value="installments">Monthly Installments</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.watch('paymentPlan') === 'installments' && (
                  <FormField
                    control={form.control}
                    name="numberOfInstallments"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Installments</FormLabel>
                        <Select
                          onValueChange={(value) => field.onChange(parseInt(value, 10))}
                          defaultValue={field.value?.toString()}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select number of months" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {installmentOptions.map(option => (
                              <SelectItem key={option.value} value={option.value.toString()}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {field.value && (
                          <p className="text-sm text-muted-foreground">
                            Monthly payment: ${calculateMonthlyAmount(
                              calculateTotal(form.watch('selectedFees')),
                              field.value
                            ).toFixed(2)}
                          </p>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="selectedFees"
                  render={() => (
                    <FormItem>
                      <FormLabel>Applicable Fees</FormLabel>
                      <div className="space-y-4">
                        {availableFees.map((fee) => ( 
                          <div key={fee.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id={fee.id}
                                  checked={form.watch('selectedFees').includes(fee.id)}
                                  onCheckedChange={(checked) => {
                                    const current = form.watch('selectedFees');
                                    const updated = checked
                                      ? [...current, fee.id]
                                      : current.filter(id => id !== fee.id);
                                    form.setValue('selectedFees', updated);
                                    setSelectedFees(updated);
                                  }}
                                />
                                <Label htmlFor={fee.id} className="font-medium">
                                  {fee.name}
                                </Label>
                              </div>
                              <p className="text-sm text-muted-foreground ml-6">
                                {fee.description}
                              </p>
                            </div>
                            <span className="text-right font-medium">
                              ${fee.amount.toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 text-right text-lg font-semibold">
                        Total: ${calculateTotal(form.watch('selectedFees')).toFixed(2)}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Payment Sources</h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const payers = form.watch('payers');
                        form.setValue('payers', [
                          ...payers,
                          {
                            type: 'scholarship',
                            paymentMethod: 'bank_transfer',
                            coverageType: 'percentage',
                            coverage: 0,
                            paymentPlan: form.watch('paymentPlan'),
                          }
                        ]);
                      }}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Payment Source
                    </Button>
                  </div>

                  {form.watch('payers').map((payer, index) => (
                    <Card key={index} className="p-4">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">Payment Source #{index + 1}</h4>
                          {index > 0 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const payers = form.watch('payers');
                                form.setValue('payers', payers.filter((_, i) => i !== index));
                              }}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                          )}
                        </div>

                        <FormField
                          control={form.control}
                          name={`payers.${index}.type`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Payer Type</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select payer type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {payerTypes.map(type => (
                                    <SelectItem key={type.id} value={type.id}>
                                      {type.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {form.watch(`payers.${index}.type`) !== 'student' && (
                          <FormField
                            control={form.control}
                            name={`payers.${index}.name`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Institution Name</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="Enter institution name" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}

                        <FormField
                          control={form.control}
                          name={`payers.${index}.paymentMethod`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Payment Method</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select payment method" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {paymentMethods.map(method => (
                                    <SelectItem key={method.id} value={method.id}>
                                      {method.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {renderBankAccountFields(index)}
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name={`payers.${index}.coverageType`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Coverage Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select coverage type" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="percentage">Percentage</SelectItem>
                                    <SelectItem value="amount">Fixed Amount</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`payers.${index}.coverage`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Coverage {form.watch(`payers.${index}.coverageType`) === 'percentage' ? '(%)' : '($)'}</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    {...field}
                                    onChange={e => field.onChange(parseFloat(e.target.value))}
                                    min={0}
                                    max={form.watch(`payers.${index}.coverageType`) === 'percentage' ? 100 : undefined}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name={`payers.${index}.referenceNumber`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Reference Number (Optional)</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Bank transfer reference, transaction ID, or check number" />
                              </FormControl>
                              <p className="text-sm text-muted-foreground">
                                Add an external payment reference for tracking purposes
                              </p>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </Card>
                  ))}
                </div>

                <FormField
                  control={form.control}
                  name="additionalNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Notes (Optional)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Add any payment notes" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </ScrollArea>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Generate Receipt
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}