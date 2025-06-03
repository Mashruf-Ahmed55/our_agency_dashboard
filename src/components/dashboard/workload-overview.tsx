'use client';

import { useTheme } from 'next-themes';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface TeamMemberWorkload {
  name: string;
  projects: number;
  capacity: number;
}

const data: TeamMemberWorkload[] = [
  { name: 'John D.', projects: 5, capacity: 6 },
  { name: 'Sarah J.', projects: 4, capacity: 5 },
  { name: 'Mike T.', projects: 6, capacity: 6 },
  { name: 'Lisa C.', projects: 3, capacity: 5 },
  { name: 'Alex R.', projects: 2, capacity: 4 },
  { name: 'Emily S.', projects: 5, capacity: 5 },
];

const getBarColor = (value: number, capacity: number) => {
  const ratio = value / capacity;
  if (ratio >= 0.9) return 'hsl(var(--destructive))';
  if (ratio >= 0.7) return 'hsl(var(--chart-4))';
  return 'hsl(var(--chart-2))';
};

export function WorkloadOverview() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card p-3 rounded-md shadow-md border border-border">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            Projects: <span className="font-medium">{data.projects}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Capacity: <span className="font-medium">{data.capacity}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Utilization:{' '}
            <span className="font-medium">
              {Math.round((data.projects / data.capacity) * 100)}%
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="hsl(var(--border))"
          />
          <XAxis
            dataKey="name"
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
            axisLine={{ stroke: 'hsl(var(--border))' }}
            tickLine={false}
          />
          <YAxis
            domain={[0, 'dataMax + 1']}
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
            axisLine={{ stroke: 'hsl(var(--border))' }}
            tickLine={false}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: 'hsl(var(--muted))' }}
          />
          <Bar dataKey="projects" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={getBarColor(entry.projects, entry.capacity)}
              />
            ))}
            <LabelList
              dataKey="projects"
              position="top"
              fill="hsl(var(--foreground))"
              formatter={(value: number) => `${value}`}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
