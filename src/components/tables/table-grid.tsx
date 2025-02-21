import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type Table = {
  id: string;
  table_number: number;
  status: "free" | "occupied" | "reserved";
  reserved_for?: string;
};

interface TableGridProps {
  tables: Table[];
  onUpdateTable: (
    tableId: string,
    status: Table["status"],
    reservedFor?: string,
  ) => void;
}

function TableCard({
  table,
  onUpdate,
}: {
  table: Table;
  onUpdate: (status: Table["status"], reservedFor?: string) => void;
}) {
  const [isReserving, setIsReserving] = useState(false);
  const [reservedFor, setReservedFor] = useState("");

  return (
    <Card>
      <CardContent className="p-4">
        <div className="text-center space-y-4">
          <div className="text-2xl font-bold">Mesa {table.table_number}</div>
          <div
            className={cn(
              "text-sm font-medium px-2 py-1 rounded-full",
              table.status === "free" && "bg-green-100 text-green-700",
              table.status === "occupied" && "bg-red-100 text-red-700",
              table.status === "reserved" && "bg-yellow-100 text-yellow-700",
            )}
          >
            {table.status === "free" && "Livre"}
            {table.status === "occupied" && "Ocupada"}
            {table.status === "reserved" && "Reservada"}
          </div>
          {table.reserved_for && (
            <div className="text-sm text-muted-foreground">
              Reservada para: {table.reserved_for}
            </div>
          )}
          <div className="flex gap-2">
            <Dialog open={isReserving} onOpenChange={setIsReserving}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  disabled={table.status === "occupied"}
                >
                  Reservar
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Reservar Mesa {table.table_number}</DialogTitle>
                  <DialogDescription>
                    Insira os detalhes da reserva
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Nome da Reserva</Label>
                    <Input
                      placeholder="Nome do cliente"
                      value={reservedFor}
                      onChange={(e) => setReservedFor(e.target.value)}
                    />
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => {
                      onUpdate("reserved", reservedFor);
                      setIsReserving(false);
                      setReservedFor("");
                    }}
                    disabled={!reservedFor}
                  >
                    Confirmar Reserva
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button
              variant={table.status === "occupied" ? "outline" : "default"}
              size="sm"
              className="w-full"
              onClick={() =>
                onUpdate(table.status === "occupied" ? "free" : "occupied")
              }
            >
              {table.status === "occupied" ? "Liberar" : "Ocupar"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function TableGrid({ tables, onUpdateTable }: TableGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
      {tables.map((table) => (
        <TableCard
          key={table.id}
          table={table}
          onUpdate={(status, reservedFor) =>
            onUpdateTable(table.id, status, reservedFor)
          }
        />
      ))}
    </div>
  );
}
