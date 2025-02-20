import { Calendar as CalendarIcon, Plus } from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { addMonths } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link } from 'wouter';

export default function Calendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [nextMonthDate, setNextMonthDate] = useState<Date | undefined>(addMonths(new Date(), 1));

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    if (newDate) {
      setNextMonthDate(addMonths(newDate, 1));
    }
  };

  const quickActions = [
    { name: 'New Class', link: '/calendar?action=new-class' },
    { name: 'Schedule Meeting', link: '/calendar?action=meeting' },
    { name: 'Add Event', link: '/calendar?action=event' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <CalendarIcon className="h-5 w-5" />
          Calendar
        </h3>
        <div className="flex gap-2">
          {quickActions.map((action) => (
            <Button
              key={action.name}
              variant="outline"
              size="sm"
              asChild
              className="gap-1"
            >
              <Link href={action.link}>
                <Plus className="h-4 w-4" />
                {action.name}
              </Link>
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <CalendarComponent
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          className="rounded-md border"
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
        <CalendarComponent
          mode="single"
          selected={nextMonthDate}
          onSelect={(newDate) => setNextMonthDate(newDate)}
          defaultMonth={nextMonthDate}
          className="rounded-md border"
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
    </div>
  );
}