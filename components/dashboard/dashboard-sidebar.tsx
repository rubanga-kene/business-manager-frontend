"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

import { Building2, Menu} from "lucide-react";

interface MenuItem {
  title: string;
  url: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ComponentType<any>;
  key: string;
}

interface DashboardSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  menuItems: MenuItem[];
  activeSection: string;
  onSectionChange: (section: string) => void;
  className?: string;
}

export function DashboardSidebar({
  collapsed,
  onToggle,
  menuItems,
  activeSection,
  onSectionChange,
  className,
}: DashboardSidebarProps) {
  return (
    <div
      className={cn(
        "relative flex h-full flex-col border-r bg-background transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      {/* Header */}
      <div className={cn("flex h-16 items-center justify-between border-b px-4", 
      collapsed ? "flex-col justify-center px-2 py-2 space-y-2" : "justify-between px-4")}>
        <div
          className={cn(
            "flex items-center space-x-2",
            collapsed && "justify-center"
          )}
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-purple-600 text-white">
            <Building2 className="size-4" />
          </div>
          {!collapsed && (
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">BizPro</span>
              <span className="truncate text-xs text-muted-foreground">
                Business Manager
              </span>
            </div>
          )}
        </div>
        <Button
          variant="outline"
          // size="icon"
          onClick={onToggle}
          className={cn(
            "flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground ml-2",
            collapsed ? "px-2 py-1.5 h-8 text-xs mb-2" : "px-3 py-2 h-8"
          )}
        >
          <Menu className="h-4 w-4" />
          {/* <span className={collapsed ? "text-xs" : ""}>Menu</span> */}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1 py-2">
          <div className="px-3 py-2">
            <h2
              className={cn(
                "mb-2 text-lg font-semibold tracking-tight",
                collapsed && "sr-only"
              )}
            >
              Navigation
            </h2>
          </div>
          {menuItems.map((item) => {
            const isActive = activeSection === item.key;

            const button = (
              <Button
                key={item.key}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start transition-colors",
                  collapsed ? "px-2" : "px-3",
                  isActive && "bg-blue-500 text-white hover:bg-blue-600"
                )}
                onClick={() => onSectionChange(item.key)}
              >
                <item.icon className={cn("h-4 w-4", !collapsed && "mr-3")} />
                {!collapsed && (
                  <span className="flex-1 text-left">{item.title}</span>
                )}
              </Button>
            );

            return (
              <div key={item.key}>
                {collapsed ? (
                  <TooltipProvider>
                    <Tooltip>
                    <TooltipTrigger asChild>{button}</TooltipTrigger>
                    <TooltipContent side="right">{item.title}</TooltipContent>
                  </Tooltip>
                  </TooltipProvider>
                  
                ) : (
                  button
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t p-3">
        <div className="space-y-1">
          <Button
            variant="ghost"
            className={cn("w-full justify-start", collapsed ? "px-2" : "px-3")}
          >
            <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
              <span className="text-xs font-medium">U</span>
            </div>
            {!collapsed && (
              <div className="ml-3 flex-1 text-left">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-muted-foreground">
                  admin@bizpro.com
                </p>
              </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
