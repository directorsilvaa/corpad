import {
  Bold,
  Bell,
  CalendarDays,
  CheckCircle2,
  Edit3,
  Eye,
  EyeOff,
  FileText,
  Heading2,
  Heading3,
  ImagePlus,
  Italic,
  LayoutDashboard,
  Link as LinkIcon,
  List,
  LogOut,
  MessageCircle,
  Newspaper,
  Plus,
  Quote,
  Save,
  Search,
  Settings,
  Trash2,
  Upload,
  UserRound,
  Video,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { adminLogin, adminLogout, isAdminLoggedIn } from "../lib/adminAuth";
import { importBlogArticleModel, normalizeImportedHtmlArticleContent } from "../lib/blogArticleImporter";
import {
  BlogPost,
  BlogPostInput,
  BlogPostStatus,
  BlogAuthor,
  BlogSettings,
  blogCategories,
  defaultBlogAuthors,
  defaultBlogSettings,
  deleteBlogPost,
  getBlogSettings,
  listBlogAuthors,
  listBlogCategories,
  listBlogPosts,
  saveBlogAuthors,
  saveBlogSettings,
  saveBlogCategories,
  saveBlogPost,
  slugify,
  uploadBlogImage,
} from "../lib/blogPosts";
import { usePageSeo } from "../lib/seo";

type AdminTab =
  | "dashboard"
  | "articles"
  | "categories"
  | "authors"
  | "media"
  | "ctas"
  | "seo"
  | "settings";

type EditorTab = "content" | "seo" | "author" | "cta";

const whatsappUrl = "https://wa.me/5516996094649";
const rememberedAdminEmailKey = "corpad_admin_remembered_email";
const rememberedAdminPasswordKey = "corpad_admin_remembered_password";

const emptyPost: BlogPostInput = {
  title: "",
  subtitle: "",
  slug: "",
  category: blogCategories[0],
  excerpt: "",
  coverImage: "",
  imageAlt: "",
  content: "",
  authorName: "Equipe CORPAD",
  authorPhoto: "",
  authorRole: "Conteudo institucional",
  authorBio: "Conteudos sobre digital, consultoria e tecnologia para empresas.",
  metaTitle: "",
  metaDescription: "",
  keyword: "",
  ctaLabel: "Falar com um consultor",
  ctaUrl: whatsappUrl,
  ctaText: "Quer melhorar os resultados da sua empresa?",
  status: "draft",
  publishedAt: null,
};

const editorActions = [
  { label: "H2", token: "## Titulo da secao", Icon: Heading2 },
  { label: "H3", token: "### Subtitulo", Icon: Heading3 },
  { label: "Negrito", token: "**texto em destaque**", Icon: Bold },
  { label: "Italico", token: "*texto em italico*", Icon: Italic },
  { label: "Link", token: "[texto do link](https://)", Icon: LinkIcon },
  { label: "Lista", token: "- Item da lista", Icon: List },
  { label: "Imagem", token: "![Texto alternativo](https://url-da-imagem)", Icon: ImagePlus },
  { label: "Video", token: "[video:https://www.youtube.com/embed/ID]", Icon: Video },
  { label: "Citacao", token: "> Citacao do artigo", Icon: Quote },
  { label: "CTA", token: "[cta]Quer melhorar sua empresa? Fale com um consultor.[/cta]", Icon: MessageCircle },
];

const editorTabs: Array<{ id: EditorTab; label: string; Icon: typeof FileText }> = [
  { id: "content", label: "Conteudo", Icon: FileText },
  { id: "seo", label: "SEO", Icon: Search },
  { id: "author", label: "Autor", Icon: UserRound },
  { id: "cta", label: "CTA", Icon: MessageCircle },
];

function getReadingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 180));
}

function isHtmlArticleContent(value: string) {
  return /<\/?(?:p|h[1-6]|a|ul|ol|li|table|div|section|article|blockquote|img|iframe|style)\b/i.test(value);
}

function sanitizeEditorHtml(value: string) {
  const template = document.createElement("template");
  template.innerHTML = value;

  template.content.querySelectorAll("script, object, embed").forEach((element) => element.remove());
  template.content.querySelectorAll<HTMLElement>("*").forEach((element) => {
    Array.from(element.attributes).forEach((attribute) => {
      const name = attribute.name.toLowerCase();
      const content = attribute.value.trim().toLowerCase();

      if (name.startsWith("on") || content.startsWith("javascript:")) {
        element.removeAttribute(attribute.name);
      }
    });
  });

  return template.innerHTML;
}

