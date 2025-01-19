import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { useState } from 'react';

export default function Calendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <CalendarIcon className="h-5 w-5" />
        Calendar
      </h3>

      <CalendarComponent
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border w-full"
        classNames={{
          day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          head_cell: "text-muted-foreground font-normal text-center",
          head_row: "flex justify-around",
          cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          caption: "relative text-sm flex justify-center py-2 px-10",
          row: "flex justify-around w-full",
          table: "w-full border-collapse space-y-1"
        }}
      />
    </div>
  );
}