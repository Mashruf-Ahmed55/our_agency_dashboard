'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { teamMembers } from '@/lib/team-data';
import { Briefcase, Mail, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

export function TeamGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {teamMembers.map((member) => (
        <div
          key={member.id}
          className="flex flex-col p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
        >
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>{member.initials}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-base">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={`mailto:${member.email}`}>Send Email</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>View Profile</DropdownMenuItem>
                <DropdownMenuItem>Edit Details</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center text-sm">
              <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-muted-foreground">{member.email}</span>
            </div>
            <div className="flex items-center text-sm">
              <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-muted-foreground">
                {member.activeProjects} active projects
              </span>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-xs font-medium mb-2">Skills</p>
            <div className="flex flex-wrap gap-1">
              {member.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-4 flex justify-between items-center">
            <div className="flex items-center">
              <div
                className={`h-2.5 w-2.5 rounded-full ${
                  member.availability === 'high'
                    ? 'bg-green-500'
                    : member.availability === 'medium'
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                } mr-2`}
              />
              <span className="text-xs capitalize">
                {member.availability} availability
              </span>
            </div>
            <Button size="sm" variant="outline">
              View Details
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
