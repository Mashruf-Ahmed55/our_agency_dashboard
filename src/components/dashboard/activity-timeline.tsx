'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  AlertCircle,
  Calendar,
  FileText,
  MessageSquare,
  UserPlus,
} from 'lucide-react';

type ActivityType = 'message' | 'project' | 'client' | 'meeting' | 'alert';

interface Activity {
  id: string;
  type: ActivityType;
  content: string;
  timestamp: string;
  user: {
    name: string;
    avatar?: string;
    initials: string;
  };
}

const activities: Activity[] = [
  {
    id: '1',
    type: 'message',
    content: 'New comment on Project X proposal',
    timestamp: '10 minutes ago',
    user: {
      name: 'Sarah Johnson',
      avatar: '/placeholder-avatar.jpg',
      initials: 'SJ',
    },
  },
  {
    id: '2',
    type: 'project',
    content: 'Updated wireframes for E-commerce redesign',
    timestamp: '1 hour ago',
    user: {
      name: 'Mike Thompson',
      initials: 'MT',
    },
  },
  {
    id: '3',
    type: 'client',
    content: 'Added TechCorp as a new client',
    timestamp: '2 hours ago',
    user: {
      name: 'Lisa Chen',
      avatar: '/placeholder-avatar.jpg',
      initials: 'LC',
    },
  },
  {
    id: '4',
    type: 'meeting',
    content: 'Scheduled a kickoff meeting with InnovateCo',
    timestamp: '3 hours ago',
    user: {
      name: 'John Davis',
      initials: 'JD',
    },
  },
  {
    id: '5',
    type: 'alert',
    content: 'Deadline approaching: Marketing website redesign',
    timestamp: '5 hours ago',
    user: {
      name: 'System',
      initials: 'SY',
    },
  },
  {
    id: '6',
    type: 'project',
    content: 'Completed phase 1 of mobile app development',
    timestamp: '1 day ago',
    user: {
      name: 'Alex Rodriguez',
      avatar: '/placeholder-avatar.jpg',
      initials: 'AR',
    },
  },
];

const getActivityIcon = (type: ActivityType) => {
  switch (type) {
    case 'message':
      return <MessageSquare className="h-4 w-4" />;
    case 'project':
      return <FileText className="h-4 w-4" />;
    case 'client':
      return <UserPlus className="h-4 w-4" />;
    case 'meeting':
      return <Calendar className="h-4 w-4" />;
    case 'alert':
      return <AlertCircle className="h-4 w-4" />;
  }
};

export function ActivityTimeline() {
  return (
    <ScrollArea className="h-[400px] pr-4">
      <div className="space-y-6 py-2">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start">
            <Avatar className="h-8 w-8 mr-3">
              <AvatarImage
                src={activity.user.avatar}
                alt={activity.user.name}
              />
              <AvatarFallback>{activity.user.initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center">
                <p className="text-sm font-medium">{activity.user.name}</p>
                <div className="ml-2 flex h-5 items-center">
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-primary/10">
                    <div className="text-primary">
                      {getActivityIcon(activity.type)}
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {activity.content}
              </p>
              <p className="text-xs text-muted-foreground">
                {activity.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
