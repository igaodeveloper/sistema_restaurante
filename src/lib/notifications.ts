import { toast } from "sonner";

type NotificationType =
  | "order-ready"
  | "payment-success"
  | "order-status"
  | "new-order";

const notificationSounds = {
  "order-ready": new Audio(
    "https://api.tempolabs.ai/proxy-asset?url=https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3",
  ),
  "payment-success": new Audio(
    "https://api.tempolabs.ai/proxy-asset?url=https://assets.mixkit.co/active_storage/sfx/2870/2870-preview.mp3",
  ),
  "new-order": new Audio(
    "https://api.tempolabs.ai/proxy-asset?url=https://assets.mixkit.co/active_storage/sfx/2871/2871-preview.mp3",
  ),
};

export function notify(
  type: NotificationType,
  message: string,
  description?: string,
) {
  // Play sound if available
  notificationSounds[type]?.play().catch(() => {});

  // Show toast notification
  toast(message, {
    description,
    duration: 5000,
    className: type === "order-ready" ? "bg-green-50" : undefined,
  });
}
