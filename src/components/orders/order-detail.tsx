import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Clock, DollarSign } from "lucide-react";

type OrderItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  status: "pending" | "preparing" | "ready" | "delivered";
  notes?: string;
};

type OrderStatus = "open" | "preparing" | "ready" | "closed";

interface OrderDetailProps {
  order: {
    id: string;
    table: number;
    status: OrderStatus;
    items: OrderItem[];
    total: number;
    time: string;
  };
  onStatusChange: (itemId: string, newStatus: OrderItem["status"]) => void;
}

const statusMap = {
  pending: { label: "Pendente", variant: "default" },
  preparing: { label: "Preparando", variant: "warning" },
  ready: { label: "Pronto", variant: "success" },
  delivered: { label: "Entregue", variant: "secondary" },
};

export function OrderDetail({ order, onStatusChange }: OrderDetailProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">Comanda #{order.id}</h2>
          <p className="text-muted-foreground">Mesa {order.table}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{order.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            <span>R$ {order.total.toFixed(2)}</span>
            <Button
              variant="default"
              size="sm"
              onClick={() =>
                (window.location.href = `/comandas/${order.id}/pagamento`)
              }
            >
              Pagar
            </Button>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Itens do Pedido</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Qtd</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{item.name}</div>
                      {item.notes && (
                        <div className="text-sm text-muted-foreground">
                          {item.notes}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>R$ {item.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        statusMap[item.status].variant as
                          | "default"
                          | "warning"
                          | "success"
                          | "secondary"
                      }
                    >
                      {statusMap[item.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {item.status === "pending" && (
                        <Button
                          size="sm"
                          onClick={() => onStatusChange(item.id, "preparing")}
                        >
                          Preparar
                        </Button>
                      )}
                      {item.status === "preparing" && (
                        <Button
                          size="sm"
                          onClick={() => onStatusChange(item.id, "ready")}
                        >
                          Pronto
                        </Button>
                      )}
                      {item.status === "ready" && (
                        <Button
                          size="sm"
                          onClick={() => onStatusChange(item.id, "delivered")}
                        >
                          Entregar
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
