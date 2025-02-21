import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY || "placeholder-key";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Realtime subscriptions
export const subscribeToOrders = (callback: (payload: any) => void) => {
  return supabase
    .channel("orders")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "orders" },
      callback,
    )
    .subscribe();
};

export const subscribeToOrderItems = (callback: (payload: any) => void) => {
  return supabase
    .channel("order_items")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "order_items" },
      callback,
    )
    .subscribe();
};
