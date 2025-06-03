'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import {
  Archive,
  ChevronDown,
  Clock,
  FileText,
  Flag,
  Forward,
  MoreHorizontal,
  Paperclip,
  RefreshCcw,
  Reply,
  Search,
  Send,
  Star,
  Trash2,
  X,
} from 'lucide-react';
import { useState } from 'react';

interface EmailPanelProps {
  type: 'inbox' | 'sent' | 'flagged';
}

interface Email {
  id: string;
  from: {
    name: string;
    email: string;
    avatar?: string;
    initials: string;
  };
  to: {
    name: string;
    email: string;
  };
  subject: string;
  preview: string;
  content: string;
  time: string;
  read: boolean;
  starred: boolean;
  flagged: boolean;
  hasAttachments: boolean;
}

const emails: Email[] = [
  {
    id: '1',
    from: {
      name: 'Robert Johnson',
      email: 'robert@techcorp.com',
      initials: 'RJ',
    },
    to: {
      name: 'Agency Team',
      email: 'team@agency.com',
    },
    subject: 'Website Redesign Feedback',
    preview:
      'I had a chance to review the new designs and I have some feedback...',
    content: `
      <p>Hi Team,</p>
      <p>I had a chance to review the new designs for our website redesign project and I have some feedback.</p>
      <p>Overall, I'm very impressed with the direction. The new homepage layout is much cleaner and I think it will help our conversion rates. I particularly like the new hero section with the animated elements.</p>
      <p>A few points to consider:</p>
      <ol>
        <li>Can we make the call-to-action buttons slightly larger on mobile?</li>
        <li>The font size in the testimonials section seems a bit small</li>
        <li>I'd like to see an alternative color option for the main navigation</li>
      </ol>
      <p>Let me know your thoughts on these points. Looking forward to our meeting next week.</p>
      <p>Best regards,<br>Robert Johnson<br>TechCorp</p>
    `,
    time: '10:32 AM',
    read: false,
    starred: false,
    flagged: true,
    hasAttachments: false,
  },
  {
    id: '2',
    from: {
      name: 'Emily Clark',
      email: 'emily@innovateco.com',
      avatar: '/placeholder-avatar.jpg',
      initials: 'EC',
    },
    to: {
      name: 'Agency Team',
      email: 'team@agency.com',
    },
    subject: 'Mobile App Development Timeline',
    preview:
      'Can we discuss the timeline for the next phase of the mobile app development?',
    content: `
      <p>Hello,</p>
      <p>I wanted to touch base about the timeline for the next phase of our mobile app development project.</p>
      <p>According to our initial project plan, we should be starting the beta testing phase next month. Is that still on track? Our marketing team is preparing the launch campaign and we need to confirm dates.</p>
      <p>Also, do you have the latest user flow diagrams for the checkout process? I'd like to review those before our next meeting.</p>
      <p>Thanks,<br>Emily</p>
    `,
    time: 'Yesterday',
    read: true,
    starred: true,
    flagged: false,
    hasAttachments: true,
  },
  {
    id: '3',
    from: {
      name: 'David Wilson',
      email: 'david@globalfirm.com',
      initials: 'DW',
    },
    to: {
      name: 'Agency Team',
      email: 'team@agency.com',
    },
    subject: 'E-commerce Platform Issues',
    preview:
      "We're experiencing some issues with the checkout process on the e-commerce platform...",
    content: `
      <p>Hi team,</p>
      <p>We're experiencing some issues with the checkout process on the e-commerce platform you recently delivered.</p>
      <p>Specifically, customers are reporting that when they try to use saved payment methods, they sometimes get an error message. This seems to happen intermittently, which makes it harder to debug.</p>
      <p>Could someone from your team look into this as soon as possible? This is affecting our conversion rates and we're losing sales.</p>
      <p>I've attached a screen recording showing the issue.</p>
      <p>Thanks for your help,<br>David Wilson<br>Global Firm</p>
    `,
    time: '2 days ago',
    read: true,
    starred: false,
    flagged: true,
    hasAttachments: true,
  },
  {
    id: '4',
    from: {
      name: 'Sarah Miller',
      email: 'sarah@digitalagency.com',
      avatar: '/placeholder-avatar.jpg',
      initials: 'SM',
    },
    to: {
      name: 'Agency Team',
      email: 'team@agency.com',
    },
    subject: 'Partnership Opportunity',
    preview:
      'I wanted to discuss a potential partnership opportunity between our agencies...',
    content: `
      <p>Hello,</p>
      <p>I'm reaching out because I wanted to discuss a potential partnership opportunity between our agencies.</p>
      <p>Digital Agency has been expanding our client base in the healthcare sector, and I noticed that your team has strong expertise in web accessibility and compliance - something that's crucial for our healthcare clients.</p>
      <p>I think there could be mutual benefit in teaming up on some projects. We could bring our healthcare industry knowledge, and your team could lead the technical implementation with a focus on accessibility.</p>
      <p>Would you be open to scheduling a call to discuss this further?</p>
      <p>Best regards,<br>Sarah Miller<br>Digital Agency</p>
    `,
    time: '3 days ago',
    read: true,
    starred: false,
    flagged: false,
    hasAttachments: false,
  },
  {
    id: '5',
    from: {
      name: 'Michael Brown',
      email: 'michael@startupxyz.com',
      initials: 'MB',
    },
    to: {
      name: 'Agency Team',
      email: 'team@agency.com',
    },
    subject: 'Marketing Website Revisions',
    preview:
      "Following our meeting yesterday, I've compiled a list of revisions for the marketing website...",
    content: `
      <p>Hi team,</p>
      <p>Following our meeting yesterday, I've compiled a list of revisions for the marketing website:</p>
      <ol>
        <li>Update the team section with our new hires</li>
        <li>Replace the hero image with the new product photo</li>
        <li>Add the investor logos to the footer</li>
        <li>Update pricing table to reflect new subscription tiers</li>
        <li>Fix the mobile menu bug we discussed</li>
      </ol>
      <p>What's the timeline for implementing these changes? We're planning a PR push next month and need the site updated before then.</p>
      <p>Thanks,<br>Michael</p>
    `,
    time: '1 week ago',
    read: true,
    starred: true,
    flagged: false,
    hasAttachments: false,
  },
];

