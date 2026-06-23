import { hasSupabaseConfig, supabase } from "./supabase";

export type BlogPostStatus = "draft" | "published" | "scheduled";

export type BlogPost = {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  category: string;
  excerpt: string;
  coverImage: string;
  imageAlt: string;
  content: string;
  authorName: string;
  authorPhoto: string;
  authorRole: string;
  authorBio: string;
  metaTitle: string;
  metaDescription: string;
  keyword: string;
  ctaLabel: string;
  ctaUrl: string;
  ctaText: string;
  status: BlogPostStatus;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type BlogPostInput = Omit<BlogPost, "id" | "createdAt" | "updatedAt" | "publishedAt"> & {
  publishedAt?: string | null;
};

type BlogPostRow = {
  id: string;
  title: string;
  subtitle?: string | null;
  slug: string;
  category: string;
  excerpt: string;
  cover_image: string | null;
  image_alt?: string | null;
  content: string;
  author_name?: string | null;
  author_photo?: string | null;
  author_role?: string | null;
  author_bio?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  keyword?: string | null;
  cta_label?: string | null;
  cta_url?: string | null;
  cta_text?: string | null;
  status: BlogPostStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

const localStorageKey = "corpad_blog_posts";
const localCategoriesKey = "corpad_blog_categories";
const localAuthorsKey = "corpad_blog_authors";
const localSettingsKey = "corpad_blog_settings";
const localAnalyticsKey = "corpad_blog_analytics";
const cpanelBlogApi = "/blog-api.php";

export type BlogSettings = {
  title: string;
  description: string;
  bannerImage: string;
  postsPerPage: number;
  defaultCta: string;
  defaultCtaUrl: string;
  socialLinks: string;
  showAuthor: boolean;
  showReadingTime: boolean;
};

export type BlogAnalytics = Record<string, { views: number; leads: number; ctaClicks: number }>;

export type BlogAuthor = {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
};

export const defaultBlogSettings: BlogSettings = {
  title: "Blog CORPAD",
  description: "Conteudos sobre digital, consultoria, tecnologia e crescimento empresarial.",
  bannerImage: "",
  postsPerPage: 9,
  defaultCta: "Falar com um consultor",
  defaultCtaUrl: "https://wa.me/5516996094649",
  socialLinks: "",
  showAuthor: true,
  showReadingTime: true,
};

export const blogCategories = [
  "Gestao empresarial",
  "Automacao",
  "Atendimento ao cliente",
  "CRM",
  "Vendas",
  "Tecnologia",
  "Inteligencia artificial",
];

export const defaultBlogAuthors: BlogAuthor[] = [
  {
    id: "corpad-team",
    name: "Equipe CORPAD",
    role: "Conteudo institucional",
    bio: "Conteudos sobre digital, consultoria e tecnologia para empresas.",
    photo: "",
  },
];

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function withDefaults(post: Partial<BlogPost> & Pick<BlogPost, "id" | "title" | "slug" | "category" | "excerpt" | "content" | "status" | "createdAt" | "updatedAt">): BlogPost {
  return {
    coverImage: "",
    imageAlt: "",
    subtitle: "",
    authorName: "Equipe CORPAD",
    authorPhoto: "",
    authorRole: "Conteudo institucional",
    authorBio: "Conteudos sobre digital, consultoria e tecnologia para empresas.",
    metaTitle: post.title,
    metaDescription: post.excerpt,
    keyword: "",
    ctaLabel: "Falar com um consultor",
    ctaUrl: "https://wa.me/5516996094649",
    ctaText: "Quer melhorar os resultados da sua empresa?",
    publishedAt: null,
    ...post,
  };
}

function mapRow(row: BlogPostRow): BlogPost {
  return withDefaults({
    id: row.id,
    title: row.title,
    subtitle: row.subtitle ?? "",
    slug: row.slug,
    category: row.category,
    excerpt: row.excerpt,
    coverImage: row.cover_image ?? "",
    imageAlt: row.image_alt ?? "",
    content: row.content,
    authorName: row.author_name ?? "Equipe CORPAD",
    authorPhoto: row.author_photo ?? "",
    authorRole: row.author_role ?? "Conteudo institucional",
    authorBio: row.author_bio ?? "Conteudos sobre digital, consultoria e tecnologia para empresas.",
    metaTitle: row.meta_title ?? row.title,
    metaDescription: row.meta_description ?? row.excerpt,
    keyword: row.keyword ?? "",
    ctaLabel: row.cta_label ?? "Falar com um consultor",
    ctaUrl: row.cta_url ?? "https://wa.me/5516996094649",
    ctaText: row.cta_text ?? "Quer melhorar os resultados da sua empresa?",
    status: row.status,
    publishedAt: row.published_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  });
}

function toRow(input: BlogPostInput) {
  return {
    title: input.title,
    subtitle: input.subtitle || null,
    slug: input.slug,
    category: input.category,
    excerpt: input.excerpt,
    cover_image: input.coverImage || null,
    image_alt: input.imageAlt || null,
    content: input.content,
    author_name: input.authorName || null,
    author_photo: input.authorPhoto || null,
    author_role: input.authorRole || null,
    author_bio: input.authorBio || null,
    meta_title: input.metaTitle || null,
    meta_description: input.metaDescription || null,
    keyword: input.keyword || null,
    cta_label: input.ctaLabel || null,
    cta_url: input.ctaUrl || null,
    cta_text: input.ctaText || null,
    status: input.status,
    published_at:
      input.status === "published" || input.status === "scheduled"
        ? input.publishedAt ?? new Date().toISOString()
        : null,
  };
}

async function cpanelBlogRequest<T>(action: string, options: { method?: "GET" | "POST"; body?: unknown; query?: Record<string, string> } = {}) {
  const params = new URLSearchParams({ action, ...(options.query ?? {}) });
  const response = await fetch(`${cpanelBlogApi}?${params.toString()}`, {
    method: options.method ?? (options.body ? "POST" : "GET"),
    headers: options.body ? { "Content-Type": "application/json" } : undefined,
    credentials: "same-origin",
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  const responseText = await response.text();
  let data: Record<string, unknown> = {};

  try {
    data = responseText ? JSON.parse(responseText) as Record<string, unknown> : {};
  } catch {
    if (!response.ok) {
      throw new Error("O servidor nao conseguiu processar a imagem. Tente uma foto menor ou verifique o limite de upload do PHP.");
    }

    throw new Error("O servidor retornou uma resposta invalida.");
  }

  if (!response.ok) {
    throw new Error(typeof data.error === "string" ? data.error : "Nao foi possivel acessar o blog no servidor.");
  }

  return data as T;
}

function canUseCpanelBlogApi() {
  return typeof window !== "undefined" && window.location.protocol !== "file:";
}

function readLocalPosts(): BlogPost[] {
  try {
    return (JSON.parse(localStorage.getItem(localStorageKey) ?? "[]") as BlogPost[]).map((post) =>
      withDefaults(post),
    );
  } catch {
    return [];
  }
}

function writeLocalPosts(posts: BlogPost[]) {
  try {
    localStorage.setItem(localStorageKey, JSON.stringify(posts));
  } catch (error) {
    if (error instanceof DOMException && (error.name === "QuotaExceededError" || error.name === "NS_ERROR_DOM_QUOTA_REACHED")) {
      throw new Error(
        "Nao foi possivel salvar porque o armazenamento local ficou cheio. Remova imagens muito grandes ou use uma URL de imagem/Supabase.",
      );
    }

    throw error;
  }
}

export function listBlogCategories() {
  try {
    const categories = JSON.parse(localStorage.getItem(localCategoriesKey) ?? "[]") as string[];
    return categories.length > 0 ? categories : blogCategories;
  } catch {
    return blogCategories;
  }
}

export function saveBlogCategories(categories: string[]) {
  localStorage.setItem(localCategoriesKey, JSON.stringify(categories.filter(Boolean)));
}

export function listBlogAuthors() {
  try {
    const authors = JSON.parse(localStorage.getItem(localAuthorsKey) ?? "[]") as BlogAuthor[];
    return authors.length > 0 ? authors : defaultBlogAuthors;
  } catch {
    return defaultBlogAuthors;
  }
}

export function saveBlogAuthors(authors: BlogAuthor[]) {
  localStorage.setItem(localAuthorsKey, JSON.stringify(authors.filter((author) => author.name.trim())));
}

export function getBlogSettings(): BlogSettings {
  try {
    return {
      ...defaultBlogSettings,
      ...(JSON.parse(localStorage.getItem(localSettingsKey) ?? "{}") as Partial<BlogSettings>),
    };
  } catch {
    return defaultBlogSettings;
  }
}

export function saveBlogSettings(settings: BlogSettings) {
  localStorage.setItem(localSettingsKey, JSON.stringify(settings));
}

export function getBlogAnalytics(): BlogAnalytics {
  try {
    return JSON.parse(localStorage.getItem(localAnalyticsKey) ?? "{}") as BlogAnalytics;
  } catch {
    return {};
  }
}

function writeBlogAnalytics(analytics: BlogAnalytics) {
  localStorage.setItem(localAnalyticsKey, JSON.stringify(analytics));
}

export function registerBlogView(slug: string) {
  const analytics = getBlogAnalytics();
  const current = analytics[slug] ?? { views: 0, leads: 0, ctaClicks: 0 };
  analytics[slug] = { ...current, views: current.views + 1 };
  writeBlogAnalytics(analytics);
}

export function registerBlogLead(slug: string) {
  const analytics = getBlogAnalytics();
  const current = analytics[slug] ?? { views: 0, leads: 0, ctaClicks: 0 };
  analytics[slug] = { ...current, leads: current.leads + 1, ctaClicks: current.ctaClicks + 1 };
  writeBlogAnalytics(analytics);
}

export async function listBlogPosts(options: { publishedOnly?: boolean } = {}) {
  const now = new Date().toISOString();

  if (hasSupabaseConfig && supabase) {
    let query = supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (options.publishedOnly) {
      query = query.or(`status.eq.published,and(status.eq.scheduled,published_at.lte.${now})`);
    }

    const { data, error } = await query;
    if (error) throw error;
    return (data ?? []).map((row) => mapRow(row as BlogPostRow));
  }

  if (canUseCpanelBlogApi()) {
    try {
      const data = await cpanelBlogRequest<{ posts: BlogPost[] }>("list", {
        query: options.publishedOnly ? { publishedOnly: "true" } : undefined,
      });
      return (data.posts ?? []).map((post) => withDefaults(post));
    } catch {
      // Local fallback keeps previews usable when PHP is not running.
    }
  }

  return readLocalPosts()
    .filter(
      (post) =>
        !options.publishedOnly ||
        post.status === "published" ||
        (post.status === "scheduled" && post.publishedAt !== null && post.publishedAt <= now),
    )
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
}

export async function getBlogPostBySlug(slug: string) {
  const now = new Date().toISOString();

  if (hasSupabaseConfig && supabase) {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .or(`status.eq.published,and(status.eq.scheduled,published_at.lte.${now})`)
      .maybeSingle();

    if (error) throw error;
    return data ? mapRow(data as BlogPostRow) : null;
  }

  if (canUseCpanelBlogApi()) {
    try {
      const data = await cpanelBlogRequest<{ post: BlogPost | null }>("get", { query: { slug } });
      return data.post ? withDefaults(data.post) : null;
    } catch {
      // Local fallback keeps previews usable when PHP is not running.
    }
  }

  return (
    readLocalPosts().find(
      (post) =>
        post.slug === slug &&
        (post.status === "published" ||
          (post.status === "scheduled" && post.publishedAt !== null && post.publishedAt <= now)),
    ) ?? null
  );
}

export async function saveBlogPost(input: BlogPostInput, id?: string) {
  const now = new Date().toISOString();
  const normalizedInput = {
    ...input,
    slug: input.slug || slugify(input.title),
    metaTitle: input.metaTitle || input.title,
    metaDescription: input.metaDescription || input.excerpt,
  };

  if (hasSupabaseConfig && supabase) {
    if (id) {
      const { error } = await supabase.from("blog_posts").update(toRow(normalizedInput)).eq("id", id);
      if (error) throw error;
      return;
    }

    const { error } = await supabase.from("blog_posts").insert(toRow(normalizedInput));
    if (error) throw error;
    return;
  }

  if (canUseCpanelBlogApi()) {
    await cpanelBlogRequest("save", { method: "POST", body: { post: normalizedInput, id } });
    return;
  }

  const posts = readLocalPosts();
  const nextPost = withDefaults({
    ...normalizedInput,
    id: id ?? crypto.randomUUID(),
    publishedAt:
      normalizedInput.status === "published" || normalizedInput.status === "scheduled"
        ? normalizedInput.publishedAt ?? now
        : null,
    createdAt: posts.find((post) => post.id === id)?.createdAt ?? now,
    updatedAt: now,
  });

  writeLocalPosts(id ? posts.map((post) => (post.id === id ? nextPost : post)) : [nextPost, ...posts]);
}

export async function deleteBlogPost(id: string) {
  if (hasSupabaseConfig && supabase) {
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) throw error;
    return;
  }

  if (canUseCpanelBlogApi()) {
    await cpanelBlogRequest("delete", { method: "POST", body: { id } });
    return;
  }

  writeLocalPosts(readLocalPosts().filter((post) => post.id !== id));
}

type BlogImageUploadOptions = {
  variant?: "cover" | "original";
};

export async function uploadBlogImage(file: File, options: BlogImageUploadOptions = {}) {
  if (!file.type.startsWith("image/")) {
    throw new Error("Envie um arquivo de imagem valido.");
  }

  const uploadFile = options.variant === "cover" ? await normalizeBlogCoverImage(file) : await compressImageFile(file);

  if (hasSupabaseConfig && supabase) {
    const extension = uploadFile.type.split("/").pop()?.replace("jpeg", "jpg") || uploadFile.name.split(".").pop() || "png";
    const path = `${crypto.randomUUID()}.${extension}`;
    const { error } = await supabase.storage.from("blog-images").upload(path, uploadFile, {
      cacheControl: "31536000",
      contentType: uploadFile.type,
      upsert: false,
    });

    if (error) throw error;

    const { data } = supabase.storage.from("blog-images").getPublicUrl(path);
    return data.publicUrl;
  }

  if (canUseCpanelBlogApi()) {
    const dataUrl = await fileToDataUrl(uploadFile);
    const data = await cpanelBlogRequest<{ url: string }>("upload", { method: "POST", body: { dataUrl } });
    return data.url;
  }

  return fileToDataUrl(uploadFile);
}

function compressImageFile(file: File) {
  return new Promise<File>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const maxWidth = 1280;
        const scale = Math.min(1, maxWidth / image.width);
        const width = Math.round(image.width * scale);
        const height = Math.round(image.height * scale);
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (!context) {
          reject(new Error("Nao foi possivel processar a imagem."));
          return;
        }

        canvas.width = width;
        canvas.height = height;
        context.drawImage(image, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Nao foi possivel processar a imagem."));
              return;
            }

            resolve(new File([blob], replaceExtension(file.name, "jpg"), { type: "image/jpeg" }));
          },
          "image/jpeg",
          0.78,
        );
      };
      image.onerror = () => reject(new Error("Nao foi possivel processar a imagem."));
      image.src = String(reader.result);
    };
    reader.onerror = () => reject(new Error("Nao foi possivel carregar a imagem."));
    reader.readAsDataURL(file);
  });
}

