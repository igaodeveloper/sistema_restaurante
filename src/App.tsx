import { Suspense } from "react";
import { RouterProvider, useRoutes } from "react-router-dom"; // Correção: Importando useRoutes
import { Toaster } from "sonner";
import { AuthProvider } from "@/contexts/auth-context";
import { router } from "@/routes";
import routes from "tempo-routes";

function App() {
  const tempoRoutes =
    import.meta.env.VITE_TEMPO === "true" ? useRoutes(routes) : null;

  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center bg-background">
          <div className="flex flex-col items-center gap-4">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="text-muted-foreground">Carregando...</p>
          </div>
        </div>
      }
    >
      <AuthProvider>
        <Toaster
          position="top-right"
          richColors
          expand={true}
          toastOptions={{
            className: "rounded-lg shadow-lg",
            style: {
              background: "var(--background)",
              color: "var(--foreground)",
              border: "1px solid var(--border)",
            },
          }}
        />
        <RouterProvider router={router} />

        {/* Tempo Routes */}
        {tempoRoutes}
      </AuthProvider>
    </Suspense>
  );
}

export default App;
