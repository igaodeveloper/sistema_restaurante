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
      products: {
        Row: {
          id: string;
          name: string;
          description: string;
          price: number;
          category: "burger" | "drink" | "dessert" | "side" | "combo";
          image_url: string;
          ingredients: string[];
          allergens: string[];
          nutritional_info: Json;
          preparation_time: number;
          is_available: boolean;
          is_featured: boolean;
          discount_percentage?: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          price: number;
          category: "burger" | "drink" | "dessert" | "side" | "combo";
          image_url: string;
          ingredients: string[];
          allergens?: string[];
          nutritional_info?: Json;
          preparation_time?: number;
          is_available?: boolean;
          is_featured?: boolean;
          discount_percentage?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          price?: number;
          category?: "burger" | "drink" | "dessert" | "side" | "combo";
          image_url?: string;
          ingredients?: string[];
          allergens?: string[];
          nutritional_info?: Json;
          preparation_time?: number;
          is_available?: boolean;
          is_featured?: boolean;
          discount_percentage?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      product_variations: {
        Row: {
          id: string;
          product_id: string;
          name: string;
          price_adjustment: number;
          is_available: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          name: string;
          price_adjustment: number;
          is_available?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          name?: string;
          price_adjustment?: number;
          is_available?: boolean;
          created_at?: string;
        };
      };
      product_extras: {
        Row: {
          id: string;
          name: string;
          price: number;
          category: string;
          is_available: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          price: number;
          category: string;
          is_available?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          price?: number;
          category?: string;
          is_available?: boolean;
          created_at?: string;
        };
      };
      combos: {
        Row: {
          id: string;
          name: string;
          description: string;
          price: number;
          products: string[];
          discount_percentage: number;
          is_available: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          price: number;
          products: string[];
          discount_percentage: number;
          is_available?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          price?: number;
          products?: string[];
          discount_percentage?: number;
          is_available?: boolean;
          created_at?: string;
        };
      };
    };
  };
}
