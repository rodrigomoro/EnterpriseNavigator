import { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Person {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

interface Props {
  people: Person[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
  placeholder?: string;
  className?: string;
  multiple?: boolean;
}

export default function PeoplePicker({
  people,
  selectedIds,
  onChange,
  placeholder = "Select people...",
  className,
  multiple = true,
}: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const selected = people.filter(person => selectedIds.includes(person.id));

  const handleSelect = (personId: string) => {
    if (multiple) {
      if (selectedIds.includes(personId)) {
        onChange(selectedIds.filter(id => id !== personId));
      } else {
        onChange([...selectedIds, personId]);
      }
    } else {
      onChange([personId]);
    }
    if (!multiple) {
      setOpen(false);
    }
  };

  const removeSelected = (personId: string) => {
    onChange(selectedIds.filter(id => id !== personId));
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between"
          >
            {selectedIds.length === 0 ? (
              <span className="text-muted-foreground">{placeholder}</span>
            ) : multiple ? (
              `${selectedIds.length} selected`
            ) : (
              selected[0]?.name
            )}
            <X
              className="ml-2 h-4 w-4 shrink-0 opacity-50"
              onClick={(e) => {
                e.stopPropagation();
                onChange([]);
              }}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput
              placeholder="Search people..."
              value={search}
              onValueChange={setSearch}
            />
            <CommandEmpty>No person found.</CommandEmpty>
            <CommandGroup className="max-h-[300px] overflow-auto">
              {people.map(person => (
                <CommandItem
                  key={person.id}
                  value={person.name}
                  onSelect={() => handleSelect(person.id)}
                >
                  <div className="flex items-center gap-2 flex-1">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={person.avatar} alt={person.name} />
                      <AvatarFallback>{person.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span>{person.name}</span>
                      <span className="text-xs text-muted-foreground">{person.role}</span>
                    </div>
                  </div>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedIds.includes(person.id) ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {selected.length > 0 && multiple && (
        <div className="flex flex-wrap gap-2">
          {selected.map(person => (
            <Badge key={person.id} variant="secondary">
              <div className="flex items-center gap-1">
                <Avatar className="h-4 w-4">
                  <AvatarImage src={person.avatar} alt={person.name} />
                  <AvatarFallback>{person.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                {person.name}
                <X
                  className="ml-1 h-3 w-3 cursor-pointer hover:text-destructive"
                  onClick={() => removeSelected(person.id)}
                />
              </div>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
