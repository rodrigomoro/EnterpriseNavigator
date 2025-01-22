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
import { mockInvoices } from "@/data/mockData";

const invoiceSchema = z.object({
  // Invoice Basic Info
  series: z.string().min(1, "Series is required"),
  number: z.string().min(1, "Number is required"),
  type: z.enum(["standard", "simplified", "rectificative"]),
  issueDate: z.string(),
  operationDate: z.string(),

  // Issuer Details
  issuer: z.object({
    name: z.string().min(1, "Name is required"),
    taxId: z.string().min(1, "Tax ID (NIF/CIF) is required"),
    address: z.string().min(1, "Address is required"),
    postalCode: z.string().min(5, "Valid postal code required"),
    city: z.string().min(1, "City is required"),
  }),

  // Recipient Details
  recipient: z.object({
    name: z.string().min(1, "Name is required"),
    taxId: z.string().min(1, "Tax ID (NIF/CIF) is required"),
    address: z.string().min(1, "Address is required"),
    postalCode: z.string().min(5, "Valid postal code required"),
    city: z.string().min(1, "City is required"),
  }),

  // Line Items
  items: z.array(z.object({
    description: z.string().min(1, "Description is required"),
    quantity: z.number().min(1),
    unitPrice: z.number().min(0),
    vatRate: z.number(),
    irpfRate: z.number(),
  })).min(1, "At least one item is required"),

  // Notes
  notes: z.string().optional(),
});

type InvoiceFormValues = z.infer<typeof invoiceSchema>;

export default function CreateEditInvoice() {
  const [, params] = useRoute('/invoices/:id/edit');
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const isEditing = Boolean(params?.id);

  // Find the invoice if we're editing
  const existingInvoice = isEditing ? mockInvoices.find(i => i.id === params?.id) : null;

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

  // Keep items state in sync with form
  const [items, setItems] = useState(form.getValues().items);

  // Load existing invoice data when editing
  useEffect(() => {
    if (existingInvoice) {
      // Extract the series and number from invoiceNumber (assuming format: SERIES-NUMBER)
      const [series, number] = existingInvoice.invoiceNumber.split('-');

      const formData = {
        series,
        number,
        type: existingInvoice.type || 'standard',
        issueDate: new Date(existingInvoice.issueDate).toISOString().split('T')[0],
        operationDate: new Date(existingInvoice.operationDate || existingInvoice.issueDate).toISOString().split('T')[0],
        issuer: existingInvoice.issuer,
        recipient: existingInvoice.customer, // Map customer to recipient
        items: existingInvoice.items.map(item => ({
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.price,
          vatRate: 21, // Default VAT rate if not in mock data
          irpfRate: 15, // Default IRPF rate if not in mock data
        })),
        notes: existingInvoice.notes || '',
      };

      // Reset form with existing data
      form.reset(formData);
      setItems(formData.items);
    }
  }, [existingInvoice, form]);

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
    setItems(newItems);
    form.setValue('items', newItems, { shouldValidate: true });
  };

  const removeItem = (index: number) => {
    if (items.length === 1) return;
    const currentItems = form.getValues('items');
    const newItems = currentItems.filter((_, i) => i !== index);
    setItems(newItems);
    form.setValue('items', newItems, { shouldValidate: true });
  };

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
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                      {items.map((_, index) => (
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

                          <div className="col-span-2">
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
                  <Button type="submit">
                    {isEditing ? 'Update Invoice' : 'Create Invoice'}
                  </Button>
                </div>
              </form>
            </Form>
          </main>
        </PageTransition>
      </div>
    </div>
  );
}