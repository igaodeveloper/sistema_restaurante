import { useState } from "react";
import { useParams } from "react-router-dom";
import { PaymentSummary } from "@/components/payment/payment-summary";
import { PaymentSuccess } from "@/components/payment/payment-success";
import { notify } from "@/lib/notifications";

const mockOrder = {
  id: "1234",
  items: [
    { id: "1", name: "X-Burger", quantity: 2, price: 25.9 },
    { id: "2", name: "Batata Frita", quantity: 1, price: 12.9 },
    { id: "3", name: "Refrigerante", quantity: 2, price: 6.9 },
  ],
};

export default function PaymentPage() {
  const { id } = useParams();
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"credit" | "cash" | null>(
    null,
  );

  const handlePayment = (method: "credit" | "cash") => {
    // In a real app, you would process the payment here
    setPaymentMethod(method);
    setPaymentComplete(true);
    notify(
      "payment-success",
      "Pagamento Realizado!",
      `Pagamento da comanda #${mockOrder.id} foi processado com sucesso`,
    );
  };

  const total = mockOrder.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const totalWithTax = total + total * 0.1; // Including 10% tax

  if (paymentComplete && paymentMethod) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center p-4 flex-col gap-8">
        <PaymentSuccess
          orderId={mockOrder.id}
          total={totalWithTax}
          paymentMethod={paymentMethod}
        />
        <OrderRating
          orderId={mockOrder.id}
          onSubmit={(rating, feedback) => {
            // In a real app, save the rating and feedback to the database
            console.log({ orderId: mockOrder.id, rating, feedback });
            notify(
              "order-status",
              "Avaliação Recebida",
              "Obrigado pelo seu feedback!",
            );
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <PaymentSummary items={mockOrder.items} onPayment={handlePayment} />
    </div>
  );
}
