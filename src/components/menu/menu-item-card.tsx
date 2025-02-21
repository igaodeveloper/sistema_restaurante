import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  customizations?: {
    name: string;
    options: string[];
  }[];
};

interface MenuItemCardProps {
  item: MenuItem;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{item.name}</CardTitle>
          <span className="text-lg font-bold">R$ {item.price.toFixed(2)}</span>
        </div>
        <CardDescription>{item.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full">Ver Detalhes</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{item.name}</DialogTitle>
              <DialogDescription>{item.description}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-md"
              />
              <div>
                <h4 className="font-semibold mb-2">Preço</h4>
                <p>R$ {item.price.toFixed(2)}</p>
              </div>
              {item.customizations && (
                <div>
                  <h4 className="font-semibold mb-2">Personalizações</h4>
                  {item.customizations.map((custom) => (
                    <div key={custom.name} className="mt-2">
                      <p className="text-sm font-medium">{custom.name}</p>
                      <ul className="list-disc list-inside text-sm text-muted-foreground">
                        {custom.options.map((option) => (
                          <li key={option}>{option}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
