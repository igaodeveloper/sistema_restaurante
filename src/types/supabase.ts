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
      orders: {
        Row: {
          id: string;
          user_id: string | null;
          table_id: string;
          status: "em_andamento" | "pronto" | "entregue" | "cancelado";
          total: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          table_id: string;
          status?: "em_andamento" | "pronto" | "entregue" | "cancelado";
          total?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          table_id?: string;
          status?: "em_andamento" | "pronto" | "entregue" | "cancelado";
          total?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          menu_item_id: string;
          quantity: number;
          subtotal: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          menu_item_id: string;
          quantity: number;
          subtotal: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          menu_item_id?: string;
          quantity?: number;
          subtotal?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      menu_items: {
        Row: {
          id: string;
          name: string;
          description: string;
          price: number;
          category: string;
          image_url: string;
          active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          price: number;
          category: string;
          image_url: string;
          active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          price?: number;
          category?: string;
          image_url?: string;
          active?: boolean;
          created_at?: string;
        };
      };
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          role: "admin" | "staff" | "kitchen";
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          role?: "admin" | "staff" | "kitchen";
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          role?: "admin" | "staff" | "kitchen";
          created_at?: string;
        };
      };
    };
  };
}
