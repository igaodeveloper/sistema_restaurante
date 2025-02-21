import { Suspense } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "@/contexts/auth-context";
import { AuthGuard } from "@/components/auth/auth-guard";
import RootLayout from "./components/layout/root-layout";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import DashboardPage from "./pages/dashboard";
import OrderPage from "./pages/orders/[id]";
import PaymentPage from "./pages/orders/payment/[id]";
import MenuPage from "./pages/menu";
import KitchenPage from "./pages/kitchen";
import ReportsPage from "./pages/reports";
import TablesPage from "./pages/tables";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="text-muted-foreground">Carregando...</p>
          </div>
        </div>
      }
    >
      <AuthProvider>
        <Toaster position="top-right" richColors expand={true} />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route element={<RootLayout />}>
            {/* Dashboard - Accessible by all authenticated users */}
            <Route
              path="/"
              element={
                <AuthGuard>
                  <DashboardPage />
                </AuthGuard>
              }
            />

            {/* Tables & Orders - Staff and Admin only */}
            <Route
              path="/mesas"
              element={
                <AuthGuard allowedRoles={["admin", "staff"]}>
                  <TablesPage />
                </AuthGuard>
              }
            />
            <Route
              path="/comandas/:id"
              element={
                <AuthGuard allowedRoles={["admin", "staff"]}>
                  <OrderPage />
                </AuthGuard>
              }
            />
            <Route
              path="/comandas/:id/pagamento"
              element={
                <AuthGuard allowedRoles={["admin", "staff"]}>
                  <PaymentPage />
                </AuthGuard>
              }
            />

            {/* Menu - All authenticated users */}
            <Route
              path="/cardapio"
              element={
                <AuthGuard>
                  <MenuPage />
                </AuthGuard>
              }
            />

            {/* Kitchen - Kitchen staff and Admin only */}
            <Route
              path="/cozinha"
              element={
                <AuthGuard allowedRoles={["admin", "kitchen"]}>
                  <KitchenPage />
                </AuthGuard>
              }
            />

            {/* Reports - Admin only */}
            <Route
              path="/relatorios"
              element={
                <AuthGuard allowedRoles={["admin"]}>
                  <ReportsPage />
                </AuthGuard>
              }
            />
          </Route>

          {/* Catch all route - Redirect to dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Tempo Routes */}
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </AuthProvider>
    </Suspense>
  );
}

export default App;
