'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const notificationFormSchema = z.object({
  emailNotifications: z.boolean().default(true),
  emailMeetingReminders: z.boolean().default(true),
  emailClientMessages: z.boolean().default(true),
  emailProjectUpdates: z.boolean().default(true),
  inAppNotifications: z.boolean().default(true),
  inAppMeetingReminders: z.boolean().default(true),
  inAppClientMessages: z.boolean().default(true),
  inAppProjectUpdates: z.boolean().default(true),
  inAppTeamMessages: z.boolean().default(true),
  inAppSounds: z.boolean().default(true),
});

type NotificationFormValues = z.infer<typeof notificationFormSchema>;

const defaultValues: NotificationFormValues = {
  emailNotifications: true,
  emailMeetingReminders: true,
  emailClientMessages: true,
  emailProjectUpdates: false,
  inAppNotifications: true,
  inAppMeetingReminders: true,
  inAppClientMessages: true,
  inAppProjectUpdates: true,
  inAppTeamMessages: true,
  inAppSounds: true,
};

export function NotificationSettings() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<NotificationFormValues>({
    // @ts-ignore
    resolver: zodResolver(notificationFormSchema),
    defaultValues,
  });

  const handleSubmit = async (values: NotificationFormValues) => {
    setIsSubmitting(true);

    try {
      // Here would be the API call to update notification settings
      console.log('Form values:', values);

      toast.success('Notification settings updated', {
        description: 'Your notification preferences have been saved.',
        action: {
          label: 'OK',
          onClick: () => console.log('Toast action clicked'),
        },
      });
      // toast({
      //   title: 'Notification settings updated',
      //   description: 'Your notification preferences have been saved.',
      // });
    } catch (error) {
      console.error('Error submitting form:', error);
      // toast({
      //   title: 'Error',
      //   description:
      //     'There was an error saving your notification settings. Please try again.',
      //   variant: 'destructive',
      // });
      toast.error('Error', {
        description:
          'There was an error saving your notification settings. Please try again.',
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
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Email Notifications</h3>
          <p className="text-sm text-muted-foreground">
            Configure which notifications are sent to your email
          </p>
          <div className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="emailNotifications"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between space-x-2 rounded-md border p-3">
                  <div>
                    <FormLabel className="text-base">
                      All Email Notifications
                    </FormLabel>
                    <FormDescription>
                      Master toggle for all email notifications
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                        if (!checked) {
                          form.setValue('emailMeetingReminders', false);
                          form.setValue('emailClientMessages', false);
                          form.setValue('emailProjectUpdates', false);
                        }
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emailMeetingReminders"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between space-x-2 rounded-md border p-3">
                  <div>
                    <FormLabel className="text-base">
                      Meeting Reminders
                    </FormLabel>
                    <FormDescription>
                      Get email reminders before scheduled meetings
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={!form.watch('emailNotifications')}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emailClientMessages"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between space-x-2 rounded-md border p-3">
                  <div>
                    <FormLabel className="text-base">Client Messages</FormLabel>
                    <FormDescription>
                      Get notified when clients send messages or form
                      submissions
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={!form.watch('emailNotifications')}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emailProjectUpdates"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between space-x-2 rounded-md border p-3">
                  <div>
                    <FormLabel className="text-base">Project Updates</FormLabel>
                    <FormDescription>
                      Get notified about project status changes and updates
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={!form.watch('emailNotifications')}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-medium">In-App Notifications</h3>
          <p className="text-sm text-muted-foreground">
            Configure which notifications appear in the app
          </p>
          <div className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="inAppNotifications"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between space-x-2 rounded-md border p-3">
                  <div>
                    <FormLabel className="text-base">
                      All In-App Notifications
                    </FormLabel>
                    <FormDescription>
                      Master toggle for all in-app notifications
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                        if (!checked) {
                          form.setValue('inAppMeetingReminders', false);
                          form.setValue('inAppClientMessages', false);
                          form.setValue('inAppProjectUpdates', false);
                          form.setValue('inAppTeamMessages', false);
                        }
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="inAppMeetingReminders"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between space-x-2 rounded-md border p-3">
                    <div>
                      <FormLabel className="text-base">
                        Meeting Reminders
                      </FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={!form.watch('inAppNotifications')}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="inAppClientMessages"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between space-x-2 rounded-md border p-3">
                    <div>
                      <FormLabel className="text-base">
                        Client Messages
                      </FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={!form.watch('inAppNotifications')}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="inAppProjectUpdates"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between space-x-2 rounded-md border p-3">
                    <div>
                      <FormLabel className="text-base">
                        Project Updates
                      </FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={!form.watch('inAppNotifications')}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="inAppTeamMessages"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between space-x-2 rounded-md border p-3">
                    <div>
                      <FormLabel className="text-base">Team Messages</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={!form.watch('inAppNotifications')}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="inAppSounds"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between space-x-2 rounded-md border p-3">
                  <div>
                    <FormLabel className="text-base">
                      Notification Sounds
                    </FormLabel>
                    <FormDescription>
                      Play sounds for in-app notifications
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={!form.watch('inAppNotifications')}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
