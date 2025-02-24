import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/auth";
import { Database } from "@/types/supabase";
import { notify } from "@/lib/notifications";

type User = Database["public"]["Tables"]["users"]["Row"];

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  updateUser: (data: Partial<User>) => Promise<void>;
  isAllowed: (allowedRoles?: string[]) => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUser(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        await fetchUser(session.user.id);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        navigate("/login");
      } else if (event === "USER_UPDATED" && session?.user) {
        await fetchUser(session.user.id);
      } else if (event === "USER_DELETED") {
        setUser(null);
        navigate("/login");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const fetchUser = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw error;

      setUser(data);
    } catch (error) {
      notify(
        "order-status",
        "Erro ao carregar usuário",
        error instanceof Error ? error.message : "Tente novamente",
      );
      await supabase.auth.signOut();
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (data: Partial<User>) => {
    if (!user) throw new Error("Usuário não autenticado");

    try {
      const { error } = await supabase
        .from("users")
        .update(data)
        .eq("id", user.id);

      if (error) throw error;

      setUser((prev) => (prev ? { ...prev, ...data } : null));
      notify("order-status", "Perfil atualizado com sucesso!");
    } catch (error) {
      notify(
        "order-status",
        "Erro ao atualizar perfil",
        error instanceof Error ? error.message : "Tente novamente",
      );
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      navigate("/login");
    } catch (error) {
      notify(
        "order-status",
        "Erro ao sair",
        error instanceof Error ? error.message : "Tente novamente",
      );
    }
  };

  const isAllowed = (allowedRoles?: string[]) => {
    if (!user) return false;
    if (!allowedRoles) return true;
    return allowedRoles.includes(user.role);
  };

  const value = {
    user,
    loading,
    signOut,
    updateUser,
    isAllowed,
  };

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