export function EmailPanel({ type }: EmailPanelProps) {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [composing, setComposing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter emails based on the panel type
  const filteredEmails = emails
    .filter((email) => {
      if (type === 'flagged') return email.flagged;
      return type === 'inbox';
    })
    .filter((email) => {
      if (!searchQuery) return true;
      return (
        email.from.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.preview.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

  return (
    <div className="flex h-[calc(100vh-13rem)] border-t">
      {/* Email List */}
      <div
        className={`w-full md:w-1/3 lg:w-1/4 border-r flex flex-col ${
          selectedEmail ? 'hidden md:flex' : ''
        }`}
      >
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search emails..."
              className="pl-9 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="p-2 border-b flex justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs"
            onClick={() => setComposing(true)}
          >
            <RefreshCcw className="h-3.5 w-3.5 mr-1" />
            Refresh
          </Button>
          <Button
            variant="default"
            size="sm"
            className="text-xs"
            onClick={() => setComposing(true)}
          >
            <span>Compose</span>
          </Button>
        </div>
        <ScrollArea className="flex-1">
          <div className="divide-y">
            {filteredEmails.map((email) => (
              <div
                key={email.id}
                className={`p-3 cursor-pointer ${
                  email.read ? 'bg-background' : 'bg-primary/5 font-medium'
                } hover:bg-muted/50`}
                onClick={() => setSelectedEmail(email)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={email.from.avatar}
                        alt={email.from.name}
                      />
                      <AvatarFallback>{email.from.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{email.from.name}</p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {email.time}
                  </div>
                </div>
                <div className="mt-1">
                  <p className="text-sm font-medium">{email.subject}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
                    {email.preview}
                  </p>
                </div>
                <div className="mt-2 flex items-center">
                  {email.flagged && (
                    <Flag className="h-3.5 w-3.5 text-destructive mr-1" />
                  )}
                  {email.starred && (
                    <Star
                      className="h-3.5 w-3.5 text-yellow-500 mr-1\"
                      fill="currentColor"
                    />
                  )}
                  {email.hasAttachments && (
                    <Paperclip className="h-3.5 w-3.5 text-muted-foreground" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Email Detail */}
      {selectedEmail ? (
        <div
          className={`flex-1 flex flex-col ${
            selectedEmail ? 'block' : 'hidden md:block'
          }`}
        >
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="mr-2 md:hidden"
                onClick={() => setSelectedEmail(null)}
              >
                <ChevronDown className="h-4 w-4 rotate-90" />
              </Button>
              <h3 className="font-medium">{selectedEmail.subject}</h3>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="icon">
                <Reply className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Forward className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Archive className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={selectedEmail.from.avatar}
                      alt={selectedEmail.from.name}
                    />
                    <AvatarFallback>
                      {selectedEmail.from.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{selectedEmail.from.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedEmail.from.email}
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <span>To: {selectedEmail.to.name}</span>
                      <span className="mx-2">•</span>
                      <span>{selectedEmail.time}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      const updatedEmails = emails.map((email) =>
                        email.id === selectedEmail.id
                          ? { ...email, starred: !email.starred }
                          : email
                      );
                      // In a real app, this would update the state or call an API
                      console.log('Updated emails:', updatedEmails);
                      setSelectedEmail({
                        ...selectedEmail,
                        starred: !selectedEmail.starred,
                      });
                    }}
                  >
                    <Star
                      className={`h-4 w-4 ${
                        selectedEmail.starred
                          ? 'text-yellow-500 fill-yellow-500'
                          : 'text-muted-foreground'
                      }`}
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      const updatedEmails = emails.map((email) =>
                        email.id === selectedEmail.id
                          ? { ...email, flagged: !email.flagged }
                          : email
                      );
                      // In a real app, this would update the state or call an API
                      console.log('Updated emails:', updatedEmails);
                      setSelectedEmail({
                        ...selectedEmail,
                        flagged: !selectedEmail.flagged,
                      });
                    }}
                  >
                    <Flag
                      className={`h-4 w-4 ${
                        selectedEmail.flagged
                          ? 'text-destructive'
                          : 'text-muted-foreground'
                      }`}
                    />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Separator />

              <div
                className="prose prose-sm dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedEmail.content }}
              />

              {selectedEmail.hasAttachments && (
                <>
                  <Separator />
                  <div>
                    <h4 className="text-sm font-medium mb-2">Attachments</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div className="border rounded-md p-3 flex items-center">
                        <div className="bg-muted h-10 w-10 rounded flex items-center justify-center mr-3">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {selectedEmail.id === '2'
                              ? 'app_flow_diagrams.pdf'
                              : 'checkout_error.mp4'}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {selectedEmail.id === '2' ? '2.4 MB' : '8.7 MB'}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <Separator />

              <div>
                <h4 className="text-sm font-medium mb-2">Reply</h4>
                <Textarea
                  placeholder="Type your reply here..."
                  className="min-h-[100px]"
                />
                <div className="flex justify-between mt-2">
                  <div className="flex items-center">
                    <Button variant="ghost" size="icon">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Clock className="h-4 w-4 mr-2" />
                      Schedule
                    </Button>
                    <Button size="sm">
                      <Send className="h-4 w-4 mr-2" />
                      Send
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      ) : (
        <div className="flex-1 hidden md:flex items-center justify-center">
          <div className="text-center">
            <h3 className="font-medium text-lg">No Email Selected</h3>
            <p className="text-muted-foreground">
              Select an email from the list to view it here
            </p>
          </div>
        </div>
      )}

      {/* Compose Email Dialog */}
      <Dialog open={composing} onOpenChange={setComposing}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>New Message</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-sm font-medium text-right">To:</label>
              <Input
                className="col-span-3"
                placeholder="recipient@example.com"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-sm font-medium text-right">Subject:</label>
              <Input className="col-span-3" placeholder="Email subject" />
            </div>
            <Textarea
              placeholder="Compose your message here..."
              className="min-h-[200px]"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setComposing(false)}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button>
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
