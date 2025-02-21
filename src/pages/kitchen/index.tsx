import { KitchenOrders } from "@/components/kitchen/kitchen-orders";

export default function KitchenPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Cozinha</h1>
        <p className="text-muted-foreground">Gerencie os pedidos em preparo</p>
      </div>

      <KitchenOrders />
    </div>
  );
}
