
import { Database } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface DataSource {
  name: string;
  status: "connected" | "premium" | "disconnected";
}

interface DataSourcesListProps {
  sources: DataSource[];
  onConnect: () => void;
  labels: {
    title: string;
    connectSource: string;
  };
}

export function DataSourcesList({ sources, onConnect, labels }: DataSourcesListProps) {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-lg font-medium">{labels.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sources.map((source, index) => (
            <div key={source.name} className={`flex items-center justify-between ${index !== sources.length - 1 ? 'border-b pb-2' : ''}`}>
              <div className="flex items-center">
                <div className={`p-2 rounded-full mr-3 ${source.status === 'connected' ? 'bg-green-100' : 'bg-gray-100'}`}>
                  <Database className={`h-4 w-4 ${source.status === 'connected' ? 'text-green-600' : 'text-gray-600'}`} />
                </div>
                <span>{source.name}</span>
              </div>
              <span className={`text-xs py-1 px-2 rounded-full ${
                source.status === 'connected' 
                  ? 'bg-green-100 text-green-800'
                  : source.status === 'premium'
                    ? 'bg-brand-light text-brand-dark'
                    : 'bg-gray-100 text-gray-800'
              }`}>
                {source.status === 'connected' ? 'Connected' : source.status === 'premium' ? 'Premium' : 'Disconnected'}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={onConnect}>
          {labels.connectSource}
        </Button>
      </CardFooter>
    </Card>
  );
}
