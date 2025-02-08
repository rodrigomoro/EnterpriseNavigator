import { useState } from 'react';
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

const paymentSchema = z.object({
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
  selectedFees: z.array(z.string()).min(1, 'Please select at least one fee'),
  additionalNotes: z.string().optional(),
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

// Mock fee data (in a real app, this would come from an API)
const availableFees = [
  { id: 'tuition', name: 'Tuition Fee', amount: 1000 },
  { id: 'registration', name: 'Registration Fee', amount: 100 },
  { id: 'materials', name: 'Learning Materials', amount: 200 },
  { id: 'technology', name: 'Technology Fee', amount: 150 },
  { id: 'laboratory', name: 'Laboratory Fee', amount: 300 },
];

interface ReceiptFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: PaymentFormValues & { totalAmount: number }) => void;
  studentName: string;
  moduleAssignments: Array<{
    moduleId: string;
    groupId: string;
  }>;
  isBulkAction?: boolean;
  selectedEnrollments?: string[] | null;
}

export function ReceiptFormDialog({
  open,
  onOpenChange,
  onSubmit,
  studentName,
  moduleAssignments,
  isBulkAction,
  selectedEnrollments
}: ReceiptFormDialogProps) {
  const [selectedFees, setSelectedFees] = useState<string[]>([]);

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentMethod: 'credit_card',
      selectedFees: [],
      additionalNotes: '',
    },
  });

  const calculateTotal = (selectedFeeIds: string[]) => {
    return availableFees
      .filter(fee => selectedFeeIds.includes(fee.id))
      .reduce((sum, fee) => sum + fee.amount, 0);
  };

  const handleSubmit = (data: PaymentFormValues) => {
    const totalAmount = calculateTotal(data.selectedFees);
    onSubmit({
      ...data,
      totalAmount,
    });
  };

  const paymentMethods = [
    { id: 'credit_card', name: 'Credit Card', },
    { id: 'bank_transfer', name: 'Bank Transfer' },
    { id: 'cash', name: 'Cash' },
    { id: 'direct_debit', name: 'Direct Debit' },
    { id: 'paypal', name: 'PayPal' },
    { id: 'google_pay', name: 'Google Pay' },
    { id: 'apple_pay', name: 'Apple Pay' },
    { id: 'stripe', name: 'Stripe' },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
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
                  name="selectedFees"
                  render={() => (
                    <FormItem>
                      <FormLabel>Applicable Fees</FormLabel>
                      <div className="space-y-4">
                        {availableFees.map((fee) => (
                          <div key={fee.id} className="flex items-center justify-between p-4 border rounded-lg">
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

                <FormField
                  control={form.control}
                  name="paymentMethod"
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

                <FormField
                  control={form.control}
                  name="referenceNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reference Number (Optional)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter payment reference number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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