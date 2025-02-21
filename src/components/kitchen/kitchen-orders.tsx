import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock } from "lucide-react";
import { notify } from "@/lib/notifications";

type KitchenItem = {
  id: string;
  orderId: string;
  table: number;
  name: string;
  quantity: number;
  status: "pending" | "preparing" | "ready" | "delivered";
  notes?: string;
  time: string;
};

const mockItems: KitchenItem[] = [
  {
    id: "1",
    orderId: "#1234",
    table: 1,
    name: "X-Burger",
    quantity: 2,
    status: "pending",
    notes: "Sem cebola",
    time: "15:30",
  },
  {
    id: "2",
    orderId: "#1235",
    table: 3,
    name: "Batata Frita",
    quantity: 1,
    status: "preparing",
    time: "15:45",
  },
];

const completedItems: KitchenItem[] = [
  {
    id: "3",
    orderId: "#1230",
    table: 2,
    name: "X-Burger",
    quantity: 1,
    status: "delivered",
    time: "15:00",
  },
];

function OrderCard({
  item,
  onStatusChange,
}: {
  item: KitchenItem;
  onStatusChange?: (id: string, status: KitchenItem["status"]) => void;
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">Mesa {item.table}</CardTitle>
            <p className="text-sm text-muted-foreground">{item.orderId}</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {item.time}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="font-medium">
              {item.quantity}x {item.name}
            </div>
            {item.notes && (
              <div className="text-sm text-muted-foreground">{item.notes}</div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <Badge
              variant={
                item.status === "pending"
                  ? "default"
                  : item.status === "preparing"
                    ? "warning"
                    : item.status === "ready"
                      ? "success"
                      : "secondary"
              }
            >
              {item.status === "pending"
                ? "Pendente"
                : item.status === "preparing"
                  ? "Preparando"
                  : item.status === "ready"
                    ? "Pronto"
                    : "Entregue"}
            </Badge>
            {onStatusChange && item.status !== "delivered" && (
              <Button
                size="sm"
                onClick={() =>
                  onStatusChange(
                    item.id,
                    item.status === "pending"
                      ? "preparing"
                      : item.status === "preparing"
                        ? "ready"
                        : "delivered",
                  )
                }
              >
                {item.status === "pending"
                  ? "Iniciar Preparo"
                  : item.status === "preparing"
                    ? "Marcar Pronto"
                    : "Entregar"}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function KitchenOrders() {
  const handleStatusChange = (id: string, status: KitchenItem["status"]) => {
    // In a real app, you would update the status in your backend
    console.log(`Updating item ${id} to status ${status}`);

    // Show notification based on status
    if (status === "ready") {
      notify(
        "order-ready",
        "Pedido Pronto!",
        `O pedido #${id} está pronto para entrega`,
      );
    } else if (status === "preparing") {
      notify(
        "order-status",
        "Pedido em Preparo",
        `O pedido #${id} começou a ser preparado`,
      );
    }
  };

  return (
    <Tabs defaultValue="active" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="active">Pedidos Ativos</TabsTrigger>
        <TabsTrigger value="completed">Concluídos</TabsTrigger>
      </TabsList>
      <TabsContent value="active" className="mt-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockItems.map((item) => (
            <OrderCard
              key={item.id}
              item={item}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="completed" className="mt-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {completedItems.map((item) => (
            <OrderCard key={item.id} item={item} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
