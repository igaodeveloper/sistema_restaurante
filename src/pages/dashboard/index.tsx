import { StatsCard } from "@/components/dashboard/stats-card";
import { OrdersTable } from "@/components/dashboard/orders-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils, DollarSign, Users, Clock } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Pedidos Hoje"
          value="23"
          icon={<Utensils className="h-4 w-4 text-muted-foreground" />}
          description="↗️ +5 desde última hora"
        />
        <StatsCard
          title="Total em Vendas"
          value="R$ 2.345,00"
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          description="↗️ +12% desde ontem"
        />
        <StatsCard
          title="Mesas Ocupadas"
          value="8/12"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          description="67% de ocupação"
        />
        <StatsCard
          title="Tempo Médio"
          value="24 min"
          icon={<Clock className="h-4 w-4 text-muted-foreground" />}
          description="↘️ -2 min desde ontem"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Comandas Abertas</CardTitle>
        </CardHeader>
        <CardContent>
          <OrdersTable />
        </CardContent>
      </Card>
    </div>
  );
}
