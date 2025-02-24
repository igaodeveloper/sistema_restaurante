export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          phone: string;
          role: "customer" | "staff" | "kitchen" | "admin";
          restaurant_name?: string;
          address?: string;
          avatar_url?: string;
          created_at: string;
          updated_at: string;
          last_sign_in_at?: string;
          is_active: boolean;
        };
        Insert: {
          id: string;
          email: string;
          name: string;
          phone: string;
          role: "customer" | "staff" | "kitchen" | "admin";
          restaurant_name?: string;
          address?: string;
          avatar_url?: string;
          created_at?: string;
          updated_at?: string;
          last_sign_in_at?: string;
          is_active?: boolean;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          phone?: string;
          role?: "customer" | "staff" | "kitchen" | "admin";
          restaurant_name?: string;
          address?: string;
          avatar_url?: string;
          created_at?: string;
          updated_at?: string;
          last_sign_in_at?: string;
          is_active?: boolean;
        };
      };
    };
  };
}
