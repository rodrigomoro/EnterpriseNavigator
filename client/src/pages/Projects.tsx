import { Link, useLocation } from 'wouter';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { mockProjects } from '@/data/mockData';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Plus, Search, Pencil, Trash2, ChevronDown, ChevronRight, Users, Calendar, BookOpen, DollarSign, BookOpenCheck } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import { motion, AnimatePresence } from 'framer-motion';
import UserAvatar from '@/components/UserAvatar';
import { Input } from '@/components/ui/input';
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog';
import { useToast } from '@/hooks/use-toast';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

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

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState('');
  const [deletingProgramId, setDeletingProgramId] = useState<string | null>(null);
  const [expandedPrograms, setExpandedPrograms] = useState<string[]>([]);
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const handleDeleteProgram = () => {
    if (!deletingProgramId) return;
    console.log('Deleting program:', deletingProgramId);
    setDeletingProgramId(null);
    toast({
      title: "Program deleted",
      description: "The program has been deleted successfully.",
      variant: "destructive",
    });
  };

  const toggleProgram = (programId: string) => {
    setExpandedPrograms(prev => 
      prev.includes(programId)
        ? prev.filter(id => id !== programId)
        : [...prev, programId]
    );
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1">
        <PageTransition>
          <header>
            <div className="px-6 h-16 flex items-center justify-between gap-8 mb-6">
              <div className="min-w-60">
                <h1 className="text-2xl font-bold">Programs Directory</h1>
                <p className="text-muted-foreground">Manage and track all your programs</p>
              </div>

              <div className="flex-1 flex justify-center max-w-xl">
                <div className="relative w-full">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search programs..."
                    className="pl-8 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="min-w-60 flex justify-end items-center gap-4">
                <Link href="/programs/new">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Program
                  </Button>
                </Link>
                <UserAvatar />
              </div>
            </div>
          </header>

          <main className="p-6">
            <motion.div 
              className="grid grid-cols-1 gap-6"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {mockProjects.map((program) => (
                <motion.div key={program.id} variants={item}>
                  <Card className="relative group">
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-semibold">{program.name}</h3>
                            <Badge variant="secondary">{program.intakes.length} Intakes</Badge>
                          </div>
                          <p className="text-muted-foreground mb-4">{program.description}</p>

                          <div className="grid grid-cols-4 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Director</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={program.director.avatar} alt={program.director.name} />
                                  <AvatarFallback>{program.director.name.slice(0, 2)}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-medium">{program.director.name}</span>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Total Students</p>
                              <p className="text-sm font-medium mt-1">{program.studentCount}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Average Score</p>
                              <p className="text-sm font-medium mt-1">{program.avgScore}%</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Overall Progress</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Progress value={program.progress} className="flex-1" />
                                <span className="text-sm font-medium">{program.progress}%</span>
                              </div>
                            </div>
                          </div>

                          <Accordion type="single" collapsible className="w-full">
                            {program.intakes.map((intake) => (
                              <AccordionItem value={intake.id} key={intake.id}>
                                <AccordionTrigger className="hover:no-underline">
                                  <div className="flex items-center gap-4">
                                    <Badge variant={
                                      intake.status === 'upcoming' ? 'outline' :
                                      intake.status === 'ongoing' ? 'default' :
                                      'secondary'
                                    }>
                                      {intake.status}
                                    </Badge>
                                    <span className="font-medium">{intake.name}</span>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                      <Calendar className="h-4 w-4" />
                                      <span className="text-sm">
                                        {new Date(intake.startDate).toLocaleDateString()} - {new Date(intake.endDate).toLocaleDateString()}
                                      </span>
                                    </div>
                                    <Badge variant="outline" className="ml-auto">
                                      <Users className="h-3 w-3 mr-1" />
                                      {intake.totalStudents} Students
                                    </Badge>
                                  </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                  <div className="space-y-4 pl-4">
                                    {intake.groups.map((group) => (
                                      <Card key={group.id} className="p-4">
                                        <div className="space-y-4">
                                          <div className="flex items-center justify-between">
                                            <div>
                                              <h4 className="font-medium">{group.name}</h4>
                                              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                                <Users className="h-4 w-4" />
                                                <span>{group.students.length}/{group.maxCapacity} Students</span>
                                              </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                              <HoverCard>
                                                <HoverCardTrigger>
                                                  <div className="flex items-center gap-2 text-green-600">
                                                    <DollarSign className="h-4 w-4" />
                                                    <span className="font-medium">
                                                      {formatCurrency(group.totalRevenue - group.totalCost, 'EUR')}
                                                    </span>
                                                  </div>
                                                </HoverCardTrigger>
                                                <HoverCardContent>
                                                  <div className="space-y-2">
                                                    <p className="text-sm font-medium">Financial Overview</p>
                                                    <div className="grid grid-cols-2 gap-4">
                                                      <div>
                                                        <p className="text-sm text-muted-foreground">Revenue</p>
                                                        <p className="text-sm font-medium text-green-600">
                                                          {formatCurrency(group.totalRevenue, 'EUR')}
                                                        </p>
                                                      </div>
                                                      <div>
                                                        <p className="text-sm text-muted-foreground">Costs</p>
                                                        <p className="text-sm font-medium text-red-600">
                                                          {formatCurrency(group.totalCost, 'EUR')}
                                                        </p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </HoverCardContent>
                                              </HoverCard>
                                            </div>
                                          </div>

                                          <div className="space-y-2">
                                            {group.modules.map((module) => (
                                              <div key={module.id} className="flex items-center justify-between text-sm p-2 rounded-lg hover:bg-muted/50">
                                                <div className="flex items-center gap-2 flex-1">
                                                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                                                  <div>
                                                    <span className="font-medium">{module.name}</span>
                                                    <div className="text-xs text-muted-foreground mt-0.5">
                                                      {module.totalHours}h · {module.credits} Credits
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                  <HoverCard>
                                                    <HoverCardTrigger>
                                                      <div className="flex items-center gap-1">
                                                        <BookOpenCheck className="h-4 w-4 text-muted-foreground" />
                                                        <span>{module.teachers.length} Teachers</span>
                                                      </div>
                                                    </HoverCardTrigger>
                                                    <HoverCardContent>
                                                      <div className="space-y-2">
                                                        <p className="text-sm font-medium">Module Teachers</p>
                                                        <div className="space-y-2">
                                                          {module.teachers.map((teacher) => (
                                                            <div key={teacher.id} className="flex items-center gap-2">
                                                              <Avatar className="h-6 w-6">
                                                                <AvatarImage src={teacher.avatar} />
                                                                <AvatarFallback>{teacher.name.slice(0, 2)}</AvatarFallback>
                                                              </Avatar>
                                                              <span className="text-sm">{teacher.name}</span>
                                                            </div>
                                                          ))}
                                                        </div>
                                                      </div>
                                                    </HoverCardContent>
                                                  </HoverCard>
                                                  <div className="font-medium">
                                                    {formatCurrency(module.creditValue.value, module.creditValue.currency)}/credit
                                                  </div>
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      </Card>
                                    ))}
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            ))}
                          </Accordion>
                        </div>

                        <div className="flex gap-2">
                          <Link href={`/programs/${program.id}/edit`}>
                            <Button variant="secondary" size="icon">
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={(e) => {
                              e.preventDefault();
                              setDeletingProgramId(program.id);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </main>
        </PageTransition>
      </div>

      <DeleteConfirmationDialog
        open={deletingProgramId !== null}
        onOpenChange={(open) => !open && setDeletingProgramId(null)}
        onConfirm={handleDeleteProgram}
        title="Delete Program"
        description="Are you sure you want to delete this program? This action cannot be undone."
      />
    </div>
  );
}