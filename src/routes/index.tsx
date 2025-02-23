import {
  createBrowserRouter,
  Navigate,
  useRoutes as useTempoRoutes,
} from "react-router-dom";
import { AuthGuard } from "@/components/auth/auth-guard";
import RootLayout from "@/components/layout/root-layout";
import LoginPage from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";
import DashboardPage from "@/pages/dashboard";
import MenuPage from "@/pages/menu";
import KitchenPage from "@/pages/kitchen";
import OrderPage from "@/pages/orders/[id]";
import PaymentPage from "@/pages/orders/payment/[id]";
import TablesPage from "@/pages/tables";
import ReportsPage from "@/pages/reports";
import routes from "tempo-routes";

// Componente que gerencia as rotas dinâmicas do "tempo-routes"
function TempoRoutes() {
  return import.meta.env.VITE_TEMPO === "true" ? useTempoRoutes(routes) : null;
}

// Configuração das rotas principais da aplicação
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      // Rotas dinâmicas da plataforma "tempo"
      {
        path: "tempobook/*",
        element: <TempoRoutes />,
      },
      {
        index: true,
        element: (
          <AuthGuard>
            <DashboardPage />
          </AuthGuard>
        ),
      },
      {
        path: "cardapio",
        element: (
          <AuthGuard>
            <MenuPage />
          </AuthGuard>
        ),
      },
      {
        path: "cozinha",
        element: (
          <AuthGuard allowedRoles={["admin", "kitchen"]}>
            <KitchenPage />
          </AuthGuard>
        ),
      },
      {
        path: "mesas",
        element: (
          <AuthGuard allowedRoles={["admin", "staff"]}>
            <TablesPage />
          </AuthGuard>
        ),
      },
      {
        path: "comandas/:id",
        element: (
          <AuthGuard allowedRoles={["admin", "staff"]}>
            <OrderPage />
          </AuthGuard>
        ),
      },
      {
        path: "comandas/:id/pagamento",
        element: (
          <AuthGuard allowedRoles={["admin", "staff"]}>
            <PaymentPage />
          </AuthGuard>
        ),
      },
      {
        path: "relatorios",
        element: (
          <AuthGuard allowedRoles={["admin"]}>
            <ReportsPage />
          </AuthGuard>
        ),
      },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "registro",
    element: <RegisterPage />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
