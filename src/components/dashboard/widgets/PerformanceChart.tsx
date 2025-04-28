
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Bar } from "recharts";

interface PerformanceChartProps {
  data: Array<{
    name: string;
    impressions: number;
    clicks: number;
  }>;
  title: string;
}

export function PerformanceChart({ data, title }: PerformanceChartProps) {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="impressions" fill="#0B1955" />
            <Bar dataKey="clicks" fill="#F3E6AB" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
