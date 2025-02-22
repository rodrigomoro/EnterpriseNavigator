import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Checkbox } from './ui/checkbox';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { mockPreRegistrations } from '@/data/mockPreRegistrationData';
import { ConversionDialog } from './ConversionDialog';
import { mockModuleCatalog } from '@/data/mockModules';
import { GripVertical, Pencil } from 'lucide-react';
import { PreRegistrationFormDialog } from './PreRegistrationFormDialog';

interface PreRegistration {
  id: string;
  studentId: string;
  studentName: string;
  modules: string[];
  timestamp: string;
  priority: number;
  notes?: string;
  documents?: Array<{
    type: string;
    file: File;
    description?: string;
  }>;
}

interface PreRegistrationItemProps {
  preReg: PreRegistration;
  onConvert: (preReg: PreRegistration) => void;
  onEdit: (preReg: PreRegistration) => void;
  selected: boolean;
  onSelect: (id: string) => void;
}

const SortablePreRegistrationItem = ({
  preReg,
  onConvert,
  onEdit,
  selected,
  onSelect,
}: PreRegistrationItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: preReg.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card className="p-4 mb-2 bg-white">
        <div className="flex items-center gap-4">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing p-1 hover:bg-muted rounded"
          >
            <GripVertical className="h-5 w-5 text-muted-foreground" />
          </div>
          <Checkbox 
            checked={selected}
            onCheckedChange={() => onSelect(preReg.id)}
            className="text-orange-500 border-gray-300 rounded data-[state=checked]:bg-orange-500 data-[state=checked]:text-white"
          />
          <Avatar className="h-8 w-8">
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${preReg.studentId}`} />
            <AvatarFallback>{preReg.studentName.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h4 className="font-semibold">{preReg.studentName}</h4>
            <div className="flex gap-2 mt-1 flex-wrap">
              {preReg.modules.map((module) => {
                const moduleName = mockModuleCatalog.find(m => m.id === module)?.name;
                return (
                  <Badge key={moduleName} variant="secondary">
                    {moduleName}
                  </Badge>
                );
              })}
            </div>
            {preReg.notes && (
              <p className="text-sm text-muted-foreground mt-1">
                {preReg.notes}
              </p>
            )}
            {preReg.documents && preReg.documents.length > 0 && (
              <p className="text-sm text-muted-foreground mt-1">
                {preReg.documents.length} document(s) attached
              </p>
            )}
          </div>
          <div className="text-right">
            <Badge variant="outline" className="mb-2">
              Priority #{preReg.priority}
            </Badge>
            <div className="text-sm text-muted-foreground">
              {new Date(preReg.timestamp).toLocaleDateString()}
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(preReg)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onConvert(preReg)}
            >
              Convert
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export const PreRegistrationManager = () => {
  const [preRegistrations, setPreRegistrations] = useState<PreRegistration[]>(mockPreRegistrations);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [conversionDialogOpen, setConversionDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedPreRegs, setSelectedPreRegs] = useState<PreRegistration[]>([]);
  const [editingPreReg, setEditingPreReg] = useState<PreRegistration | null>(null);
  const { toast } = useToast();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setPreRegistrations((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over?.id);

        const reordered = arrayMove(items, oldIndex, newIndex);
        return reordered.map((item, index) => ({
          ...item,
          priority: index + 1
        }));
      });

      toast({
        title: "Priority updated",
        description: "The pre-registration priority has been updated.",
      });
    }
  };

  const handleConvert = (preReg: PreRegistration) => {
    setSelectedPreRegs([preReg]);
    setConversionDialogOpen(true);
  };

  const handleEdit = (preReg: PreRegistration) => {
    setEditingPreReg(preReg);
    setEditDialogOpen(true);
  };

  const handleConvertSelected = () => {
    const selectedPreRegs = preRegistrations.filter(p => selectedIds.has(p.id));
    if (selectedPreRegs.length > 0) {
      setSelectedPreRegs(selectedPreRegs);
      setConversionDialogOpen(true);
    }
  };

  const handleConversionComplete = (data: { 
    conversions: Array<{
      preRegistrationId: string;
      moduleAssignments: Array<{
        moduleId: string;
        groupId: string;
      }>;
    }>;
  }) => {
    const convertedIds = new Set(data.conversions.map(c => c.preRegistrationId));
    setPreRegistrations(prev => 
      prev.filter(p => !convertedIds.has(p.id))
    );

    setSelectedIds(prev => {
      const next = new Set(prev);
      convertedIds.forEach(id => next.delete(id));
      return next;
    });

    setConversionDialogOpen(false);
    setSelectedPreRegs([]);

    toast({
      title: "Pre-registrations converted",
      description: `Successfully enrolled ${data.conversions.length} student(s) in their selected groups.`,
    });
  };

  const handlePreRegistrationUpdate = (data: any) => {
    setPreRegistrations(prev =>
      prev.map(preReg =>
        preReg.id === editingPreReg?.id
          ? { ...preReg, ...data }
          : preReg
      )
    );
    setEditDialogOpen(false);
    setEditingPreReg(null);

    toast({
      title: "Pre-registration updated",
      description: "The pre-registration has been updated successfully.",
    });
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Pre-registrations</h2>
        <div className="space-x-2">
          <Button
            variant="outline"
            onClick={() => setSelectedIds(new Set())}
          >
            Clear Selection
          </Button>
          <Button
            variant="default"
            onClick={handleConvertSelected}
            disabled={selectedIds.size === 0}
          >
            Convert Selected
          </Button>
        </div>
      </div>

      <ScrollArea className="h-[600px] pr-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={preRegistrations}
            strategy={verticalListSortingStrategy}
          >
            {preRegistrations.map((preReg) => (
              <SortablePreRegistrationItem
                key={preReg.id}
                preReg={preReg}
                onConvert={handleConvert}
                onEdit={handleEdit}
                selected={selectedIds.has(preReg.id)}
                onSelect={toggleSelect}
              />
            ))}
          </SortableContext>
        </DndContext>
      </ScrollArea>

      {selectedPreRegs.length > 0 && (
        <ConversionDialog 
          open={conversionDialogOpen}
          onOpenChange={setConversionDialogOpen}
          preRegistrations={selectedPreRegs}
          onConvert={handleConversionComplete}
        />
      )}

      {editingPreReg && (
        <PreRegistrationFormDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          onPreRegister={handlePreRegistrationUpdate}
          initialData={{
            studentId: editingPreReg.studentId,
            moduleIds: editingPreReg.modules,
            notes: editingPreReg.notes,
            documents: editingPreReg.documents,
          }}
          mode="edit"
        />
      )}
    </div>
  );
};