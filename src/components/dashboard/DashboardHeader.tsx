
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Search, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DashboardHeaderProps {
  language: "en" | "sv";
  setLanguage: (language: "en" | "sv") => void;
  title: string;
}

export default function DashboardHeader({ language, setLanguage, title }: DashboardHeaderProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Multi-language content
  const content = {
    en: {
      searchPlaceholder: "Search...",
      profile: "Profile",
      settings: "Settings",
      logout: "Logout",
    },
    sv: {
      searchPlaceholder: "Sök...",
      profile: "Profil",
      settings: "Inställningar",
      logout: "Logga ut",
    }
  };

  const currentContent = content[language];

  return (
    <header className="flex h-16 items-center border-b border-gray-200 px-4 bg-white">
      <h1 className="text-xl font-semibold text-brand-dark">{title}</h1>
      
      <div className="ml-auto flex items-center space-x-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder={currentContent.searchPlaceholder}
            className="w-64 pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 animate-pulse" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage("en")}>
                <div className="flex items-center">
                  <span className={`mr-2 rounded-full w-4 h-4 border ${language === "en" ? 'bg-brand-light border-brand-dark' : 'border-gray-300'}`}></span>
                  English
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("sv")}>
                <div className="flex items-center">
                  <span className={`mr-2 rounded-full w-4 h-4 border ${language === "sv" ? 'bg-brand-light border-brand-dark' : 'border-gray-300'}`}></span>
                  Svenska
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" alt="User" />
                  <AvatarFallback className="bg-brand-dark text-white">JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>{currentContent.profile}</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>{currentContent.settings}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                {currentContent.logout}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
