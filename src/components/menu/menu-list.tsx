import { useState } from "react";
import { MenuItemCard } from "./menu-item-card";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    id: "1",
    name: "X-Burger Clássico",
    description:
      "Hambúrguer artesanal, queijo, alface, tomate e maionese especial",
    price: 28.9,
    category: "Lanches",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
    customizations: [
      {
        name: "Ponto da Carne",
        options: ["Mal passado", "Ao ponto", "Bem passado"],
      },
      {
        name: "Extras",
        options: ["Bacon +R$4", "Ovo +R$2", "Cebola caramelizada +R$3"],
      },
    ],
  },
  {
    id: "2",
    name: "Batata Frita Crocante",
    description: "Batatas fritas crocantes com tempero especial da casa",
    price: 18.9,
    category: "Acompanhamentos",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500",
    customizations: [
      {
        name: "Molhos",
        options: ["Ketchup", "Mostarda", "Maionese", "Barbecue"],
      },
    ],
  },
  {
    id: "3",
    name: "Brownie com Sorvete",
    description: "Brownie quente com sorvete de baunilha e calda de chocolate",
    price: 16.9,
    category: "Sobremesas",
    image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=500",
  },
];

const categories = ["Todos", "Lanches", "Acompanhamentos", "Sobremesas"];

export function MenuList() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredItems =
    selectedCategory === "Todos"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="space-y-6">
      <div className="flex gap-2 pb-4 border-b overflow-x-auto">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
