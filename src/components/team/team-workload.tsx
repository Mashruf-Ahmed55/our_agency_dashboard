'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { teamMembers } from '@/lib/team-data';
import { useTheme } from 'next-themes';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

// Generate workload data for each team member
const workloadData = teamMembers.map((member) => {
  // For this demo, we'll derive the data from the member's active projects
  const activeProjects = member.activeProjects;
  const capacity =
    member.availability === 'high'
      ? 6
      : member.availability === 'medium'
      ? 5
      : 4;

  return {
    name: member.name.split(' ')[0], // Just first name for the chart
    fullName: member.name,
    id: member.id,
    avatar: member.avatar,
    initials: member.initials,
    activeProjects,
    capacity,
    utilizationRate: Math.round((activeProjects / capacity) * 100),
  };
});

// Sort by utilization rate (most utilized first)
workloadData.sort((a, b) => b.utilizationRate - a.utilizationRate);

export function TeamWorkload() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const getBarColor = (utilizationRate: number) => {
    if (utilizationRate >= 90) return 'hsl(var(--destructive))';
    if (utilizationRate >= 70) return 'hsl(var(--chart-4))';
    return 'hsl(var(--chart-2))';
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card p-3 rounded-md shadow-md border border-border">
          <p className="font-medium">{data.fullName}</p>
          <p className="text-sm text-muted-foreground">
            Projects: <span className="font-medium">{data.activeProjects}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Capacity: <span className="font-medium">{data.capacity}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Utilization:{' '}
            <span className="font-medium">{data.utilizationRate}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={workloadData}
            margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
            layout="vertical"
          >
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={true}
              vertical={false}
              stroke="hsl(var(--border))"
            />
            <XAxis
              type="number"
              domain={[0, 'dataMax']}
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
              tickLine={false}
            />
            <YAxis
              dataKey="name"
              type="category"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
              tickLine={false}
              width={60}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: 'hsl(var(--muted))' }}
            />
            <Bar
              dataKey="activeProjects"
              name="Active Projects"
              radius={[0, 4, 4, 0]}
              label={{
                position: 'right',
                fill: 'hsl(var(--foreground))',
                formatter: (value: number) => `${value}`,
              }}
            >
              {workloadData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getBarColor(entry.utilizationRate)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {workloadData.map((member) => (
          <Card
            key={member.id}
            className={`${
              member.utilizationRate >= 90
                ? 'border-destructive/50'
                : member.utilizationRate >= 70
                ? 'border-yellow-500/50'
                : 'border-border'
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={member.avatar} alt={member.fullName} />
                    <AvatarFallback>{member.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{member.fullName}</div>
                    <div className="flex items-center mt-1">
                      <Badge
                        variant={
                          member.utilizationRate >= 90
                            ? 'destructive'
                            : member.utilizationRate >= 70
                            ? 'default'
                            : 'secondary'
                        }
                        className="text-xs"
                      >
                        {member.utilizationRate}% Utilized
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-semibold">
                    {member.activeProjects}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    of {member.capacity} capacity
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Workload</span>
                  <span className="text-sm text-muted-foreground">
                    {member.utilizationRate}%
                  </span>
                </div>
                <Progress
                  value={member.utilizationRate}
                  className={`h-2 ${
                    member.utilizationRate >= 90
                      ? 'bg-destructive/20 [&>div]:bg-destructive'
                      : member.utilizationRate >= 70
                      ? 'bg-yellow-500/20 [&>div]:bg-yellow-500'
                      : 'bg-primary/20 [&>div]:bg-primary'
                  }`}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
