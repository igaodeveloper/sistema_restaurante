import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Wallet } from "lucide-react";

type OrderItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

interface PaymentSummaryProps {
  items: OrderItem[];
  onPayment: (method: "credit" | "cash") => void;
}

export function PaymentSummary({ items, onPayment }: PaymentSummaryProps) {
  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Resumo do Pagamento</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>
                {item.quantity}x {item.name}
              </span>
              <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>R$ {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Taxa de serviço (10%)</span>
            <span>R$ {tax.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col space-y-2">
        <Button className="w-full gap-2" onClick={() => onPayment("credit")}>
          <CreditCard className="h-4 w-4" />
          Pagar com Cartão
        </Button>
        <Button
          variant="outline"
          className="w-full gap-2"
          onClick={() => onPayment("cash")}
        >
          <Wallet className="h-4 w-4" />
          Pagar com Dinheiro
        </Button>
      </CardFooter>
    </Card>
  );
}
