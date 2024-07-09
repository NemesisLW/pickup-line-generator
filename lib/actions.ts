"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "./supabase/server";

export async function login(formData: FormData) {
  const supabase = createClient();

  // Sign in with OAuth - Google
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",

    //  TO-DO: Add dynamic redirect URL
    options: { redirectTo: "http://localhost:3000/auth/callback" },
  });

  if (error) {
    redirect("/error");
  }

  if (data.url) {
    redirect(data.url);
  }

  revalidatePath("/", "layout");
  // redirect("/generate");
}

export async function signOut(formData: FormData) {
  const supabase = createClient();

  await supabase.auth.signOut();

  revalidatePath("/", "layout");
  redirect("/");
}
