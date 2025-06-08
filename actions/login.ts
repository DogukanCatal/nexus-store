"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { LoginFormData, loginSchema } from "@/schemas/auth/login-schema";

export async function login(formData: LoginFormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const parse = loginSchema.safeParse(formData);
  if (!parse.success) {
    return { error: parse.error.format };
  }

  const { email, password } = parse.data;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect("/error");
  }

  const { data: existingUser } = await supabase
    .from("users")
    .select("id")
    .eq("id", data.user.id)
    .single();

  if (!existingUser) {
    await supabase.from("users").insert({
      id: data.user.id,
      full_name: data.user.user_metadata.full_name ?? "",
      email: data.user.email,
      role_id: process.env.CUSTOMER_ROLE_ID,
    });
  }
  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
