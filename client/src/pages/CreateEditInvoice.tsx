import { useState, useEffect } from 'react';
import { useLocation, useRoute } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import Sidebar from "@/components/Sidebar";
import PageTransition from "@/components/PageTransition";
import UserAvatar from "@/components/UserAvatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { mockInvoices } from '@/data/mockInvoices';

const calculateRowTotal = (quantity: number, unitPrice: number, vatRate: number, irpfRate: number) => {
  const baseAmount = quantity * unitPrice;
  const vatAmount = baseAmount * (vatRate / 100);
  const irpfAmount = baseAmount * (irpfRate / 100);
  return {
    baseAmount,
    vatAmount,
    irpfAmount,
    total: baseAmount + vatAmount - irpfAmount
  };
};

const calculateTotals = (items: InvoiceFormValues['items']) => {
  const subtotal = items.reduce((acc, item) => acc + (item.quantity || 0) * (item.unitPrice || 0), 0);
  const vatTotal = items.reduce((acc, item) => {
    const baseAmount = (item.quantity || 0) * (item.unitPrice || 0);
    return acc + (baseAmount * (item.vatRate || 0) / 100);
  }, 0);
  const irpfTotal = items.reduce((acc, item) => {
    const baseAmount = (item.quantity || 0) * (item.unitPrice || 0);
    return acc + (baseAmount * (item.irpfRate || 0) / 100);
  }, 0);
  const total = subtotal + vatTotal - irpfTotal;

  return {
    subtotal: subtotal.toFixed(2),
    vatTotal: vatTotal.toFixed(2),
    irpfTotal: irpfTotal.toFixed(2),
    total: total.toFixed(2)
  };
};

const invoiceSchema = z.object({
  series: z.string().min(1, "Series is required"),
  number: z.string().min(1, "Number is required"),
  type: z.enum(["standard", "simplified", "rectificative"]),
  issueDate: z.string(),
  operationDate: z.string(),
  issuer: z.object({
    name: z.string().min(1, "Name is required"),
    taxId: z.string().min(1, "Tax ID (NIF/CIF) is required"),
    address: z.string().min(1, "Address is required"),
    postalCode: z.string().min(5, "Valid postal code required"),
    city: z.string().min(1, "City is required"),
  }),
  recipient: z.object({
    name: z.string().min(1, "Name is required"),
    taxId: z.string().min(1, "Tax ID (NIF/CIF) is required"),
    address: z.string().min(1, "Address is required"),
    postalCode: z.string().min(5, "Valid postal code required"),
    city: z.string().min(1, "City is required"),
  }),
  items: z.array(z.object({
    description: z.string().min(1, "Description is required"),
    quantity: z.number().min(1),
    unitPrice: z.number().min(0),
    vatRate: z.number(),
    irpfRate: z.number(),
  })).min(1, "At least one item is required"),
  notes: z.string().optional(),
});

type InvoiceFormValues = z.infer<typeof invoiceSchema>;

