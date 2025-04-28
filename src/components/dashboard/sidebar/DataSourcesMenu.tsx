
import { Database } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

interface DataSourcesMenuProps {
  sources: Array<{
    id: string;
    name: string;
    path: string;
    isPremium?: boolean;
  }>;
  label: string;
}

export function DataSourcesMenu({ sources, label }: DataSourcesMenuProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarMenu>
        {sources.map((source) => (
          <SidebarMenuItem key={source.id}>
            <SidebarMenuButton
              asChild
              isActive={location.pathname === source.path}
              tooltip={source.name}
              isDisabled={source.isPremium}
            >
              <a href={source.isPremium ? "#" : source.path}>
                <Database className="h-5 w-5" />
                <span>{source.name}</span>
                {source.isPremium && (
                  <span className="ml-auto bg-brand-light text-brand-dark text-xs py-0.5 px-1.5 rounded-full">
                    PRO
                  </span>
                )}
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
