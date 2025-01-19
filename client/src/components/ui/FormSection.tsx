import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

interface FormSectionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function FormSection({ title, children, defaultOpen = true, className }: FormSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn("bg-white rounded-lg shadow-sm mb-6", className)}
    >
      <div className="p-6 pb-0">
        <CollapsibleTrigger className="flex items-center justify-between w-full group">
          <h2 className="text-base font-medium">{title}</h2>
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              isOpen ? "transform rotate-180" : ""
            )}
          />
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="p-6 pt-4">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}
