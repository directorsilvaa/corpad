import { hasSupabaseConfig, supabase } from "./supabase";

const localAuthKey = "corpad_admin_session";
const demoEmail = import.meta.env.VITE_ADMIN_EMAIL ?? "";
const demoPassword = import.meta.env.VITE_ADMIN_PASSWORD ?? "";
const allowLocalAuth = true;
const cpanelBlogApi = "/blog-api.php";

async function cpanelAdminRequest(action: string, body?: Record<string, unknown>) {
  const response = await fetch(`${cpanelBlogApi}?action=${encodeURIComponent(action)}`, {
    method: body ? "POST" : "GET",
    headers: body ? { "Content-Type": "application/json" } : undefined,
    credentials: "same-origin",
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(typeof data.error === "string" ? data.error : "Nao foi possivel acessar o painel.");
  }

  return data;
}

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

  try {
    const data = await cpanelAdminRequest("session");
    return Boolean(data.loggedIn);
  } catch {
    // Local fallback keeps the admin usable while developing without PHP.
  }

  return localStorage.getItem(localAuthKey) === "true";
}

export async function adminLogin(email: string, password: string) {
  if (hasSupabaseConfig && supabase) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(formatSupabaseAuthError(error));
    return;
  }

  try {
    await cpanelAdminRequest("login", { email, password });
    localStorage.setItem(localAuthKey, "true");
    return;
  } catch (error) {
    if (window.location.protocol !== "file:" && window.location.hostname !== "localhost") {
      throw error;
    }
  }

  if (!allowLocalAuth) {
    throw new Error(
      "Supabase nao configurado neste build. Configure VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY ou VITE_SUPABASE_ANON_KEY, depois faca Redeploy.",
    );
  }

  if (email !== demoEmail || password !== demoPassword) {
    throw new Error("E-mail ou senha incorretos. Se o Supabase nao estiver configurado, use o login admin do build.");
  }

  localStorage.setItem(localAuthKey, "true");
}

export async function adminLogout() {
  if (hasSupabaseConfig && supabase) {
    await supabase.auth.signOut();
  }

  try {
    await cpanelAdminRequest("logout");
  } catch {
    // Ignore PHP logout failures in local development.
  }

  localStorage.removeItem(localAuthKey);
}

export function getLocalDemoCredentials() {
  return { email: demoEmail, password: demoPassword };
}
