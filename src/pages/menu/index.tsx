import { MenuList } from "@/components/menu/menu-list";

export default function MenuPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Cardápio</h1>
        <p className="text-muted-foreground">
          Explore nosso menu de pratos deliciosos
        </p>
      </div>

      <MenuList />
    </div>
  );
}
