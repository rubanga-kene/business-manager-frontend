"use client";

import {useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

import {
  BarChart,
  TrendingUp,
  Users,
  Settings,
  PieChart,
  Truck,
  LayoutGrid,
  Boxes,
  
} from "lucide-react";

import DashboardContent from "@/components/dashboard/DashboardContent";
import SalesContent from "@/components/dashboard/SalesContent";
import InventoryContent from "@/components/dashboard/InventoryContent";
import UsersContent from "@/components/dashboard/UsersContent";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import AnalyticsContent from "@/components/dashboard/AnalyticsContent"
import React from "react";
import SettingsContent from "@/components/dashboard/SettingsContent";
import CategoriesContent from "@/components/dashboard/CategoriesContent";
import SuppliersContent from "@/components/dashboard/SuppliersContent";

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
      icon: Boxes,
      key: "inventory",
    },
    {
      title: "Categories",
      url: "#",
      icon: LayoutGrid,
      key: "categories",
    },
    {
      title: "Suppliers",
      url: "#",
      icon: Truck,
      key: "suppliers",
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
      case "categories":
        return <CategoriesContent />;
      case "suppliers":
        return <SuppliersContent />;
      case "users":
        return <UsersContent />;
      case "analytics":
        return <AnalyticsContent />
      case "settings":
        return <SettingsContent />
      default:
        return <DashboardContent />;
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