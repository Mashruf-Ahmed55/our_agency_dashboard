'use client';

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
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

const appearanceFormSchema = z.object({
  theme: z.enum(['light', 'dark', 'system'], {
    required_error: 'Please select a theme',
  }),
  fontSize: z.enum(['sm', 'md', 'lg'], {
    required_error: 'Please select a font size',
  }),
  sidebarLayout: z.enum(['expanded', 'collapsed', 'auto'], {
    required_error: 'Please select a sidebar layout',
  }),
});

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;

export function AppearanceSettings() {
  const { theme, setTheme } = useTheme();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues: AppearanceFormValues = {
    theme: (theme as 'light' | 'dark' | 'system') || 'system',
    fontSize: 'md',
    sidebarLayout: 'auto',
  };

  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues,
  });

  const handleSubmit = async (values: AppearanceFormValues) => {
    setIsSubmitting(true);

    try {
      // Update theme
      setTheme(values.theme);

      // Here would be additional logic for other appearance settings
      console.log('Form values:', values);

      toast.success('Appearance updated', {
        description: 'Your appearance settings have been updated.',
        action: {
          label: 'OK',
          onClick: () => console.log('Toast action clicked'),
        },
      });
    } catch (error) {
      console.error('Error submitting form:', error);

      toast.error('Error', {
        description:
          'There was an error saving your appearance settings. Please try again.',
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
        <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel>Theme</FormLabel>
              <FormDescription>
                Select the theme for the dashboard
              </FormDescription>

              <FormControl>
                <RadioGroup
                  className="grid grid-cols-1 gap-4 sm:grid-cols-3"
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  {/* Light */}
                  <FormItem
                    className="flex flex-col items-center space-y-3 rounded-md border-2 border-muted bg-background p-4 hover:border-primary hover:bg-primary/5"
                    data-state={
                      field.value === 'light' ? 'checked' : 'unchecked'
                    }
                  >
                    <FormControl>
                      <RadioGroupItem
                        value="light"
                        id="theme-light"
                        className="sr-only"
                      />
                    </FormControl>
                    <div className="rounded-md border border-border p-2 bg-background">
                      <div className="space-y-2">
                        <div className="h-2 w-8 rounded-full bg-primary/80" />
                        <div className="h-2 w-12 rounded-full bg-muted" />
                        <div className="h-2 w-10 rounded-full bg-muted" />
                      </div>
                    </div>
                    <FormLabel className="font-normal" htmlFor="theme-light">
                      Light
                    </FormLabel>
                  </FormItem>

                  {/* Dark */}
                  <FormItem
                    className="flex flex-col items-center space-y-3 rounded-md border-2 border-muted bg-background p-4 hover:border-primary hover:bg-primary/5"
                    data-state={
                      field.value === 'dark' ? 'checked' : 'unchecked'
                    }
                  >
                    <FormControl>
                      <RadioGroupItem
                        value="dark"
                        id="theme-dark"
                        className="sr-only"
                      />
                    </FormControl>
                    <div className="rounded-md border border-border p-2 bg-gray-950">
                      <div className="space-y-2">
                        <div className="h-2 w-8 rounded-full bg-primary/80" />
                        <div className="h-2 w-12 rounded-full bg-gray-800" />
                        <div className="h-2 w-10 rounded-full bg-gray-800" />
                      </div>
                    </div>
                    <FormLabel className="font-normal" htmlFor="theme-dark">
                      Dark
                    </FormLabel>
                  </FormItem>

                  {/* System */}
                  <FormItem
                    className="flex flex-col items-center space-y-3 rounded-md border-2 border-muted bg-background p-4 hover:border-primary hover:bg-primary/5"
                    data-state={
                      field.value === 'system' ? 'checked' : 'unchecked'
                    }
                  >
                    <FormControl>
                      <RadioGroupItem
                        value="system"
                        id="theme-system"
                        className="sr-only"
                      />
                    </FormControl>
                    <div className="rounded-md border border-border p-2 bg-gradient-to-r from-background to-gray-950">
                      <div className="space-y-2">
                        <div className="h-2 w-8 rounded-full bg-primary/80" />
                        <div className="h-2 w-12 rounded-full bg-gradient-to-r from-muted to-gray-800" />
                        <div className="h-2 w-10 rounded-full bg-gradient-to-r from-muted to-gray-800" />
                      </div>
                    </div>
                    <FormLabel className="font-normal" htmlFor="theme-system">
                      System
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fontSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Font Size</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a font size" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="sm">Small</SelectItem>
                  <SelectItem value="md">Medium (Default)</SelectItem>
                  <SelectItem value="lg">Large</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                The font size affects all text in the application
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sidebarLayout"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sidebar Layout</FormLabel>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="expanded" />
                  </FormControl>
                  <FormLabel className="font-normal">Always Expanded</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="collapsed" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Always Collapsed
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="auto" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Auto (Responsive)
                  </FormLabel>
                </FormItem>
              </RadioGroup>
              <FormDescription>
                Choose how you want the sidebar to behave
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
  );
}


