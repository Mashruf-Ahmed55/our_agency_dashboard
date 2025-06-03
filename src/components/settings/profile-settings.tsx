'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
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
import { Textarea } from '@/components/ui/textarea';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  title: z.string().min(2, {
    message: 'Job title must be at least 2 characters.',
  }),
  bio: z
    .string()
    .max(300, {
      message: 'Bio cannot be longer than 300 characters.',
    })
    .optional(),
  phone: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const defaultValues: ProfileFormValues = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  title: 'Project Manager',
  bio: 'Senior project manager with 5+ years of experience in web development projects.',
  phone: '(555) 123-4567',
};

export function ProfileSettings() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  });

  const handleSubmit = async (values: ProfileFormValues) => {
    setIsSubmitting(true);

    try {
      // Here would be the API call to update the profile
      console.log('Form values:', values);

      // toast({
      //   title: 'Profile updated',
      //   description: 'Your profile has been updated successfully.',
      // });
      toast.success('Profile updated', {
        description: 'Your profile has been updated successfully.',
        action: {
          label: 'OK',
          onClick: () => console.log('Toast action clicked'),
        },
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      // toast({
      //   title: 'Error',
      //   description:
      //     'There was an error updating your profile. Please try again.',
      //   variant: 'destructive',
      // });
      toast.error('Error', {
        description:
          'There was an error updating your profile. Please try again.',
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
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Profile Picture</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Change
            </Button>
            <Button variant="outline" size="sm" className="text-destructive">
              Remove
            </Button>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Your job title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Brief description about yourself"
                    rows={4}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {field.value?.length || 0}/300 characters
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
