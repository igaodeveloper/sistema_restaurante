import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type MenuItem = {
  id: string;
  name: string;
  price: number;
  category: string;
};

const menuItems: MenuItem[] = [
  { id: "1", name: "X-Burger", price: 25.9, category: "Lanches" },
  { id: "2", name: "Batata Frita", price: 12.9, category: "Acompanhamentos" },
  { id: "3", name: "Refrigerante", price: 6.9, category: "Bebidas" },
];

interface AddItemFormProps {
  onAddItem: (item: {
    menuItemId: string;
    quantity: number;
    notes: string;
  }) => void;
}

export function AddItemForm({ onAddItem }: AddItemFormProps) {
  const [menuItemId, setMenuItemId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddItem({ menuItemId, quantity, notes });
    setMenuItemId("");
    setQuantity(1);
    setNotes("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Adicionar Item</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="item">Item</Label>
            <Select value={menuItemId} onValueChange={setMenuItemId}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um item" />
              </SelectTrigger>
              <SelectContent>
                {menuItems.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name} - R$ {item.price.toFixed(2)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantidade</Label>
            <Input
              id="quantity"
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Observações</Label>
            <Textarea
              id="notes"
              placeholder="Ex: Sem cebola, ponto da carne, etc."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Adicionar ao Pedido
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
