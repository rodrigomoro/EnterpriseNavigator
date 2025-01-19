import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { mockEvents } from '@/data/mockData';

export default function Calendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const selectedDayEvents = mockEvents.filter(event => {
    if (!date) return false;
    const eventDate = new Date(event.date);
    return eventDate.toDateString() === date.toDateString();
  });

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <CalendarIcon className="h-5 w-5" />
        Calendar
      </h3>

      <div className="flex flex-col md:flex-row gap-6">
        <CalendarComponent
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />

        <div className="flex-1">
          <h4 className="font-medium mb-3">Events for {date?.toLocaleDateString()}</h4>
          <div className="space-y-2">
            {selectedDayEvents.map((event) => (
              <Card key={event.id} className="p-3">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full bg-${event.priority}`} />
                  <p className="font-medium">{event.title}</p>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{event.time}</p>
              </Card>
            ))}
            {selectedDayEvents.length === 0 && (
              <p className="text-muted-foreground">No events scheduled</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
