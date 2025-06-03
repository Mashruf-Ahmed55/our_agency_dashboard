'use client';

import { ContactSubmissions } from '@/components/messages/contact-submissions';
import { EmailPanel } from '@/components/messages/email-panel';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Flag, Inbox, Send } from 'lucide-react';

export function MessagesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
        <p className="text-muted-foreground">
          Manage client communications and contact form submissions
        </p>
      </div>

      <Tabs defaultValue="inbox" className="space-y-4">
        <TabsList className="flex space-x-2">
          <TabsTrigger value="inbox" className="flex items-center">
            <Inbox className="h-4 w-4 mr-2" />
            Inbox
          </TabsTrigger>
          <TabsTrigger value="sent" className="flex items-center">
            <Send className="h-4 w-4 mr-2" />
            Sent
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Contact Forms
          </TabsTrigger>
          <TabsTrigger value="flagged" className="flex items-center">
            <Flag className="h-4 w-4 mr-2" />
            Flagged
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inbox">
          <Card>
            <CardContent className="p-0">
              <EmailPanel type="inbox" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sent">
          <Card>
            <CardContent className="p-0">
              <EmailPanel type="sent" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardContent className="p-0">
              <ContactSubmissions />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="flagged">
          <Card>
            <CardContent className="p-0">
              <EmailPanel type="flagged" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
