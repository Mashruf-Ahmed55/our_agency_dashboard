import { addDays, addHours, startOfDay } from 'date-fns';

// Generate dates relative to current date for realistic data
const now = new Date();
const today = startOfDay(now);
const tomorrow = addDays(today, 1);
const dayAfterTomorrow = addDays(today, 2);
const nextWeek = addDays(today, 5);

// Generate some meeting times throughout the day
const morning = addHours(today, 10); // 10:00 AM
const afternoon = addHours(today, 14); // 2:00 PM
const tomorrowMorning = addHours(tomorrow, 11); // 11:00 AM
const tomorrowAfternoon = addHours(tomorrow, 15); // 3:00 PM
const dayAfterMorning = addHours(dayAfterTomorrow, 9); // 9:00 AM
const nextWeekMorning = addHours(nextWeek, 10); // 10:00 AM

export const meetings = [
  {
    id: '1',
    title: 'Weekly Team Standup',
    date: morning.toISOString(),
    time: '10:00 AM - 10:30 AM',
    duration: '30m',
    type: 'internal' as const,
    description:
      'Weekly team meeting to discuss project progress and upcoming tasks.',
    attendees: [
      { id: '1', name: 'John Doe', role: 'Project Manager', initials: 'JD' },
      {
        id: '2',
        name: 'Sarah Johnson',
        role: 'UX Designer',
        avatar: '/placeholder-avatar.jpg',
        initials: 'SJ',
      },
      {
        id: '3',
        name: 'Mike Thompson',
        role: 'Frontend Developer',
        initials: 'MT',
      },
      {
        id: '4',
        name: 'Lisa Chen',
        role: 'Backend Developer',
        avatar: '/placeholder-avatar.jpg',
        initials: 'LC',
      },
      {
        id: '5',
        name: 'Alex Rodriguez',
        role: 'UI Designer',
        avatar: '/placeholder-avatar.jpg',
        initials: 'AR',
      },
      {
        id: '6',
        name: 'Emily Smith',
        role: 'Content Strategist',
        initials: 'ES',
      },
    ],
    agenda: [
      'Project status updates',
      'Blockers and challenges',
      'Planning for the week ahead',
      'Team announcements',
    ],
  },
  {
    id: '2',
    title: 'TechCorp Project Kickoff',
    date: afternoon.toISOString(),
    time: '2:00 PM - 3:00 PM',
    duration: '1h',
    type: 'client' as const,
    description:
      'Initial meeting with TechCorp to discuss website redesign project requirements and timeline.',
    attendees: [
      { id: '1', name: 'John Doe', role: 'Project Manager', initials: 'JD' },
      {
        id: '2',
        name: 'Sarah Johnson',
        role: 'UX Designer',
        avatar: '/placeholder-avatar.jpg',
        initials: 'SJ',
      },
      { id: '101', name: 'Robert Johnson', role: 'Client', initials: 'RJ' },
      { id: '102', name: 'Amanda Lee', role: 'Client', initials: 'AL' },
    ],
    agenda: [
      'Project scope discussion',
      'Timeline and deliverables',
      'Technical requirements',
      'Next steps and action items',
    ],
  },
  {
    id: '3',
    title: 'Design Review - Mobile App',
    date: tomorrowMorning.toISOString(),
    time: '11:00 AM - 11:45 AM',
    duration: '45m',
    type: 'internal' as const,
    description:
      'Review current design progress for the InnovateCo mobile app project.',
    attendees: [
      { id: '1', name: 'John Doe', role: 'Project Manager', initials: 'JD' },
      {
        id: '2',
        name: 'Sarah Johnson',
        role: 'UX Designer',
        avatar: '/placeholder-avatar.jpg',
        initials: 'SJ',
      },
      {
        id: '5',
        name: 'Alex Rodriguez',
        role: 'UI Designer',
        avatar: '/placeholder-avatar.jpg',
        initials: 'AR',
      },
    ],
    agenda: [
      'Review current design mockups',
      'Discuss user feedback from testing',
      'Plan design iterations',
      'Timeline for design completion',
    ],
  },
  {
    id: '4',
    title: 'InnovateCo Project Update',
    date: tomorrowAfternoon.toISOString(),
    time: '3:30 PM - 4:30 PM',
    duration: '1h',
    type: 'client' as const,
    description:
      'Monthly progress update for the InnovateCo mobile app development project.',
    attendees: [
      { id: '1', name: 'John Doe', role: 'Project Manager', initials: 'JD' },
      {
        id: '3',
        name: 'Mike Thompson',
        role: 'Frontend Developer',
        initials: 'MT',
      },
      {
        id: '4',
        name: 'Lisa Chen',
        role: 'Backend Developer',
        avatar: '/placeholder-avatar.jpg',
        initials: 'LC',
      },
      {
        id: '103',
        name: 'Emily Clark',
        role: 'Client',
        avatar: '/placeholder-avatar.jpg',
        initials: 'EC',
      },
    ],
    agenda: [
      'Project status update',
      'Demo of completed features',
      'Discussion of timeline adjustments',
      'Budget review',
      'Next milestones',
    ],
  },
  {
    id: '5',
    title: 'Backend Team Sync',
    date: dayAfterMorning.toISOString(),
    time: '9:00 AM - 9:30 AM',
    duration: '30m',
    type: 'internal' as const,
    description:
      'Weekly sync for the backend development team to discuss technical challenges and architecture decisions.',
    attendees: [
      { id: '1', name: 'John Doe', role: 'Project Manager', initials: 'JD' },
      {
        id: '4',
        name: 'Lisa Chen',
        role: 'Backend Developer',
        avatar: '/placeholder-avatar.jpg',
        initials: 'LC',
      },
      {
        id: '104',
        name: 'Jason Miller',
        role: 'DevOps Engineer',
        initials: 'JM',
      },
    ],
    agenda: [
      'API development progress',
      'Database optimization',
      'Infrastructure scaling',
      'Technical debt discussion',
    ],
  },
  {
    id: '6',
    title: 'Marketing Website Planning',
    date: nextWeekMorning.toISOString(),
    time: '10:00 AM - 11:30 AM',
    duration: '1h 30m',
    type: 'client' as const,
    description: 'Planning session for Startup XYZ marketing website project.',
    attendees: [
      { id: '1', name: 'John Doe', role: 'Project Manager', initials: 'JD' },
      {
        id: '2',
        name: 'Sarah Johnson',
        role: 'UX Designer',
        avatar: '/placeholder-avatar.jpg',
        initials: 'SJ',
      },
      {
        id: '5',
        name: 'Alex Rodriguez',
        role: 'UI Designer',
        avatar: '/placeholder-avatar.jpg',
        initials: 'AR',
      },
      {
        id: '6',
        name: 'Emily Smith',
        role: 'Content Strategist',
        initials: 'ES',
      },
      { id: '105', name: 'Michael Brown', role: 'Client', initials: 'MB' },
    ],
    agenda: [
      'Website goals and requirements',
      'Content strategy',
      'Design direction',
      'Technical requirements',
      'Timeline and deliverables',
    ],
  },
];
