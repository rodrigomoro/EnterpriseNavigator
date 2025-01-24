import { FC } from "react";
import { cn } from "@/lib/utils";

interface CalendarEventProps {
  title: string;
  time?: string;
  teacher?: string;
  program?: string;
  className?: string;
  teacherClassName?: string;
  hasConflict?: boolean;
}

export const CalendarEvent: FC<CalendarEventProps> = ({
  title,
  time,
  teacher,
  program,
  className,
  teacherClassName,
  hasConflict,
}) => {
  return (
    <div
      className={cn(
        "p-2 rounded-md text-sm mb-1",
        hasConflict && "border-2 border-red-500",
        className
      )}
    >
      {time && <div className="text-xs text-muted-foreground">{time}</div>}
      <div className="font-medium">{title}</div>
      {(teacher || program) && (
        <div className="text-xs text-muted-foreground mt-1">
          {teacher && <span className={teacherClassName}>{teacher}</span>}
          {teacher && program && " · "}
          {program && <span>{program}</span>}
        </div>
      )}
    </div>
  );
};