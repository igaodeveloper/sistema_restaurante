import { SalesChart } from "@/components/reports/sales-chart";
import { OrdersReport } from "@/components/reports/orders-report";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Relatórios</h1>
        <p className="text-muted-foreground">
          Análise de vendas e histórico de pedidos
        </p>
      </div>

      <div className="grid gap-6">
        <SalesChart />
        <OrdersReport />
      </div>
    </div>
  );
}
