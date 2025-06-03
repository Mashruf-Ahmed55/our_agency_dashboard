'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { MeetingsPage } from '@/components/meetings/meetings-page';

export default function Meetings() {
  return (
    <DashboardLayout>
      <MeetingsPage />
    </DashboardLayout>
  );
}
