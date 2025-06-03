'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bell, Calendar, MessageSquare, Users } from 'lucide-react';
import { useState } from 'react';

type Notification = {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'message' | 'meeting' | 'client' | 'system';
};

const initialNotifications: Notification[] = [
  {
    id: '1',
    title: 'New message from Sarah',
    description: 'Re: Website project updates',
    time: '10 min ago',
    read: false,
    type: 'message',
  },
  {
    id: '2',
    title: 'Meeting reminder',
    description: 'Team standup in 30 minutes',
    time: '25 min ago',
    read: false,
    type: 'meeting',
  },
  {
    id: '3',
    title: 'New client added',
    description: 'TechCorp was added by Michael',
    time: '1 hour ago',
    read: false,
    type: 'client',
  },
  {
    id: '4',
    title: 'System update completed',
    description: 'All systems running normally',
    time: '2 hours ago',
    read: true,
    type: 'system',
  },
  {
    id: '5',
    title: 'Project deadline updated',
    description: 'E-commerce project due date extended',
    time: '1 day ago',
    read: true,
    type: 'system',
  },
];

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'message':
      return <MessageSquare className="h-4 w-4" />;
    case 'meeting':
      return <Calendar className="h-4 w-4" />;
    case 'client':
      return <Users className="h-4 w-4" />;
    case 'system':
      return <Bell className="h-4 w-4" />;
  }
};

export function NotificationsList() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between p-2">
        <h3 className="font-semibold">Notifications</h3>
        <Button variant="ghost" size="sm" onClick={markAllAsRead}>
          Mark all as read
        </Button>
      </div>
      <ScrollArea className="h-[300px]">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[200px] text-muted-foreground">
            <Bell className="h-8 w-8 mb-2" />
            <p>No notifications</p>
          </div>
        ) : (
          <div className="flex flex-col">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 border-b border-border hover:bg-muted/50 cursor-pointer transition-colors ${
                  !notification.read ? 'bg-muted/20' : ''
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 mr-3 text-primary`}
                  >
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p
                      className={`text-sm font-medium leading-none ${
                        !notification.read ? 'text-primary' : ''
                      }`}
                    >
                      {notification.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {notification.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {notification.time}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="ml-2 h-2 w-2 rounded-full bg-primary" />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
      <div className="p-2 border-t border-border">
        <Button variant="outline" size="sm" className="w-full">
          View all
        </Button>
      </div>
    </div>
  );
}