export default function CreateEditInvoice() {
  const [, params] = useRoute('/invoices/:id/edit');
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [showFinalizeDialog, setShowFinalizeDialog] = useState(false);
  const isEditing = Boolean(params?.id);
  const existingInvoice = isEditing ? mockInvoices.find(i => i.id === params?.id) : null;

  useEffect(() => {
    if (isEditing && existingInvoice && existingInvoice.status !== 'draft') {
      toast({
        title: "Cannot edit invoice",
        description: "Only draft invoices can be edited.",
        variant: "destructive",
      });
      navigate('/invoices');
    }
  }, [isEditing, existingInvoice, navigate, toast]);

  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      type: "standard",
      issueDate: new Date().toISOString().split('T')[0],
      operationDate: new Date().toISOString().split('T')[0],
      items: [{ description: '', quantity: 1, unitPrice: 0, vatRate: 21, irpfRate: 15 }],
      issuer: {
        name: "My Company S.L.",
        taxId: "B12345678",
        address: "Calle Principal 123",
        postalCode: "28001",
        city: "Madrid"
      },
      recipient: {
        name: "",
        taxId: "",
        address: "",
        postalCode: "",
        city: ""
      }
    },
  });

  const items = form.watch('items');
  const [totals, setTotals] = useState(() => calculateTotals(items));

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (name?.startsWith('items.') || type === 'change') {
        setTotals(calculateTotals(value.items || []));
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const handleFinalize = (data: InvoiceFormValues) => {
    toast({
      title: "Invoice finalized",
      description: "Invoice has been finalized and is ready to be sent to VERIFACTU.",
    });
    navigate('/invoices');
  };

  const handleSaveAsDraft = (data: InvoiceFormValues) => {
    toast({
      title: `Invoice ${isEditing ? 'updated' : 'created'} as draft`,
      description: `Invoice ${data.series}-${data.number} has been saved as draft.`,
    });
    navigate('/invoices');
  };

  const onSubmit = (data: InvoiceFormValues) => {
    console.log(data);
    toast({
      title: `Invoice ${isEditing ? 'updated' : 'created'} successfully`,
      description: `Invoice ${data.series}-${data.number} has been ${isEditing ? 'updated' : 'created'}.`,
    });
    navigate('/invoices');
  };

  const addItem = () => {
    const currentItems = form.getValues('items');
    const newItems = [...currentItems, { description: '', quantity: 1, unitPrice: 0, vatRate: 21, irpfRate: 15 }];
    form.setValue('items', newItems, { shouldValidate: true });
  };

  const removeItem = (index: number) => {
    const currentItems = form.getValues('items');
    if (currentItems.length === 1) return;
    const newItems = currentItems.filter((_, i) => i !== index);
    form.setValue('items', newItems, { shouldValidate: true });
  };

  useEffect(() => {
    if (existingInvoice) {
      const [series, number] = existingInvoice.invoiceNumber.split('-');
      const formData = {
        series,
        number,
        type: existingInvoice.type || 'standard',
        issueDate: new Date(existingInvoice.issueDate).toISOString().split('T')[0],
        operationDate: new Date(existingInvoice.operationDate || existingInvoice.issueDate).toISOString().split('T')[0],
        issuer: existingInvoice.issuer,
        recipient: existingInvoice.customer,
        items: existingInvoice.items.map(item => ({
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.price,
          vatRate: 21,
          irpfRate: 15,
        })),
        notes: existingInvoice.notes || '',
      };
      form.reset(formData);
      setTotals(calculateTotals(formData.items));
    }
  }, [existingInvoice, form]);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1">
        <PageTransition>
          <main className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Link href="/invoices">
                    <a className="flex items-center gap-1 hover:text-foreground">
                      <ArrowLeft className="h-4 w-4" />
                      Invoices
                    </a>
                  </Link>
                </div>
                <h1 className="text-2xl font-bold">
                  {isEditing ? 'Edit Invoice' : 'Create New Invoice'}
                </h1>
              </div>
              <UserAvatar />
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(data => setShowFinalizeDialog(true))} className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="series"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Series</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="2024A" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="number"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Number</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="0001" />
                            </FormControl>
                            <FormDescription>Must be sequential</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select invoice type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="standard">Standard</SelectItem>
                                <SelectItem value="simplified">Simplified</SelectItem>
                                <SelectItem value="rectificative">Rectificative</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="issueDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Issue Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="operationDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Operation Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Issuer Details</h3>
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="issuer.name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="issuer.taxId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tax ID (NIF/CIF)</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="issuer.address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Address</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="issuer.postalCode"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Postal Code</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="issuer.city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Recipient Details</h3>
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="recipient.name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name/Company</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="recipient.taxId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tax ID (NIF/CIF)</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="recipient.address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Address</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="recipient.postalCode"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Postal Code</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="recipient.city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Invoice Items</h3>
                      <Button type="button" variant="outline" onClick={addItem}>
                        Add Item
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {items.map((item, index) => (
                        <div key={index} className="grid grid-cols-12 gap-4 items-start">
                          <div className="col-span-4">
                            <FormField
                              control={form.control}
                              name={`items.${index}.description`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Description</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="col-span-1">
                            <FormField
                              control={form.control}
                              name={`items.${index}.quantity`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Quantity</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      {...field}
                                      onChange={e => field.onChange(parseFloat(e.target.value))}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="col-span-2">
                            <FormField
                              control={form.control}
                              name={`items.${index}.unitPrice`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Unit Price</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      step="0.01"
                                      {...field}
                                      onChange={e => field.onChange(parseFloat(e.target.value))}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="col-span-1">
                            <FormField
                              control={form.control}
                              name={`items.${index}.vatRate`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>VAT %</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      {...field}
                                      onChange={e => field.onChange(parseFloat(e.target.value))}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="col-span-1">
                            <FormField
                              control={form.control}
                              name={`items.${index}.irpfRate`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>IRPF %</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      {...field}
                                      onChange={e => field.onChange(parseFloat(e.target.value))}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="col-span-1">
                            <FormItem>
                              <FormLabel>Row Total</FormLabel>
                              <div className="h-10 flex items-center px-3 border rounded-md bg-muted">
                                €{calculateRowTotal(
                                  item.quantity || 0,
                                  item.unitPrice || 0,
                                  item.vatRate || 0,
                                  item.irpfRate || 0
                                ).total.toFixed(2)}
                              </div>
                            </FormItem>
                          </div>
                          <div className="col-span-2 pt-8">
                            <Button
                              type="button"
                              variant="destructive"
                              onClick={() => removeItem(index)}
                              className="w-full"
                              disabled={items.length === 1}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}
                      <div className="border-t pt-4 mt-6">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="font-medium">Subtotal:</span>
                            <span>€{totals.subtotal}</span>
                          </div>
                          <div className="flex justify-between text-blue-600">
                            <span>+ VAT Total:</span>
                            <span>€{totals.vatTotal}</span>
                          </div>
                          <div className="flex justify-between text-red-600">
                            <span>- IRPF Total:</span>
                            <span>€{totals.irpfTotal}</span>
                          </div>
                          <div className="flex justify-between text-lg font-bold pt-2 border-t">
                            <span>Total Amount:</span>
                            <span>€{totals.total}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Notes</FormLabel>
                          <FormControl>
                            <Textarea {...field} rows={4} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
                <div className="flex justify-end gap-4">
                  <Button type="button" variant="outline" onClick={() => navigate('/invoices')}>
                    Cancel
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={form.handleSubmit(handleSaveAsDraft)}
                  >
                    {isEditing ? 'Update as Draft' : 'Save as Draft'}
                  </Button>
                  <Button type="submit">
                    Finalize Invoice
                  </Button>
                </div>
              </form>
            </Form>

            <Dialog open={showFinalizeDialog} onOpenChange={setShowFinalizeDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Finalize Invoice</DialogTitle>
                  <DialogDescription>
                    Once finalized, this invoice cannot be updated or deleted. If you find errors
                    after the invoice is sent to VERIFACTU, you will need to create a rectificative
                    invoice. However, if the invoice hasn't been sent to VERIFACTU yet, you can still
                    cancel it.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2">
                  <Button variant="outline" onClick={() => setShowFinalizeDialog(false)}>
                    Go Back
                  </Button>
                  <Button 
                    onClick={form.handleSubmit(handleFinalize)}
                    className="bg-primary"
                  >
                    Confirm Finalization
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </main>
        </PageTransition>
      </div>
    </div>
  );
}