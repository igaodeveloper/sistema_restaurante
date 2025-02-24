import { useState } from "react";
import RegisterForm from "@/components/auth/register-form";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-600 to-red-700 flex flex-col items-center justify-center p-4 relative">
      <Link
        to="/login"
        className="absolute top-4 left-4 text-white hover:text-white/90 transition-colors"
      >
        <Button variant="ghost" className="gap-2 text-current">
          <ChevronLeft className="h-4 w-4" />
          Voltar para Login
        </Button>
      </Link>

      <div className="w-full max-w-[1000px] grid md:grid-cols-2 gap-8 items-center">
        {/* Left side - Welcome message */}
        <div className="text-white space-y-6 text-center md:text-left">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl xl:text-5xl/none">
              Bem-vindo ao nosso Sistema
            </h1>
            <p className="text-white/80 text-lg">
              Junte-se a nós para uma experiência gastronômica excepcional
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-white/10 p-2 rounded-lg">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p>Gerencie pedidos em tempo real</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-white/10 p-2 rounded-lg">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p>Acompanhe o status da cozinha</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-white/10 p-2 rounded-lg">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p>Visualize relatórios detalhados</p>
            </div>
          </div>

          <div className="pt-4">
            <div className="flex gap-2 justify-center md:justify-start">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all duration-300 ${i <= step ? "w-8 bg-white" : "w-2 bg-white/30"}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right side - Registration form */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-white/10 rounded-3xl blur-3xl" />
          <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
            <RegisterForm onStepChange={setStep} />
          </div>
        </div>
      </div>
    </div>
  );
}
