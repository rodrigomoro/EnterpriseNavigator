import { Link, useLocation } from 'wouter';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Plus, Search, Pencil, Trash2, Users } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import { motion } from 'framer-motion';
import UserAvatar from '@/components/UserAvatar';
import { Input } from '@/components/ui/input';
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog';
import { useToast } from '@/hooks/use-toast';
import { mockPeople } from '@/data/mockPeople';
import { mockPrograms } from '@/data/mockPrograms';

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

export default function Programs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [deletingProgramId, setDeletingProgramId] = useState<string | null>(null);
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const handleDeleteProgram = () => {
    if (!deletingProgramId) return;
    // In a real app, this would make an API call
    console.log('Deleting program:', deletingProgramId);
    setDeletingProgramId(null);
    toast({
      title: "Program deleted",
      description: "The program has been deleted successfully.",
      variant: "destructive",
    });
  };

  const teachers = mockPeople.filter(person => person.role === 'Teacher');

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
                <Link href="/programs/enrollments">
                  <a className="inline-block">
                    <Button variant="outline">
                      <Users className="h-4 w-4 mr-2" />
                      Enrollments
                    </Button>
                  </a>
                </Link>
                <Link href="/programs/new">
                  <a className="inline-block">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      New Program
                    </Button>
                  </a>
                </Link>
                <UserAvatar />
              </div>
            </div>
          </header>

          <main className="p-6">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {mockPrograms.map((program) => (
                <motion.div key={program.id} variants={item}>
                  <div className="relative group">
                    <div className="block">
                      <Link href={`/programs/${program.id}`}>
                        <motion.div 
                          className="bg-card rounded-lg shadow-sm p-4 transition-shadow"
                          whileHover={{ 
                            scale: 1.02,
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <h3 className="font-semibold mb-3">{program.name}</h3>

                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between mb-2">
                                <span className="text-sm text-muted-foreground">Progress</span>
                                <span className="text-sm font-medium">{program.progress}%</span>
                              </div>
                              <Progress value={program.progress} className="h-2" />
                            </div>

                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-muted-foreground">Director</span>
                                {program.directors && program.directors[0] && (
                                  <Link href={`/people/${program.directors[0].id}`}>
                                    <a className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                      <span className="text-sm font-medium">
                                        {program.directors[0].name}</span>
                                      <Avatar className="h-6 w-6">
                                        <AvatarImage src={program.directors[0].avatar} alt={program.directors[0].name} />
                                        <AvatarFallback>{program.directors[0].name.slice(0, 2)}</AvatarFallback>
                                      </Avatar>
                                    </a>
                                  </Link>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-muted-foreground mb-2">Teachers</p>
                                <div className="flex -space-x-2"> 
                                    {Array.from(new Set(program.intakes.flatMap(intake => intake.groups.flatMap(group => group.moduleTeachers)).flatMap(moduleTeacher => moduleTeacher.teacherIds)))
                                      .map((teacherId) => {
                                      const teacher = teachers.find(t => t.id === teacherId);
                                      if (!teacher) return null;
                                      return (
                                        <Link key={teacher.id} href={`/people/${teacher.id}`}>
                                        <a onClick={(e) => e.stopPropagation()}>
                                          <Avatar className="border-2 border-background w-8 h-8">
                                          <AvatarImage src={teacher.avatar} alt={teacher.name} />
                                          <AvatarFallback>{teacher.name.slice(0, 2)}</AvatarFallback>
                                          </Avatar>
                                        </a>
                                        </Link>
                                      );
                                      })}
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-muted-foreground">Students</p>
                                <p className="text-sm font-medium">{program.studentCount}</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </Link>
                    </div>

                    {/* Action buttons */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex gap-2">
                        <Link href={`/programs/${program.id}/edit`}>
                          <a onClick={(e) => e.stopPropagation()}>
                            <Button
                              variant="secondary"
                              size="icon"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </a>
                        </Link>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setDeletingProgramId(program.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </main>
        </PageTransition>
      </div>

      {/* Delete Confirmation Dialog */}
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