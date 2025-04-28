
import { ArrowDown, ArrowUp, LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  change: number;
  icon?: LucideIcon;
}

export function StatsCard({ title, value, change, icon: Icon }: StatsCardProps) {
  const isPositive = change >= 0;
  const Arrow = isPositive ? ArrowUp : ArrowDown;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs flex items-center mt-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          <Arrow className="mr-1 h-3 w-3" />
          {Math.abs(change)}% vs previous period
        </p>
      </CardContent>
    </Card>
  );
}
