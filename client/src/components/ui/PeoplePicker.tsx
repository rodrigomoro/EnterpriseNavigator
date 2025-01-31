import { useState } from 'react';
import { Check } from 'lucide-react';
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
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from "@/components/ui/badge";

interface Person {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

interface Props {
  people: Person[];
  selectedIds?: string[];
  onChange: (ids: string[]) => void;
  placeholder?: string;
  className?: string;
  multiple?: boolean;
}

export default function PeoplePicker({
  people,
  selectedIds = [], // Provide default empty array
  onChange,
  placeholder = "Select people...",
  className,
  multiple = true,
}: Props) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Filter selected people only if people array exists
  const selected = people?.filter(person => selectedIds?.includes(person.id)) || [];

  const handleSelect = (personId: string) => {
    if (multiple) {
      if (selectedIds.includes(personId)) {
        onChange(selectedIds.filter(id => id !== personId));
      } else {
        onChange([...selectedIds, personId]);
      }
    } else {
      onChange([personId]);
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
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0" align="start">
          <Command shouldFilter={false}>
            <CommandInput 
              placeholder="Search people..." 
              value={inputValue}
              onValueChange={setInputValue}
            />
            <CommandEmpty>No person found.</CommandEmpty>
            <CommandGroup className="max-h-[300px] overflow-auto">
              {people
                ?.filter(person =>
                  person.name.toLowerCase().includes(inputValue.toLowerCase()) ||
                  person.role.toLowerCase().includes(inputValue.toLowerCase())
                )
                .map(person => (
                  <CommandItem
                    key={person.id}
                    onSelect={() => handleSelect(person.id)}
                    className="flex items-center gap-2"
                  >
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={person.avatar} alt={person.name} />
                      <AvatarFallback>{person.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span>{person.name}</span>
                      <span className="text-xs text-muted-foreground">{person.role}</span>
                    </div>
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedIds?.includes(person.id) ? "opacity-100" : "opacity-0"
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
                <button
                  className="ml-1 hover:text-destructive"
                  onClick={() => removeSelected(person.id)}
                >
                  ×
                </button>
              </div>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}