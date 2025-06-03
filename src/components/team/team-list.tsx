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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { teamMembers } from '@/lib/team-data';
import { Mail, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

export function TeamList() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Skills</TableHead>
          <TableHead>Projects</TableHead>
          <TableHead>Availability</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {teamMembers.map((member) => (
          <TableRow key={member.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{member.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {member.email}
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell>{member.role}</TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {member.skills.slice(0, 3).map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
                {member.skills.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{member.skills.length - 3}
                  </Badge>
                )}
              </div>
            </TableCell>
            <TableCell>{member.activeProjects}</TableCell>
            <TableCell>
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
                <span className="capitalize">{member.availability}</span>
              </div>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-1">
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`mailto:${member.email}`}>
                    <Mail className="h-4 w-4" />
                    <span className="sr-only">Email {member.name}</span>
                  </Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>Edit Details</DropdownMenuItem>
                    <DropdownMenuItem>View Projects</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Add Note</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
