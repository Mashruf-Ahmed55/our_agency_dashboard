'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { meetings } from '@/lib/meetings-data';
import { cn } from '@/lib/utils';
import { addDays, format, isSameDay, isToday, startOfWeek } from 'date-fns';

interface CalendarViewProps {
  selectedDate?: Date;
}

const timeSlots = [
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
];

export function CalendarView({ selectedDate = new Date() }: CalendarViewProps) {
  // Get start of the week (Sunday) for the selected date
  const startDate = startOfWeek(selectedDate);

  // Generate an array of 7 days, starting from the start of the week
  const days = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

  // Map time string to hour number for comparison
  const getHourFromTimeString = (timeString: string) => {
    const [hour, period] = timeString.split(':');
    const hourNum = parseInt(hour);

    if (period.includes('PM') && hourNum !== 12) {
      return hourNum + 12;
    } else if (period.includes('AM') && hourNum === 12) {
      return 0;
    }

    return hourNum;
  };

  // Check if a meeting falls in a specific time slot on a specific day
  const getMeetingsForTimeSlot = (day: Date, timeSlot: string) => {
    const timeHour = getHourFromTimeString(timeSlot);

    return meetings.filter((meeting) => {
      const meetingDate = new Date(meeting.date);
      const meetingTimeHour = getHourFromTimeString(
        meeting.time.split(' - ')[0]
      );

      return isSameDay(meetingDate, day) && meetingTimeHour === timeHour;
    });
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[800px]">
        {/* Header with days */}
        <div className="grid grid-cols-8 gap-4">
          <div className="sticky left-0 bg-card z-10"></div>
          {days.map((day, index) => (
            <div
              key={index}
              className={cn(
                'text-center p-2 font-medium',
                isToday(day) && 'bg-primary/10 rounded-md'
              )}
            >
              <div>{format(day, 'EEE')}</div>
              <div className={cn('text-2xl', isToday(day) && 'text-primary')}>
                {format(day, 'd')}
              </div>
            </div>
          ))}
        </div>

        <Separator className="my-4" />

        {/* Time slots and meetings */}
        <div className="space-y-1">
          {timeSlots.map((timeSlot) => (
            <div key={timeSlot} className="grid grid-cols-8 gap-4">
              <div className="sticky left-0 bg-card z-10 flex items-center justify-end pr-4 text-sm text-muted-foreground">
                {timeSlot}
              </div>
              {days.map((day, dayIndex) => {
                const slotMeetings = getMeetingsForTimeSlot(day, timeSlot);

                return (
                  <div key={dayIndex} className="h-24 border-t relative group">
                    {slotMeetings.length > 0 ? (
                      slotMeetings.map((meeting) => (
                        <Card
                          key={meeting.id}
                          className={cn(
                            'absolute inset-x-1 top-1 bottom-1 p-2 overflow-hidden cursor-pointer',
                            meeting.type === 'internal'
                              ? 'bg-secondary'
                              : 'bg-primary/10',
                            'hover:ring-2 hover:ring-primary/20 transition-all'
                          )}
                        >
                          <div className="flex flex-col h-full">
                            <div className="flex items-center justify-between">
                              <Badge
                                variant="outline"
                                className="text-[10px] px-1 py-0 h-4"
                              >
                                {meeting.time}
                              </Badge>
                              <Badge
                                variant="outline"
                                className="text-[10px] px-1 py-0 h-4"
                              >
                                {meeting.type === 'internal'
                                  ? 'Internal'
                                  : 'Client'}
                              </Badge>
                            </div>
                            <div className="mt-1 text-xs font-medium line-clamp-2">
                              {meeting.title}
                            </div>
                          </div>
                        </Card>
                      ))
                    ) : (
                      <Button
                        variant="ghost"
                        className="absolute inset-0 rounded-none opacity-0 group-hover:opacity-100 text-xs"
                      >
                        +
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
