import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";
import { z } from "zod";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Validation schemas
const passwordSchema = z
  .string()
  .min(8, "A senha deve ter pelo menos 8 caracteres")
  .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
  .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
  .regex(/[0-9]/, "A senha deve conter pelo menos um número")
  .regex(
    /[^A-Za-z0-9]/,
    "A senha deve conter pelo menos um caractere especial",
  );

const emailSchema = z.string().email("Email inválido");

const phoneSchema = z
  .string()
  .regex(/^\(\d{2}\)\s\d{5}-\d{4}$/, "Telefone inválido");

const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  phone: phoneSchema,
  role: z.enum(["customer", "staff", "kitchen", "admin"]),
  metadata: z.object({
    restaurant_name: z.string().optional(),
    address: z.string().optional(),
  }),
});

type SignUpData = z.infer<typeof signUpSchema>;

export async function signUp(data: SignUpData) {
  // Validate input data
  const validatedData = signUpSchema.parse(data);

  // Check if email already exists
  const { data: existingUser } = await supabase
    .from("users")
    .select("id")
    .eq("email", validatedData.email)
    .single();

  if (existingUser) {
    throw new Error("Este email já está em uso");
  }

  // Create auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: validatedData.email,
    password: validatedData.password,
    options: {
      data: {
        name: validatedData.name,
        role: validatedData.role,
      },
    },
  });

  if (authError) throw authError;
  if (!authData.user) throw new Error("Erro ao criar usuário");

  // Create user profile
  const { error: profileError } = await supabase.from("users").insert({
    id: authData.user.id,
    email: validatedData.email,
    name: validatedData.name,
    phone: validatedData.phone,
    role: validatedData.role,
    restaurant_name: validatedData.metadata.restaurant_name,
    address: validatedData.metadata.address,
  });

  if (profileError) {
    // Rollback auth user creation
    await supabase.auth.admin.deleteUser(authData.user.id);
    throw profileError;
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
  // Validate input
  emailSchema.parse(email);

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  // Get user profile
  const { data: profile, error: profileError } = await supabase
    .from("users")
    .select("*")
    .eq("id", data.user.id)
    .single();

  if (profileError) throw profileError;

  return { ...data, profile };
}

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function resetPassword(email: string) {
  emailSchema.parse(email);

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });

  if (error) throw error;
}

export async function updatePassword(newPassword: string) {
  passwordSchema.parse(newPassword);

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) throw error;
}

export async function updateProfile(data: Partial<SignUpData>) {
  const { data: user } = await supabase.auth.getUser();
  if (!user) throw new Error("Usuário não autenticado");

  const { error } = await supabase
    .from("users")
    .update(data)
    .eq("id", user.user.id);

  if (error) throw error;
}

// Session management
export async function getSession() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (error) throw error;
  return session;
}

// Real-time session updates
export function onAuthStateChange(callback: (session: any) => void) {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(session);
  });
}
