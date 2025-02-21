import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  ChefHat,
  ClipboardList,
  BarChart3,
  UtensilsCrossed,
  Users,
  Settings,
} from "lucide-react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isCollapsed?: boolean;
}

interface SidebarItem {
  title: string;
  icon: React.ReactNode;
  href: string;
  variant: "default" | "ghost";
  role?: "admin" | "staff" | "kitchen";
}

const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard className="h-4 w-4" />,
    href: "/",
    variant: "ghost",
  },
  {
    title: "Cozinha",
    icon: <ChefHat className="h-4 w-4" />,
    href: "/cozinha",
    variant: "ghost",
    role: "kitchen",
  },
  {
    title: "Mesas",
    icon: <Users className="h-4 w-4" />,
    href: "/mesas",
    variant: "ghost",
    role: "staff",
  },
  {
    title: "Comandas",
    icon: <ClipboardList className="h-4 w-4" />,
    href: "/comandas",
    variant: "ghost",
    role: "staff",
  },
  {
    title: "Cardápio",
    icon: <UtensilsCrossed className="h-4 w-4" />,
    href: "/cardapio",
    variant: "ghost",
  },
  {
    title: "Relatórios",
    icon: <BarChart3 className="h-4 w-4" />,
    href: "/relatorios",
    variant: "ghost",
    role: "admin",
  },
  {
    title: "Funcionários",
    icon: <Users className="h-4 w-4" />,
    href: "/funcionarios",
    variant: "ghost",
    role: "admin",
  },
  {
    title: "Configurações",
    icon: <Settings className="h-4 w-4" />,
    href: "/configuracoes",
    variant: "ghost",
    role: "admin",
  },
];

export default function Sidebar({
  className,
  isCollapsed = false,
}: SidebarProps) {
  // In a real app, you would get this from your auth context
  const userRole = "admin";

  const filteredItems = sidebarItems.filter(
    (item) => !item.role || item.role === userRole,
  );

  return (
    <ScrollArea className={cn("h-full", className)}>
      <div
        className={cn(
          "flex flex-col gap-4 py-4",
          isCollapsed ? "px-2" : "px-4",
        )}
      >
        {filteredItems.map((item) => (
          <Link key={item.href} to={item.href} className="no-underline">
            <Button
              variant={item.variant}
              className={cn(
                "w-full justify-start gap-2",
                isCollapsed && "justify-center",
              )}
            >
              {item.icon}
              {!isCollapsed && <span>{item.title}</span>}
            </Button>
          </Link>
        ))}
      </div>
    </ScrollArea>
  );
}
