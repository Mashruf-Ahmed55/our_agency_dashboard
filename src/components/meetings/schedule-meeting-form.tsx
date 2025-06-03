'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { DialogFooter } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { teamMembers } from '@/lib/team-data';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const meetingFormSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  date: z.date({
    required_error: 'A date is required.',
  }),
  startTime: z.string({
    required_error: 'Start time is required.',
  }),
  duration: z.string({
    required_error: 'Duration is required.',
  }),
  type: z.enum(['internal', 'client'], {
    required_error: 'Please select a meeting type.',
  }),
  description: z.string().optional(),
  attendees: z.array(z.string()).optional(),
  sendInvites: z.boolean().default(true),
});

type MeetingFormValues = z.infer<typeof meetingFormSchema>;

interface ScheduleMeetingFormProps {
  initialDate?: Date;
  onSubmit: () => void;
}

export function ScheduleMeetingForm({
  initialDate,
  onSubmit,
}: ScheduleMeetingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues: Partial<MeetingFormValues> = {
    title: '',
    date: initialDate || new Date(),
    startTime: '09:00',
    duration: '30min',
    type: 'internal',
    description: '',
    attendees: [],
    sendInvites: true,
  };

  const form = useForm<MeetingFormValues>({
    defaultValues,
  });

  const handleSubmit = async (values: MeetingFormValues) => {
    setIsSubmitting(true);

    try {
      // Here would be the API call to save the meeting
      console.log('Form values:', values);

      // toast({
      //   title: 'Meeting scheduled',
      //   description: `${values.title} has been scheduled for ${format(
      //     values.date,
      //     'MMMM d, yyyy'
      //   )} at ${values.startTime}.`,
      // });
      toast.success('Meeting scheduled', {
        description: `${values.title} has been scheduled for ${format(
          values.date,
          'MMMM d, yyyy'
        )} at ${values.startTime}.`,
        action: {
          label: 'OK',
          onClick: () => console.log('Toast action clicked'),
        },
      });

      onSubmit();
    } catch (error) {
      console.error('Error submitting form:', error);
      // toast({
      //   title: 'Error',
      //   description:
      //     'There was an error scheduling the meeting. Please try again.',
      //   variant: 'destructive',
      // });
      toast.error('Error', {
        description:
          'There was an error scheduling the meeting. Please try again.',
        action: {
          label: 'OK',
          onClick: () => console.log('Toast action clicked'),
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-4">
        <FormField
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Team Weekly Standup" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          'pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-2">
            <FormField
              // control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Time</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a time" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Array.from({ length: 10 }, (_, i) => i + 9).map(
                        (hour) => (
                          <SelectItem
                            key={hour}
                            value={`${hour.toString().padStart(2, '0')}:00`}
                          >
                            {hour > 12
                              ? `${hour - 12}:00 PM`
                              : hour === 12
                              ? '12:00 PM'
                              : `${hour}:00 AM`}
                          </SelectItem>
                        )
                      )}
                      {Array.from({ length: 10 }, (_, i) => i + 9).map(
                        (hour) => (
                          <SelectItem
                            key={`${hour}-30`}
                            value={`${hour.toString().padStart(2, '0')}:30`}
                          >
                            {hour > 12
                              ? `${hour - 12}:30 PM`
                              : hour === 12
                              ? '12:30 PM'
                              : `${hour}:30 AM`}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              // control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="15min">15 minutes</SelectItem>
                      <SelectItem value="30min">30 minutes</SelectItem>
                      <SelectItem value="45min">45 minutes</SelectItem>
                      <SelectItem value="1hr">1 hour</SelectItem>
                      <SelectItem value="1hr30min">1.5 hours</SelectItem>
                      <SelectItem value="2hr">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          // control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meeting Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="internal">Internal Meeting</SelectItem>
                  <SelectItem value="client">Client Meeting</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          // control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Brief description of the meeting purpose"
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          // control={form.control}
          name="attendees"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Attendees</FormLabel>
              <div className="space-y-2">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`attendee-${member.id}`}
                      checked={field.value?.includes(member.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          field.onChange([...(field.value || []), member.id]);
                        } else {
                          field.onChange(
                            field.value?.filter(
                              (value: any) => value !== member.id
                            ) || []
                          );
                        }
                      }}
                    />
                    <label
                      htmlFor={`attendee-${member.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {member.name} - {member.role}
                    </label>
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          // control={form.control}
          name="sendInvites"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Send calendar invites</FormLabel>
                <FormDescription>
                  Send email notifications to all attendees
                </FormDescription>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Scheduling...' : 'Schedule Meeting'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
