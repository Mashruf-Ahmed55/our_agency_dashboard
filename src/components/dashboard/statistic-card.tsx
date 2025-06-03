'use client';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';

interface StatisticCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

export function StatisticCard({
  title,
  value,
  description,
  icon,
  trend,
  trendValue,
}: StatisticCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <div className="text-primary">{icon}</div>
          </div>
          {trend && trendValue && (
            <div
              className={cn(
                'flex items-center text-xs font-medium',
                trend === 'up'
                  ? 'text-green-500'
                  : trend === 'down'
                  ? 'text-red-500'
                  : 'text-muted-foreground'
              )}
            >
              {trend === 'up' ? (
                <ArrowUpIcon className="mr-1 h-3 w-3" />
              ) : trend === 'down' ? (
                <ArrowDownIcon className="mr-1 h-3 w-3" />
              ) : null}
              {trendValue}
            </div>
          )}
        </div>
        <div className="mt-3">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <div className="mt-1 flex items-baseline">
            <p className="text-2xl font-semibold">{value}</p>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
