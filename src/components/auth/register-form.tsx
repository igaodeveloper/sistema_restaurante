import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Phone, Mail, Lock, User, Building2, MapPin } from "lucide-react";
import { notify } from "@/lib/notifications";
import { signUp } from "@/lib/auth";

interface RegisterFormProps {
  onStepChange?: (step: number) => void;
}

type FormData = {
  // Step 1 - Personal Info
  name: string;
  email: string;
  phone: string;
  // Step 2 - Business Info
  restaurant_name?: string;
  address?: string;
  role: "customer" | "staff" | "kitchen" | "admin";
  // Step 3 - Security
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
};

export default function RegisterForm({ onStepChange }: RegisterFormProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    restaurant_name: "",
    address: "",
    role: "customer",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const updateForm = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step === 1 && (!formData.name || !formData.email || !formData.phone)) {
      notify("order-status", "Erro", "Preencha todos os campos");
      return;
    }

    if (
      step === 2 &&
      (!formData.role ||
        (formData.role !== "customer" && !formData.restaurant_name))
    ) {
      notify("order-status", "Erro", "Preencha todos os campos obrigatórios");
      return;
    }

    if (step < 3) {
      setStep((s) => s + 1);
      onStepChange?.(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((s) => s - 1);
      onStepChange?.(step - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação do telefone
    const phoneRegex = /^(\(\d{2}\) \d{5}-\d{4}|\d{11})$/;
    if (!phoneRegex.test(formData.phone)) {
      notify("order-status", "Erro", "Telefone inválido. Use o formato (11) 99999-9999 ou 99999999999.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      notify("order-status", "Erro", "As senhas não coincidem");
      return;
    }

    if (!formData.acceptTerms) {
      notify("order-status", "Erro", "Você precisa aceitar os termos de uso");
      return;
    }

    setIsLoading(true);

    try {
      await signUp({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        phone: formData.phone,
        role: formData.role,
        metadata: {
          restaurant_name: formData.restaurant_name,
          address: formData.address,
        },
      });

      notify(
        "order-status",
        "Conta criada com sucesso!",
        "Verifique seu email para confirmar o cadastro",
      );
      navigate("/login");
    } catch (error) {
      notify(
        "order-status",
        "Erro ao criar conta",
        error instanceof Error ? error.message : "Tente novamente",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-white">
      {step === 1 && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome Completo</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-white/60" />
              <Input
                id="name"
                placeholder="João da Silva"
                className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                value={formData.name}
                onChange={(e) => updateForm("name", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-white/60" />
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                value={formData.email}
                onChange={(e) => updateForm("email", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-white/60" />
              <Input
                id="phone"
                placeholder="(11) 99999-9999"
                className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                value={formData.phone}
                onChange={(e) => updateForm("phone", e.target.value)}
                required
              />
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="role">Tipo de Conta</Label>
            <Select
              value={formData.role}
              onValueChange={(
                value: "customer" | "staff" | "kitchen" | "admin",
              ) => updateForm("role", value)}
            >
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Selecione o tipo de conta" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="customer">Cliente</SelectItem>
                <SelectItem value="staff">Funcionário</SelectItem>
                <SelectItem value="kitchen">Cozinheiro</SelectItem>
                <SelectItem value="admin">Administrador</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.role !== "customer" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="restaurant_name">Nome do Restaurante</Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-3 h-4 w-4 text-white/60" />
                  <Input
                    id="restaurant_name"
                    placeholder="Nome do estabelecimento"
                    className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    value={formData.restaurant_name}
                    onChange={(e) =>
                      updateForm("restaurant_name", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-white/60" />
                  <Input
                    id="address"
                    placeholder="Endereço completo"
                    className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    value={formData.address}
                    onChange={(e) => updateForm("address", e.target.value)}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-white/60" />
              <Input
                id="password"
                type="password"
                className="pl-9 bg-white/10 border-white/20 text-white"
                value={formData.password}
                onChange={(e) => updateForm("password", e.target.value)}
                required
                minLength={6}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar Senha</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-white/60" />
              <Input
                id="confirmPassword"
                type="password"
                className="pl-9 bg-white/10 border-white/20 text-white"
                value={formData.confirmPassword}
                onChange={(e) => updateForm("confirmPassword", e.target.value)}
                required
                minLength={6}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={formData.acceptTerms}
              onCheckedChange={(checked) => updateForm("acceptTerms", checked)}
              className="border-white/20 data-[state=checked]:bg-white data-[state=checked]:text-red-600"
            />
            <label
              htmlFor="terms"
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Aceito os{" "}
              <a href="/termos" className="text-white hover:underline">
                termos de uso
              </a>
            </label>
          </div>
        </div>
      )}

      <div className="flex gap-2">
        {step > 1 && (
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            className="flex-1 border-white/20 text-white hover:bg-white/20"
          >
            Voltar
          </Button>
        )}
        {step < 3 ? (
          <Button
            type="button"
            onClick={handleNext}
            className="flex-1 bg-white text-red-600 hover:bg-white/90"
          >
            Próximo
          </Button>
        ) : (
          <Button
            type="submit"
            className="flex-1 bg-white text-red-600 hover:bg-white/90"
            disabled={isLoading}
          >
            {isLoading ? "Registrando..." : "Criar Conta"}
          </Button>
        )}
      </div>
    </form>
  );
}
