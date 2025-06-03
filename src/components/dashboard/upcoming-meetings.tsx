'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { Calendar, Clock, Users, Video } from 'lucide-react';

interface Meeting {
  id: string;
  title: string;
  date: Date;
  time: string;
  duration: string;
  type: 'internal' | 'client';
  attendees: Array<{
    id: string;
    name: string;
    avatar?: string;
    initials: string;
  }>;
}

const meetings: Meeting[] = [
  {
    id: '1',
    title: 'Weekly Team Standup',
    date: new Date(Date.now() + 1000 * 60 * 60 * 3), // 3 hours from now
    time: '10:00 AM',
    duration: '30m',
    type: 'internal',
    attendees: [
      { id: '1', name: 'John Doe', initials: 'JD' },
      {
        id: '2',
        name: 'Sarah Johnson',
        avatar: '/placeholder-avatar.jpg',
        initials: 'SJ',
      },
      { id: '3', name: 'Mike Thompson', initials: 'MT' },
      {
        id: '4',
        name: 'Lisa Chen',
        avatar: '/placeholder-avatar.jpg',
        initials: 'LC',
      },
      {
        id: '5',
        name: 'Alex Rodriguez',
        avatar: '/placeholder-avatar.jpg',
        initials: 'AR',
      },
    ],
  },
  {
    id: '2',
    title: 'TechCorp Project Kickoff',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day from now
    time: '2:00 PM',
    duration: '1h',
    type: 'client',
    attendees: [
      { id: '1', name: 'John Doe', initials: 'JD' },
      {
        id: '2',
        name: 'Sarah Johnson',
        avatar: '/placeholder-avatar.jpg',
        initials: 'SJ',
      },
      { id: '6', name: 'Robert Johnson', initials: 'RJ' },
    ],
  },
  {
    id: '3',
    title: 'Design Review - Mobile App',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2 days from now
    time: '11:00 AM',
    duration: '45m',
    type: 'internal',
    attendees: [
      {
        id: '2',
        name: 'Sarah Johnson',
        avatar: '/placeholder-avatar.jpg',
        initials: 'SJ',
      },
      { id: '3', name: 'Mike Thompson', initials: 'MT' },
      {
        id: '5',
        name: 'Alex Rodriguez',
        avatar: '/placeholder-avatar.jpg',
        initials: 'AR',
      },
    ],
  },
  {
    id: '4',
    title: 'InnovateCo Project Update',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3), // 3 days from now
    time: '3:30 PM',
    duration: '1h',
    type: 'client',
    attendees: [
      { id: '1', name: 'John Doe', initials: 'JD' },
      {
        id: '4',
        name: 'Lisa Chen',
        avatar: '/placeholder-avatar.jpg',
        initials: 'LC',
      },
      {
        id: '7',
        name: 'Emily Clark',
        avatar: '/placeholder-avatar.jpg',
        initials: 'EC',
      },
    ],
  },
];

export function UpcomingMeetings() {
  return (
    <ScrollArea className="h-[400px] pr-4">
      <div className="space-y-4">
        {meetings.map((meeting) => (
          <div
            key={meeting.id}
            className="flex flex-col p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="font-medium">{meeting.title}</h4>
                  <Badge
                    variant={
                      meeting.type === 'internal' ? 'secondary' : 'default'
                    }
                  >
                    {meeting.type === 'internal' ? 'Internal' : 'Client'}
                  </Badge>
                </div>
                <div className="flex items-center mt-2 text-sm text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5 mr-1" />
                  <span>{format(meeting.date, 'EEEE, MMM d')}</span>
                  <span className="mx-1">•</span>
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  <span>{meeting.time}</span>
                  <span className="mx-1">•</span>
                  <span>{meeting.duration}</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="gap-1">
                <Video className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Join</span>
              </Button>
            </div>
            <div className="mt-4">
              <div className="flex items-center">
                <Users className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Attendees</span>
              </div>
              <div className="flex -space-x-2 mt-2">
                {meeting.attendees.slice(0, 5).map((attendee) => (
                  <Avatar
                    key={attendee.id}
                    className="h-7 w-7 border-2 border-background"
                  >
                    <AvatarImage src={attendee.avatar} alt={attendee.name} />
                    <AvatarFallback className="text-[10px]">
                      {attendee.initials}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {meeting.attendees.length > 5 && (
                  <div className="flex items-center justify-center h-7 w-7 rounded-full bg-muted text-muted-foreground text-xs border-2 border-background">
                    +{meeting.attendees.length - 5}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
