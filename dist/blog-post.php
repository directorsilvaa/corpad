<?php
declare(strict_types=1);

$siteUrl = 'https://corpad.com.br';
$defaultImage = $siteUrl . '/logo.png?v=20260618';
$postsFile = __DIR__ . '/data/blog-posts.json';
$slug = trim((string)($_GET['slug'] ?? ''), '/');

function e($value): string {
  return htmlspecialchars((string)$value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function render_asset_links(): string {
  $links = [];

  foreach (glob(__DIR__ . '/assets/*.css') ?: [] as $file) {
    $links[] = '<link rel="stylesheet" href="/assets/' . e(basename($file)) . '" />';
  }

  return implode("\n    ", $links);
}

function read_posts(string $postsFile): array {
  if (!file_exists($postsFile)) {
    return [];
  }

  $posts = json_decode(file_get_contents($postsFile) ?: '[]', true);
  return is_array($posts) ? $posts : [];
}

function is_published(array $post): bool {
  $status = $post['status'] ?? 'draft';
  $publishedAt = $post['publishedAt'] ?? null;

  if ($status === 'published') {
    return true;
  }

  return $status === 'scheduled' && is_string($publishedAt) && strtotime($publishedAt) <= time();
}

function strip_html_text($value): string {
  return trim(preg_replace('/\s+/', ' ', strip_tags((string)$value)));
}

function render_content($content): string {
  $content = (string)$content;

  if (preg_match('/<\/?(p|h[1-6]|a|ul|ol|li|div|section|article|blockquote|img|iframe)\b/i', $content)) {
    $content = preg_replace('/<script\b[^>]*>[\s\S]*?<\/script>/i', '', $content);
    $content = preg_replace('/\son[a-z]+\s*=\s*(["\']).*?\1/i', '', $content);
    $content = preg_replace('/\s(href|src)\s*=\s*(["\'])\s*javascript:[\s\S]*?\2/i', '', $content);
    return $content;
  }

  $paragraphs = array_filter(array_map('trim', preg_split('/\R+/', $content) ?: []));
  return implode("\n", array_map(fn($line) => '<p>' . e($line) . '</p>', $paragraphs));
}

$post = null;
foreach (read_posts($postsFile) as $item) {
  if (($item['slug'] ?? '') === $slug && is_published($item)) {
    $post = $item;
    break;
  }
}

if (!$post) {
  http_response_code(404);
  $title = 'Artigo nao encontrado | Blog CORPAD';
  echo "<!doctype html><html lang=\"pt-BR\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><meta name=\"robots\" content=\"noindex\"><title>{$title}</title></head><body><main><h1>Artigo nao encontrado</h1><p>O artigo solicitado nao esta publicado.</p><p><a href=\"/blog/\">Voltar para o blog</a></p></main></body></html>";
  exit;
}

$title = ($post['metaTitle'] ?? '') ?: ($post['title'] ?? 'Blog CORPAD');
$description = ($post['metaDescription'] ?? '') ?: (($post['excerpt'] ?? '') ?: mb_substr(strip_html_text($post['content'] ?? ''), 0, 155));
$url = $siteUrl . '/blog/' . rawurlencode($post['slug']) . '/';
$image = ($post['coverImage'] ?? '') ?: $defaultImage;
$published = $post['publishedAt'] ?? $post['createdAt'] ?? null;
$modified = $post['updatedAt'] ?? $published;
$keywords = array_values(array_filter(array_map('trim', explode(',', (string)($post['keyword'] ?? '')))));
$jsonLd = [
  [
    '@context' => 'https://schema.org',
    '@type' => 'Article',
    'headline' => $title,
    'description' => $description,
    'url' => $url,
    'image' => $image,
    'datePublished' => $published,
    'dateModified' => $modified,
    'author' => [
      '@type' => 'Organization',
      'name' => ($post['authorName'] ?? '') ?: 'CORPAD Digital',
    ],
    'publisher' => [
      '@type' => 'Organization',
      'name' => 'CORPAD',
      'logo' => [
        '@type' => 'ImageObject',
        'url' => $defaultImage,
      ],
    ],
    'mainEntityOfPage' => $url,
    'inLanguage' => 'pt-BR',
    'keywords' => $keywords,
  ],
  [
    '@context' => 'https://schema.org',
    '@type' => 'BreadcrumbList',
    'itemListElement' => [
      ['@type' => 'ListItem', 'position' => 1, 'name' => 'Inicio', 'item' => $siteUrl . '/'],
      ['@type' => 'ListItem', 'position' => 2, 'name' => 'Blog', 'item' => $siteUrl . '/blog/'],
      ['@type' => 'ListItem', 'position' => 3, 'name' => $title, 'item' => $url],
    ],
  ],
];
?><!doctype html>
<html lang="pt-BR" data-corpad-template="dynamic-blog-post">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><?= e($title) ?> | Blog CORPAD</title>
    <meta name="description" content="<?= e($description) ?>" />
    <?php if (count($keywords) > 0): ?>
      <meta name="keywords" content="<?= e(implode(', ', $keywords)) ?>" />
    <?php endif; ?>
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
    <link rel="canonical" href="<?= e($url) ?>" />
    <meta property="og:title" content="<?= e($title) ?> | Blog CORPAD" />
    <meta property="og:description" content="<?= e($description) ?>" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="<?= e($url) ?>" />
    <meta property="og:image" content="<?= e($image) ?>" />
    <meta property="og:site_name" content="CORPAD" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="<?= e($title) ?> | Blog CORPAD" />
    <meta name="twitter:description" content="<?= e($description) ?>" />
    <meta name="twitter:image" content="<?= e($image) ?>" />
    <?php if ($published): ?>
      <meta property="article:published_time" content="<?= e($published) ?>" />
    <?php endif; ?>
    <?php if ($modified): ?>
      <meta property="article:modified_time" content="<?= e($modified) ?>" />
    <?php endif; ?>
    <meta property="article:author" content="<?= e(($post['authorName'] ?? '') ?: 'CORPAD Digital') ?>" />
    <meta property="article:section" content="<?= e($post['category'] ?? 'Blog') ?>" />
    <?php foreach ($keywords as $keyword): ?>
      <meta property="article:tag" content="<?= e($keyword) ?>" />
    <?php endforeach; ?>
    <meta name="geo.region" content="BR-SP" />
    <meta name="geo.placename" content="Monte Alto, Sao Paulo, Brasil" />
    <meta name="geo.position" content="-21.2616;-48.4969" />
    <meta name="ICBM" content="-21.2616, -48.4969" />
    <link rel="icon" type="image/png" href="/logo-icon.png?v=20260618" />
    <?= render_asset_links() ?>
    <script type="application/ld+json"><?= json_encode($jsonLd, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) ?></script>
  </head>
  <body>
    <div id="root">
      <main class="blog-page blog-clean-page blog-ssr-page">
        <header class="navbar blog-navbar">
          <a class="brand" href="/" aria-label="Pagina inicial">CORPAD</a>
          <nav class="nav-links" aria-label="Navegacao principal">
            <a href="/corpad-digital/">CORPAD Digital</a>
            <a href="/corpad-consultoria/">Consultoria</a>
            <a href="/clientes/">Clientes</a>
            <a class="active" href="/blog/" aria-current="page">Blog</a>
          </nav>
        </header>
        <article class="blog-article">
          <nav class="blog-article-kicker" aria-label="Breadcrumb">
            <a class="blog-back-link" href="/blog/">Voltar para o blog</a>
            <span><?= e($post['category'] ?? 'Blog') ?></span>
          </nav>
          <h1><?= e($post['title'] ?? $title) ?></h1>
          <p><?= e($description) ?></p>
          <?php if ($image): ?>
            <img src="<?= e($image) ?>" alt="<?= e(($post['imageAlt'] ?? '') ?: ($post['title'] ?? $title)) ?>" class="blog-article-cover" />
          <?php endif; ?>
          <div class="blog-article-content">
            <?= render_content($post['content'] ?? '') ?>
          </div>
        </article>
      </main>
    </div>
  </body>
</html>
