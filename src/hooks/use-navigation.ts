import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "@/routes";

export function useNavigation() {
  const navigate = useNavigate();

  const goToLogin = useCallback(() => {
    navigate(routes.auth.login);
  }, [navigate]);

  const goToRegister = useCallback(() => {
    navigate(routes.auth.register);
  }, [navigate]);

  const goToResetPassword = useCallback(() => {
    navigate(routes.auth.resetPassword);
  }, [navigate]);

  const goToDashboard = useCallback(() => {
    navigate(routes.app.dashboard);
  }, [navigate]);

  const goToMenu = useCallback(() => {
    navigate(routes.app.menu);
  }, [navigate]);

  const goToKitchen = useCallback(() => {
    navigate(routes.app.kitchen);
  }, [navigate]);

  const goToTables = useCallback(() => {
    navigate(routes.app.tables);
  }, [navigate]);

  const goToOrder = useCallback(
    (orderId: string) => {
      navigate(`${routes.app.orders}/${orderId}`);
    },
    [navigate],
  );

  const goToOrderPayment = useCallback(
    (orderId: string) => {
      navigate(`${routes.app.orders}/${orderId}/pagamento`);
    },
    [navigate],
  );

  const goToReports = useCallback(() => {
    navigate(routes.app.reports);
  }, [navigate]);

  const goToProfile = useCallback(() => {
    navigate(routes.app.profile);
  }, [navigate]);

  const goToSettings = useCallback(() => {
    navigate(routes.app.settings);
  }, [navigate]);

  return {
    goToLogin,
    goToRegister,
    goToResetPassword,
    goToDashboard,
    goToMenu,
    goToKitchen,
    goToTables,
    goToOrder,
    goToOrderPayment,
    goToReports,
    goToProfile,
    goToSettings,
  };
}
