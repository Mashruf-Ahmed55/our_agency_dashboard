'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { meetings } from '@/lib/meetings-data';
import { format } from 'date-fns';
import {
  AlertTriangle,
  Calendar,
  Clock,
  Edit,
  FileText,
  Trash2,
  Users,
  Video,
} from 'lucide-react';
import { useState } from 'react';

interface MeetingsListProps {
  selectedDate?: Date;
}

export function MeetingsList({ selectedDate }: MeetingsListProps) {
  const [selectedMeeting, setSelectedMeeting] = useState<
    (typeof meetings)[0] | null
  >(null);

  // Filter meetings based on selected date if provided
  const filteredMeetings = selectedDate
    ? meetings.filter((meeting) => {
        const meetingDate = new Date(meeting.date);
        return (
          meetingDate.getDate() === selectedDate.getDate() &&
          meetingDate.getMonth() === selectedDate.getMonth() &&
          meetingDate.getFullYear() === selectedDate.getFullYear()
        );
      })
    : meetings;

  // Sort meetings by date (most recent first)
  const sortedMeetings = [...filteredMeetings].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  // Group meetings by date
  const groupedMeetings: Record<string, typeof meetings> = {};
  sortedMeetings.forEach((meeting) => {
    const dateKey = format(new Date(meeting.date), 'yyyy-MM-dd');
    if (!groupedMeetings[dateKey]) {
      groupedMeetings[dateKey] = [];
    }
    groupedMeetings[dateKey].push(meeting);
  });

  return (
    <>
      <ScrollArea className="h-[600px] pr-4">
        {Object.keys(groupedMeetings).length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[200px] text-center p-4">
            <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="font-medium text-lg">No meetings scheduled</h3>
            <p className="text-muted-foreground max-w-md">
              {selectedDate
                ? `No meetings scheduled for ${format(
                    selectedDate,
                    'MMMM d, yyyy'
                  )}`
                : 'No upcoming meetings. Click "Schedule Meeting" to create one.'}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedMeetings).map(([dateKey, dateMeetings]) => (
              <div key={dateKey}>
                <h3 className="font-medium text-sm text-muted-foreground mb-2">
                  {format(new Date(dateKey), 'EEEE, MMMM d, yyyy')}
                </h3>
                <div className="space-y-3">
                  {dateMeetings.map((meeting) => (
                    <Card
                      key={meeting.id}
                      className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => setSelectedMeeting(meeting)}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium">{meeting.title}</h4>
                            <Badge
                              variant={
                                meeting.type === 'internal'
                                  ? 'secondary'
                                  : 'default'
                              }
                            >
                              {meeting.type === 'internal'
                                ? 'Internal'
                                : 'Client'}
                            </Badge>
                          </div>
                          <div className="flex items-center mt-2 text-sm text-muted-foreground">
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
                      <div className="mt-3">
                        <div className="flex items-center">
                          <Users className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {meeting.attendees.length} attendees
                          </span>
                        </div>
                        <div className="flex -space-x-2 mt-1">
                          {meeting.attendees.slice(0, 5).map((attendee) => (
                            <Avatar
                              key={attendee.id}
                              className="h-6 w-6 border-2 border-background"
                            >
                              <AvatarImage
                                src={attendee.avatar}
                                alt={attendee.name}
                              />
                              <AvatarFallback className="text-[10px]">
                                {attendee.initials}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          {meeting.attendees.length > 5 && (
                            <div className="flex items-center justify-center h-6 w-6 rounded-full bg-muted text-muted-foreground text-[10px] border-2 border-background">
                              +{meeting.attendees.length - 5}
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      {/* Meeting Detail Dialog */}
      <Dialog
        open={!!selectedMeeting}
        onOpenChange={() => setSelectedMeeting(null)}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <span>{selectedMeeting?.title}</span>
              <Badge
                variant={
                  selectedMeeting?.type === 'internal' ? 'secondary' : 'default'
                }
              >
                {selectedMeeting?.type === 'internal' ? 'Internal' : 'Client'}
              </Badge>
            </DialogTitle>
            <DialogDescription>
              {selectedMeeting &&
                format(new Date(selectedMeeting.date), 'EEEE, MMMM d, yyyy')}
            </DialogDescription>
          </DialogHeader>

          {selectedMeeting && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{selectedMeeting.time}</span>
                  <span className="mx-1">•</span>
                  <span>{selectedMeeting.duration}</span>
                </div>
                {new Date(selectedMeeting.date).getTime() < Date.now() && (
                  <div className="flex items-center text-sm text-yellow-500">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    <span>This meeting has passed</span>
                  </div>
                )}
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-medium mb-2">Description</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedMeeting.description || 'No description provided.'}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Attendees</h4>
                <div className="space-y-2">
                  {selectedMeeting.attendees.map((attendee) => (
                    <div
                      key={attendee.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-7 w-7">
                          <AvatarImage
                            src={attendee.avatar}
                            alt={attendee.name}
                          />
                          <AvatarFallback>{attendee.initials}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{attendee.name}</span>
                      </div>
                      {attendee.role && (
                        <Badge variant="outline" className="text-xs">
                          {attendee.role}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {selectedMeeting.agenda && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Agenda</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    {selectedMeeting.agenda.map((item, index) => (
                      <div key={index} className="flex items-start">
                        <span className="mr-2">{index + 1}.</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Separator />

              <div className="flex justify-between">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Notes
                  </Button>
                  <Button size="sm">
                    <Video className="h-4 w-4 mr-2" />
                    Join Meeting
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
