'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Check,
  Clock,
  Mail,
  MessageSquare,
  Search,
  SlidersHorizontal,
} from 'lucide-react';
import { useState } from 'react';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: 'new' | 'in-progress' | 'handled';
}

const contactSubmissions: ContactSubmission[] = [
  {
    id: '1',
    name: 'Thomas Reed',
    email: 'thomas@example.com',
    subject: 'Website development inquiry',
    message:
      "Hello, I'm interested in having a new website developed for my small business. We currently have an outdated site that needs a complete redesign with modern features. Could you provide information about your services and pricing? I'm looking for something with e-commerce capabilities and a content management system. Thanks!",
    date: '2 hours ago',
    status: 'new',
  },
  {
    id: '2',
    name: 'Jessica White',
    email: 'jessica@example.com',
    subject: 'Mobile app consultation',
    message:
      "Hi there, I have an idea for a mobile application and I'd like to schedule a consultation to discuss the feasibility and potential development process. The app would be for the fitness industry, helping users track their workouts and nutrition. I'm looking for guidance on features, development timeline, and budget considerations. When would you be available for a call?",
    date: '5 hours ago',
    status: 'in-progress',
  },
  {
    id: '3',
    name: 'Mark Johnson',
    email: 'mark@example.com',
    subject: 'SEO services question',
    message:
      "I'm reaching out to inquire about your SEO services. Our company has seen a decline in search rankings over the past few months, and we're looking for expert help to diagnose and address the issues. Could you share information about your SEO packages and approach? Also, do you offer content marketing services as part of your SEO strategy? Looking forward to your response.",
    date: '1 day ago',
    status: 'handled',
  },
  {
    id: '4',
    name: 'Laura Chen',
    email: 'laura@example.com',
    subject: 'Website maintenance plan',
    message:
      "Hello, We recently had our website redesigned by another agency, but they don't offer ongoing maintenance. I'm looking for a reliable team to handle regular updates, security patches, and occasional content updates. Do you offer website maintenance plans? If so, what are your rates and what services are included? Our site is built on WordPress with WooCommerce.",
    date: '2 days ago',
    status: 'new',
  },
  {
    id: '5',
    name: 'Daniel Brown',
    email: 'daniel@example.com',
    subject: 'Brand identity project',
    message:
      "I'm starting a new business in the sustainable home goods space and need complete brand identity development. This would include logo design, color palette, typography, and basic brand guidelines. I have some initial ideas and competitors I admire, but I'm looking for a professional touch to make my brand stand out. What would be your process for a project like this, and what information would you need from me to get started?",
    date: '3 days ago',
    status: 'in-progress',
  },
  {
    id: '6',
    name: 'Sophia Rodriguez',
    email: 'sophia@example.com',
    subject: 'Social media management',
    message:
      "Our company is looking to outsource our social media management. We're active on Instagram, Facebook, and LinkedIn, but we're not seeing the engagement or growth we'd like. We're looking for a team that can create a content strategy, design graphics, write copy, and manage posting and community engagement. Could you provide information about your social media management services and some examples of success you've had with similar clients?",
    date: '4 days ago',
    status: 'handled',
  },
  {
    id: '7',
    name: 'James Wilson',
    email: 'james@example.com',
    subject: 'Website performance issues',
    message:
      "We're experiencing significant performance issues with our website. Pages are loading slowly, especially on mobile devices, and we're concerned this is affecting our conversion rates. We need someone to audit our site, identify the issues, and implement solutions. The site is built on Shopify. How soon could you look at this, and what would be your approach to diagnosing and fixing performance problems?",
    date: '5 days ago',
    status: 'new',
  },
];

const getStatusBadge = (status: ContactSubmission['status']) => {
  switch (status) {
    case 'new':
      return <Badge>New</Badge>;
    case 'in-progress':
      return <Badge variant="secondary">In Progress</Badge>;
    case 'handled':
      return <Badge variant="outline">Handled</Badge>;
    default:
      return null;
  }
};

export function ContactSubmissions() {
  const [selectedSubmission, setSelectedSubmission] =
    useState<ContactSubmission | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSubmissions = contactSubmissions.filter((submission) => {
    // Apply status filter
    if (statusFilter !== 'all' && submission.status !== statusFilter) {
      return false;
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        submission.name.toLowerCase().includes(query) ||
        submission.email.toLowerCase().includes(query) ||
        submission.subject.toLowerCase().includes(query) ||
        submission.message.toLowerCase().includes(query)
      );
    }

    return true;
  });

  return (
    <>
      <div className="p-4 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search submissions..."
            className="pl-9 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select
            defaultValue="all"
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="handled">Handled</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
            <span className="sr-only">More filters</span>
          </Button>
        </div>
      </div>

      <div className="border-t">
        <ScrollArea className="h-[calc(100vh-18rem)]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubmissions.map((submission) => (
                <TableRow
                  key={submission.id}
                  className={submission.status === 'new' ? 'bg-primary/5' : ''}
                >
                  <TableCell>
                    <div>
                      <div className="font-medium">{submission.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {submission.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{submission.subject}</TableCell>
                  <TableCell>{submission.date}</TableCell>
                  <TableCell>{getStatusBadge(submission.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" asChild>
                        <a href={`mailto:${submission.email}`}>
                          <Mail className="h-4 w-4" />
                          <span className="sr-only">
                            Email {submission.name}
                          </span>
                        </a>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedSubmission(submission)}
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span className="sr-only">View message</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>

      {/* Submission Detail Dialog */}
      <Dialog
        open={!!selectedSubmission}
        onOpenChange={() => setSelectedSubmission(null)}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedSubmission?.subject}</DialogTitle>
            <DialogDescription>
              Contact form submission from {selectedSubmission?.name}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <div>
                <span className="text-muted-foreground">From:</span>{' '}
                <span className="font-medium">{selectedSubmission?.name}</span>{' '}
                <span className="text-muted-foreground">
                  &lt;{selectedSubmission?.email}&gt;
                </span>
              </div>
              <div className="text-muted-foreground">
                {selectedSubmission?.date}
              </div>
            </div>

            <Separator />

            <div className="text-sm">{selectedSubmission?.message}</div>

            <Separator />

            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                {getStatusBadge(selectedSubmission?.status || 'new')}
                <span className="text-sm text-muted-foreground">
                  {selectedSubmission?.status === 'new'
                    ? 'New submission'
                    : selectedSubmission?.status === 'in-progress'
                    ? 'In progress'
                    : 'Handled'}
                </span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <a href={`mailto:${selectedSubmission?.email}`}>
                    <Mail className="h-4 w-4 mr-2" />
                    Reply by Email
                  </a>
                </Button>
                <Button size="sm">
                  {selectedSubmission?.status === 'handled' ? (
                    <>
                      <Clock className="h-4 w-4 mr-2" />
                      Reopen
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Mark as Handled
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
