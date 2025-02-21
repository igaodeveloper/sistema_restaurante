import { supabase } from "./supabase";
import { Database } from "@/types/supabase";

type User = Database["public"]["Tables"]["users"]["Row"];

export async function signUp({
  email,
  password,
  name,
  role = "staff",
}: {
  email: string;
  password: string;
  name: string;
  role?: User["role"];
}) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) throw authError;

  if (authData.user) {
    const { error: userError } = await supabase.from("users").insert({
      id: authData.user.id,
      email,
      name,
      role,
    });

    if (userError) throw userError;
  }

  return authData;
}

export async function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser(): Promise<User | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  return data;
}
