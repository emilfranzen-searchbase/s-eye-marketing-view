import { useState } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/dashboard/widgets/StatsCard";
import { PerformanceChart } from "@/components/dashboard/widgets/PerformanceChart";
import { TrendChart } from "@/components/dashboard/widgets/TrendChart";
import { DataSourcesList } from "@/components/dashboard/widgets/DataSourcesList";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import {
  ChartBar,
  ArrowUp,
  ArrowDown,
  Database
} from "lucide-react";

// Move mock data to separate files in a real application
const performanceData = [
  { name: "Jan", impressions: 4000, clicks: 2400, conversions: 240 },
  { name: "Feb", impressions: 3000, clicks: 1398, conversions: 210 },
  { name: "Mar", impressions: 2000, clicks: 9800, conversions: 290 },
  { name: "Apr", impressions: 2780, clicks: 3908, conversions: 200 },
  { name: "May", impressions: 1890, clicks: 4800, conversions: 281 },
  { name: "Jun", impressions: 2390, clicks: 3800, conversions: 250 },
  { name: "Jul", impressions: 3490, clicks: 4300, conversions: 210 },
];

const trendData = [
  { name: "Week 1", value: 400 },
  { name: "Week 2", value: 300 },
  { name: "Week 3", value: 500 },
  { name: "Week 4", value: 280 },
  { name: "Week 5", value: 590 },
  { name: "Week 6", value: 390 },
  { name: "Week 7", value: 490 },
];

const dataSources = [
  { name: "Google Ads", status: "connected" as const },
  { name: "Meta Ads", status: "connected" as const },
  { name: "LinkedIn", status: "premium" as const },
  { name: "TikTok", status: "premium" as const },
  { name: "Snapchat", status: "premium" as const },
];

export default function Dashboard() {
  const [language, setLanguage] = useState<"en" | "sv">("en");
  const [timeframe, setTimeframe] = useState("30days");

  const content = {
    en: {
      title: "Marketing Dashboard",
      welcome: "Welcome to your marketing dashboard",
      summary: "Summary",
      performance: "Performance",
      trends: "Trends",
      actions: "Quick Actions",
      impressions: "Impressions",
      clicks: "Clicks",
      conversions: "Conversions",
      ctr: "CTR",
      vs_previous: "vs previous period",
      connect_source: "Connect Data Source",
      generate_report: "Generate Report",
      view_all: "View All",
      timeframe: "Timeframe",
      last_7_days: "Last 7 days",
      last_30_days: "Last 30 days",
      last_90_days: "Last 90 days",
      year_to_date: "Year to date",
      incomplete_setup: "Your setup is incomplete",
      complete_setup: "Complete setup",
      data_sources: {
        title: "Data Sources",
        google: "Google Ads",
        meta: "Meta Ads",
        linkedin: "LinkedIn Ads",
        tiktok: "TikTok Ads",
        snapchat: "Snapchat Ads",
      }
    },
    sv: {
      title: "Marknadsföringsdashboard",
      welcome: "Välkommen till din marknadsföringsdashboard",
      summary: "Sammanfattning",
      performance: "Prestanda",
      trends: "Trender",
      actions: "Snabbåtgärder",
      impressions: "Visningar",
      clicks: "Klick",
      conversions: "Konverteringar",
      ctr: "CTR",
      vs_previous: "jmf föregående period",
      connect_source: "Anslut datakälla",
      generate_report: "Generera rapport",
      view_all: "Visa alla",
      timeframe: "Tidsperiod",
      last_7_days: "Senaste 7 dagarna",
      last_30_days: "Senaste 30 dagarna",
      last_90_days: "Senaste 90 dagarna",
      year_to_date: "Hittills i år",
      incomplete_setup: "Din konfiguration är ofullständig",
      complete_setup: "Slutför konfiguration",
      data_sources: {
        title: "Datakällor",
        google: "Google Ads",
        meta: "Meta Ads",
        linkedin: "LinkedIn Ads",
        tiktok: "TikTok Ads",
        snapchat: "Snapchat Ads",
      }
    }
  };

  const currentContent = content[language];

  const handleGenerateReport = () => {
    toast.success("AI report generation started. You'll be notified when it's ready.");
  };

  const handleConnectSource = () => {
    toast.success("Redirecting to connection page...");
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar language={language} />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader 
          language={language} 
          setLanguage={setLanguage} 
          title={currentContent.title}
        />
        
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-700">{currentContent.welcome}</h2>
          </div>

          {/* Timeframe selector */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-brand-dark">{currentContent.summary}</h2>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">{currentContent.timeframe}:</span>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={currentContent.last_30_days} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">{currentContent.last_7_days}</SelectItem>
                  <SelectItem value="30days">{currentContent.last_30_days}</SelectItem>
                  <SelectItem value="90days">{currentContent.last_90_days}</SelectItem>
                  <SelectItem value="ytd">{currentContent.year_to_date}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title={currentContent.impressions}
              value="24,567"
              change={12.5}
            />
            <StatsCard
              title={currentContent.clicks}
              value="1,234"
              change={8.2}
            />
            <StatsCard
              title={currentContent.conversions}
              value="87"
              change={-3.1}
            />
            <StatsCard
              title={currentContent.ctr}
              value="5.02%"
              change={0.8}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PerformanceChart
              data={performanceData}
              title={currentContent.performance}
            />
            <TrendChart
              data={trendData}
              title={currentContent.trends}
            />
            <DataSourcesList
              sources={dataSources}
              onConnect={handleConnectSource}
              labels={{
                title: currentContent.data_sources.title,
                connectSource: currentContent.connect_source
              }}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
