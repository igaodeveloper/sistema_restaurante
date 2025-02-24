import {
  useRouteError,
  isRouteErrorResponse,
  useNavigate,
} from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, RefreshCcw } from "lucide-react";

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  let errorMessage = "Ocorreu um erro inesperado";
  let statusCode = 500;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.data?.message || error.statusText;
    statusCode = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-primary">{statusCode}</h1>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Oops! Algo deu errado</h2>
          <p className="text-muted-foreground">{errorMessage}</p>
        </div>
        <div className="flex gap-4 justify-center">
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => window.location.reload()}
          >
            <RefreshCcw className="h-4 w-4" />
            Tentar novamente
          </Button>
          <Button className="gap-2" onClick={() => navigate("/")}>
            <Home className="h-4 w-4" />
            Voltar ao início
          </Button>
        </div>
      </div>
    </div>
  );
}