function extractRootInnerHtml(value: string) {
  const assignmentIndex = value.search(/\broot\.innerHTML\s*=\s*`/);

  if (assignmentIndex === -1) {
    return "";
  }

  const templateStart = value.indexOf("`", assignmentIndex);
  if (templateStart === -1) {
    return "";
  }

  const templateEnd = value.indexOf("`;", templateStart + 1);
  if (templateEnd === -1) {
    return "";
  }

  return value.slice(templateStart + 1, templateEnd).trim();
}

function getVisualEditorHtml(value: string) {
  const shadowHtml = extractRootInnerHtml(value);

  if (shadowHtml) {
    return shadowHtml;
  }

  if (/attachShadow/i.test(value)) {
    const normalized = normalizeImportedHtmlArticleContent(value);
    return normalized || value;
  }

  return value;
}

function extractArticleTitleFromHtml(value: string) {
  const template = document.createElement("template");
  template.innerHTML = value;

  return template.content.querySelector("h1")?.textContent?.replace(/\s+/g, " ").trim() ?? "";
}

function getTextFromHtml(value: string, selectors: string[]) {
  const template = document.createElement("template");
  template.innerHTML = value;

  for (const selector of selectors) {
    const text = template.content.querySelector(selector)?.textContent?.replace(/\s+/g, " ").trim();

    if (text) {
      return text;
    }
  }

  return "";
}

function getFirstImageFromHtml(value: string) {
  const template = document.createElement("template");
  template.innerHTML = value;

  return template.content.querySelector("img[src]")?.getAttribute("src")?.trim() ?? "";
}

function updateHtmlText(value: string, selectors: string[], text: string) {
  if (!value || !text.trim()) {
    return value;
  }

  const template = document.createElement("template");
  template.innerHTML = value;

  for (const selector of selectors) {
    const element = template.content.querySelector(selector);

    if (element) {
      element.textContent = text;
      return template.innerHTML;
    }
  }

  return value;
}

function updateHtmlImage(value: string, src: string, alt = "") {
  if (!value || (!src.trim() && !alt.trim())) {
    return value;
  }

  const template = document.createElement("template");
  template.innerHTML = value;
  const image = template.content.querySelector("img[src]");

  if (!image) {
    return value;
  }

  if (src.trim()) {
    image.setAttribute("src", src);
  }
  if (alt.trim()) {
    image.setAttribute("alt", alt);
  }

  return template.innerHTML;
}

function syncPostFieldsFromArticleHtml(post: BlogPostInput, content: string) {
  const title = extractArticleTitleFromHtml(content);
  const subtitle = getTextFromHtml(content, [".subtitle", ".article-subtitle", ".ca-subtitle", ".hero-subtitle", "h1 + p"]);
  const excerpt = getTextFromHtml(content, [".excerpt", ".article-excerpt", ".lead", ".intro", "h1 + p", "p"]);
  const coverImage = getFirstImageFromHtml(content);
  const nextPost = syncPostTitle(post, title, content);

  return {
    ...nextPost,
    subtitle: subtitle || nextPost.subtitle,
    excerpt: excerpt || nextPost.excerpt,
    metaDescription: !nextPost.metaDescription || nextPost.metaDescription === post.subtitle || nextPost.metaDescription === post.excerpt
      ? subtitle || excerpt || nextPost.metaDescription
      : nextPost.metaDescription,
    coverImage: coverImage || nextPost.coverImage,
  };
}

function syncArticleHtmlField(content: string, field: "title" | "subtitle" | "excerpt" | "coverImage" | "imageAlt", value: string, alt = "") {
  if (!isHtmlArticleContent(content)) {
    return content;
  }

  if (field === "title") {
    return updateHtmlText(content, ["h1"], value);
  }

  if (field === "subtitle") {
    return updateHtmlText(content, [".subtitle", ".article-subtitle", ".ca-subtitle", ".hero-subtitle", "h1 + p"], value);
  }

  if (field === "excerpt") {
    return updateHtmlText(content, [".excerpt", ".article-excerpt", ".lead", ".intro"], value);
  }

  if (field === "coverImage") {
    return updateHtmlImage(content, value, alt);
  }

  return updateHtmlImage(content, "", value);
}

function syncPostTitle(post: BlogPostInput, articleTitle: string, content = post.content) {
  if (!articleTitle || articleTitle === post.title.trim()) {
    return { ...post, content };
  }

  const currentTitle = post.title.trim();
  const currentMetaTitle = post.metaTitle.trim();
  const shouldSyncSlug = !post.slug || post.slug === slugify(currentTitle);
  let nextMetaTitle = post.metaTitle;

  if (!currentMetaTitle || currentMetaTitle === currentTitle) {
    nextMetaTitle = articleTitle;
  } else if (currentTitle && currentMetaTitle.includes(currentTitle)) {
    nextMetaTitle = currentMetaTitle.replace(currentTitle, articleTitle);
  }

  return {
    ...post,
    content,
    title: articleTitle,
    slug: shouldSyncSlug ? slugify(articleTitle) : post.slug,
    metaTitle: nextMetaTitle,
  };
}

function syncPostTitleFromArticleHtml(post: BlogPostInput, content: string) {
  return syncPostFieldsFromArticleHtml(post, content);
}

function getPreviewVisibilityFixStyle() {
  return `<style id="admin-preview-visibility-fix">
      html,
      body {
        background: #ffffff !important;
        color: #17213a !important;
      }

      body {
        opacity: 1 !important;
        visibility: visible !important;
        filter: none !important;
      }

      .fade,
      .fade-in,
      .ca-fade,
      .is-hidden,
      [data-animate],
      [data-reveal] {
        opacity: 1 !important;
        visibility: visible !important;
        transform: none !important;
        filter: none !important;
      }

      .faq-body,
      .ca-faq-body {
        display: block !important;
        max-height: none !important;
        opacity: 1 !important;
        visibility: visible !important;
      }

      .faq-item,
      .ca-faq-item {
        opacity: 1 !important;
        visibility: visible !important;
      }
    </style>`;
}

function buildVisualEditorDocument(content: string) {
  const visualHtml = getVisualEditorHtml(content);
  const sanitizedHtml = sanitizeEditorHtml(visualHtml);

  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      html { background: #f8fbff; }
      body {
        min-height: 100vh;
        margin: 0;
        padding: 28px;
        color: #17213a;
        background: #ffffff;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
        line-height: 1.6;
      }
      body:focus { outline: none; }
      img, video, iframe { max-width: 100%; }
      img { height: auto; }
      a { color: #1267e8; }
      .admin-empty-preview {
        display: grid;
        place-items: center;
        min-height: 420px;
        border: 1px dashed #cbd5e1;
        border-radius: 12px;
        color: #64748b;
        background: #f8fafc;
        font-weight: 800;
      }
    </style>
  </head>
  <body>
    ${sanitizedHtml || '<div class="admin-empty-preview">Nao foi possivel montar o preview visual desse HTML.</div>'}
    ${getPreviewVisibilityFixStyle()}
  </body>
</html>`;
}

function VisualHtmlEditor({
  value,
  onChange,
  onTitleChange,
}: {
  value: string;
  onChange: (value: string) => void;
  onTitleChange?: (value: string) => void;
}) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const latestValueRef = useRef(value);
  const isEditingRef = useRef(false);
  const syncTimerRef = useRef<number | undefined>();
  const initialDocument = useMemo(() => buildVisualEditorDocument(value), []);

  useEffect(() => {
    const iframe = iframeRef.current;
    const document = iframe?.contentDocument;

    if (!document?.body || isEditingRef.current || value === latestValueRef.current) {
      return;
    }

    document.body.innerHTML = `${sanitizeEditorHtml(value)}${getPreviewVisibilityFixStyle()}`;
    latestValueRef.current = value;
  }, [value]);

  const handleLoad = () => {
    const iframe = iframeRef.current;
    const document = iframe?.contentDocument;

    if (!document?.body) {
      return;
    }

    document.designMode = "on";
    document.body.setAttribute("contenteditable", "true");
    document.body.spellcheck = true;

    const readHtml = () => {
      document.getElementById("admin-preview-visibility-fix")?.remove();
      const nextHtml = sanitizeEditorHtml(document.body.innerHTML);
      document.body.insertAdjacentHTML("beforeend", getPreviewVisibilityFixStyle());
      latestValueRef.current = nextHtml;
      onTitleChange?.(extractArticleTitleFromHtml(nextHtml));
      return nextHtml;
    };

    const sync = () => {
      const nextHtml = readHtml();
      isEditingRef.current = false;
      onChange(nextHtml);
    };

    const scheduleSync = () => {
      isEditingRef.current = true;
      const nextHtml = readHtml();

      if (syncTimerRef.current) {
        window.clearTimeout(syncTimerRef.current);
      }

      syncTimerRef.current = window.setTimeout(() => {
        isEditingRef.current = false;
        onChange(nextHtml);
      }, 500);
    };

    document.body.addEventListener("focusin", () => {
      isEditingRef.current = true;
    });
    document.body.addEventListener("input", scheduleSync);
    document.body.addEventListener("blur", sync);
  };

  return (
    <iframe
      ref={iframeRef}
      className="admin-article-visual-editor"
      title="Preview visual do artigo"
      srcDoc={initialDocument}
      onLoad={handleLoad}
    />
  );
}

function formatDate(value: string | null | undefined) {
  if (!value) return "--";
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric" }).format(
    new Date(value),
  );
}

function getAdminPostPreviewUrl(post: BlogPost) {
  return `/blog-post.php?slug=${encodeURIComponent(post.slug)}&preview=1`;
}

function toDatetimeLocalValue(value: string | null | undefined) {
  if (!value) return "";

  const date = new Date(value);
  const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return offsetDate.toISOString().slice(0, 16);
}

function normalizeImportedPostForEditor(post: BlogPostInput): BlogPostInput {
  if (!post.title.includes("|")) {
    return post;
  }

  const visibleTitle = post.subtitle?.trim();

  if (!visibleTitle) {
    return post;
  }

  return {
    ...post,
    title: visibleTitle,
    subtitle: post.metaDescription || post.excerpt || "",
    metaTitle: post.metaTitle || post.title,
  };
}

export default function AdminPage() {
  usePageSeo({
    title: "Admin | CORPAD",
    description: "Área administrativa da CORPAD.",
    path: "/admin",
    noindex: true,
  });

  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>(blogCategories);
  const [authors, setAuthors] = useState<BlogAuthor[]>(defaultBlogAuthors);
  const [editingId, setEditingId] = useState<string | undefined>();
  const [form, setForm] = useState<BlogPostInput>(emptyPost);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberEmail, setRememberEmail] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingAuthorPhoto, setUploadingAuthorPhoto] = useState(false);
  const [uploadingNewAuthorPhoto, setUploadingNewAuthorPhoto] = useState(false);
  const [uploadingAuthorPhotoId, setUploadingAuthorPhotoId] = useState<string | null>(null);
  const [savingPost, setSavingPost] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [sourceEditorOpen, setSourceEditorOpen] = useState(false);
  const [editorTab, setEditorTab] = useState<EditorTab>("content");
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [newCategory, setNewCategory] = useState("");
  const [newAuthor, setNewAuthor] = useState<BlogAuthor>({
    id: "",
    name: "",
    role: "",
    bio: "",
    photo: "",
  });
  const [blogSettings, setBlogSettings] = useState({
    ...defaultBlogSettings,
  });

  useEffect(() => {
    document.title = "Admin | CORPAD";
    setCategories(listBlogCategories());
    setAuthors(listBlogAuthors());
    setBlogSettings(getBlogSettings());

    const rememberedEmail = localStorage.getItem(rememberedAdminEmailKey);
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberEmail(true);
    }

    const rememberedPassword = localStorage.getItem(rememberedAdminPasswordKey);
    if (rememberedPassword) {
      setPassword(rememberedPassword);
      setRememberPassword(true);
    }

    isAdminLoggedIn()
      .then((session) => {
        setLoggedIn(session);
        if (session) return refreshPosts();
        return undefined;
      })
      .finally(() => setLoading(false));
  }, []);

  const publishedPosts = posts.filter((post) => post.status === "published").length;
  const scheduledPosts = posts.filter((post) => post.status === "scheduled").length;
  const draftPosts = posts.filter((post) => post.status === "draft").length;
  const totalPosts = posts.length;
  const categoriesInUse = new Set(posts.map((post) => post.category).filter(Boolean)).size;
  const recentPosts = posts.slice(0, 5);
  const editorialQueue = posts.filter((post) => post.status !== "published").slice(0, 5);
  const mediaItems = posts
    .filter((post) => post.coverImage)
    .map((post) => ({ url: post.coverImage, alt: post.imageAlt, title: post.title }));
  const authorUsage = useMemo(() => {
    return posts.reduce<Record<string, number>>((usage, post) => {
      if (!post.authorName) return usage;
      usage[post.authorName] = (usage[post.authorName] ?? 0) + 1;
      return usage;
    }, {});
  }, [posts]);

  async function refreshPosts() {
    const nextPosts = await listBlogPosts();
    setPosts(nextPosts);
  }

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    try {
      await adminLogin(email, password);
      if (rememberEmail) {
        localStorage.setItem(rememberedAdminEmailKey, email);
      } else {
        localStorage.removeItem(rememberedAdminEmailKey);
      }
      if (rememberPassword) {
        localStorage.setItem(rememberedAdminEmailKey, email);
        localStorage.setItem(rememberedAdminPasswordKey, password);
      } else {
        localStorage.removeItem(rememberedAdminPasswordKey);
      }
      setLoggedIn(true);
      await refreshPosts();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Nao foi possivel entrar.");
    }
  }

  function handleRememberPasswordToggle() {
    const nextRememberPassword = !rememberPassword;
    setRememberPassword(nextRememberPassword);

    if (!nextRememberPassword) {
      localStorage.removeItem(rememberedAdminPasswordKey);
      return;
    }

    if (email) {
      localStorage.setItem(rememberedAdminEmailKey, email);
      setRememberEmail(true);
    }

    if (password) {
      localStorage.setItem(rememberedAdminPasswordKey, password);
      setMessage("Senha lembrada neste navegador.");
    }
  }

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (savingPost) return;

    setMessage("");
    setSavingPost(true);

    try {
      const normalizedTitle = form.title.trim();
      const normalizedSlug = (form.slug || slugify(normalizedTitle)).trim();
      const normalizedExcerpt = form.excerpt.trim();
      const normalizedContent = form.content.trim();

      if (!normalizedTitle || !normalizedSlug || !normalizedExcerpt || !normalizedContent) {
        setEditorTab("content");
        throw new Error("Preencha titulo, URL, resumo e conteudo antes de salvar.");
      }

      await saveBlogPost(
        {
          ...form,
          title: normalizedTitle,
          slug: normalizedSlug,
          excerpt: normalizedExcerpt,
          content: normalizedContent,
          metaTitle: form.metaTitle || normalizedTitle,
          metaDescription: form.metaDescription || normalizedExcerpt,
        },
        editingId,
      );
      setForm(emptyPost);
      setEditingId(undefined);
      setEditorOpen(false);
      setEditorTab("content");
      await refreshPosts();
      setMessage("Artigo salvo com sucesso.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Nao foi possivel salvar.");
    } finally {
      setSavingPost(false);
    }
  }

  async function handleDelete(id: string) {
    await deleteBlogPost(id);
    if (editingId === id) {
      setEditingId(undefined);
      setForm(emptyPost);
      setEditorOpen(false);
      setEditorTab("content");
    }
    await refreshPosts();
  }

  async function togglePostVisibility(post: BlogPost) {
    const nextStatus: BlogPostStatus = post.status === "published" ? "draft" : "published";

    await saveBlogPost(
      {
        title: post.title,
        subtitle: post.subtitle,
        slug: post.slug,
        category: post.category,
        excerpt: post.excerpt,
        coverImage: post.coverImage,
        imageAlt: post.imageAlt,
        content: post.content,
        authorName: post.authorName,
        authorPhoto: post.authorPhoto,
        authorRole: post.authorRole,
        authorBio: post.authorBio,
        metaTitle: post.metaTitle,
        metaDescription: post.metaDescription,
        keyword: post.keyword,
        ctaLabel: post.ctaLabel,
        ctaUrl: post.ctaUrl,
        ctaText: post.ctaText,
        status: nextStatus,
        publishedAt: post.publishedAt,
      },
      post.id,
    );
    await refreshPosts();
  }

  async function handleLogout() {
    await adminLogout();
    setLoggedIn(false);
    setPosts([]);
    setMessage("");
    setEditorOpen(false);
    setEditorTab("content");
  }

  async function handleImageUpload(file: File | null) {
    if (!file) return;

    setUploadingImage(true);
    setMessage("");

    try {
      const imageUrl = await uploadBlogImage(file, { variant: "cover" });
      setForm((current) => ({
        ...current,
        coverImage: imageUrl,
        content: syncArticleHtmlField(current.content, "coverImage", imageUrl, current.imageAlt),
      }));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Nao foi possivel enviar a imagem.");
    } finally {
      setUploadingImage(false);
    }
  }

  async function handleAuthorPhotoUpload(file: File | null) {
    if (!file) return;

    setUploadingAuthorPhoto(true);
    setMessage("");

    try {
      const imageUrl = await uploadBlogImage(file);
      setForm((current) => ({ ...current, authorPhoto: imageUrl }));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Nao foi possivel enviar a foto do autor.");
    } finally {
      setUploadingAuthorPhoto(false);
    }
  }

  async function handleNewAuthorPhotoUpload(file: File | null) {
    if (!file) return;

    setUploadingNewAuthorPhoto(true);
    setMessage("");

    try {
      const imageUrl = await uploadBlogImage(file);
      setNewAuthor((current) => ({ ...current, photo: imageUrl }));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Nao foi possivel enviar a foto do autor.");
    } finally {
      setUploadingNewAuthorPhoto(false);
    }
  }

  async function handleStoredAuthorPhotoUpload(authorId: string, file: File | null) {
    if (!file) return;

    setUploadingAuthorPhotoId(authorId);
    setMessage("");

    try {
      const imageUrl = await uploadBlogImage(file);
      updateAuthor(authorId, { photo: imageUrl });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Nao foi possivel enviar a foto do autor.");
    } finally {
      setUploadingAuthorPhotoId(null);
    }
  }

  function openNewPost() {
    setEditingId(undefined);
    setForm({ ...emptyPost, category: categories[0] ?? blogCategories[0] });
    setEditorTab("content");
    setEditorOpen(true);
  }

  async function handleArticleModelImport(file: File | null) {
    if (!file) return;

    setMessage("");

    try {
      const text = await file.text();
      setEditingId(undefined);
      setForm(
        importBlogArticleModel(text, {
          ...emptyPost,
          category: categories.includes("Digital") ? "Digital" : categories[0] ?? blogCategories[0],
        }),
      );
      setEditorTab("content");
      setEditorOpen(true);
      setMessage("Modelo importado. Revise os dados do blog e salve como rascunho ou publicado.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Nao foi possivel importar o modelo.");
    }
  }

  function editPost(post: BlogPost) {
    setEditingId(post.id);
    setForm(
      normalizeImportedPostForEditor({
        title: post.title,
        subtitle: post.subtitle,
        slug: post.slug,
        category: post.category,
        excerpt: post.excerpt,
        coverImage: post.coverImage,
        imageAlt: post.imageAlt,
        content: post.content,
        authorName: post.authorName,
        authorPhoto: post.authorPhoto,
        authorRole: post.authorRole,
        authorBio: post.authorBio,
        metaTitle: post.metaTitle,
        metaDescription: post.metaDescription,
        keyword: post.keyword,
        ctaLabel: post.ctaLabel,
        ctaUrl: post.ctaUrl,
        ctaText: post.ctaText,
        status: post.status,
        publishedAt: post.publishedAt,
      }),
    );
    setEditorTab("content");
    setEditorOpen(true);
  }

  function insertEditorToken(token: string) {
    setForm((current) => ({
      ...current,
      content: current.content ? `${current.content}\n\n${token}` : token,
    }));
  }

  function handleVisualArticleChange(content: string) {
    setForm((current) => syncPostTitleFromArticleHtml(current, content));
  }

  function handleVisualArticleTitleChange(title: string) {
    if (!title) return;
    setForm((current) => syncPostTitle(current, title));
  }

  function addCategory() {
    const trimmed = newCategory.trim();
    if (!trimmed) return;
    const nextCategories = [...categories, trimmed];
    setCategories(nextCategories);
    saveBlogCategories(nextCategories);
    setNewCategory("");
  }

  function updateCategory(index: number, value: string) {
    const nextCategories = categories.map((category, categoryIndex) => (categoryIndex === index ? value : category));
    setCategories(nextCategories);
    saveBlogCategories(nextCategories);
  }

  function removeCategory(index: number) {
    const nextCategories = categories.filter((_, categoryIndex) => categoryIndex !== index);
    setCategories(nextCategories);
    saveBlogCategories(nextCategories);
  }

  function moveCategory(index: number, direction: -1 | 1) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= categories.length) return;
    const nextCategories = [...categories];
    const [category] = nextCategories.splice(index, 1);
    nextCategories.splice(targetIndex, 0, category);
    setCategories(nextCategories);
    saveBlogCategories(nextCategories);
  }

  function persistAuthors(nextAuthors: BlogAuthor[]) {
    setAuthors(nextAuthors);
    saveBlogAuthors(nextAuthors);
  }

  function addAuthor() {
    const trimmedName = newAuthor.name.trim();
    if (!trimmedName) return;

    persistAuthors([
      ...authors,
      {
        ...newAuthor,
        id: crypto.randomUUID(),
        name: trimmedName,
        role: newAuthor.role.trim() || "Autor",
        bio: newAuthor.bio.trim(),
        photo: newAuthor.photo.trim(),
      },
    ]);
    setNewAuthor({ id: "", name: "", role: "", bio: "", photo: "" });
  }

  function updateAuthor(id: string, patch: Partial<BlogAuthor>) {
    persistAuthors(authors.map((author) => (author.id === id ? { ...author, ...patch } : author)));
  }

  function removeAuthor(id: string) {
    persistAuthors(authors.filter((author) => author.id !== id));
  }

  function applyAuthor(authorName: string) {
    const author = authors.find((currentAuthor) => currentAuthor.name === authorName);
    setForm((current) => ({
      ...current,
      authorName,
      authorRole: author?.role ?? current.authorRole,
      authorBio: author?.bio ?? current.authorBio,
      authorPhoto: author?.photo ?? current.authorPhoto,
    }));
  }

  function handleSaveSettings(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    saveBlogSettings(blogSettings);
    setMessage("Configuracoes do blog salvas.");
  }

  if (loading) {
    return <main className="admin-page admin-loading">Carregando painel...</main>;
  }

  if (!loggedIn) {
    return (
      <main className="admin-page admin-login-page">
        <section className="admin-login-panel">
          <span className="admin-login-logo" aria-label="CORPAD">
            <img src="/logo-admin.png?v=20260618" alt="" />
          </span>

          <form onSubmit={handleLogin}>
            <label className="admin-login-field">
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Digite seu e-mail"
                required
              />
            </label>
            <label className="admin-login-field">
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Senha"
                required
              />
            </label>
            <button
              className={rememberPassword ? "admin-save-password active" : "admin-save-password"}
              type="button"
              onClick={handleRememberPasswordToggle}
              aria-pressed={rememberPassword}
            >
              <Save size={14} /> Lembrar senha
            </button>
            {message && <p className="admin-message">{message}</p>}
            <button className="admin-login-submit" type="submit">
              Entrar
            </button>
          </form>
        </section>
      </main>
    );
  }

  return (
      <main className="admin-page">
      <aside className="admin-sidebar">
        <div className="admin-window-controls" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <a className="admin-brand" href="/">
          <img src="/logo-admin.png?v=20260618" alt="CORPAD" />
        </a>
        <span className="admin-nav-label">Painel</span>
        <nav>
          <AdminNavButton activeTab={activeTab} tab="dashboard" setActiveTab={setActiveTab} icon={<LayoutDashboard size={18} />} label="Dashboard" />
          <AdminNavButton activeTab={activeTab} tab="articles" setActiveTab={setActiveTab} icon={<Newspaper size={18} />} label="Artigos" />
          <AdminNavButton activeTab={activeTab} tab="categories" setActiveTab={setActiveTab} icon={<List size={18} />} label="Categorias" />
          <AdminNavButton activeTab={activeTab} tab="authors" setActiveTab={setActiveTab} icon={<UserRound size={18} />} label="Autores" />
          <AdminNavButton activeTab={activeTab} tab="media" setActiveTab={setActiveTab} icon={<ImagePlus size={18} />} label="Midia" />
          <AdminNavButton activeTab={activeTab} tab="ctas" setActiveTab={setActiveTab} icon={<MessageCircle size={18} />} label="CTAs" />
          <AdminNavButton activeTab={activeTab} tab="seo" setActiveTab={setActiveTab} icon={<Search size={18} />} label="SEO" />
          <AdminNavButton activeTab={activeTab} tab="settings" setActiveTab={setActiveTab} icon={<Settings size={18} />} label="Configuracoes" />
          <a href="/blog" target="_blank" rel="noreferrer">
            <Eye size={18} /> Ver blog
          </a>
        </nav>
        <div className="admin-sidebar-footer">
          <span className="admin-nav-label">Conta</span>
          <button type="button" onClick={handleLogout}>
            <LogOut size={18} /> Sair
          </button>
        </div>
      </aside>

      <section className="admin-workspace">
        <header className="admin-header">
          <div>
            <span className="admin-system-status">
              <i aria-hidden="true" />
              Painel administrador do blog institucional
            </span>
            <h1>{getTabTitle(activeTab)}</h1>
          </div>
          <div className="admin-header-actions" aria-label="Acoes do painel">
            <button className="admin-icon-button" type="button" aria-label="Buscar">
              <Search size={17} />
            </button>
            <button className="admin-icon-button" type="button" aria-label="Notificacoes">
              <Bell size={17} />
            </button>
            <span className="admin-avatar" aria-label="Administrador">
              <UserRound size={18} />
            </span>
          </div>
        </header>

        {message && <p className="admin-message admin-message-inline">{message}</p>}

        {activeTab === "dashboard" && (
          <>
            <section className="admin-dashboard-hero" aria-label="Visao geral do blog">
              <div>
                <span>Resumo editorial</span>
                <strong>{totalPosts > 0 ? `${totalPosts} artigos cadastrados` : "Comece criando o primeiro artigo"}</strong>
                <p>
                  Acompanhe rascunhos, agendamentos, categorias e os ultimos conteudos sem sair do fluxo de publicacao.
                </p>
              </div>
              <div className="admin-hero-orb" aria-hidden="true">
                <span>{publishedPosts}</span>
                <small>online</small>
              </div>
              <button type="button" onClick={openNewPost}>
                <Plus size={18} /> Novo artigo
              </button>
            </section>

            <section className="admin-stats" aria-label="Resumo do blog">
              <StatCard label="Artigos publicados" value={publishedPosts} detail="Visiveis no blog" icon={<CheckCircle2 size={15} />} />
              <StatCard label="Rascunhos" value={draftPosts} detail="Em producao" icon={<FileText size={15} />} />
              <StatCard label="Agendados" value={scheduledPosts} detail="Publicacao futura" icon={<CalendarDays size={15} />} />
              <StatCard label="Categorias usadas" value={categoriesInUse} detail="Organizacao editorial" icon={<List size={15} />} />
            </section>

            <section className="admin-dashboard-grid">
              <AdminPanel title="Ultimos artigos" eyebrow="Recentes">
                <DashboardPostList posts={recentPosts} onEdit={editPost} onToggle={togglePostVisibility} />
              </AdminPanel>

              <AdminPanel title="Fila editorial" eyebrow="Pendencias">
                <DashboardPostList posts={editorialQueue} onEdit={editPost} onToggle={togglePostVisibility} emptyText="Nenhum rascunho ou artigo agendado." />
              </AdminPanel>

              <AdminPanel title="Publicacao" eyebrow="Checklist">
                <div className="admin-dashboard-checklist">
                  <span className={publishedPosts > 0 ? "done" : ""}>
                    <CheckCircle2 size={16} /> Publicar primeiro artigo
                  </span>
                  <span className={categoriesInUse > 0 ? "done" : ""}>
                    <List size={16} /> Definir categorias em uso
                  </span>
                  <span className={mediaItems.length > 0 ? "done" : ""}>
                    <ImagePlus size={16} /> Adicionar imagens aos artigos
                  </span>
                  <span className={posts.some((post) => post.metaTitle || post.metaDescription) ? "done" : ""}>
                    <Search size={16} /> Revisar SEO dos conteudos
                  </span>
                </div>
              </AdminPanel>
            </section>
          </>
        )}

        {activeTab === "articles" && (
          <section className="admin-post-list" aria-label="Artigos cadastrados">
            <div className="admin-section-heading">
              <span>Gestao de artigos</span>
              <strong>Criar, editar, excluir, publicar e agendar</strong>
              <label className="admin-section-action admin-import-action">
                <Upload size={17} /> Importar TXT/HTML
                <input
                  type="file"
                  accept=".txt,.html,.htm,text/plain,text/html"
                  onChange={(event) => {
                    const file = event.currentTarget.files?.[0] ?? null;
                    event.currentTarget.value = "";
                    void handleArticleModelImport(file);
                  }}
                />
              </label>
              <button className="admin-section-action" type="button" onClick={openNewPost}>
                <Plus size={17} /> Criar artigo
              </button>
            </div>
            {posts.length === 0 ? (
              <AdminEmpty />
            ) : (
              posts.map((post) => (
                <article className="admin-post-row" key={post.id}>
                  <div className="admin-post-row-head">
                    <span>{getStatusLabel(post.status)}</span>
                    <small>{post.category}</small>
                  </div>
                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>
                  <div className="admin-row-meta">
                    <small>{post.authorName}</small>
                    <small>{getReadingTime(post.content)} min de leitura</small>
                    <small>{formatDate(post.publishedAt)}</small>
                  </div>
                  <div className="admin-post-actions">
                    <a href={getAdminPostPreviewUrl(post)} target="_blank" rel="noreferrer">
                      <Eye size={16} /> Ver
                    </a>
                    <button type="button" onClick={() => editPost(post)}>
                      <Edit3 size={16} /> Editar
                    </button>
                    <button type="button" onClick={() => togglePostVisibility(post)}>
                      {post.status === "published" ? (
                        <>
                          <EyeOff size={16} /> Despublicar
                        </>
                      ) : (
                        <>
                          <Eye size={16} /> Publicar
                        </>
                      )}
                    </button>
                    <button type="button" onClick={() => handleDelete(post.id)}>
                      <Trash2 size={16} /> Excluir
                    </button>
                  </div>
                </article>
              ))
            )}
          </section>
        )}

        {activeTab === "categories" && (
          <AdminPanel title="Categorias do blog" eyebrow="Estrategia">
            <div className="admin-category-create">
              <input value={newCategory} onChange={(event) => setNewCategory(event.target.value)} placeholder="Nova categoria" />
              <button type="button" onClick={addCategory}>
                <Plus size={16} /> Adicionar
              </button>
            </div>
            <div className="admin-category-manager">
              {categories.map((category, index) => (
                <div className="admin-category-row" key={`${category}-${index}`}>
                  <input value={category} onChange={(event) => updateCategory(index, event.target.value)} />
                  <button type="button" onClick={() => moveCategory(index, -1)}>Subir</button>
                  <button type="button" onClick={() => moveCategory(index, 1)}>Descer</button>
                  <button type="button" onClick={() => removeCategory(index)}>
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          </AdminPanel>
        )}

        {activeTab === "authors" && (
          <AdminPanel title="Autores do blog" eyebrow="Equipe editorial">
            <div className="admin-author-create">
              <input
                value={newAuthor.name}
                onChange={(event) => setNewAuthor((current) => ({ ...current, name: event.target.value }))}
                placeholder="Nome do autor"
              />
              <input
                value={newAuthor.role}
                onChange={(event) => setNewAuthor((current) => ({ ...current, role: event.target.value }))}
                placeholder="Cargo"
              />
              <div className="admin-author-photo-input">
                <input
                  value={newAuthor.photo}
                  onChange={(event) => setNewAuthor((current) => ({ ...current, photo: event.target.value }))}
                  placeholder="URL da foto"
                />
                <label className="admin-upload-button">
                  <Upload size={16} />
                  {uploadingNewAuthorPhoto ? "Enviando..." : "Enviar foto"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      const file = event.currentTarget.files?.[0] ?? null;
                      event.currentTarget.value = "";
                      void handleNewAuthorPhotoUpload(file);
                    }}
                    disabled={uploadingNewAuthorPhoto}
                  />
                </label>
              </div>
              <textarea
                value={newAuthor.bio}
                onChange={(event) => setNewAuthor((current) => ({ ...current, bio: event.target.value }))}
                placeholder="Mini bio"
                rows={2}
              />
              <button type="button" onClick={addAuthor}>
                <Plus size={16} /> Criar autor
              </button>
            </div>

            <div className="admin-author-manager">
              {authors.map((author) => (
                <article className="admin-author-row" key={author.id}>
                  <div className="admin-author-avatar">
                    {author.photo ? <img src={author.photo} alt="" /> : <UserRound size={20} />}
                  </div>
                  <div className="admin-author-fields">
                    <input value={author.name} onChange={(event) => updateAuthor(author.id, { name: event.target.value })} />
                    <input value={author.role} onChange={(event) => updateAuthor(author.id, { role: event.target.value })} />
                    <div className="admin-author-photo-input">
                      <input value={author.photo} onChange={(event) => updateAuthor(author.id, { photo: event.target.value })} placeholder="URL da foto" />
                      <label className="admin-upload-button">
                        <Upload size={16} />
                        {uploadingAuthorPhotoId === author.id ? "Enviando..." : "Enviar foto"}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(event) => {
                            const file = event.currentTarget.files?.[0] ?? null;
                            event.currentTarget.value = "";
                            void handleStoredAuthorPhotoUpload(author.id, file);
                          }}
                          disabled={uploadingAuthorPhotoId === author.id}
                        />
                      </label>
                    </div>
                    <textarea value={author.bio} onChange={(event) => updateAuthor(author.id, { bio: event.target.value })} rows={2} />
                  </div>
                  <div className="admin-author-actions">
                    <span>{authorUsage[author.name] ?? 0} artigos</span>
                    <button type="button" onClick={() => removeAuthor(author.id)}>
                      <Trash2 size={15} /> Remover
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </AdminPanel>
        )}

        {activeTab === "media" && (
          <AdminPanel title="Biblioteca de midia" eyebrow="Imagens">
            {mediaItems.length === 0 ? (
              <p>Nenhuma imagem enviada ainda. Use o campo de imagem de capa no editor de artigo.</p>
            ) : (
              <div className="admin-media-grid">
                {mediaItems.map((item) => (
                  <article key={item.url}>
                    <img src={item.url} alt={item.alt || ""} />
                    <strong>{item.title}</strong>
                    <small>{item.alt || "Sem texto alternativo"}</small>
                  </article>
                ))}
              </div>
            )}
          </AdminPanel>
        )}

        {activeTab === "ctas" && (
          <AdminPanel title="CTAs dos artigos" eyebrow="Geracao de leads">
            <PostMiniList posts={posts.filter((post) => post.ctaLabel || post.ctaUrl)} />
          </AdminPanel>
        )}

        {activeTab === "seo" && (
          <AdminPanel title="SEO dos artigos" eyebrow="Google preview">
            {posts.map((post) => (
              <article className="admin-google-preview" key={post.id}>
                <span>{window.location.origin}/blog/{post.slug}</span>
                <strong>{post.metaTitle || post.title}</strong>
                <p>{post.metaDescription || post.excerpt}</p>
              </article>
            ))}
          </AdminPanel>
        )}

        {activeTab === "settings" && (
          <AdminPanel title="Configuracoes do blog" eyebrow="Publicacao">
            <form className="admin-settings-form" onSubmit={handleSaveSettings}>
            <div className="admin-settings-grid">
              <label>
                Titulo da pagina
                <input value={blogSettings.title} onChange={(event) => setBlogSettings((current) => ({ ...current, title: event.target.value }))} />
              </label>
              <label>
                Descricao do blog
                <textarea value={blogSettings.description} onChange={(event) => setBlogSettings((current) => ({ ...current, description: event.target.value }))} />
              </label>
              <label>
                Banner do blog
                <input value={blogSettings.bannerImage} onChange={(event) => setBlogSettings((current) => ({ ...current, bannerImage: event.target.value }))} placeholder="URL da imagem do banner" />
              </label>
              <label>
                Artigos por pagina
                <input type="number" value={blogSettings.postsPerPage} onChange={(event) => setBlogSettings((current) => ({ ...current, postsPerPage: Number(event.target.value) }))} />
              </label>
              <label>
                CTA padrao
                <input value={blogSettings.defaultCta} onChange={(event) => setBlogSettings((current) => ({ ...current, defaultCta: event.target.value }))} />
              </label>
              <label>
                Link do CTA padrao
                <input value={blogSettings.defaultCtaUrl} onChange={(event) => setBlogSettings((current) => ({ ...current, defaultCtaUrl: event.target.value }))} />
              </label>
              <label>
                Redes sociais
                <textarea value={blogSettings.socialLinks} onChange={(event) => setBlogSettings((current) => ({ ...current, socialLinks: event.target.value }))} placeholder="Instagram, LinkedIn, YouTube..." />
              </label>
              <label className="admin-check-row">
                <input type="checkbox" checked={blogSettings.showAuthor} onChange={(event) => setBlogSettings((current) => ({ ...current, showAuthor: event.target.checked }))} />
                Exibir autor
              </label>
              <label className="admin-check-row">
                <input type="checkbox" checked={blogSettings.showReadingTime} onChange={(event) => setBlogSettings((current) => ({ ...current, showReadingTime: event.target.checked }))} />
                Exibir tempo de leitura
              </label>
            </div>
            <button className="admin-settings-save" type="submit">
              <Save size={18} /> Salvar configuracoes
            </button>
            </form>
          </AdminPanel>
        )}
      </section>

      {editorOpen && (
        <div className="admin-modal" role="dialog" aria-modal="true" aria-labelledby="admin-editor-title">
          <div className="admin-modal-backdrop" role="button" tabIndex={0} aria-label="Fechar editor" onClick={() => setEditorOpen(false)} />
          <form className="admin-editor admin-editor-modal admin-blog-editor" onSubmit={handleSave} noValidate>
            <div className="admin-editor-title">
              <div className="admin-editor-heading">
                <span>{editingId ? "Edicao de artigo" : "Novo artigo"}</span>
                <strong id="admin-editor-title">{editingId ? "Editar artigo" : "Criar artigo"}</strong>
                <p>Preencha conteudo, SEO, autor, categoria, imagem e CTA do artigo.</p>
              </div>
              <div className="admin-editor-actions">
                <button className="admin-modal-close" type="button" aria-label="Fechar" onClick={() => setEditorOpen(false)}>
                  <X size={18} />
                </button>
                <button type="button" disabled={savingPost} onClick={(event) => void handleSave(event as unknown as FormEvent<HTMLFormElement>)}>
                  <Save size={18} /> {savingPost ? "Salvando..." : "Salvar artigo"}
                </button>
              </div>
            </div>

            {message && <p className="admin-message admin-editor-message">{message}</p>}

            <div className="admin-editor-tabs">
              {editorTabs.map(({ id, label, Icon }) => (
                <button
                  className={editorTab === id ? "active" : ""}
                  type="button"
                  onClick={() => setEditorTab(id)}
                  key={id}
                >
                  <Icon size={15} /> {label}
                </button>
              ))}
            </div>

            <section id="article-content" className="admin-editor-section" hidden={editorTab !== "content"}>
              <div className="admin-editor-split">
                <label>
                  Titulo
                  <input
                    value={form.title}
                    onChange={(event) => {
                      const title = event.target.value;
                      setForm((current) => ({
                        ...current,
                        title,
                        slug: current.slug ? current.slug : slugify(title),
                        content: syncArticleHtmlField(current.content, "title", title),
                      }));
                    }}
                    required
                  />
                </label>
                <label>
                  URL do artigo
                  <input value={form.slug} onChange={(event) => setForm((current) => ({ ...current, slug: slugify(event.target.value) }))} required />
                </label>
              </div>

              <label>
                Subtitulo
                <input
                  value={form.subtitle}
                  onChange={(event) => {
                    const subtitle = event.target.value;
                    setForm((current) => ({
                      ...current,
                      subtitle,
                      content: syncArticleHtmlField(current.content, "subtitle", subtitle),
                    }));
                  }}
                />
              </label>

              <div className="admin-editor-split">
                <label>
                  Categoria
                  <select value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}>
                    {categories.map((category) => (
                      <option key={category}>{category}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Status
                  <select value={form.status} onChange={(event) => setForm((current) => ({ ...current, status: event.target.value as BlogPostInput["status"] }))}>
                    <option value="draft">Rascunho</option>
                    <option value="published">Publicado</option>
                    <option value="scheduled">Agendado</option>
                  </select>
                </label>
                <label>
                  Data de publicacao
                  <input type="datetime-local" value={toDatetimeLocalValue(form.publishedAt)} onChange={(event) => setForm((current) => ({ ...current, publishedAt: event.target.value ? new Date(event.target.value).toISOString() : null }))} />
                </label>
              </div>

              <div className="admin-field-label">
                <strong>Imagem do blog</strong>
                <small className="admin-field-hint">Usada como banner no preview e dentro do artigo. Ideal: 1280 x 720 px, proporcao 16:9. Ao enviar arquivo, a imagem e ajustada automaticamente para esse formato.</small>
                <div className="admin-image-field">
                  {form.coverImage ? (
                    <img src={form.coverImage} alt="" />
                  ) : (
                    <span>
                      <ImagePlus size={22} />
                      Selecione uma imagem
                    </span>
                  )}
                  <div>
                    {form.coverImage.startsWith("data:") ? (
                      <div className="admin-local-image-row">
                        <input value="Imagem enviada localmente" readOnly />
                        <button type="button" onClick={() => setForm((current) => ({ ...current, coverImage: "" }))}>
                          Remover
                        </button>
                      </div>
                    ) : (
                      <input
                        value={form.coverImage}
                        onChange={(event) => {
                          const coverImage = event.target.value;
                          setForm((current) => ({
                            ...current,
                            coverImage,
                            content: syncArticleHtmlField(current.content, "coverImage", coverImage, current.imageAlt),
                          }));
                        }}
                        placeholder="URL da imagem"
                      />
                    )}
                    <input
                      value={form.imageAlt}
                      onChange={(event) => {
                        const imageAlt = event.target.value;
                        setForm((current) => ({
                          ...current,
                          imageAlt,
                          content: syncArticleHtmlField(current.content, "imageAlt", imageAlt),
                        }));
                      }}
                      placeholder="Texto alternativo da imagem"
                    />
                    <label className="admin-upload-button">
                      <Upload size={16} />
                      {uploadingImage ? "Enviando..." : "Enviar imagem"}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(event) => {
                          const file = event.currentTarget.files?.[0] ?? null;
                          event.currentTarget.value = "";
                          void handleImageUpload(file);
                        }}
                        disabled={uploadingImage}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <label>
                Resumo
                <textarea
                  value={form.excerpt}
                  onChange={(event) => {
                    const excerpt = event.target.value;
                    setForm((current) => ({
                      ...current,
                      excerpt,
                      content: syncArticleHtmlField(current.content, "excerpt", excerpt),
                    }));
                  }}
                  rows={3}
                  required
                />
              </label>

              {isHtmlArticleContent(form.content) ? (
                <div className="admin-field-label admin-visual-article-field">
                  <strong>Conteudo visual</strong>
                  <small className="admin-field-hint">
                    Edite os textos diretamente no preview importado. As alteracoes sao salvas no HTML do artigo.
                  </small>
                  <VisualHtmlEditor
                    value={getVisualEditorHtml(form.content)}
                    onChange={handleVisualArticleChange}
                    onTitleChange={handleVisualArticleTitleChange}
                  />
                  <button className="admin-source-open-button" type="button" onClick={() => setSourceEditorOpen(true)}>
                    <FileText size={16} /> Editar HTML bruto
                  </button>
                </div>
              ) : (
                <>
                  <div className="admin-editor-toolbar">
                    {editorActions.map(({ label, token, Icon }) => (
                      <button type="button" onClick={() => insertEditorToken(token)} key={label} title={label}>
                        <Icon size={16} /> {label}
                      </button>
                    ))}
                  </div>

                  <label>
                    Conteudo
                    <textarea value={form.content} onChange={(event) => setForm((current) => ({ ...current, content: event.target.value }))} rows={14} required />
                  </label>
                </>
              )}
              <p className="admin-read-time">Tempo estimado: {getReadingTime(form.content)} min de leitura</p>
            </section>

            <section id="article-seo" className="admin-editor-section" hidden={editorTab !== "seo"}>
              <div className="admin-editor-split">
                <label>
                  Meta title
                  <input value={form.metaTitle} onChange={(event) => setForm((current) => ({ ...current, metaTitle: event.target.value }))} placeholder={form.title || "Titulo para o Google"} />
                </label>
                <label>
                  Palavra-chave principal
                  <input value={form.keyword} onChange={(event) => setForm((current) => ({ ...current, keyword: event.target.value }))} />
                </label>
              </div>
              <label>
                Meta description
                <textarea value={form.metaDescription} onChange={(event) => setForm((current) => ({ ...current, metaDescription: event.target.value }))} rows={3} placeholder={form.excerpt || "Descricao para aparecer no Google"} />
              </label>
              <article className="admin-google-preview">
                <span>{window.location.origin}/blog/{form.slug || "url-do-artigo"}</span>
                <strong>{form.metaTitle || form.title || "Titulo do artigo"}</strong>
                <p>{form.metaDescription || form.excerpt || "A meta description aparecera aqui."}</p>
              </article>
            </section>

            <section id="article-author" className="admin-editor-section" hidden={editorTab !== "author"}>
              <div className="admin-editor-split">
                <label>
                  Autor
                  <select value={form.authorName} onChange={(event) => applyAuthor(event.target.value)}>
                    {!authors.some((author) => author.name === form.authorName) && <option>{form.authorName}</option>}
                    {authors.map((author) => (
                      <option key={author.id} value={author.name}>
                        {author.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Cargo
                  <input value={form.authorRole} onChange={(event) => setForm((current) => ({ ...current, authorRole: event.target.value }))} />
                </label>
              </div>
              <div className="admin-field-label">
                <strong>Foto do autor</strong>
                <div className="admin-image-field admin-author-photo-field">
                  {form.authorPhoto ? (
                    <img src={form.authorPhoto} alt="" />
                  ) : (
                    <span>
                      <UserRound size={22} />
                      Selecione uma foto
                    </span>
                  )}
                  <div>
                    <input value={form.authorPhoto} onChange={(event) => setForm((current) => ({ ...current, authorPhoto: event.target.value }))} placeholder="URL da foto" />
                    <label className="admin-upload-button">
                      <Upload size={16} />
                      {uploadingAuthorPhoto ? "Enviando..." : "Enviar foto"}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(event) => {
                          const file = event.currentTarget.files?.[0] ?? null;
                          event.currentTarget.value = "";
                          void handleAuthorPhotoUpload(file);
                        }}
                        disabled={uploadingAuthorPhoto}
                      />
                    </label>
                  </div>
                </div>
              </div>
              <label>
                Mini bio
                <textarea value={form.authorBio} onChange={(event) => setForm((current) => ({ ...current, authorBio: event.target.value }))} rows={3} />
              </label>
            </section>

            <section id="article-cta" className="admin-editor-section" hidden={editorTab !== "cta"}>
              <div className="admin-editor-split">
                <label>
                  Texto do botao
                  <input value={form.ctaLabel} onChange={(event) => setForm((current) => ({ ...current, ctaLabel: event.target.value }))} />
                </label>
                <label>
                  Link do CTA
                  <input value={form.ctaUrl} onChange={(event) => setForm((current) => ({ ...current, ctaUrl: event.target.value }))} />
                </label>
              </div>
              <label>
                Chamada do CTA
                <textarea value={form.ctaText} onChange={(event) => setForm((current) => ({ ...current, ctaText: event.target.value }))} rows={3} />
              </label>
            </section>

            {sourceEditorOpen && (
              <div className="admin-source-modal" role="dialog" aria-modal="true" aria-labelledby="admin-source-editor-title">
                <div className="admin-source-modal-backdrop" role="button" tabIndex={0} aria-label="Fechar editor de HTML" onClick={() => setSourceEditorOpen(false)} />
                <section className="admin-source-modal-panel">
                  <div className="admin-source-modal-heading">
                    <div>
                      <span>Codigo do artigo</span>
                      <strong id="admin-source-editor-title">Editar HTML bruto</strong>
                    </div>
                    <button type="button" aria-label="Fechar editor de HTML" onClick={() => setSourceEditorOpen(false)}>
                      <X size={18} />
                    </button>
                  </div>
                  <textarea
                    value={form.content}
                    onChange={(event) => handleVisualArticleChange(event.target.value)}
                    spellCheck={false}
                    rows={22}
                    required
                  />
                  <div className="admin-source-modal-actions">
                    <button type="button" onClick={() => setSourceEditorOpen(false)}>
                      Voltar ao preview
                    </button>
                    <button type="button" onClick={() => setSourceEditorOpen(false)}>
                      Aplicar HTML
                    </button>
                  </div>
                </section>
              </div>
            )}
          </form>
        </div>
      )}
    </main>
  );
}

function AdminNavButton({
  activeTab,
  tab,
  setActiveTab,
  icon,
  label,
}: {
  activeTab: AdminTab;
  tab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  icon: ReactNode;
  label: string;
}) {
  return (
    <button className={activeTab === tab ? "active" : ""} type="button" onClick={() => setActiveTab(tab)}>
      {icon} {label}
    </button>
  );
}

function StatCard({ label, value, detail, icon }: { label: string; value: number; detail: string; icon: ReactNode }) {
  return (
    <article className="admin-stat-card">
      <span className="admin-stat-icon">{icon}</span>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>
        {icon} {detail}
      </small>
      <i aria-hidden="true" />
    </article>
  );
}

function AdminPanel({ title, eyebrow, children }: { title: string; eyebrow: string; children: ReactNode }) {
  return (
    <section className="admin-content-panel">
      <div className="admin-section-heading">
        <span>{eyebrow}</span>
        <strong>{title}</strong>
      </div>
      {children}
    </section>
  );
}

function AdminEmpty() {
  return (
    <div className="admin-empty">
      <FileText size={28} />
      <strong>Nenhum artigo ainda</strong>
      <p>Crie o primeiro conteudo para ele aparecer no blog publico.</p>
    </div>
  );
}

function PostMiniList({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return <p>Nenhum artigo cadastrado ainda.</p>;

  return (
    <>
      {posts.map((post) => (
        <div className="admin-mini-row" key={post.id}>
          <span>{post.title}</span>
          <strong>{getStatusLabel(post.status)}</strong>
        </div>
      ))}
    </>
  );
}

function DashboardPostList({
  posts,
  onEdit,
  onToggle,
  emptyText = "Nenhum artigo cadastrado ainda.",
}: {
  posts: BlogPost[];
  onEdit: (post: BlogPost) => void;
  onToggle: (post: BlogPost) => void;
  emptyText?: string;
}) {
  if (posts.length === 0) {
    return (
      <div className="admin-dashboard-empty">
        <FileText size={20} />
        <span>{emptyText}</span>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-list">
      {posts.map((post) => (
        <article key={post.id}>
          <div>
            <span>{getStatusLabel(post.status)}</span>
            <small>{post.category}</small>
          </div>
          <strong>{post.title}</strong>
          <p>{post.excerpt}</p>
          <footer>
            <small>{formatDate(post.publishedAt)}</small>
            <div>
              <button type="button" onClick={() => onEdit(post)}>
                <Edit3 size={15} /> Editar
              </button>
              <button type="button" onClick={() => onToggle(post)}>
                {post.status === "published" ? <EyeOff size={15} /> : <Eye size={15} />}
                {post.status === "published" ? "Despublicar" : "Publicar"}
              </button>
            </div>
          </footer>
        </article>
      ))}
    </div>
  );
}

function getStatusLabel(status: BlogPostStatus) {
  if (status === "published") return "Publicado";
  if (status === "scheduled") return "Agendado";
  return "Rascunho";
}

function getTabTitle(tab: AdminTab) {
  const titles: Record<AdminTab, string> = {
    dashboard: "Dashboard do blog",
    articles: "Gestao de artigos",
    categories: "Categorias",
    authors: "Autores",
    media: "Biblioteca de midia",
    ctas: "CTAs e conversao",
    seo: "SEO dos artigos",
    settings: "Configuracoes",
  };

  return titles[tab];
}
