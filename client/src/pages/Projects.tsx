import { Link } from 'wouter';
import Sidebar from '@/components/Sidebar';
import { mockProjects } from '@/data/mockData';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import { motion } from 'framer-motion';
import UserAvatar from '@/components/UserAvatar';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

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
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Program
                </Button>
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
              {mockProjects.map((project) => (
                <motion.div key={project.id} variants={item}>
                  <Link href={`/program/${project.id}`}>
                    <a className="block">
                      <motion.div 
                        className="bg-card rounded-lg shadow-sm p-4 transition-shadow"
                        whileHover={{ 
                          scale: 1.02,
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <h3 className="font-semibold mb-3">{project.name}</h3>

                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-2">
                              <span className="text-sm text-muted-foreground">Progress</span>
                              <span className="text-sm font-medium">{project.progress}%</span>
                            </div>
                            <Progress value={project.progress} className="h-2" />
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-muted-foreground">Director</span>
                              <Link href={`/people/${project.director.id}`}>
                                <a className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                  <span className="text-sm font-medium">{project.director.name}</span>
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage src={project.director.avatar} alt={project.director.name} />
                                    <AvatarFallback>{project.director.name.slice(0, 2)}</AvatarFallback>
                                  </Avatar>
                                </a>
                              </Link>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground mb-2">Teachers</p>
                              <div className="flex -space-x-2">
                                {project.team.map((member) => (
                                  <Link key={member.id} href={`/people/${member.id}`}>
                                    <a onClick={(e) => e.stopPropagation()}>
                                      <Avatar className="border-2 border-background w-8 h-8">
                                        <AvatarImage src={member.avatar} alt={member.name} />
                                        <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
                                      </Avatar>
                                    </a>
                                  </Link>
                                ))}
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground">Students</p>
                              <p className="text-sm font-medium">{project.studentCount}</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </a>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </main>
        </PageTransition>
      </div>
    </div>
  );
}