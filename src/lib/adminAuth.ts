import { hasSupabaseConfig, supabase } from "./supabase";

const localAuthKey = "corpad_admin_session";
const demoEmail = import.meta.env.VITE_ADMIN_EMAIL ?? "admin@corpad.local";
const demoPassword = import.meta.env.VITE_ADMIN_PASSWORD ?? "corpad-admin";

export async function isAdminLoggedIn() {
  if (hasSupabaseConfig && supabase) {
    const { data } = await supabase.auth.getSession();
    return Boolean(data.session);
  }

  return localStorage.getItem(localAuthKey) === "true";
}

export async function adminLogin(email: string, password: string) {
  if (hasSupabaseConfig && supabase) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return;
  }

  if (email !== demoEmail || password !== demoPassword) {
    throw new Error("E-mail ou senha incorretos.");
  }

  localStorage.setItem(localAuthKey, "true");
}

export async function adminLogout() {
  if (hasSupabaseConfig && supabase) {
    await supabase.auth.signOut();
  }

  localStorage.removeItem(localAuthKey);
}

export function getLocalDemoCredentials() {
  return { email: demoEmail, password: demoPassword };
}
