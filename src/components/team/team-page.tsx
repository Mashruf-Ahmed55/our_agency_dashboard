'use client';

import { SkillsMatrix } from '@/components/team/skills-matrix';
import { TeamGrid } from '@/components/team/team-grid';
import { TeamList } from '@/components/team/team-list';
import { TeamWorkload } from '@/components/team/team-workload';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart2, Grid, LineChart, List, Plus } from 'lucide-react';

export function TeamPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team</h1>
          <p className="text-muted-foreground">
            Manage your team members, skills, and workload
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Team Member
        </Button>
      </div>

      <Tabs defaultValue="grid" className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="grid" className="flex items-center">
              <Grid className="h-4 w-4 mr-2" />
              Grid
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center">
              <List className="h-4 w-4 mr-2" />
              List
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center">
              <BarChart2 className="h-4 w-4 mr-2" />
              Skills
            </TabsTrigger>
            <TabsTrigger value="workload" className="flex items-center">
              <LineChart className="h-4 w-4 mr-2" />
              Workload
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="grid" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Team Members</CardTitle>
              <CardDescription>
                View all team members in a grid layout
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TeamGrid />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Team Members</CardTitle>
              <CardDescription>
                View all team members in a list layout
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TeamList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Skills Matrix</CardTitle>
              <CardDescription>
                Review team skills and competencies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SkillsMatrix />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workload" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Team Workload</CardTitle>
              <CardDescription>
                Track team capacity and project assignments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TeamWorkload />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
