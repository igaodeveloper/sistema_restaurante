import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";
import Sidebar from "./sidebar";
import Footer from "./footer";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RootLayout() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="relative min-h-screen">
      <Header onToggleSidebar={() => setShowSidebar(!showSidebar)} />
      <div className="flex">
        {showSidebar && (
          <aside
            className={cn(
              "border-r bg-background transition-all duration-300",
              isCollapsed ? "w-[80px]" : "w-64",
            )}
          >
            <div className="flex h-[52px] items-center justify-end border-b px-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                {isCollapsed ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <ChevronLeft className="h-4 w-4" />
                )}
              </Button>
            </div>
            <Sidebar isCollapsed={isCollapsed} />
          </aside>
        )}
        <main className="flex-1">
          <div className="container py-6">
            <Outlet />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
