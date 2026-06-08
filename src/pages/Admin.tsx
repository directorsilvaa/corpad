import {
  Bold,
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
  LockKeyhole,
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
import { FormEvent, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { adminLogin, adminLogout, isAdminLoggedIn } from "../lib/adminAuth";
import {
  BlogPost,
  BlogPostInput,
  BlogPostStatus,
  BlogSettings,
  blogCategories,
  defaultBlogSettings,
  deleteBlogPost,
  getBlogSettings,
  listBlogCategories,
  listBlogPosts,
  saveBlogSettings,
  saveBlogCategories,
  saveBlogPost,
  slugify,
  uploadBlogImage,
} from "../lib/blogPosts";

type AdminTab =
  | "dashboard"
  | "articles"
  | "categories"
  | "authors"
  | "media"
  | "ctas"
  | "seo"
  | "settings";

const whatsappUrl = "https://wa.me/5516996094649";
const rememberedAdminEmailKey = "corpad_admin_remembered_email";

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

function getReadingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 180));
}

function formatDate(value: string | null | undefined) {
  if (!value) return "--";
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric" }).format(
    new Date(value),
  );
}

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>(blogCategories);
  const [editingId, setEditingId] = useState<string | undefined>();
  const [form, setForm] = useState<BlogPostInput>(emptyPost);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberEmail, setRememberEmail] = useState(false);
  const [message, setMessage] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingAuthorPhoto, setUploadingAuthorPhoto] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [newCategory, setNewCategory] = useState("");
  const [blogSettings, setBlogSettings] = useState({
    ...defaultBlogSettings,
  });

  useEffect(() => {
    document.title = "Admin | CORPAD";
    setCategories(listBlogCategories());
    setBlogSettings(getBlogSettings());

    const rememberedEmail = localStorage.getItem(rememberedAdminEmailKey);
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberEmail(true);
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
  const authors = Array.from(new Set(posts.map((post) => post.authorName).filter(Boolean)));

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
      setLoggedIn(true);
      await refreshPosts();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Nao foi possivel entrar.");
    }
  }

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    try {
      await saveBlogPost(
        {
          ...form,
          slug: form.slug || slugify(form.title),
          metaTitle: form.metaTitle || form.title,
          metaDescription: form.metaDescription || form.excerpt,
        },
        editingId,
      );
      setForm(emptyPost);
      setEditingId(undefined);
      setEditorOpen(false);
      await refreshPosts();
      setMessage("Artigo salvo com sucesso.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Nao foi possivel salvar.");
    }
  }

  async function handleDelete(id: string) {
    await deleteBlogPost(id);
    if (editingId === id) {
      setEditingId(undefined);
      setForm(emptyPost);
      setEditorOpen(false);
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
  }

  async function handleImageUpload(file: File | null) {
    if (!file) return;

    setUploadingImage(true);
    setMessage("");

    try {
      const imageUrl = await uploadBlogImage(file);
      setForm((current) => ({ ...current, coverImage: imageUrl }));
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

  function openNewPost() {
    setEditingId(undefined);
    setForm({ ...emptyPost, category: categories[0] ?? blogCategories[0] });
    setEditorOpen(true);
  }

  function editPost(post: BlogPost) {
    setEditingId(post.id);
    setForm({
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
    });
    setEditorOpen(true);
  }

  function insertEditorToken(token: string) {
    setForm((current) => ({
      ...current,
      content: current.content ? `${current.content}\n\n${token}` : token,
    }));
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
          <img src="/logo-admin.png" alt="CORPAD" />
          <div className="admin-login-heading">
            <span aria-hidden="true">
              <LockKeyhole size={18} />
            </span>
            <h1>Bem-vindo de volta!</h1>
            <p>Acesse o painel para gerenciar os posts do blog.</p>
          </div>

          <form onSubmit={handleLogin}>
            <label>
              E-mail
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Digite seu e-mail"
                required
              />
            </label>
            <label>
              Senha
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Digite sua senha"
                required
              />
            </label>
            <div className="admin-login-options">
              <label>
                <input
                  type="checkbox"
                  checked={rememberEmail}
                  onChange={(event) => setRememberEmail(event.target.checked)}
                />
                Lembrar meu e-mail
              </label>
            </div>
            {message && <p className="admin-message">{message}</p>}
            <button type="submit">Entrar</button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <aside className="admin-sidebar">
        <a className="admin-brand" href="/">
          <img src="/logo-admin.png" alt="CORPAD" />
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
            <span>Painel administrador do blog institucional</span>
            <h1>{getTabTitle(activeTab)}</h1>
          </div>
          <button type="button" onClick={openNewPost}>
            <Plus size={18} /> Criar artigo
          </button>
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
          <section className="admin-panel-grid">
            {(authors.length > 0 ? authors : ["Equipe CORPAD"]).map((author) => (
              <AdminPanel title={author} eyebrow="Autor" key={author}>
                <p>Edite nome, foto, cargo e mini bio dentro de cada artigo.</p>
              </AdminPanel>
            ))}
          </section>
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
          <form className="admin-editor admin-editor-modal admin-blog-editor" onSubmit={handleSave}>
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
                <button type="submit">
                  <Save size={18} /> Salvar artigo
                </button>
              </div>
            </div>

            <div className="admin-editor-tabs">
              <a href="#article-content">Conteudo</a>
              <a href="#article-seo">SEO</a>
              <a href="#article-author">Autor</a>
              <a href="#article-cta">CTA</a>
            </div>

            <section id="article-content" className="admin-editor-section">
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
                <input value={form.subtitle} onChange={(event) => setForm((current) => ({ ...current, subtitle: event.target.value }))} />
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
                  <input type="datetime-local" value={form.publishedAt ? form.publishedAt.slice(0, 16) : ""} onChange={(event) => setForm((current) => ({ ...current, publishedAt: event.target.value ? new Date(event.target.value).toISOString() : null }))} />
                </label>
              </div>

              <div className="admin-field-label">
                <strong>Imagem principal</strong>
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
                    <input value={form.coverImage} onChange={(event) => setForm((current) => ({ ...current, coverImage: event.target.value }))} placeholder="URL da imagem" />
                    <input value={form.imageAlt} onChange={(event) => setForm((current) => ({ ...current, imageAlt: event.target.value }))} placeholder="Texto alternativo da imagem" />
                    <label className="admin-upload-button">
                      <Upload size={16} />
                      {uploadingImage ? "Enviando..." : "Enviar imagem"}
                      <input type="file" accept="image/*" onChange={(event) => void handleImageUpload(event.target.files?.[0] ?? null)} disabled={uploadingImage} />
                    </label>
                  </div>
                </div>
              </div>

              <label>
                Resumo
                <textarea value={form.excerpt} onChange={(event) => setForm((current) => ({ ...current, excerpt: event.target.value }))} rows={3} required />
              </label>

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
              <p className="admin-read-time">Tempo estimado: {getReadingTime(form.content)} min de leitura</p>
            </section>

            <section id="article-seo" className="admin-editor-section">
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

            <section id="article-author" className="admin-editor-section">
              <div className="admin-editor-split">
                <label>
                  Autor
                  <input value={form.authorName} onChange={(event) => setForm((current) => ({ ...current, authorName: event.target.value }))} />
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
                      <input type="file" accept="image/*" onChange={(event) => void handleAuthorPhotoUpload(event.target.files?.[0] ?? null)} disabled={uploadingAuthorPhoto} />
                    </label>
                  </div>
                </div>
              </div>
              <label>
                Mini bio
                <textarea value={form.authorBio} onChange={(event) => setForm((current) => ({ ...current, authorBio: event.target.value }))} rows={3} />
              </label>
            </section>

            <section id="article-cta" className="admin-editor-section">
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
