import { useState } from "react";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { mockModuleCatalog } from "@/data/mockData";
import { Link } from "wouter";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ModulesCatalog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModule, setSelectedModule] = useState<any>(null);
  
  const filteredModules = mockModuleCatalog.filter(module =>
    module.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    module.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1">
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">Modules Catalog</h1>
              <p className="text-sm text-muted-foreground">
                Manage your educational modules
              </p>
            </div>
            <Link href="/modules/new">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Module
              </Button>
            </Link>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search modules..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredModules.map((module) => (
              <Card key={module.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{module.name}</CardTitle>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive">
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
                    </div>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">View Details</Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{module.name}</DialogTitle>
                          <DialogDescription>{module.description}</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Competencies</h4>
                            <p className="text-sm text-muted-foreground">{module.competencies}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-2">Tools Used</h4>
                            <p className="text-sm text-muted-foreground">{module.tools}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-2">Course Details</h4>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-muted-foreground">Sync Hours</p>
                                <p className="font-medium">{module.syncHours}h</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Async Hours</p>
                                <p className="font-medium">{module.asyncHours}h</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Credits</p>
                                <p className="font-medium">{module.credits}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Cost per Credit</p>
                                <p className="font-medium">${module.costPerCredit}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
