import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";

interface OrderRatingProps {
  orderId: string;
  onSubmit: (rating: number, feedback: string) => void;
}

export function OrderRating({ orderId, onSubmit }: OrderRatingProps) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Avalie seu Pedido</CardTitle>
        <CardDescription>Comanda #{orderId}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <Button
              key={value}
              variant="ghost"
              size="icon"
              onClick={() => setRating(value)}
              className={value <= rating ? "text-yellow-400" : "text-muted"}
            >
              <Star className="h-6 w-6 fill-current" />
            </Button>
          ))}
        </div>
        <Textarea
          placeholder="Conte-nos sobre sua experiência..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="min-h-[100px]"
        />
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={() => onSubmit(rating, feedback)}
          disabled={rating === 0}
        >
          Enviar Avaliação
        </Button>
      </CardFooter>
    </Card>
  );
}
