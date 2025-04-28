
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Sankey, Rectangle, Layer } from "recharts";
import { useToast } from "@/components/ui/use-toast";
import { Download } from "lucide-react";

// Sample data for the attribution funnel
const DEFAULT_ATTRIBUTION_DATA = {
  nodes: [
    { name: "Google Ads" },
    { name: "Meta Ads" },
    { name: "Direct" },
    { name: "Organic" },
    { name: "Email" },
    { name: "Website Visit" },
    { name: "Product View" },
    { name: "Add to Cart" },
    { name: "Checkout" },
    { name: "Purchase" },
  ],
  links: [
    { source: 0, target: 5, value: 200 },
    { source: 0, target: 6, value: 80 },
    { source: 1, target: 5, value: 150 },
    { source: 1, target: 6, value: 50 },
    { source: 2, target: 5, value: 50 },
    { source: 3, target: 5, value: 90 },
    { source: 4, target: 5, value: 60 },
    { source: 5, target: 6, value: 350 },
    { source: 6, target: 7, value: 200 },
    { source: 7, target: 8, value: 120 },
    { source: 8, target: 9, value: 90 },
  ],
};

// Sample table data for common paths
const DEFAULT_PATHS_DATA = [
  {
    id: 1,
    path: "Google Ads → Website Visit → Product View → Add to Cart → Checkout → Purchase",
    conversions: 42,
    conversionRate: "21.0%",
    averageValue: "$78.50",
  },
  {
    id: 2,
    path: "Meta Ads → Website Visit → Product View → Add to Cart → Purchase",
    conversions: 36,
    conversionRate: "24.0%",
    averageValue: "$65.20",
  },
  {
    id: 3,
    path: "Direct → Product View → Add to Cart → Checkout → Purchase",
    conversions: 28,
    conversionRate: "56.0%",
    averageValue: "$92.30",
  },
  {
    id: 4,
    path: "Organic → Website Visit → Product View → Purchase",
    conversions: 22,
    conversionRate: "24.4%",
    averageValue: "$55.40",
  },
  {
    id: 5,
    path: "Email → Website Visit → Product View → Add to Cart → Purchase",
    conversions: 18,
    conversionRate: "30.0%",
    averageValue: "$63.70",
  },
];

const ATTRIBUTION_MODELS = [
  { value: "last-click", label: "Last Click" },
  { value: "first-click", label: "First Click" },
  { value: "linear", label: "Linear" },
  { value: "time-decay", label: "Time Decay" },
  { value: "position-based", label: "Position Based" },
];

const TIME_PERIODS = [
  { value: "7days", label: "Last 7 Days" },
  { value: "30days", label: "Last 30 Days" },
  { value: "90days", label: "Last 90 Days" },
  { value: "ytd", label: "Year to Date" },
  { value: "custom", label: "Custom Range" },
];

interface AttributionFunnelReportProps {
  language?: "en" | "sv";
}

export function AttributionFunnelReport({ language = "en" }: AttributionFunnelReportProps) {
  const [attributionModel, setAttributionModel] = useState("last-click");
  const [timePeriod, setTimePeriod] = useState("30days");
  const { toast } = useToast();

  const content = {
    en: {
      title: "Attribution Funnel",
      description: "Analyze the customer journey and conversion paths",
      attribution: "Attribution Model",
      period: "Time Period",
      commonPaths: "Common Conversion Paths",
      path: "Path",
      conversions: "Conversions",
      conversionRate: "Conv. Rate",
      averageValue: "Avg. Value",
      download: "Download Report",
      downloadSuccess: "Report download started",
    },
    sv: {
      title: "Attributionstratt",
      description: "Analysera kundresan och konverteringsvägar",
      attribution: "Attributionsmodell",
      period: "Tidsperiod",
      commonPaths: "Vanliga konverteringsvägar",
      path: "Väg",
      conversions: "Konverteringar",
      conversionRate: "Konv. frekvens",
      averageValue: "Genomsn. värde",
      download: "Ladda ner rapport",
      downloadSuccess: "Rapportnedladdning startad",
    }
  };

  const currentContent = content[language];

  const handleDownload = () => {
    toast({
      title: currentContent.downloadSuccess,
      description: new Date().toLocaleDateString(),
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{currentContent.title}</CardTitle>
          <CardDescription>{currentContent.description}</CardDescription>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="w-full sm:w-1/2">
              <label className="text-sm font-medium mb-1 block">{currentContent.attribution}</label>
              <Select value={attributionModel} onValueChange={setAttributionModel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  {ATTRIBUTION_MODELS.map((model) => (
                    <SelectItem key={model.value} value={model.value}>
                      {model.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full sm:w-1/2">
              <label className="text-sm font-medium mb-1 block">{currentContent.period}</label>
              <Select value={timePeriod} onValueChange={setTimePeriod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  {TIME_PERIODS.map((period) => (
                    <SelectItem key={period.value} value={period.value}>
                      {period.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="h-[400px] w-full">
            <ChartContainer config={{}} className="h-full">
              <Sankey
                data={DEFAULT_ATTRIBUTION_DATA}
                node={
                  <Layer>
                    <Rectangle fill="#8B5CF6" fillOpacity={0.85} />
                  </Layer>
                }
                link={{ stroke: "#aaa" }}
                margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                nodeWidth={20}
                nodePadding={60}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{currentContent.commonPaths}</CardTitle>
            <CardDescription>
              Top converting customer journeys based on your selected attribution model
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            {currentContent.download}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{currentContent.path}</TableHead>
                  <TableHead className="text-right">{currentContent.conversions}</TableHead>
                  <TableHead className="text-right">{currentContent.conversionRate}</TableHead>
                  <TableHead className="text-right">{currentContent.averageValue}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {DEFAULT_PATHS_DATA.map((path) => (
                  <TableRow key={path.id}>
                    <TableCell className="font-medium">{path.path}</TableCell>
                    <TableCell className="text-right">{path.conversions}</TableCell>
                    <TableCell className="text-right">{path.conversionRate}</TableCell>
                    <TableCell className="text-right">{path.averageValue}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
