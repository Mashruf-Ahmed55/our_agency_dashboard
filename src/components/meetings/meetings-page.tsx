'use client';

import { CalendarView } from '@/components/meetings/calendar-view';
import { MeetingsList } from '@/components/meetings/meetings-list';
import { ScheduleMeetingForm } from '@/components/meetings/schedule-meeting-form';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarIcon, ListIcon, Plus } from 'lucide-react';
import { useState } from 'react';

export function MeetingsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isScheduling, setIsScheduling] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Meetings</h1>
          <p className="text-muted-foreground">
            Schedule and manage team and client meetings
          </p>
        </div>
        <Button onClick={() => setIsScheduling(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Schedule Meeting
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-9">
          <Tabs defaultValue="calendar" className="space-y-4">
            <TabsList>
              <TabsTrigger value="calendar" className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-2" />
                Calendar
              </TabsTrigger>
              <TabsTrigger value="list" className="flex items-center">
                <ListIcon className="h-4 w-4 mr-2" />
                List
              </TabsTrigger>
            </TabsList>
            <TabsContent value="calendar" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Calendar View</CardTitle>
                  <CardDescription>
                    View scheduled meetings in a calendar layout
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CalendarView selectedDate={date} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="list" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Upcoming Meetings</CardTitle>
                  <CardDescription>
                    View all scheduled meetings in a list
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MeetingsList selectedDate={date} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Date</CardTitle>
              <CardDescription>Select a date to view meetings</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Schedule Meeting Dialog */}
      <Dialog open={isScheduling} onOpenChange={setIsScheduling}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Schedule New Meeting</DialogTitle>
            <DialogDescription>
              Fill in the details to schedule a new meeting.
            </DialogDescription>
          </DialogHeader>
          <ScheduleMeetingForm
            initialDate={date}
            onSubmit={() => setIsScheduling(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
