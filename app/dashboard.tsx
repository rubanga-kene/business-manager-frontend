"use client";

import {useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

import {
  BarChart,
  TrendingUp,
  Package,
  Users,
  FileText,
  Settings,
  PieChart,
  
} from "lucide-react";

import DashboardContent from "@/components/dashboard/dashboard-content";
import SalesContent from "@/components/dashboard/sales-content";
import InventoryContent from "@/components/dashboard/inventory-content";
import UsersContent from "@/components/dashboard/users-content";
import ComingSoonContent from "@/components/dashboard/coming-soon-content";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import AnalyticsContent from "@/components/dashboard/analytics-content"
import React from "react";
import SettingsContent from "@/components/dashboard/settings-content";

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  

  const isMobile = useIsMobile();
  const [userCollapsed, setUserCollapsed] = useState(false);



  const menuItems = [
    {
      title: "Dashboard",
      url: "#",
      icon: BarChart,
      key: "dashboard",
    },
    {
      title: "Sales",
      url: "#",
      icon: TrendingUp,
      key: "sales",
    },
    {
      title: "Inventory",
      url: "#",
      icon: Package,
      key: "inventory",
    },
    {
      title: "Analytics",
      url: "#",
      icon: PieChart,
      key: "analytics",
    },
    {
      title: "Users",
      url: "#",
      icon: Users,
      key: "users",
    },
    {
      title: "Reports",
      url: "#",
      icon: FileText,
      key: "reports",
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
      key: "settings",
    },
    
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardContent />;
      case "sales":
        return <SalesContent />;
      case "inventory":
        return <InventoryContent />;
      case "users":
        return <UsersContent />;
      case "analytics":
        return <AnalyticsContent />
      case "settings":
        return <SettingsContent />
      default:
        return (
          <ComingSoonContent
            section={activeSection}
            onReturnToDashboard={() => setActiveSection("dashboard")}
          />
        );
    }
  };

  const handleToggleSidebar = () => {
  setSidebarCollapsed((prev) => {
    const newState = !prev;
    setUserCollapsed(newState); // track user intent
    return newState;
  });
};


React.useEffect(() => {
  if (isMobile) {
    // Always collapse on mobile
    setSidebarCollapsed(true);
  } else {
    // On desktop, only expand if the user didn’t manually collapse
    if (!userCollapsed) {
      setSidebarCollapsed(false);
    }
  }
}, [isMobile, userCollapsed]);

if (isMobile === undefined) return null;

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-100 dark:bg-zinc-900">
      {/* Sidebar */}
      
      <DashboardSidebar
        collapsed={isMobile || sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        menuItems={menuItems}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      
  

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <DashboardHeader
          title={menuItems.find((item) => item.key === activeSection)?.title || "Dashboard"}
          onMenuToggle={handleToggleSidebar}
        />

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-zinc-100 dark:bg-zinc-800 p-4 pt-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}