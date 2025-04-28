
import { ChartBar, Calendar } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

interface AnalyticsMenuItem {
  id: string;
  name: string;
  path: string;
  icon: "chart" | "calendar";
}

interface AnalyticsMenuProps {
  items: AnalyticsMenuItem[];
  label: string;
}

export function AnalyticsMenu({ items, label }: AnalyticsMenuProps) {
  const getIcon = (type: "chart" | "calendar") => {
    switch (type) {
      case "chart":
        return <ChartBar className="h-5 w-5" />;
      case "calendar":
        return <Calendar className="h-5 w-5" />;
    }
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton
              asChild
              isActive={location.pathname === item.path}
              tooltip={item.name}
            >
              <a href={item.path}>
                {getIcon(item.icon)}
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
