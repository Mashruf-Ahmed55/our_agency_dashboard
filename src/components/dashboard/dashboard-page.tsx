'use client';

import { ActivityTimeline } from '@/components/dashboard/activity-timeline';
import { RecentClients } from '@/components/dashboard/recent-clients';
import { StatisticCard } from '@/components/dashboard/statistic-card';
import { UpcomingMeetings } from '@/components/dashboard/upcoming-meetings';
import { WorkloadOverview } from '@/components/dashboard/workload-overview';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Briefcase, Clock, Mail, Users } from 'lucide-react';

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your agency.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatisticCard
          title="Total Clients"
          value="24"
          description="+2 this month"
          icon={<Users className="h-5 w-5" />}
          trend="up"
          trendValue="8.2%"
        />
        <StatisticCard
          title="Active Projects"
          value="18"
          description="3 due this week"
          icon={<Briefcase className="h-5 w-5" />}
          trend="up"
          trendValue="12.5%"
        />
        <StatisticCard
          title="Emails Sent"
          value="342"
          description="Last 30 days"
          icon={<Mail className="h-5 w-5" />}
          trend="down"
          trendValue="3.1%"
        />
        <StatisticCard
          title="Avg. Response Time"
          value="2.4h"
          description="Last 7 days"
          icon={<Clock className="h-5 w-5" />}
          trend="up"
          trendValue="18.4%"
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Workload Overview</CardTitle>
                <CardDescription>
                  Team member assignments and capacity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <WorkloadOverview />
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest updates across your agency
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ActivityTimeline />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Recent Clients</CardTitle>
                <CardDescription>Latest client interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentClients />
              </CardContent>
            </Card>
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Upcoming Meetings</CardTitle>
                <CardDescription>Scheduled for the next 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <UpcomingMeetings />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent
          value="analytics"
          className="h-[400px] flex items-center justify-center text-muted-foreground"
        >
          Analytics content coming soon
        </TabsContent>
        <TabsContent
          value="reports"
          className="h-[400px] flex items-center justify-center text-muted-foreground"
        >
          Reports content coming soon
        </TabsContent>
        <TabsContent
          value="notifications"
          className="h-[400px] flex items-center justify-center text-muted-foreground"
        >
          Notifications settings coming soon
        </TabsContent>
      </Tabs>
    </div>
  );
}
