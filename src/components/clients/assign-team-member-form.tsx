'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const assignTeamMemberSchema = z.object({
  teamMemberId: z.string({
    required_error: 'You must select a team member',
  }),
});

type AssignFormValues = z.infer<typeof assignTeamMemberSchema>;

interface AssignTeamMemberFormProps {
  clientId: string;
  onSubmit: () => void;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  initials: string;
  availability: 'high' | 'medium' | 'low';
}

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'John Doe',
    role: 'Project Manager',
    initials: 'JD',
    availability: 'medium',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    role: 'UX Designer',
    avatar: '/placeholder-avatar.jpg',
    initials: 'SJ',
    availability: 'high',
  },
  {
    id: '3',
    name: 'Mike Thompson',
    role: 'Frontend Developer',
    initials: 'MT',
    availability: 'low',
  },
  {
    id: '4',
    name: 'Lisa Chen',
    role: 'Backend Developer',
    avatar: '/placeholder-avatar.jpg',
    initials: 'LC',
    availability: 'high',
  },
  {
    id: '5',
    name: 'Alex Rodriguez',
    role: 'UI Designer',
    avatar: '/placeholder-avatar.jpg',
    initials: 'AR',
    availability: 'medium',
  },
  {
    id: '6',
    name: 'Emily Smith',
    role: 'Content Strategist',
    initials: 'ES',
    availability: 'high',
  },
];

const getAvailabilityColor = (availability: TeamMember['availability']) => {
  switch (availability) {
    case 'high':
      return 'bg-green-500';
    case 'medium':
      return 'bg-yellow-500';
    case 'low':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

export function AssignTeamMemberForm({
  clientId,
  onSubmit,
}: AssignTeamMemberFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AssignFormValues>({
    resolver: zodResolver(assignTeamMemberSchema),
  });

  const handleSubmit = async (values: AssignFormValues) => {
    setIsSubmitting(true);

    try {
      // Here would be the API call to assign the team member
      console.log(
        'Assigning team member:',
        values.teamMemberId,
        'to client:',
        clientId
      );

      const teamMember = teamMembers.find(
        (member) => member.id === values.teamMemberId
      );

      // toast({
      //   title: 'Team member assigned',
      //   description: `${teamMember?.name} has been assigned to this client.`,
      // });
      toast.success('Team member assigned', {
        description: `${teamMember?.name} has been assigned to this client.`,
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
      //     'There was an error assigning the team member. Please try again.',
      //   variant: 'destructive',
      // });
      toast.error('Error', {
        description:
          'There was an error assigning the team member. Please try again.',
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
          name="teamMemberId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Team Member</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-2"
                >
                  {teamMembers.map((member) => (
                    <div
                      key={member.id}
                      className={`flex items-center space-x-3 rounded-md border p-3 ${
                        field.value === member.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border'
                      }`}
                    >
                      <RadioGroupItem value={member.id} id={member.id} />
                      <div className="flex flex-1 items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage
                              src={member.avatar}
                              alt={member.name}
                            />
                            <AvatarFallback>{member.initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {member.role}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div
                            className={`h-2.5 w-2.5 rounded-full ${getAvailabilityColor(
                              member.availability
                            )} mr-2`}
                          />
                          <span className="text-sm capitalize">
                            {member.availability} availability
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Assigning...' : 'Assign Team Member'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
