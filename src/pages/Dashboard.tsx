
import { useState } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BarChart, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Bar, Line } from "recharts";
import { ChartBar, ArrowUp, ArrowDown, Database } from "lucide-react";
import { toast } from "sonner";

// Mock data for charts
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

const Dashboard = () => {
  const [language, setLanguage] = useState<"en" | "sv">("en");
  const [timeframe, setTimeframe] = useState("30days");

  // Multi-language content
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

          {/* Alert for incomplete setup */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  {currentContent.incomplete_setup}
                </p>
                <Button
                  variant="link"
                  className="text-yellow-700 text-sm font-medium p-0 mt-1 hover:underline"
                >
                  {currentContent.complete_setup}
                </Button>
              </div>
            </div>
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
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {currentContent.impressions}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24,567</div>
                <p className="text-xs flex items-center text-green-600 mt-1">
                  <ArrowUp className="mr-1 h-3 w-3" />
                  12.5% {currentContent.vs_previous}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {currentContent.clicks}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs flex items-center text-green-600 mt-1">
                  <ArrowUp className="mr-1 h-3 w-3" />
                  8.2% {currentContent.vs_previous}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {currentContent.conversions}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87</div>
                <p className="text-xs flex items-center text-red-600 mt-1">
                  <ArrowDown className="mr-1 h-3 w-3" />
                  3.1% {currentContent.vs_previous}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {currentContent.ctr}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5.02%</div>
                <p className="text-xs flex items-center text-green-600 mt-1">
                  <ArrowUp className="mr-1 h-3 w-3" />
                  0.8% {currentContent.vs_previous}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Chart */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="text-lg font-medium">{currentContent.performance}</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={performanceData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="impressions" fill="#0B1955" />
                    <Bar dataKey="clicks" fill="#F3E6AB" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Trend Chart */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="text-lg font-medium">{currentContent.trends}</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trendData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#0B1955" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Data Sources */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="text-lg font-medium">{currentContent.data_sources.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center">
                      <div className="bg-green-100 p-2 rounded-full mr-3">
                        <Database className="h-4 w-4 text-green-600" />
                      </div>
                      <span>{currentContent.data_sources.google}</span>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 py-1 px-2 rounded-full">Connected</span>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center">
                      <div className="bg-green-100 p-2 rounded-full mr-3">
                        <Database className="h-4 w-4 text-green-600" />
                      </div>
                      <span>{currentContent.data_sources.meta}</span>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 py-1 px-2 rounded-full">Connected</span>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center">
                      <div className="bg-gray-100 p-2 rounded-full mr-3">
                        <Database className="h-4 w-4 text-gray-600" />
                      </div>
                      <span>{currentContent.data_sources.linkedin}</span>
                    </div>
                    <span className="text-xs bg-brand-light text-brand-dark py-1 px-2 rounded-full">Premium</span>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center">
                      <div className="bg-gray-100 p-2 rounded-full mr-3">
                        <Database className="h-4 w-4 text-gray-600" />
                      </div>
                      <span>{currentContent.data_sources.tiktok}</span>
                    </div>
                    <span className="text-xs bg-brand-light text-brand-dark py-1 px-2 rounded-full">Premium</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-gray-100 p-2 rounded-full mr-3">
                        <Database className="h-4 w-4 text-gray-600" />
                      </div>
                      <span>{currentContent.data_sources.snapchat}</span>
                    </div>
                    <span className="text-xs bg-brand-light text-brand-dark py-1 px-2 rounded-full">Premium</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleConnectSource}>
                  {currentContent.connect_source}
                </Button>
              </CardFooter>
            </Card>

            {/* Quick Actions */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="text-lg font-medium">{currentContent.actions}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-brand-dark p-2 rounded-full mr-3">
                        <ChartBar className="h-4 w-4 text-brand-light" />
                      </div>
                      <div>
                        <p className="font-medium">AI Report</p>
                        <p className="text-sm text-gray-500">Generate insights from your data</p>
                      </div>
                    </div>
                    <Button className="bg-brand-light text-brand-dark hover:bg-brand-lightHover" size="sm" onClick={handleGenerateReport}>
                      {currentContent.generate_report}
                    </Button>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-brand-dark p-2 rounded-full mr-3">
                        <Database className="h-4 w-4 text-brand-light" />
                      </div>
                      <div>
                        <p className="font-medium">Scheduled Reports</p>
                        <p className="text-sm text-gray-500">Set up automated reporting</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      {currentContent.view_all}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
