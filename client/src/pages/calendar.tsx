import { useState } from "react";
import { Calendar as CalendarIcon, Filter, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, addDays, subDays, addMonths, subMonths, addYears, subYears, startOfYear, eachMonthOfInterval, endOfYear } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { CalendarEvent } from "@/components/ui/calendar-event";
import { Link, useLocation } from "wouter";
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
import Sidebar from "@/components/Sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type ViewType = "day" | "week" | "month" | "year";

// Color coding for programs and teachers
const programColors = {
  "STEM Excellence": "bg-blue-100 border-blue-200",
  "Computer Science": "bg-green-100 border-green-200",
  "AI Fundamentals": "bg-purple-100 border-purple-200",
  "2410BCCS": "bg-orange-100 border-orange-200",
  "Bootcamp in UI/UX": "bg-pink-100 border-pink-200"
};

const teacherColors = {
  "Dr. Sarah Johnson": "text-blue-700",
  "Prof. Michael Chen": "text-green-700",
  "Dr. Alan Turing": "text-orange-700",
  "Dr. Emma Wilson": "text-purple-700",
  "Prof. James Miller": "text-pink-700"
};

// Mock data to better represent the educational context
const mockEvents = [
  {
    id: 1,
    title: "Advanced Mathematics",
    teacher: "Dr. Sarah Johnson",
    program: "STEM Excellence",
    time: "09:00 AM",
    date: new Date(2025, 0, 24),
  },
  {
    id: 2,
    title: "Data Structures",
    teacher: "Prof. Michael Chen",
    program: "Computer Science",
    time: "11:00 AM",
    date: new Date(2025, 0, 24),
  },
  {
    id: 3,
    title: "Machine Learning Basics",
    teacher: "Dr. Sarah Johnson",
    program: "AI Fundamentals",
    time: "02:00 PM",
    date: new Date(2025, 0, 24),
  },
  // Generate Bootcamp events (Mon-Thu, 19:00-22:00, Oct 2024 - May 2025)
  ...Array.from({ length: 32 }, (_, weekIndex) => {
    const teachers = ["Dr. Alan Turing", "Dr. Emma Wilson", "Prof. James Miller"];
    return [1, 2, 3, 4].map((dayOffset) => ({
      id: 1000 + weekIndex * 4 + dayOffset,
      title: "Bootcamp in Cloud Computing",
      teacher: teachers[weekIndex % teachers.length], // Rotate teachers
      program: "2410BCCS",
      time: "19:00 - 22:00",
      date: addDays(new Date(2024, 9, 7), weekIndex * 7 + dayOffset - 1), // Start from first Monday of Oct 2024
    }));
  }).flat().filter(event => event.date <= new Date(2025, 4, 31)), // Filter until May 2025

  // UI/UX Bootcamp (Mon-Thu, 19:00-22:00, Nov 2024 - Jun 2025)
  ...Array.from({ length: 32 }, (_, weekIndex) => {
    return [1, 2, 3, 4].map((dayOffset) => ({
      id: 2000 + weekIndex * 4 + dayOffset,
      title: "Bootcamp in UI/UX",
      teacher: "Prof. James Miller",
      program: "Bootcamp in UI/UX",
      time: "19:00 - 22:00",
      date: addDays(new Date(2024, 10, 4), weekIndex * 7 + dayOffset - 1), // Start from first Monday of Nov 2024
    }));
  }).flat().filter(event => event.date <= new Date(2025, 5, 30)), // Filter until June 2025

  // Add conflicting schedules in February
  // Week 1: Dr. Sarah Johnson teaching two programs at the same time
  ...Array.from({ length: 4 }, (_, dayIndex) => ([
    {
      id: 3000 + dayIndex * 2,
      title: "Advanced AI Applications",
      teacher: "Dr. Sarah Johnson",
      program: "AI Fundamentals",
      time: "14:00 - 17:00",
      date: addDays(new Date(2025, 1, 3), dayIndex), // First week of February
    },
    {
      id: 3001 + dayIndex * 2,
      title: "Mathematics for Machine Learning",
      teacher: "Dr. Sarah Johnson",
      program: "STEM Excellence",
      time: "14:00 - 17:00",
      date: addDays(new Date(2025, 1, 3), dayIndex), // Same time slot
    }
  ])).flat(),

  // Week 2: Prof. Michael Chen teaching two programs at the same time
  ...Array.from({ length: 4 }, (_, dayIndex) => ([
    {
      id: 4000 + dayIndex * 2,
      title: "Advanced Algorithms",
      teacher: "Prof. Michael Chen",
      program: "Computer Science",
      time: "10:00 - 13:00",
      date: addDays(new Date(2025, 1, 10), dayIndex), // Second week of February
    },
    {
      id: 4001 + dayIndex * 2,
      title: "Data Structures Workshop",
      teacher: "Prof. Michael Chen",
      program: "2410BCCS",
      time: "10:00 - 13:00",
      date: addDays(new Date(2025, 1, 10), dayIndex), // Same time slot
    }
  ])).flat(),
];

// Mock data for filters
const teachers = [
  { id: "sj", name: "Dr. Sarah Johnson" },
  { id: "mc", name: "Prof. Michael Chen" },
  { id: "at", name: "Dr. Alan Turing" },
  { id: "ew", name: "Dr. Emma Wilson" },
  { id: "jm", name: "Prof. James Miller" }
];

const programs = [
  { id: "stem", name: "STEM Excellence" },
  { id: "cs", name: "Computer Science" },
  { id: "ai", name: "AI Fundamentals" },
  { id: "bc", name: "2410BCCS" },
  { id: "ux", name: "Bootcamp in UI/UX" }
];

