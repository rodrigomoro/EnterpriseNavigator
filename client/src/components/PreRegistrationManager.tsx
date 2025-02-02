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
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import UserAvatar from './UserAvatar';
import { mockPreRegistrations } from '@/data/mockPreRegistrationData';

interface PreRegistration {
  id: string;
  studentId: string;
  studentName: string;
  modules: string[];
  timestamp: string;
  priority: number;
}

interface PreRegistrationItemProps {
  preReg: PreRegistration;
  onConvert: (id: string) => void;
  selected: boolean;
  onSelect: (id: string) => void;
}

const PreRegistrationItem: React.FC<PreRegistrationItemProps> = ({
  preReg,
  onConvert,
  selected,
  onSelect,
}) => {
  return (
    <Card className="p-4 mb-2 cursor-move hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <Checkbox 
          checked={selected}
          onCheckedChange={() => onSelect(preReg.id)}
        />
        <UserAvatar />
        <div className="flex-1">
          <h4 className="font-semibold">{preReg.studentName}</h4>
          <div className="flex gap-2 mt-1 flex-wrap">
            {preReg.modules.map((module) => (
              <Badge key={module} variant="secondary">
                {module}
              </Badge>
            ))}
          </div>
        </div>
        <div className="text-right">
          <Badge variant="outline" className="mb-2">
            Priority #{preReg.priority}
          </Badge>
          <div className="text-sm text-muted-foreground">
            {new Date(preReg.timestamp).toLocaleDateString()}
          </div>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onConvert(preReg.id)}
        >
          Convert
        </Button>
      </div>
    </Card>
  );
};

export const PreRegistrationManager = () => {
  const [preRegistrations, setPreRegistrations] = useState<PreRegistration[]>(mockPreRegistrations);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const {active, over} = event;

    if (active.id !== over.id) {
      setPreRegistrations((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);

        return arrayMove(items, oldIndex, newIndex).map((item, index) => ({
          ...item,
          priority: index + 1
        }));
      });
    }
  };

  const handleConvertSelected = () => {
    // Will be implemented when backend is ready
    console.log('Converting selected:', Array.from(selectedIds));
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
              <PreRegistrationItem
                key={preReg.id}
                preReg={preReg}
                onConvert={(id) => console.log('Converting:', id)}
                selected={selectedIds.has(preReg.id)}
                onSelect={toggleSelect}
              />
            ))}
          </SortableContext>
        </DndContext>
      </ScrollArea>
    </div>
  );
};