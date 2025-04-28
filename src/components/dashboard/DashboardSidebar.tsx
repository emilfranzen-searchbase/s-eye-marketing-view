
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ChartBar,
  Settings,
  Users,
  Database,
  Calendar,
  Menu,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive?: boolean;
  isPremium?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
}

const SidebarItem = ({
  icon,
  label,
  href,
  isActive,
  isPremium,
  isDisabled,
  onClick,
}: SidebarItemProps) => {
  return (
    <Link 
      to={isDisabled ? "#" : href} 
      onClick={(e) => {
        if (isDisabled) {
          e.preventDefault();
          toast.error("This feature requires a premium subscription.");
          return;
        }
        onClick?.();
      }}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all hover:bg-brand-dark/10",
        isActive ? "bg-brand-dark/10 text-brand-dark font-medium" : "text-gray-600",
        isDisabled && "opacity-60 cursor-not-allowed"
      )}
    >
      {icon}
      <span>{label}</span>
      {isPremium && (
        <span className="ml-auto bg-brand-light text-brand-dark text-xs py-0.5 px-1.5 rounded-full">
          PRO
        </span>
      )}
    </Link>
  );
};

interface DashboardSidebarProps {
  language: "en" | "sv";
}

export default function DashboardSidebar({ language }: DashboardSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  // Multi-language content
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

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div 
      className={cn(
        "flex flex-col bg-white border-r border-gray-200 h-screen transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <Link to="/dashboard" className="font-bold text-xl text-brand-dark">
            S-EYE
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

      <div className="flex-1 overflow-y-auto p-3">
        <nav className="flex flex-col gap-1">
          <SidebarItem
            icon={<ChartBar className="h-5 w-5" />}
            label={collapsed ? "" : currentContent.overview}
            href="/dashboard"
            isActive={isActive("/dashboard")}
          />

          {!collapsed && (
            <div className="mt-6 mb-2 px-3">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                {currentContent.dataSources}
              </h3>
            </div>
          )}

          <SidebarItem
            icon={<Database className="h-5 w-5" />}
            label={collapsed ? "" : currentContent.googleAds}
            href="/dashboard/google-ads"
            isActive={isActive("/dashboard/google-ads")}
          />
          <SidebarItem
            icon={<Database className="h-5 w-5" />}
            label={collapsed ? "" : currentContent.metaAds}
            href="/dashboard/meta-ads"
            isActive={isActive("/dashboard/meta-ads")}
          />
          <SidebarItem
            icon={<Database className="h-5 w-5" />}
            label={collapsed ? "" : currentContent.linkedin}
            href="/dashboard/linkedin"
            isPremium
            isDisabled
          />
          <SidebarItem
            icon={<Database className="h-5 w-5" />}
            label={collapsed ? "" : currentContent.tiktok}
            href="/dashboard/tiktok"
            isPremium
            isDisabled
          />
          <SidebarItem
            icon={<Database className="h-5 w-5" />}
            label={collapsed ? "" : currentContent.snapchat}
            href="/dashboard/snapchat"
            isPremium
            isDisabled
          />

          {!collapsed && (
            <div className="mt-6 mb-2 px-3">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                {currentContent.analytics}
              </h3>
            </div>
          )}

          <SidebarItem
            icon={<ChartBar className="h-5 w-5" />}
            label={collapsed ? "" : currentContent.reports}
            href="/dashboard/reports"
            isActive={isActive("/dashboard/reports")}
          />
          <SidebarItem
            icon={<Calendar className="h-5 w-5" />}
            label={collapsed ? "" : currentContent.aiReports}
            href="/dashboard/ai-reports"
            isActive={isActive("/dashboard/ai-reports")}
          />

          {!collapsed && (
            <div className="mt-6 mb-2 px-3">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                {currentContent.team}
              </h3>
            </div>
          )}

          <SidebarItem
            icon={<Users className="h-5 w-5" />}
            label={collapsed ? "" : currentContent.team}
            href="/dashboard/team"
            isActive={isActive("/dashboard/team")}
          />
        </nav>
      </div>

      <div className="p-3 border-t border-gray-200">
        <nav className="flex flex-col gap-1">
          <SidebarItem
            icon={<Settings className="h-5 w-5" />}
            label={collapsed ? "" : currentContent.settings}
            href="/dashboard/settings"
            isActive={isActive("/dashboard/settings")}
          />
          <Button
            variant="ghost"
            className="flex items-center justify-start gap-3 rounded-md px-3 py-2 text-sm text-gray-600 w-full hover:bg-brand-dark/10"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span>{currentContent.logout}</span>}
          </Button>
        </nav>
      </div>
    </div>
  );
}
