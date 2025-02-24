import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Lock, Eye, EyeOff } from "lucide-react";
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
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signIn({ email: formData.email, password: formData.password });
      navigate("/");
    } catch (error) {
      notify("order-status", "Erro ao fazer login", error instanceof Error ? error.message : "Credenciais inválidas");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      notify("order-status", "Erro ao fazer login com Google", error instanceof Error ? error.message : "Tente novamente");
    }
  };

  return (
    <div className="min-h-screen bg-red-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl text-center">
        <h1 className="text-3xl font-bold text-white">BEM VINDO</h1>
        <h2 className="text-xl font-semibold text-white mt-2">FAÇA LOGIN</h2>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="relative">
            <User className="absolute left-3 top-2.5 h-5 w-5 text-red-600" />
            <Input
              placeholder="USUÁRIO"
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 h-10 w-full"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-red-600" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="********"
              className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 h-10 w-full"
              value={formData.password}
              onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
            />
            <button
              type="button"
              className="absolute right-3 top-2.5 h-5 w-5 text-red-600"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <Button type="submit" className="w-full bg-white text-red-600 hover:bg-white/90 h-10" disabled={isLoading}>
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>
        </form>

        <p className="text-white mt-4">Ainda não tem uma conta?</p>
        <Button className="w-full bg-white text-red-600 hover:bg-white/90 h-10 mt-2" onClick={() => navigate("/registro")}>
          Criar conta
        </Button>
      </div>
    </div>
  );
}
