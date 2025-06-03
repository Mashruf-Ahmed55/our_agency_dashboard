'use client';

import { AssignTeamMemberForm } from '@/components/clients/assign-team-member-form';
import { ClientForm } from '@/components/clients/client-form';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Mail, MoreHorizontal, Pencil, Trash2, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  assignedTo?: {
    id: string;
    name: string;
    avatar?: string;
    initials: string;
  };
  projectTitle: string;
  status: 'active' | 'completed' | 'on-hold' | 'pending';
  lastContact: string;
  avatar?: string;
  initials: string;
}

const clients: Client[] = [
  {
    id: '1',
    name: 'Robert Johnson',
    email: 'robert@techcorp.com',
    company: 'TechCorp',
    phone: '(555) 123-4567',
    assignedTo: {
      id: '1',
      name: 'John Doe',
      initials: 'JD',
    },
    projectTitle: 'Website Redesign',
    status: 'active',
    lastContact: '2 days ago',
    initials: 'RJ',
  },
  {
    id: '2',
    name: 'Emily Clark',
    email: 'emily@innovateco.com',
    company: 'InnovateCo',
    phone: '(555) 234-5678',
    assignedTo: {
      id: '2',
      name: 'Sarah Johnson',
      avatar: '/placeholder-avatar.jpg',
      initials: 'SJ',
    },
    projectTitle: 'Mobile App Development',
    status: 'active',
    lastContact: '1 day ago',
    avatar: '/placeholder-avatar.jpg',
    initials: 'EC',
  },
  {
    id: '3',
    name: 'David Wilson',
    email: 'david@globalfirm.com',
    company: 'Global Firm',
    phone: '(555) 345-6789',
    projectTitle: 'E-commerce Platform',
    status: 'on-hold',
    lastContact: '1 week ago',
    initials: 'DW',
  },
  {
    id: '4',
    name: 'Sarah Miller',
    email: 'sarah@digitalagency.com',
    company: 'Digital Agency',
    phone: '(555) 456-7890',
    assignedTo: {
      id: '3',
      name: 'Mike Thompson',
      initials: 'MT',
    },
    projectTitle: 'Brand Identity',
    status: 'completed',
    lastContact: '3 days ago',
    avatar: '/placeholder-avatar.jpg',
    initials: 'SM',
  },
  {
    id: '5',
    name: 'Michael Brown',
    email: 'michael@startupxyz.com',
    company: 'Startup XYZ',
    phone: '(555) 567-8901',
    projectTitle: 'Marketing Website',
    status: 'pending',
    lastContact: '5 days ago',
    initials: 'MB',
  },
  {
    id: '6',
    name: 'Jennifer Lee',
    email: 'jennifer@retailco.com',
    company: 'Retail Co',
    phone: '(555) 678-9012',
    assignedTo: {
      id: '5',
      name: 'Alex Rodriguez',
      avatar: '/placeholder-avatar.jpg',
      initials: 'AR',
    },
    projectTitle: 'E-commerce Store',
    status: 'active',
    lastContact: '2 days ago',
    avatar: '/placeholder-avatar.jpg',
    initials: 'JL',
  },
  {
    id: '7',
    name: 'Thomas White',
    email: 'thomas@healthorg.com',
    company: 'Health Organization',
    phone: '(555) 789-0123',
    projectTitle: 'Healthcare Portal',
    status: 'on-hold',
    lastContact: '1 week ago',
    initials: 'TW',
  },
  {
    id: '8',
    name: 'Jessica Taylor',
    email: 'jessica@edutech.com',
    company: 'EduTech',
    phone: '(555) 890-1234',
    assignedTo: {
      id: '4',
      name: 'Lisa Chen',
      avatar: '/placeholder-avatar.jpg',
      initials: 'LC',
    },
    projectTitle: 'Learning Management System',
    status: 'active',
    lastContact: '3 days ago',
    avatar: '/placeholder-avatar.jpg',
    initials: 'JT',
  },
  {
    id: '9',
    name: 'Daniel Martinez',
    email: 'daniel@fintech.com',
    company: 'FinTech Solutions',
    phone: '(555) 901-2345',
    projectTitle: 'Finance Dashboard',
    status: 'pending',
    lastContact: '6 days ago',
    initials: 'DM',
  },
  {
    id: '10',
    name: 'Amanda Harris',
    email: 'amanda@travelapp.com',
    company: 'Travel App Inc',
    phone: '(555) 012-3456',
    assignedTo: {
      id: '6',
      name: 'Emily Smith',
      initials: 'ES',
    },
    projectTitle: 'Travel Booking Platform',
    status: 'active',
    lastContact: '4 days ago',
    avatar: '/placeholder-avatar.jpg',
    initials: 'AH',
  },
];

