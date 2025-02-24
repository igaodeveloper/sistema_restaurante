import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/auth-context";
import { AuthGuard } from "@/components/auth/auth-guard";
import RootLayout from "@/components/layout/root-layout";

// Lazy loaded components
const LoginPage = lazy(() => import("@/pages/auth/login"));
const RegisterPage = lazy(() => import("@/pages/auth/register"));
const DashboardPage = lazy(() => import("@/pages/dashboard"));
const MenuPage = lazy(() => import("@/pages/menu"));
const KitchenPage = lazy(() => import("@/pages/kitchen"));
const OrderPage = lazy(() => import("@/pages/orders/[id]"));
const PaymentPage = lazy(() => import("@/pages/orders/payment/[id]"));
const TablesPage = lazy(() => import("@/pages/tables"));
const ReportsPage = lazy(() => import("@/pages/reports"));
const ProfilePage = lazy(() => import("@/pages/profile"));
const SettingsPage = lazy(() => import("@/pages/settings"));
const ResetPasswordPage = lazy(() => import("@/pages/auth/reset-password"));
const ErrorPage = lazy(() => import("@/pages/error"));

// Route configurations
const routes = {
  auth: {
    login: "/login",
    register: "/registro",
    resetPassword: "/recuperar-senha",
    verifyEmail: "/verificar-email",
  },
  app: {
    home: "/",
    dashboard: "/dashboard",
    menu: "/cardapio",
    kitchen: "/cozinha",
    tables: "/mesas",
    orders: "/comandas",
    reports: "/relatorios",
    profile: "/perfil",
    settings: "/configuracoes",
  },
};

// Wrap element with AuthProvider
const withAuth = (element: React.ReactNode) => (
  <AuthProvider>{element}</AuthProvider>
);

// Router configuration
export const router = createBrowserRouter([
  {
    path: "/",
    element: withAuth(<RootLayout />),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <AuthGuard>
            <DashboardPage />
          </AuthGuard>
        ),
      },
      {
        path: routes.app.menu,
        element: (
          <AuthGuard>
            <MenuPage />
          </AuthGuard>
        ),
      },
      {
        path: routes.app.kitchen,
        element: (
          <AuthGuard allowedRoles={["admin", "kitchen"]}>
            <KitchenPage />
          </AuthGuard>
        ),
      },
      {
        path: routes.app.tables,
        element: (
          <AuthGuard allowedRoles={["admin", "staff"]}>
            <TablesPage />
          </AuthGuard>
        ),
      },
      {
        path: `${routes.app.orders}/:id`,
        element: (
          <AuthGuard allowedRoles={["admin", "staff"]}>
            <OrderPage />
          </AuthGuard>
        ),
      },
      {
        path: `${routes.app.orders}/:id/pagamento`,
        element: (
          <AuthGuard allowedRoles={["admin", "staff"]}>
            <PaymentPage />
          </AuthGuard>
        ),
      },
      {
        path: routes.app.reports,
        element: (
          <AuthGuard allowedRoles={["admin"]}>
            <ReportsPage />
          </AuthGuard>
        ),
      },
      {
        path: routes.app.profile,
        element: (
          <AuthGuard>
            <ProfilePage />
          </AuthGuard>
        ),
      },
      {
        path: routes.app.settings,
        element: (
          <AuthGuard>
            <SettingsPage />
          </AuthGuard>
        ),
      },
    ],
  },
  {
    path: routes.auth.login,
    element: withAuth(<LoginPage />),
  },
  {
    path: routes.auth.register,
    element: withAuth(<RegisterPage />),
  },
  {
    path: routes.auth.resetPassword,
    element: withAuth(<ResetPasswordPage />),
  },
  {
    path: "*",
    element: <Navigate to={routes.auth.login} replace />,
  },
]);

// Export routes configuration for use in components
export { routes };
