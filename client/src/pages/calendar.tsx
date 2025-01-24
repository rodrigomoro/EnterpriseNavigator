import { useState } from "react";
import { Calendar as CalendarIcon, Filter } from "lucide-react";
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { CalendarEvent } from "@/components/ui/calendar-event";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ViewType = "day" | "week" | "month";

// Mock data for demonstration
const mockEvents = [
  {
    id: 1,
    title: "Mathematics 101",
    teacher: "John Doe",
    program: "Mathematics",
    time: "10:00 AM",
    date: new Date(2025, 0, 24),
  },
  {
    id: 2,
    title: "Physics Basic",
    teacher: "Jane Smith",
    program: "Physics",
    time: "2:00 PM",
    date: new Date(2025, 0, 24),
  },
];

// Mock data for filters
const teachers = [
  { id: "jd", name: "John Doe" },
  { id: "js", name: "Jane Smith" }
];

const programs = [
  { id: "math", name: "Mathematics" },
  { id: "phys", name: "Physics" }
];

export default function CalendarPage() {
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<ViewType>("month");
  const [selectedTeacher, setSelectedTeacher] = useState<string>("all");
  const [selectedProgram, setSelectedProgram] = useState<string>("all");

  const weekDays = eachDayOfInterval({
    start: startOfWeek(date),
    end: endOfWeek(date),
  });

  const getEventsForDate = (date: Date) => {
    return mockEvents.filter(event => {
      const dateMatch = event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear();

      const teacherMatch = selectedTeacher === "all" || 
        teachers.find(t => t.id === selectedTeacher)?.name === event.teacher;

      const programMatch = selectedProgram === "all" || 
        programs.find(p => p.id === selectedProgram)?.name === event.program;

      return dateMatch && teacherMatch && programMatch;
    });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-8 w-8" />
          <h1 className="text-2xl font-bold">Calendar</h1>
          <span className="text-muted-foreground ml-2">
            {format(date, "MMMM d, yyyy")}
          </span>
        </div>
        <div className="flex items-center gap-4">
          {/* View Toggle */}
          <div className="bg-muted rounded-lg p-1">
            {(["day", "week", "month"] as const).map((viewType) => (
              <Button
                key={viewType}
                variant={view === viewType ? "default" : "ghost"}
                size="sm"
                onClick={() => setView(viewType)}
                className="capitalize"
              >
                {viewType}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
        {/* Filters Sidebar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Teacher</label>
              <Select
                value={selectedTeacher}
                onValueChange={setSelectedTeacher}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select teacher" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Teachers</SelectItem>
                  {teachers.map((teacher) => (
                    <SelectItem key={teacher.id} value={teacher.id}>
                      {teacher.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Program</label>
              <Select
                value={selectedProgram}
                onValueChange={setSelectedProgram}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select program" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Programs</SelectItem>
                  {programs.map((program) => (
                    <SelectItem key={program.id} value={program.id}>
                      {program.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Calendar Grid */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-7 gap-px bg-muted rounded-lg overflow-hidden">
              {/* Week day headers */}
              {weekDays.map((day, i) => (
                <div
                  key={i}
                  className="bg-background p-2 text-center text-sm font-medium"
                >
                  {format(day, "EEE")}
                </div>
              ))}

              {/* Calendar days */}
              {Array.from({ length: 35 }, (_, i) => {
                const currentDate = new Date(date.getFullYear(), date.getMonth(), i - date.getDay() + 1);
                const isCurrentMonth = isSameMonth(currentDate, date);
                const dayEvents = getEventsForDate(currentDate);

                return (
                  <div
                    key={i}
                    className={`min-h-[120px] p-2 bg-background ${!isCurrentMonth ? "text-muted-foreground" : ""}`}
                  >
                    <div className="text-right mb-2">{format(currentDate, "d")}</div>
                    {dayEvents.map((event) => (
                      <CalendarEvent
                        key={event.id}
                        title={event.title}
                        time={event.time}
                        teacher={event.teacher}
                        program={event.program}
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Utility function to combine class names
function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}