const getStatusBadgeVariant = (status: Client['status']) => {
  switch (status) {
    case 'active':
      return 'default';
    case 'completed':
      return 'secondary'; // Map 'completed' to 'secondary'
    case 'on-hold':
      return 'destructive'; // Map 'on-hold' to 'destructive'
    case 'pending':
      return 'outline';
    default:
      return 'outline';
  }
};

export function ClientsTable() {
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [deletingClientId, setDeletingClientId] = useState<string | null>(null);
  const [assigningClient, setAssigningClient] = useState<Client | null>(null);

  const handleDeleteClient = (id: string) => {
    // Logic to delete client would go here
    setDeletingClientId(null);
    console.log(`Deleting client with ID: ${id}`);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead>Last Contact</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={client.avatar} alt={client.name} />
                    <AvatarFallback>{client.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{client.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {client.company}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={getStatusBadgeVariant(client.status)}>
                  {client.status}
                </Badge>
              </TableCell>
              <TableCell>{client.projectTitle}</TableCell>
              <TableCell>
                {client.assignedTo ? (
                  <div className="flex items-center gap-2">
                    <Avatar className="h-7 w-7">
                      <AvatarImage
                        src={client.assignedTo.avatar}
                        alt={client.assignedTo.name}
                      />
                      <AvatarFallback>
                        {client.assignedTo.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{client.assignedTo.name}</span>
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground"
                    onClick={() => setAssigningClient(client)}
                  >
                    <UserPlus className="h-4 w-4 mr-1" />
                    Assign
                  </Button>
                )}
              </TableCell>
              <TableCell>{client.lastContact}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`mailto:${client.email}`}>
                      <Mail className="h-4 w-4" />
                      <span className="sr-only">Email {client.name}</span>
                    </Link>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => setEditingClient(client)}
                      >
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setAssigningClient(client)}
                        disabled={!!client.assignedTo}
                      >
                        <UserPlus className="h-4 w-4 mr-2" />
                        Assign
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => setDeletingClientId(client.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit Client Dialog */}
      <Dialog
        open={!!editingClient}
        onOpenChange={() => setEditingClient(null)}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Client</DialogTitle>
            <DialogDescription>
              Make changes to the client information.
            </DialogDescription>
          </DialogHeader>
          {editingClient && (
            <ClientForm
              client={editingClient}
              onSubmit={() => setEditingClient(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deletingClientId}
        onOpenChange={() => setDeletingClientId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the client and all associated data.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() =>
                deletingClientId && handleDeleteClient(deletingClientId)
              }
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Assign Team Member Dialog */}
      <Dialog
        open={!!assigningClient}
        onOpenChange={() => setAssigningClient(null)}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Assign Team Member</DialogTitle>
            <DialogDescription>
              Assign a team member to {assigningClient?.name} from{' '}
              {assigningClient?.company}
            </DialogDescription>
          </DialogHeader>
          {assigningClient && (
            <AssignTeamMemberForm
              clientId={assigningClient.id}
              onSubmit={() => setAssigningClient(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
