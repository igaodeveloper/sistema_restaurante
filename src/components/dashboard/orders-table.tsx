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
  table: number;
  status: "open" | "preparing" | "ready" | "closed";
  items: number;
  total: number;
  time: string;
};

const orders: Order[] = [
  {
    id: "#1234",
    table: 1,
    status: "open",
    items: 3,
    total: 145.9,
    time: "15:30",
  },
  {
    id: "#1235",
    table: 2,
    status: "preparing",
    items: 2,
    total: 89.9,
    time: "15:45",
  },
  {
    id: "#1236",
    table: 3,
    status: "ready",
    items: 4,
    total: 167.8,
    time: "16:00",
  },
];

const statusMap = {
  open: { label: "Aberta", variant: "default" },
  preparing: { label: "Preparando", variant: "warning" },
  ready: { label: "Pronta", variant: "success" },
  closed: { label: "Fechada", variant: "secondary" },
};

export function OrdersTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Comanda</TableHead>
          <TableHead>Mesa</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Itens</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Horário</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow
            key={order.id}
            className="cursor-pointer hover:bg-muted/50"
            onClick={() =>
              (window.location.href = `/comandas/${order.id.replace("#", "")}`)
            }
          >
            <TableCell className="font-medium">{order.id}</TableCell>
            <TableCell>Mesa {order.table}</TableCell>
            <TableCell>
              <Badge
                variant={
                  statusMap[order.status].variant as
                    | "default"
                    | "warning"
                    | "success"
                    | "secondary"
                }
              >
                {statusMap[order.status].label}
              </Badge>
            </TableCell>
            <TableCell>{order.items}</TableCell>
            <TableCell>R$ {order.total.toFixed(2)}</TableCell>
            <TableCell>{order.time}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
