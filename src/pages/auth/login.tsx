import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Lock } from "lucide-react";
import { signIn, signInWithGoogle } from "@/lib/auth";
import { notify } from "@/lib/notifications";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signIn({
        email: formData.email,
        password: formData.password,
      });
      navigate("/");
    } catch (error) {
      notify(
        "order-status",
        "Erro ao fazer login",
        error instanceof Error ? error.message : "Credenciais inválidas",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      notify(
        "order-status",
        "Erro ao fazer login com Google",
        error instanceof Error ? error.message : "Tente novamente",
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="w-full max-w-[900px] grid md:grid-cols-2 gap-4 items-center bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
        {/* Left side */}
        <div className="text-white space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">BEM VINDO</h1>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Novo Login</h2>
            <p className="text-white/80">Crie sua conta para começar</p>
          </div>
          <Button
            variant="outline"
            className="w-full border-white/20 text-white hover:bg-white/20"
            onClick={() => navigate("/registro")}
          >
            Criar conta
          </Button>
          <div className="flex gap-2 justify-center">
            <button
              onClick={handleGoogleSignIn}
              className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            >
              <img
                src="https://api.iconify.design/flat-color-icons:google.svg"
                className="w-6 h-6"
                alt="Google"
              />
            </button>
            <button className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
              <img
                src="https://api.iconify.design/logos:telegram.svg"
                className="w-6 h-6"
                alt="Telegram"
              />
            </button>
            <button className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
              <img
                src="https://api.iconify.design/logos:whatsapp-icon.svg"
                className="w-6 h-6"
                alt="WhatsApp"
              />
            </button>
          </div>
        </div>

        {/* Right side */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-white/10 rounded-3xl blur-3xl" />
          <div className="relative space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold tracking-tight text-white">
                FAÇA LOGIN
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-white/60" />
                  <Input
                    placeholder="USUÁRIO"
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 h-10"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-white/60" />
                  <Input
                    type="password"
                    placeholder="********"
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 h-10"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={formData.remember}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, remember: !!checked }))
                    }
                    className="border-white/20 data-[state=checked]:bg-white data-[state=checked]:text-purple-600"
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Lembrar
                  </label>
                </div>

                <Link
                  to="/recuperar-senha"
                  className="text-sm text-white hover:underline"
                >
                  Esqueceu senha?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-white text-purple-600 hover:bg-white/90 h-10"
                disabled={isLoading}
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
