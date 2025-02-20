import { Calendar as CalendarIcon, Plus } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { addMonths } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import PeoplePicker from '@/components/ui/PeoplePicker';
import { mockPeople } from '@/data/mockPeople';

const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.date(),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  description: z.string().optional(),
  type: z.enum(["meeting", "event"]),
  attendeeIds: z.array(z.string()),
});

type EventFormData = z.infer<typeof eventSchema>;

export default function Calendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [nextMonthDate, setNextMonthDate] = useState<Date | undefined>(
    addMonths(new Date(), 1),
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [eventType, setEventType] = useState<"meeting" | "event">("event");

  const form = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      date: new Date(),
      startTime: "",
      endTime: "",
      description: "",
      type: "event",
      attendeeIds: [],
    },
  });

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    if (newDate) {
      setNextMonthDate(addMonths(newDate, 1));
    }
  };

  const onSubmit = (data: EventFormData) => {
    console.log("Form submitted:", data);
    setIsDialogOpen(false);
    form.reset();
  };

  const handleActionClick = (type: "meeting" | "event") => {
    setEventType(type);
    form.setValue("type", type);
    form.setValue("date", date || new Date());
    setIsDialogOpen(true);
  };

  const quickActions = [
    {
      name: "Schedule Meeting",
      onClick: () => handleActionClick("meeting"),
    },
    {
      name: "Add Event",
      onClick: () => handleActionClick("event"),
    },
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
              onClick={action.onClick}
              className="gap-1"
            >
              <Plus className="h-4 w-4" />
              {action.name}
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
            day_selected:
              "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
            head_cell: "text-muted-foreground font-normal text-center",
            head_row: "flex justify-around",
            cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
            nav_button_previous: "absolute left-1",
            nav_button_next: "absolute right-1",
            caption: "relative text-sm flex justify-center py-2 px-10",
            row: "flex justify-around w-full",
            table: "w-full border-collapse space-y-1",
          }}
        />
        <CalendarComponent
          mode="single"
          selected={nextMonthDate}
          onSelect={(newDate) => setNextMonthDate(newDate)}
          defaultMonth={nextMonthDate}
          className="rounded-md border"
          classNames={{
            day_selected:
              "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
            head_cell: "text-muted-foreground font-normal text-center",
            head_row: "flex justify-around",
            cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
            nav_button_previous: "absolute left-1",
            nav_button_next: "absolute right-1",
            caption: "relative text-sm flex justify-center py-2 px-10",
            row: "flex justify-around w-full",
            table: "w-full border-collapse space-y-1",
          }}
        />
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {eventType === "meeting" ? "Schedule Meeting" : "Add Event"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="attendeeIds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Attendees</FormLabel>
                    <FormControl>
                      <PeoplePicker
                        people={mockPeople}
                        selectedIds={field.value}
                        onChange={field.onChange}
                        placeholder="Select attendees"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add description"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}