import { useState, useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { mockTeamMembers } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'wouter';
import { Plus, Search, Pencil, Trash2, LayoutGrid, List } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import { motion, AnimatePresence } from 'framer-motion';
import UserAvatar from '@/components/UserAvatar';
import { Input } from '@/components/ui/input';
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog';
import { useToast } from '@/hooks/use-toast';
import { Badge } from "@/components/ui/badge";
import Sidebar from '@/components/Sidebar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

export default function People() {
  const [searchQuery, setSearchQuery] = useState('');
  const [deletingPersonId, setDeletingPersonId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [, navigate] = useLocation();
  const { toast } = useToast();

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (window.ResizeObserver) {
        const resizeObserver = new ResizeObserver(() => {});
        resizeObserver.disconnect();
      }
    };
  }, []);

  const handleDeletePerson = () => {
    if (!deletingPersonId) return;
    console.log('Deleting person:', deletingPersonId);
    setDeletingPersonId(null);
    toast({
      title: "Person removed",
      description: "The team member has been removed successfully.",
      variant: "destructive",
    });
  };

  const handleCardClick = (id: string) => {
    navigate(`/people/${id}`);
  };

  const handleEditClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    navigate(`/people/${id}/edit`);
  };

  const getStatusBadgeVariant = (role: string, status: string) => {
    if (role === 'Student') {
      switch (status) {
        case 'Enrolled':
        case 'Exchange':
        case 'Interning':
          return 'default';
        case 'Graduated':
        case 'Alumni':
          return 'success';
        case 'Withdrawn':
        case 'Dismissed':
        case 'Dropped Out':
          return 'destructive';
        default:
          return 'secondary';
      }
    } else {
      switch (status) {
        case 'Active':
          return 'default';
        case 'Inactive':
        case 'On Leave':
          return 'warning';
        case 'Terminated':
        case 'Suspended':
          return 'destructive';
        default:
          return 'secondary';
      }
    }
  };

  const GridView = () => (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {mockTeamMembers.map((member) => (
        <motion.div 
          key={member.id} 
          variants={item}
          onClick={() => handleCardClick(member.id)}
        >
          <div className="relative group">
            <motion.div 
              className="bg-card rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
                </Avatar>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{member.name}</h3>
                    <Badge variant={getStatusBadgeVariant(member.role, member.status || 'Active')}>
                      {member.status || 'Active'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.department}</p>
                </div>
              </div>
            </motion.div>

            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={(e) => handleEditClick(e, member.id)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeletingPersonId(member.id);
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
  );

  const ListView = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockTeamMembers.map((member) => (
          <TableRow 
            key={member.id}
            className="cursor-pointer hover:bg-muted/50"
            onClick={() => handleCardClick(member.id)}
          >
            <TableCell className="font-medium">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                {member.name}
              </div>
            </TableCell>
            <TableCell>{member.role}</TableCell>
            <TableCell>{member.department}</TableCell>
            <TableCell>
              <Badge variant={getStatusBadgeVariant(member.role, member.status || 'Active')}>
                {member.status || 'Active'}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={(e) => handleEditClick(e, member.id)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeletingPersonId(member.id);
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
                <h1 className="text-2xl font-bold">People Directory</h1>
                <p className="text-muted-foreground">View and manage all team members</p>
              </div>

              <div className="flex-1 flex justify-center max-w-xl">
                <div className="relative w-full">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search people..."
                    className="pl-8 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="min-w-60 flex justify-end items-center gap-4">
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
                <Button onClick={() => navigate("/people/new")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Person
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
        open={deletingPersonId !== null}
        onOpenChange={(open) => !open && setDeletingPersonId(null)}
        onConfirm={handleDeletePerson}
        title="Delete Person"
        description="Are you sure you want to remove this team member? This action cannot be undone."
      />
    </div>
  );
}