
import { Database, Edit } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
  const location = useLocation();

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
              disabled={source.isPremium}
            >
              <Link to={source.isPremium ? "#" : source.path}>
                <Database className="h-5 w-5" />
                <span>{source.name}</span>
                {source.isPremium && (
                  <span className="ml-auto bg-brand-light text-brand-dark text-xs py-0.5 px-1.5 rounded-full">
                    PRO
                  </span>
                )}
              </Link>
            </SidebarMenuButton>
            
            {!source.isPremium && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link 
                      to={`${source.path}/create`} 
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Create or edit ad</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>Create or edit ad</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