function normalizeBlogCoverImage(file: File) {
  return new Promise<File>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const width = 1280;
        const height = 720;
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (!context) {
          reject(new Error("Nao foi possivel processar a imagem."));
          return;
        }

        const scale = Math.min(width / image.width, height / image.height);
        const drawWidth = Math.round(image.width * scale);
        const drawHeight = Math.round(image.height * scale);
        const offsetX = Math.round((width - drawWidth) / 2);
        const offsetY = Math.round((height - drawHeight) / 2);

        canvas.width = width;
        canvas.height = height;
        context.fillStyle = "#f8fafc";
        context.fillRect(0, 0, width, height);
        context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Nao foi possivel processar a imagem."));
              return;
            }

            resolve(new File([blob], replaceExtension(file.name, "jpg"), { type: "image/jpeg" }));
          },
          "image/jpeg",
          0.86,
        );
      };
      image.onerror = () => reject(new Error("Nao foi possivel processar a imagem."));
      image.src = String(reader.result);
    };
    reader.onerror = () => reject(new Error("Nao foi possivel carregar a imagem."));
    reader.readAsDataURL(file);
  });
}

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Nao foi possivel carregar a imagem."));
    reader.readAsDataURL(file);
  });
}

function replaceExtension(fileName: string, extension: string) {
  return fileName.replace(/\.[^.]+$/, "") + "." + extension;
}
