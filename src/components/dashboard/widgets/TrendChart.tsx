
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Line } from "recharts";

interface TrendChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
  title: string;
}

export function TrendChart({ data, title }: TrendChartProps) {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#0B1955" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
