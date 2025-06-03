'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useSidebar } from '@/context/sidebar-context';
import { cn } from '@/lib/utils';
import {
  Calendar,
  Code,
  LayoutDashboard,
  Menu,
  MessageSquare,
  Settings,
  UserCircle,
  Users,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sidebarLinks = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Clients', href: '/clients', icon: Users },
  { name: 'Team', href: '/team', icon: UserCircle },
  { name: 'Messages', href: '/messages', icon: MessageSquare },
  { name: 'Meetings', href: '/meetings', icon: Calendar },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isOpen, toggle } = useSidebar();

  return (
    <>
      <div className="md:hidden fixed z-50 top-4 left-4">
        <Button
          variant="outline"
          size="icon"
          onClick={toggle}
          aria-label="Toggle Menu"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>
      <div
        className={cn(
          'fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden',
          isOpen ? 'block' : 'hidden'
        )}
        onClick={toggle}
      />
      <aside
        className={cn(
          'fixed z-50 inset-y-0 left-0 w-64 bg-card border-r border-border transition-transform duration-300 ease-in-out transform md:translate-x-0 md:relative md:z-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between p-4 h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Code className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg">DevAgency</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            className="md:hidden"
            aria-label="Close Menu"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <Separator />
        <ScrollArea className="h-[calc(100vh-4rem)] pb-10">
          <nav className="p-2">
            <div className="space-y-1">
              {sidebarLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'flex items-center py-2 px-3 rounded-md text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                    )}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </nav>
        </ScrollArea>
      </aside>
    </>
  );
}
