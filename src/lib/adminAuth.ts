import { hasSupabaseConfig, supabase } from "./supabase";

const localAuthKey = "corpad_admin_session";
const demoEmail = import.meta.env.VITE_ADMIN_EMAIL ?? "admin@corpad.local";
const demoPassword = import.meta.env.VITE_ADMIN_PASSWORD ?? "corpad-admin";
const allowLocalAuth = import.meta.env.DEV;

function formatSupabaseAuthError(error: { message?: string; status?: number; name?: string }) {
  const parts = [
    "Erro do Supabase Auth",
    error.status ? `status ${error.status}` : "sem status HTTP",
    error.message || "mensagem nao informada",
  ];

  const message = error.message?.toLowerCase() ?? "";
  const hints = [];

  if (message.includes("invalid login credentials")) {
    hints.push("usuario/senha nao batem ou o email ainda nao esta confirmado");
  }

  if (message.includes("email not confirmed")) {
    hints.push("confirme o email em auth.users.email_confirmed_at");
  }

  if (message.includes("fetch")) {
    hints.push("verifique VITE_SUPABASE_URL, rede, CORS e se o projeto Supabase esta ativo");
  }

  return hints.length > 0 ? `${parts.join(" - ")}. Possiveis causas: ${hints.join("; ")}.` : parts.join(" - ");
}

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
    if (error) throw new Error(formatSupabaseAuthError(error));
    return;
  }

  if (!allowLocalAuth) {
    throw new Error(
      "Supabase nao configurado neste build. Confira na Vercel: VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY, depois faca Redeploy.",
    );
  }

  if (email !== demoEmail || password !== demoPassword) {
    throw new Error("Login local/demo ativo, mas e-mail ou senha demo nao conferem. O Supabase nao esta configurado neste build.");
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
