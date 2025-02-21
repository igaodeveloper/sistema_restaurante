import { useState } from "react";
import { TableGrid } from "@/components/tables/table-grid";
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

const mockTables = [
  { id: "1", table_number: 1, status: "free" },
  { id: "2", table_number: 2, status: "occupied" },
  { id: "3", table_number: 3, status: "reserved", reserved_for: "João Silva" },
  { id: "4", table_number: 4, status: "free" },
] as const;

export default function TablesPage() {
  const [tables, setTables] = useState(mockTables);
  const [isAddingTable, setIsAddingTable] = useState(false);
  const [newTableNumber, setNewTableNumber] = useState("");

  const handleUpdateTable = (
    tableId: string,
    status: (typeof mockTables)[number]["status"],
    reservedFor?: string,
  ) => {
    setTables((prev) =>
      prev.map((table) =>
        table.id === tableId
          ? { ...table, status, reserved_for: reservedFor }
          : table,
      ),
    );
  };

  const handleAddTable = () => {
    const tableNumber = parseInt(newTableNumber);
    if (tableNumber && !tables.find((t) => t.table_number === tableNumber)) {
      setTables((prev) => [
        ...prev,
        {
          id: String(Date.now()),
          table_number: tableNumber,
          status: "free",
        },
      ]);
      setNewTableNumber("");
      setIsAddingTable(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Mesas</h1>
          <p className="text-muted-foreground">
            Gerencie as mesas do restaurante
          </p>
        </div>

        <Dialog open={isAddingTable} onOpenChange={setIsAddingTable}>
          <DialogTrigger asChild>
            <Button>Adicionar Mesa</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Nova Mesa</DialogTitle>
              <DialogDescription>
                Insira o número da nova mesa
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Número da Mesa</Label>
                <Input
                  type="number"
                  placeholder="Ex: 5"
                  value={newTableNumber}
                  onChange={(e) => setNewTableNumber(e.target.value)}
                />
              </div>
              <Button
                className="w-full"
                onClick={handleAddTable}
                disabled={!newTableNumber}
              >
                Adicionar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <TableGrid tables={tables} onUpdateTable={handleUpdateTable} />
    </div>
  );
}
