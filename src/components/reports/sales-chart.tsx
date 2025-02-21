import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type SalesData = {
  date: string;
  total: number;
};

const mockDailyData: SalesData[] = [
  { date: "01/03", total: 1234.56 },
  { date: "02/03", total: 2345.67 },
  { date: "03/03", total: 1789.23 },
  { date: "04/03", total: 2567.89 },
  { date: "05/03", total: 1987.45 },
  { date: "06/03", total: 3456.78 },
  { date: "07/03", total: 2876.54 },
];

const mockMonthlyData: SalesData[] = [
  { date: "Out/23", total: 45678.9 },
  { date: "Nov/23", total: 52345.67 },
  { date: "Dez/23", total: 67890.12 },
  { date: "Jan/24", total: 48765.43 },
  { date: "Fev/24", total: 56789.01 },
  { date: "Mar/24", total: 61234.56 },
];

export function SalesChart() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-normal">Vendas</CardTitle>
        <Select defaultValue="daily">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione o período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Últimos 7 dias</SelectItem>
            <SelectItem value="monthly">Últimos 6 meses</SelectItem>
            <SelectItem value="yearly">Último ano</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="bar" className="space-y-4">
          <TabsList>
            <TabsTrigger value="bar">Barras</TabsTrigger>
            <TabsTrigger value="line">Linha</TabsTrigger>
          </TabsList>
          <TabsContent value="bar" className="pl-2">
            <div className="h-[300px] w-full">
              {/* Chart would go here - using div for demonstration */}
              <div className="flex h-full items-end gap-2">
                {mockDailyData.map((item, index) => (
                  <div key={index} className="group relative flex-1">
                    <div
                      className="bg-primary/90 hover:bg-primary transition-all"
                      style={{ height: `${(item.total / 4000) * 100}%` }}
                    />
                    <div className="absolute -bottom-6 w-full text-center text-sm">
                      {item.date}
                    </div>
                    <div className="absolute -top-6 w-full text-center text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      R$ {item.total.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="line" className="pl-2">
            <div className="h-[300px] w-full">
              {/* Line chart would go here */}
              <div className="flex h-full items-end gap-2">
                {mockMonthlyData.map((item, index) => (
                  <div key={index} className="group relative flex-1">
                    <div
                      className="bg-primary/90 hover:bg-primary transition-all"
                      style={{ height: `${(item.total / 70000) * 100}%` }}
                    />
                    <div className="absolute -bottom-6 w-full text-center text-sm">
                      {item.date}
                    </div>
                    <div className="absolute -top-6 w-full text-center text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      R$ {item.total.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
