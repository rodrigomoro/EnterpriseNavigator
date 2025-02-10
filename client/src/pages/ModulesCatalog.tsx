import { useEffect, useState } from "react";
import { Plus, Search, Pencil, Trash2, LayoutGrid, Filter, List } from "lucide-react";
import { Link, useLocation } from "wouter";
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
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog';
import { AnimatePresence, motion } from "framer-motion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PageTransition from "@/components/PageTransition";
import UserAvatar from "@/components/UserAvatar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { mockModuleCatalog } from "@/data/mockModules";

export default function ModulesCatalog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingModuleId, setDeletingModuleId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCredits, setSelectedCredits] = useState('All');
  const [selectedHours, setSelectedHours] = useState('All');
  const [, navigate] = useLocation();
  const { toast } = useToast();

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (window.ResizeObserver) {
        const resizeObserver = new ResizeObserver(() => { });
        resizeObserver.disconnect();
      }
    };
  }, []);

  const handleDeleteModule = () => {
    if (!deletingModuleId) return;
    console.log('Deleting Module:', deletingModuleId);
    setDeletingModuleId(null);
    toast({
      title: "Module removed",
      description: "The person has been removed successfully.",
      variant: "destructive",
    });
  };

  const handleCardClick = (id: string) => {
    navigate(`/modules/${id}`);
  };

  const handleEditClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    navigate(`/modules/${id}/edit`);
  };

  const credits = ["All", "1-3", "4-6", "7+"];
  const hours = ["All", "1-10", "11-30", "31-60", "61+"];

  const filteredModules = mockModuleCatalog.filter(module => {
    const matchesSearch =
      module.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCredits =
      selectedCredits === "All" ||
      (selectedCredits === "1-3" && module.credits >= 1 && module.credits <= 3) ||
      (selectedCredits === "4-6" && module.credits >= 4 && module.credits <= 6) ||
      (selectedCredits === "7+" && module.credits >= 7);

    const matchesHours =
      selectedHours === "All" ||
      (selectedHours === "1-10" && module.syncHours + module.asyncHours >= 1 && module.syncHours + module.asyncHours <= 10) ||
      (selectedHours === "11-30" && module.syncHours + module.asyncHours >= 11 && module.syncHours + module.asyncHours <= 30) ||
      (selectedHours === "31-60" && module.syncHours + module.asyncHours >= 31 && module.syncHours + module.asyncHours <= 60) ||
      (selectedHours === "61+" && module.syncHours + module.asyncHours >= 61);

    return matchesSearch && matchesCredits && matchesHours;
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const GridView = () => (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {filteredModules.map((module) => (
        <Card key={module.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline">{module.code}</Badge>
                </div>
                <CardTitle className="text-xl">{module.name}</CardTitle>
              </div>
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
                  onClick={() => handleCardClick(module.id)}
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
    </motion.div>
  );

  const ListView = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Code</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Sync Hours</TableHead>
          <TableHead>Async Hours</TableHead>
          <TableHead>Credits</TableHead>
          <TableHead>Cost/Credit</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredModules.map((module) => (
          <TableRow
            key={module.id}
            className="cursor-pointer hover:bg-muted/50"
            onClick={() => handleCardClick(module.id)}
          >
            <TableCell>
              <Badge variant="outline">{module.code}</Badge>
            </TableCell>
            <TableCell className="font-medium">
              <div className="flex items-center gap-3">
                {module.name}
              </div>
            </TableCell>
            <TableCell>{module.syncHours}h</TableCell>
            <TableCell>{module.asyncHours}h</TableCell>
            <TableCell>{module.credits}</TableCell>
            <TableCell>${module.costPerCredit}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={(e) => handleEditClick(e, module.id)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeletingModuleId(module.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1">
        <PageTransition>
          <header>
            <div className="px-6 h-16 flex items-center justify-between gap-8 mb-6">
              <div>
                <h1 className="text-2xl font-bold">Modules Catalog</h1>
                <p className="text-muted-foreground">View and manage all modules</p>
              </div>

              <div className="flex-1 flex justify-center max-w-xl">
                <div className="relative w-full">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search module..."
                    className="pl-8 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="min-w-[400px] flex justify-end items-center gap-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Filter className="h-4 w-4" />
                      Filters
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">Credits</h4>
                        <Select
                          value={selectedCredits}
                          onValueChange={setSelectedCredits}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select credits" />
                          </SelectTrigger>
                          <SelectContent>
                            {credits.map(credit => (
                              <SelectItem key={credit} value={credit}>{credit}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">Hours</h4>
                        <Select
                          value={selectedHours}
                          onValueChange={setSelectedHours}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select hours" />
                          </SelectTrigger>
                          <SelectContent>
                            {hours.map(hour => (
                              <SelectItem key={hour} value={hour}>{hour}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                <div className="flex items-center border rounded-lg">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="icon"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="icon"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
                <Button onClick={() => navigate("/modules/new")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Module
                </Button>
                <UserAvatar />
              </div>
            </div>
          </header>

          <main className="p-6">
            <AnimatePresence>
              {viewMode === 'grid' ? <GridView /> : <ListView />}
            </AnimatePresence>
          </main>
        </PageTransition>
      </div>

      <DeleteConfirmationDialog
        open={deletingModuleId !== null}
        onOpenChange={(open) => !open && setDeletingModuleId(null)}
        onConfirm={handleDeleteModule}
        title="Delete Module"
        description="Are you sure you want to remove this module? This action cannot be undone."
      />
    </div>
  );
}