import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type Order = {
  id: string;
  date: string;
  table: number;
  items: number;
  total: number;
  status: "open" | "closed" | "cancelled";
  paymentMethod: "credit" | "cash" | "pix";
};

const mockOrders: Order[] = [
  {
    id: "#1234",
    date: "07/03/2024",
    table: 1,
    items: 3,
    total: 145.9,
    status: "closed",
    paymentMethod: "credit",
  },
  {
    id: "#1235",
    date: "07/03/2024",
    table: 2,
    items: 2,
    total: 89.9,
    status: "closed",
    paymentMethod: "cash",
  },
  {
    id: "#1236",
    date: "07/03/2024",
    table: 3,
    items: 4,
    total: 167.8,
    status: "cancelled",
    paymentMethod: "pix",
  },
  {
    id: "#1237",
    date: "06/03/2024",
    table: 4,
    items: 3,
    total: 134.5,
    status: "closed",
    paymentMethod: "credit",
  },
];

const statusMap = {
  open: { label: "Aberta", variant: "default" },
  closed: { label: "Fechada", variant: "success" },
  cancelled: { label: "Cancelada", variant: "destructive" },
};

export function OrdersReport() {
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = mockOrders.filter((order) => {
    if (dateFilter && !order.date.includes(dateFilter)) return false;
    if (statusFilter !== "all" && order.status !== statusFilter) return false;
    return true;
  });

  const totalAmount = filteredOrders.reduce(
    (acc, order) => acc + order.total,
    0,
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Histórico de Pedidos</CardTitle>
          <p className="text-sm text-muted-foreground">
            Total: R$ {totalAmount.toFixed(2)}
          </p>
        </div>
        <div className="flex gap-4 mt-4">
          <Input
            placeholder="Filtrar por data"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="max-w-[180px]"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="open">Abertos</SelectItem>
              <SelectItem value="closed">Fechados</SelectItem>
              <SelectItem value="cancelled">Cancelados</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Comanda</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Mesa</TableHead>
              <TableHead>Itens</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Pagamento</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>Mesa {order.table}</TableCell>
                <TableCell>{order.items}</TableCell>
                <TableCell>R$ {order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      statusMap[order.status].variant as
                        | "default"
                        | "success"
                        | "destructive"
                    }
                  >
                    {statusMap[order.status].label}
                  </Badge>
                </TableCell>
                <TableCell className="capitalize">
                  {order.paymentMethod}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
