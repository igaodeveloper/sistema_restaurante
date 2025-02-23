import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Menu as MenuIcon, ChefHat, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import "@/styles/animations.css";

interface HeaderProps {
  onToggleSidebar?: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-yellow-500/20 bg-red-600/95 backdrop-blur supports-[backdrop-filter]:bg-red-600/80 animate-slideDown">
      <div className="container flex h-16 items-center gap-4">
        {onToggleSidebar && (
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:bg-white/20"
            onClick={onToggleSidebar}
          >
            <MenuIcon className="h-5 w-5" />
          </Button>
        )}

        <div className="flex flex-1 items-center gap-6">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-white p-2 rounded-lg shadow-lg transform transition-transform group-hover:scale-105">
              <ChefHat className="h-6 w-6 text-red-600" />
            </div>
            <span className="font-bold text-xl text-white hidden md:inline-block tracking-tight">
              Sistema Restaurante
            </span>
          </Link>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all",
                      "text-white hover:bg-white/20",
                      "focus:bg-white/20 focus:outline-none",
                      "data-[active]:bg-white/20",
                    )}
                  >
                    Dashboard
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/cardapio">
                  <NavigationMenuLink
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all",
                      "text-white hover:bg-white/20",
                      "focus:bg-white/20 focus:outline-none",
                      "data-[active]:bg-white/20",
                    )}
                  >
                    Cardápio
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/cozinha">
                  <NavigationMenuLink
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all",
                      "text-white hover:bg-white/20",
                      "focus:bg-white/20 focus:outline-none",
                      "data-[active]:bg-white/20",
                    )}
                  >
                    Cozinha
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex-1 max-w-xl">
            <div className="relative group">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-white/60 group-focus-within:text-white transition-colors" />
              <Input
                placeholder="Buscar..."
                className="pl-8 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 transition-all"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20 relative animate-scaleIn"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-yellow-400 text-red-600 rounded-full text-xs flex items-center justify-center font-bold">
              3
            </span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full ring-2 ring-white/20 hover:ring-white/40 transition-all"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
                    alt="@john"
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 animate-scaleIn"
              align="end"
              forceMount
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">John Doe</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    john@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="hover:bg-red-600/10 cursor-pointer transition-colors">
                <Link to="/perfil" className="w-full">
                  Perfil
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-red-600/10 cursor-pointer transition-colors">
                <Link to="/configuracoes" className="w-full">
                  Configurações
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="hover:bg-red-600/10 cursor-pointer transition-colors">
                <Link to="/login" className="w-full">
                  Sair
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
