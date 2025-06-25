"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  BarChart3,
  Settings,
  HelpCircle,
  ChevronLeft,
  
  Search,
  
  User,
  Package,
  FileText,
  Calendar,
  MessageSquare,
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  className?: string;
}

const menuItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    badge: null,
  },
  {
    title: 'Users',
    icon: Users,
    href: '/users',
    badge: '12',
  },
  {
    title: 'Products',
    icon: Package,
    href: '/products',
    badge: null,
  },
  {
    title: 'Orders',
    icon: ShoppingCart,
    href: '/orders',
    badge: '3',
  },
  {
    title: 'Analytics',
    icon: BarChart3,
    href: '/analytics',
    badge: null,
  },
  {
    title: 'Reports',
    icon: FileText,
    href: '/reports',
    badge: null,
  },
  {
    title: 'Calendar',
    icon: Calendar,
    href: '/calendar',
    badge: null,
  },
  {
    title: 'Messages',
    icon: MessageSquare,
    href: '/messages',
    badge: '5',
  },
];

const bottomMenuItems = [
  {
    title: 'Settings',
    icon: Settings,
    href: '/settings',
  },
  {
    title: 'Help & Support',
    icon: HelpCircle,
    href: '/help',
  },
];

export function Sidebar({ collapsed, onToggle, className }: SidebarProps) {
  const [activeItem, setActiveItem] = useState('Dashboard');

  return (
    <div
      className={cn(
        'relative flex h-full flex-col border-r bg-background transition-all duration-300 ease-in-out',
        collapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b px-4">
        <div className={cn('flex items-center space-x-2', collapsed && 'justify-center')}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <LayoutDashboard className="h-4 w-4" />
          </div>
          {!collapsed && (
            <span className="text-lg font-semibold">Dashboard</span>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="h-8 w-8"
        >
          <ChevronLeft className={cn('h-4 w-4 transition-transform', collapsed && 'rotate-180')} />
        </Button>
      </div>

      {/* Search */}
      {!collapsed && (
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              className="w-full rounded-md border bg-background px-9 py-2 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Search..."
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1 py-2">
          {menuItems.map((item) => (
            <Button
              key={item.title}
              variant={activeItem === item.title ? 'secondary' : 'ghost'}
              className={cn(
                'w-full justify-start',
                collapsed ? 'px-2' : 'px-3',
                activeItem === item.title && 'bg-secondary'
              )}
              onClick={() => setActiveItem(item.title)}
            >
              <item.icon className={cn('h-4 w-4', !collapsed && 'mr-3')} />
              {!collapsed && (
                <>
                  <span className="flex-1 text-left">{item.title}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="ml-auto">
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Button>
          ))}
        </div>
      </ScrollArea>

      {/* Bottom Menu */}
      <div className="border-t p-3">
        <div className="space-y-1">
          {bottomMenuItems.map((item) => (
            <Button
              key={item.title}
              variant="ghost"
              className={cn(
                'w-full justify-start',
                collapsed ? 'px-2' : 'px-3'
              )}
            >
              <item.icon className={cn('h-4 w-4', !collapsed && 'mr-3')} />
              {!collapsed && <span>{item.title}</span>}
            </Button>
          ))}
        </div>
      </div>

      {/* User Profile */}
      <div className="border-t p-3">
        <Button
          variant="ghost"
          className={cn(
            'w-full justify-start',
            collapsed ? 'px-2' : 'px-3'
          )}
        >
          <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
            <User className="h-4 w-4" />
          </div>
          {!collapsed && (
            <div className="ml-3 flex-1 text-left">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">Admin</p>
            </div>
          )}
        </Button>
      </div>
    </div>
  );
}