
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Search, MoreHorizontal, Users } from "lucide-react";

// Sample client data
const SAMPLE_CLIENTS = [
  {
    id: "1",
    name: "Acme Corporation",
    industry: "E-commerce",
    status: "active",
    lastActive: "2023-04-27T12:30:00",
    adSpend: 12450,
    campaigns: 8,
    roi: 3.2,
    logo: "",
  },
  {
    id: "2",
    name: "TechSolutions Ltd",
    industry: "Technology",
    status: "active",
    lastActive: "2023-04-26T09:15:00",
    adSpend: 8750,
    campaigns: 5,
    roi: 2.8,
    logo: "",
  },
  {
    id: "3",
    name: "Global Services",
    industry: "Professional Services",
    status: "pending",
    lastActive: "2023-04-25T14:45:00",
    adSpend: 5200,
    campaigns: 3,
    roi: 1.9,
    logo: "",
  },
  {
    id: "4",
    name: "Local Restaurant",
    industry: "Food & Beverage",
    status: "active",
    lastActive: "2023-04-27T10:10:00",
    adSpend: 3100,
    campaigns: 2,
    roi: 4.5,
    logo: "",
  },
  {
    id: "5",
    name: "Fashion Outlet",
    industry: "Retail",
    status: "inactive",
    lastActive: "2023-04-20T08:30:00",
    adSpend: 6800,
    campaigns: 4,
    roi: 2.1,
    logo: "",
  },
];

// Sample client stats
const SAMPLE_STATS = {
  totalClients: 5,
  activeClients: 3,
  totalSpend: 36300,
  averageRoi: 2.9,
};

interface ClientManagementDashboardProps {
  language?: "en" | "sv";
}

export default function ClientManagementDashboard({ language = "en" }: ClientManagementDashboardProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [clients, setClients] = useState(SAMPLE_CLIENTS);

  const content = {
    en: {
      title: "Client Management",
      description: "Manage your client accounts and performance",
      search: "Search clients...",
      addClient: "Add Client",
      totalClients: "Total Clients",
      activeClients: "Active Clients",
      totalSpend: "Total Ad Spend",
      averageRoi: "Average ROI",
      clientsTable: {
        title: "Clients",
        columns: {
          client: "Client",
          industry: "Industry",
          status: "Status",
          adSpend: "Ad Spend",
          campaigns: "Campaigns",
          roi: "ROI",
          actions: "Actions",
        },
        status: {
          active: "Active",
          inactive: "Inactive",
          pending: "Pending",
        },
        actions: {
          view: "View Client",
          edit: "Edit Client",
          delete: "Delete Client",
        },
      },
    },
    sv: {
      title: "Klienthantering",
      description: "Hantera dina klientkonton och prestanda",
      search: "Sök klienter...",
      addClient: "Lägg till klient",
      totalClients: "Totala klienter",
      activeClients: "Aktiva klienter",
      totalSpend: "Total annonsbudget",
      averageRoi: "Genomsnittlig ROI",
      clientsTable: {
        title: "Klienter",
        columns: {
          client: "Klient",
          industry: "Bransch",
          status: "Status",
          adSpend: "Annonsbudget",
          campaigns: "Kampanjer",
          roi: "ROI",
          actions: "Åtgärder",
        },
        status: {
          active: "Aktiv",
          inactive: "Inaktiv",
          pending: "Väntar",
        },
        actions: {
          view: "Visa klient",
          edit: "Redigera klient",
          delete: "Ta bort klient",
        },
      },
    },
  };

  const currentContent = content[language];

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClient = () => {
    toast.success("Client form opened. This would typically open a client creation form.");
  };

  const handleViewClient = (clientId: string) => {
    toast.success(`Viewing client ${clientId}`);
  };

  const handleEditClient = (clientId: string) => {
    toast.success(`Editing client ${clientId}`);
  };

  const handleDeleteClient = (clientId: string) => {
    toast.success(`Client ${clientId} deleted`);
    setClients(clients.filter(client => client.id !== clientId));
  };

  // Helper function to format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold">{currentContent.title}</h2>
          <p className="text-muted-foreground">{currentContent.description}</p>
        </div>
        <Button onClick={handleAddClient}>
          <Users className="mr-2 h-4 w-4" />
          {currentContent.addClient}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {currentContent.totalClients}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{SAMPLE_STATS.totalClients}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {currentContent.activeClients}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{SAMPLE_STATS.activeClients}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {currentContent.totalSpend}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(SAMPLE_STATS.totalSpend)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {currentContent.averageRoi}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{SAMPLE_STATS.averageRoi}x</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{currentContent.clientsTable.title}</CardTitle>
          <CardDescription>
            <div className="w-full max-w-sm">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={currentContent.search}
                  className="w-full pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{currentContent.clientsTable.columns.client}</TableHead>
                  <TableHead>{currentContent.clientsTable.columns.industry}</TableHead>
                  <TableHead>{currentContent.clientsTable.columns.status}</TableHead>
                  <TableHead className="text-right">{currentContent.clientsTable.columns.adSpend}</TableHead>
                  <TableHead className="text-right">{currentContent.clientsTable.columns.campaigns}</TableHead>
                  <TableHead className="text-right">{currentContent.clientsTable.columns.roi}</TableHead>
                  <TableHead className="text-right">{currentContent.clientsTable.columns.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={client.logo} alt={client.name} />
                          <AvatarFallback>{client.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{client.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{client.industry}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          client.status === "active"
                            ? "success"
                            : client.status === "inactive"
                            ? "destructive"
                            : "outline"
                        }
                      >
                        {client.status === "active"
                          ? currentContent.clientsTable.status.active
                          : client.status === "inactive"
                          ? currentContent.clientsTable.status.inactive
                          : currentContent.clientsTable.status.pending}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{formatCurrency(client.adSpend)}</TableCell>
                    <TableCell className="text-right">{client.campaigns}</TableCell>
                    <TableCell className="text-right">{client.roi}x</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleViewClient(client.id)}>
                            {currentContent.clientsTable.actions.view}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditClient(client.id)}>
                            {currentContent.clientsTable.actions.edit}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => handleDeleteClient(client.id)}
                          >
                            {currentContent.clientsTable.actions.delete}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
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
