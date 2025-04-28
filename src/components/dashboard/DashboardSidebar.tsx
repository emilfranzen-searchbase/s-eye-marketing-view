import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ChartBar,
  Settings,
  Users,
  LogOut,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { DataSourcesMenu } from "./sidebar/DataSourcesMenu";
import { AnalyticsMenu } from "./sidebar/AnalyticsMenu";

interface DashboardSidebarProps {
  language: "en" | "sv";
}

export default function DashboardSidebar({ language }: DashboardSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const content = {
    en: {
      overview: "Overview",
      dataSources: "Data Sources",
      googleAds: "Google Ads",
      metaAds: "Meta Ads",
      linkedin: "LinkedIn",
      tiktok: "TikTok",
      snapchat: "Snapchat",
      analytics: "Analytics",
      reports: "Reports",
      aiReports: "AI Reports",
      team: "Team",
      settings: "Settings", 
      logout: "Logout"
    },
    sv: {
      overview: "Översikt",
      dataSources: "Datakällor",
      googleAds: "Google Ads",
      metaAds: "Meta Ads",
      linkedin: "LinkedIn",
      tiktok: "TikTok",
      snapchat: "Snapchat",
      analytics: "Analys",
      reports: "Rapporter",
      aiReports: "AI Rapporter",
      team: "Team",
      settings: "Inställningar",
      logout: "Logga ut"
    }
  };

  const currentContent = content[language];

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const dataSources = [
    { id: "google-ads", name: currentContent.googleAds, path: "/dashboard/google-ads" },
    { id: "meta-ads", name: currentContent.metaAds, path: "/dashboard/meta-ads" },
    { id: "linkedin", name: currentContent.linkedin, path: "/dashboard/linkedin", isPremium: true },
    { id: "tiktok", name: currentContent.tiktok, path: "/dashboard/tiktok", isPremium: true },
    { id: "snapchat", name: currentContent.snapchat, path: "/dashboard/snapchat", isPremium: true },
  ];

  const analyticsItems = [
    { id: "reports", name: currentContent.reports, path: "/dashboard/reports", icon: "chart" as const },
    { id: "ai-reports", name: currentContent.aiReports, path: "/dashboard/ai-reports", icon: "calendar" as const },
  ];

  return (
    <div 
      className={cn(
        "flex flex-col bg-white border-r border-gray-200 h-screen transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <SidebarHeader>
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!collapsed && (
            <Link to="/dashboard" className="font-bold text-xl text-brand-dark">
              Orbit
            </Link>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <DataSourcesMenu 
          sources={dataSources}
          label={currentContent.dataSources}
        />
        <AnalyticsMenu 
          items={analyticsItems}
          label={currentContent.analytics}
        />
      </SidebarContent>

      <SidebarFooter>
        <div className="p-3 border-t border-gray-200">
          <Link 
            to="/dashboard/settings"
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all hover:bg-brand-dark/10",
              location.pathname === "/dashboard/settings" ? "bg-brand-dark/10 text-brand-dark font-medium" : "text-gray-600"
            )}
          >
            <Settings className="h-5 w-5" />
            <span>{currentContent.settings}</span>
          </Link>
          <Button
            variant="ghost"
            className="flex items-center justify-start gap-3 rounded-md px-3 py-2 text-sm text-gray-600 w-full hover:bg-brand-dark/10"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span>{currentContent.logout}</span>}
          </Button>
        </div>
      </SidebarFooter>
    </div>
  );
}
