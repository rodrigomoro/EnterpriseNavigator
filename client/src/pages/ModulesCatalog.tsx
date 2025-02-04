import { useState } from "react";
import { Plus, Search, Pencil, Trash2, LayoutGrid, Table } from "lucide-react";
import { mockModuleCatalog } from "@/data/mockData";
import { Link } from "wouter";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { UserNav } from "@/components/UserNav";

export default function ModulesCatalog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewType, setViewType] = useState<"grid" | "table">("grid");
  const [filterCredits, setFilterCredits] = useState<string>("all");
  const { toast } = useToast();

  const handleDelete = (moduleId: string) => {
    toast({
      title: "Not implemented",
      description: "Delete functionality is not yet implemented",
    });
  };

  const filteredModules = mockModuleCatalog.filter(module => {
    const matchesSearch = 
      module.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCredits = 
      filterCredits === "all" || 
      (filterCredits === "1-3" && module.credits >= 1 && module.credits <= 3) ||
      (filterCredits === "4-6" && module.credits >= 4 && module.credits <= 6) ||
      (filterCredits === "7+" && module.credits >= 7);

    return matchesSearch && matchesCredits;
  });

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <div className="flex-1">
              <h2 className="text-lg font-semibold">Modules Catalog</h2>
              <p className="text-sm text-muted-foreground">
                Manage your educational modules
              </p>
            </div>
            <UserNav />
          </div>
        </div>

        <main className="p-8">
          <div className="flex items-center justify-between space-x-2 mb-4">
            <div className="flex flex-1 items-center space-x-2">
              <div className="relative w-80">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search modules..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select
                value={filterCredits}
                onValueChange={setFilterCredits}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by credits" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Credits</SelectItem>
                  <SelectItem value="1-3">1-3 Credits</SelectItem>
                  <SelectItem value="4-6">4-6 Credits</SelectItem>
                  <SelectItem value="7+">7+ Credits</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setViewType(viewType === "grid" ? "table" : "grid")}
              >
                {viewType === "grid" ? (
                  <Table className="h-4 w-4" />
                ) : (
                  <LayoutGrid className="h-4 w-4" />
                )}
              </Button>
            </div>
            <Link href="/modules/new">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Module
              </Button>
            </Link>
          </div>

          {viewType === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredModules.map((module) => (
                <Card key={module.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{module.name}</CardTitle>
                      <div className="flex gap-2">
                        <Link href={`/modules/${module.id}/edit`}>
                          <Button variant="ghost" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive"
                          onClick={() => handleDelete(module.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardDescription>{module.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-muted-foreground">Hours</span>
                          <div className="space-x-2">
                            <Badge variant="secondary">Sync: {module.syncHours}h</Badge>
                            <Badge variant="secondary">Async: {module.asyncHours}h</Badge>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Credits</span>
                          <Badge>{module.credits} credits</Badge>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm text-muted-foreground">Cost per Credit</span>
                          <Badge variant="outline">${module.costPerCredit}</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="rounded-md border">
              <div className="p-4">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left pb-4">Name</th>
                      <th className="text-left pb-4">Sync Hours</th>
                      <th className="text-left pb-4">Async Hours</th>
                      <th className="text-left pb-4">Credits</th>
                      <th className="text-left pb-4">Cost/Credit</th>
                      <th className="text-right pb-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredModules.map((module) => (
                      <tr key={module.id} className="border-b last:border-0">
                        <td className="py-4">
                          <div>
                            <div className="font-medium">{module.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {module.description}
                            </div>
                          </div>
                        </td>
                        <td className="py-4">{module.syncHours}h</td>
                        <td className="py-4">{module.asyncHours}h</td>
                        <td className="py-4">{module.credits}</td>
                        <td className="py-4">${module.costPerCredit}</td>
                        <td className="py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Link href={`/modules/${module.id}/edit`}>
                              <Button variant="ghost" size="icon">
                                <Pencil className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive"
                              onClick={() => handleDelete(module.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}