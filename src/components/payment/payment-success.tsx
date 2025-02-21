import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PaymentSuccessProps {
  orderId: string;
  total: number;
  paymentMethod: "credit" | "cash";
}

export function PaymentSuccess({
  orderId,
  total,
  paymentMethod,
}: PaymentSuccessProps) {
  const navigate = useNavigate();

  return (
    <Card className="w-full max-w-md text-center">
      <CardHeader>
        <div className="flex justify-center mb-4">
          <CheckCircle2 className="h-12 w-12 text-green-500" />
        </div>
        <CardTitle className="text-2xl">Pagamento Realizado!</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-muted-foreground">
          <p>Comanda #{orderId}</p>
          <p className="text-xl font-bold mt-2">R$ {total.toFixed(2)}</p>
          <p className="text-sm mt-1">
            Pago com {paymentMethod === "credit" ? "Cartão" : "Dinheiro"}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex-col space-y-2">
        <Button className="w-full" onClick={() => navigate("/")}>
          Voltar ao Início
        </Button>
      </CardFooter>
    </Card>
  );
}
