'use client';

import { useSidebar } from '@/context/sidebar-context';
import { useEffect } from 'react';
import { Header } from './header';
import { Sidebar } from './sidebar';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isOpen, close } = useSidebar();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        close();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [close]);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
