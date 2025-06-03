'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Mail, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  projectTitle: string;
  status: 'active' | 'completed' | 'on-hold' | 'pending';
  avatar?: string;
  initials: string;
}

const clients: Client[] = [
  {
    id: '1',
    name: 'Robert Johnson',
    email: 'robert@techcorp.com',
    company: 'TechCorp',
    projectTitle: 'Website Redesign',
    status: 'active',
    initials: 'RJ',
  },
  {
    id: '2',
    name: 'Emily Clark',
    email: 'emily@innovateco.com',
    company: 'InnovateCo',
    projectTitle: 'Mobile App Development',
    status: 'active',
    avatar: '/placeholder-avatar.jpg',
    initials: 'EC',
  },
  {
    id: '3',
    name: 'David Wilson',
    email: 'david@globalfirm.com',
    company: 'Global Firm',
    projectTitle: 'E-commerce Platform',
    status: 'on-hold',
    initials: 'DW',
  },
  {
    id: '4',
    name: 'Sarah Miller',
    email: 'sarah@digitalagency.com',
    company: 'Digital Agency',
    projectTitle: 'Brand Identity',
    status: 'completed',
    avatar: '/placeholder-avatar.jpg',
    initials: 'SM',
  },
  {
    id: '5',
    name: 'Michael Brown',
    email: 'michael@startupxyz.com',
    company: 'Startup XYZ',
    projectTitle: 'Marketing Website',
    status: 'pending',
    initials: 'MB',
  },
];

const getStatusBadgeVariant = (status: Client['status']) => {
  switch (status) {
    case 'active':
      return 'default';
    case 'completed':
      return 'success';
    case 'on-hold':
      return 'warning';
    case 'pending':
      return 'secondary';
    default:
      return 'outline';
  }
};

export function RecentClients() {
  return (
    <ScrollArea className="h-[400px] pr-4">
      <div className="space-y-4">
        {clients.map((client) => (
          <div
            key={client.id}
            className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={client.avatar} alt={client.name} />
                <AvatarFallback>{client.initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">{client.name}</p>
                <p className="text-xs text-muted-foreground">
                  {client.company}
                </p>
                <div className="flex items-center mt-1">
                  <Badge
                    variant={getStatusBadgeVariant(client.status)}
                    className="text-[10px] px-1 py-0 h-4"
                  >
                    {client.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground ml-2">
                    {client.projectTitle}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <Button variant="ghost" size="icon" asChild>
                <Link href={`mailto:${client.email}`}>
                  <Mail className="h-4 w-4" />
                  <span className="sr-only">Email {client.name}</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
