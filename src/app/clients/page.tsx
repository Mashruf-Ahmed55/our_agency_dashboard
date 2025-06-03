'use client';

import { ClientsPage } from '@/components/clients/clients-page';
import { DashboardLayout } from '@/components/layout/dashboard-layout';

export default function Clients() {
  return (
    <DashboardLayout>
      <ClientsPage />
    </DashboardLayout>
  );
}
