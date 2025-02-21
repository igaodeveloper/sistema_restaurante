import { useState } from "react";
import { useParams } from "react-router-dom";
import { OrderDetail } from "@/components/orders/order-detail";
import { AddItemForm } from "@/components/orders/add-item-form";
import { notify } from "@/lib/notifications";

const mockOrder = {
  id: "1234",
  table: 5,
  status: "open",
  items: [
    {
      id: "item1",
      name: "X-Burger",
      quantity: 2,
      price: 25.9,
      status: "pending",
      notes: "Sem cebola",
    },
    {
      id: "item2",
      name: "Batata Frita",
      quantity: 1,
      price: 12.9,
      status: "preparing",
    },
  ],
  total: 64.7,
  time: "19:30",
};

export default function OrderPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(mockOrder);

  const handleStatusChange = (itemId: string, newStatus: string) => {
    // Show notification for status change
    if (newStatus === "ready") {
      notify(
        "order-ready",
        "Item Pronto!",
        `O item do pedido #${id} está pronto para servir`,
      );
    }
    setOrder((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === itemId ? { ...item, status: newStatus } : item,
      ),
    }));
  };

  const handleAddItem = ({
    menuItemId,
    quantity,
    notes,
  }: {
    menuItemId: string;
    quantity: number;
    notes: string;
  }) => {
    // In a real app, you would fetch the menu item details from an API
    const menuItem = {
      id: `item${Date.now()}`,
      name: "Novo Item",
      quantity,
      price: 25.9,
      status: "pending",
      notes,
    };

    setOrder((prev) => ({
      ...prev,
      items: [...prev.items, menuItem],
      total: prev.total + menuItem.price * quantity,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-[1fr,300px]">
        <OrderDetail order={order} onStatusChange={handleStatusChange} />
        <AddItemForm onAddItem={handleAddItem} />
      </div>
    </div>
  );
}
