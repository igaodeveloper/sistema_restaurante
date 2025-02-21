import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth-context";

type Props = {
  children: React.ReactNode;
  allowedRoles?: Array<"admin" | "staff" | "kitchen">;
};

export function AuthGuard({ children, allowedRoles }: Props) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/login");
      } else if (allowedRoles && !allowedRoles.includes(user.role)) {
        navigate("/");
      }
    }
  }, [user, loading, navigate, allowedRoles]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}
