import { useState } from "react";
import { useRoute, Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Sidebar from "@/components/Sidebar";
import { mockModuleCatalog } from "@/data/mockModules";

const formSchema = z.object({
  code: z.string().min(1, "Module code is required"),
  name: z.string().min(1, "Module name is required"),
  description: z.string().min(1, "Description is required"),
  competencies: z.string().min(1, "Competencies are required"),
  tools: z.string().min(1, "Tools are required"),
  syllabus: z.string().min(1, "Syllabus is required"),
  syncHours: z.number().min(0, "Sync hours must be non-negative"),
  asyncHours: z.number().min(0, "Async hours must be non-negative"),
  credits: z.number().min(1, "Credits must be at least 1"),
  costPerCredit: z.number().min(0, "Cost per credit must be non-negative"),
});

export default function ManageModule() {
  const [, params] = useRoute("/modules/:id/edit");
  const isEdit = Boolean(params?.id);
  const { toast } = useToast();

  const module = isEdit
    ? mockModuleCatalog.find(m => m.id === params?.id)
    : null;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: module?.code ?? "",
      name: module?.name ?? "",
      description: module?.description ?? "",
      objectives: module?.objectives ?? "",
      competencies: module?.competencies ?? "",
      tools: module?.tools ?? "",
      syllabus: module?.syllabus ?? "",
      syncHours: module?.syncHours ?? 0,
      asyncHours: module?.asyncHours ?? 0,
      credits: module?.credits ?? 1,
      costPerCredit: module?.costPerCredit ?? 0,
    },
  });

  const onSubmit = async (data: { name: string; }) => {
    toast({
      title: isEdit ? "Module Updated" : "Module Created",
      description: `Successfully ${isEdit ? "updated" : "created"} ${data.name}`,
    });
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">
              {isEdit ? "Edit Module" : "Create New Module"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isEdit ? "Update module details" : "Add a new module to the catalog"}
            </p>
          </div>
          <Link href={"/modules"}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Catalog
            </Button>
          </Link>
        </div>


        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Module Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Module Code</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter module code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Module name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <textarea
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          placeholder="Module description"
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="syncHours"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sync Hours</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="asyncHours"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Async Hours</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="credits"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Credits</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="costPerCredit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cost per Credit</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="objectives"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Objectives</FormLabel>
                      <FormControl>
                        <textarea
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          placeholder="List of objectives"
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="competencies"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Competencies</FormLabel>
                      <FormControl>
                        <textarea
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          placeholder="List of competencies"
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tools"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tools</FormLabel>
                      <FormControl>
                        <textarea
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          placeholder="Required tools"
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="syllabus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Syllabus</FormLabel>
                      <FormControl>
                        <textarea
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          placeholder="Module syllabus"
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Link href="/modules">
                <Button variant="outline" type="button">Cancel</Button>
              </Link>
              <Button type="submit">
                {isEdit ? "Update Module" : "Create Module"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}