export default function CalendarPage() {
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<ViewType>("month");
  const [selectedTeacher, setSelectedTeacher] = useState<string>("all");
  const [selectedProgram, setSelectedProgram] = useState<string>("all");
  const [, navigate] = useLocation();

  const weekDays = eachDayOfInterval({
    start: startOfWeek(date, { weekStartsOn: 1 }), // Start week on Monday
    end: endOfWeek(date, { weekStartsOn: 1 }),
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

  const handleNavigation = (direction: 'prev' | 'next') => {
    switch (view) {
      case 'day':
        setDate(direction === 'prev' ? subDays(date, 1) : addDays(date, 1));
        break;
      case 'week':
        setDate(direction === 'prev' ? subDays(date, 7) : addDays(date, 7));
        break;
      case 'month':
        setDate(direction === 'prev' ? subMonths(date, 1) : addMonths(date, 1));
        break;
      case 'year':
        setDate(direction === 'prev' ? subYears(date, 1) : addYears(date, 1));
        break;
    }
  };

  const renderDayView = () => {
    const dayEvents = getEventsForDate(date);
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">{format(date, "MMMM d, yyyy")}</h2>
        {dayEvents.map((event) => (
          <CalendarEvent
            key={event.id}
            title={event.title}
            time={event.time}
            teacher={event.teacher}
            program={event.program}
            className={programColors[event.program as keyof typeof programColors]}
            teacherClassName={teacherColors[event.teacher as keyof typeof teacherColors]}
          />
        ))}
      </div>
    );
  };

  const renderWeekView = () => {
    const weekStart = startOfWeek(date, { weekStartsOn: 1 });
    return (
      <div className="space-y-4">
        {Array.from({ length: 7 }, (_, i) => {
          const currentDate = addDays(weekStart, i);
          const dayEvents = getEventsForDate(currentDate);
          return (
            <div key={i} className="space-y-2">
              <h3 className="font-medium">{format(currentDate, "EEEE, MMMM d")}</h3>
              {dayEvents.map((event) => (
                <CalendarEvent
                  key={event.id}
                  title={event.title}
                  time={event.time}
                  teacher={event.teacher}
                  program={event.program}
                  className={programColors[event.program as keyof typeof programColors]}
                  teacherClassName={teacherColors[event.teacher as keyof typeof teacherColors]}
                />
              ))}
            </div>
          );
        })}
      </div>
    );
  };

  const renderMonthView = () => (
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
                className={programColors[event.program as keyof typeof programColors]}
                teacherClassName={teacherColors[event.teacher as keyof typeof teacherColors]}
              />
            ))}
          </div>
        );
      })}
    </div>
  );

  const renderYearView = () => {
    const months = eachMonthOfInterval({
      start: startOfYear(date),
      end: endOfYear(date),
    });

    return (
      <div className="grid grid-cols-3 gap-6">
        {months.map((month, i) => (
          <Card key={i} className="p-4">
            <h3 className="font-medium mb-2">{format(month, "MMMM")}</h3>
            <div className="grid grid-cols-7 gap-1 text-sm">
              {eachDayOfInterval({
                start: startOfWeek(month, { weekStartsOn: 1 }),
                end: endOfWeek(addDays(month, 34), { weekStartsOn: 1 }),
              }).map((day, j) => {
                const isCurrentMonth = isSameMonth(day, month);
                const hasEvents = getEventsForDate(day).length > 0;

                return (
                  <div
                    key={j}
                    className={`
                      h-6 w-6 flex items-center justify-center rounded-full
                      ${!isCurrentMonth ? "text-muted-foreground" : ""}
                      ${hasEvents ? "bg-primary text-primary-foreground" : ""}
                    `}
                  >
                    {format(day, "d")}
                  </div>
                );
              })}
            </div>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="container p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/")}
                className="rounded-full"
              >
                <ArrowLeft className="h-6 w-6" />
              </Button>
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-8 w-8" />
                <h1 className="text-2xl font-bold">Calendar</h1>
                {/* Navigation Controls - Now in fixed position */}
                <div className="flex items-center gap-2 ml-4 min-w-[80px]">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleNavigation('prev')}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleNavigation('next')}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <span className="text-muted-foreground">
                {format(date, "MMMM d, yyyy")}
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* View Toggle */}
              <div className="bg-muted rounded-lg p-1">
                {(["day", "week", "month", "year"] as const).map((viewType) => (
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

              {/* User Avatar */}
              <Avatar className="h-9 w-9">
                <AvatarImage src="/avatars/01.png" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
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

                {/* Color coding legend */}
                <div className="space-y-2 pt-4 border-t">
                  <label className="text-sm font-medium">Programs</label>
                  {Object.entries(programColors).map(([program, colorClass]) => (
                    <div key={program} className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded ${colorClass.split(' ')[0]}`} />
                      <span className="text-sm">{program}</span>
                    </div>
                  ))}
                </div>

                {/* Teacher color coding legend */}
                <div className="space-y-2 pt-4 border-t">
                  <label className="text-sm font-medium">Teachers</label>
                  {Object.entries(teacherColors).map(([teacher, colorClass]) => (
                    <div key={teacher} className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded bg-gray-100`} />
                      <span className={`text-sm ${colorClass}`}>{teacher}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Calendar Content */}
            <Card>
              <CardContent className="p-6">
                {view === "day" && renderDayView()}
                {view === "week" && renderWeekView()}
                {view === "month" && renderMonthView()}
                {view === "year" && renderYearView()}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}