"use client";

import React from 'react';
// import Image from "next/image";
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { ThemeToggleButton } from '@/components/theme-toggle';
import { Users, Settings } from 'lucide-react';
import Link from 'next/link';
import NotificationDropdown from '../header/NotificationDropdown';

interface DashboardHeaderProps {
  title: string;
  onMenuToggle: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function DashboardHeader({ title, onMenuToggle }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-xl font-semibold">{title}</h1>
        
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            className="flex items-center gap-2 px-3 py-2 h-auto"
          >
            <span className="hidden md:inline">GLORY TO GOD LTD</span>
          </Button>
          <NotificationDropdown />

          <ThemeToggleButton />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt="User"
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-70 p-5 dark:bg-slate-800"
              align="end"
              forceMount
            >
              <DropdownMenuItem>
                <div className='mb-4'>
                  <p className='mb-2'>Rubanga Kene Solomon</p>
                  <span className='text-slate-800 dark:text-zinc-300'>rubangakene@gmail.com</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Users className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/login/">Logout</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
      </div>
    </header>
  );
}