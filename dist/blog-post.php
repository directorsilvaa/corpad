<?php
declare(strict_types=1);

$siteUrl = 'https://corpad.com.br';
$defaultImage = $siteUrl . '/logo.png?v=20260618';
$postsFile = __DIR__ . '/data/blog-posts.json';

function e($value): string {
  return htmlspecialchars((string)$value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function normalize_slug(string $value): string {
  $value = html_entity_decode(rawurldecode($value), ENT_QUOTES | ENT_HTML5, 'UTF-8');
  $converted = @iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $value);
  $value = $converted !== false ? $converted : $value;
  $value = strtolower($value);
  $value = preg_replace('/[^a-z0-9]+/', '-', $value) ?: '';
  return trim($value, '-');
}

function slug_from_path(string $path): string {
  $path = parse_url($path, PHP_URL_PATH) ?: '';
  $path = trim($path, '/');

  if (preg_match('#^blog/(.+)$#', $path, $matches)) {
    return trim($matches[1], '/');
  }

  return '';
}

function request_slug(): string {
  $direct = trim((string)($_GET['slug'] ?? ''), '/');

  if ($direct !== '') {
    return normalize_slug($direct);
  }

  foreach (['REQUEST_URI', 'REDIRECT_URL', 'REDIRECT_URI', 'SCRIPT_URL', 'ORIG_PATH_INFO', 'PATH_INFO', 'HTTP_X_ORIGINAL_URL', 'UNENCODED_URL'] as $key) {
    $candidate = slug_from_path((string)($_SERVER[$key] ?? ''));

    if ($candidate !== '') {
      return normalize_slug($candidate);
    }
  }

  return '';
}

$slug = request_slug();

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

function post_value(array $post, string $camelKey, string $snakeKey = '') {
  if (array_key_exists($camelKey, $post)) {
    return $post[$camelKey];
  }

  if ($snakeKey !== '' && array_key_exists($snakeKey, $post)) {
    return $post[$snakeKey];
  }

  return null;
}

function is_published(array $post): bool {
  $status = $post['status'] ?? 'draft';
  $publishedAt = post_value($post, 'publishedAt', 'published_at');

  if ($status === 'published') {
    return true;
  }

  return $status === 'scheduled' && is_string($publishedAt) && strtotime($publishedAt) <= time();
}

function strip_html_text($value): string {
  return trim(preg_replace('/\s+/', ' ', strip_tags((string)$value)));
}

function excerpt_text(string $text, int $length = 155): string {
  if (function_exists('mb_substr')) {
    return mb_substr($text, 0, $length);
  }

  return substr($text, 0, $length);
}

function post_field(array $post, string $camelKey, string $snakeKey = '', $default = '') {
  $value = post_value($post, $camelKey, $snakeKey);
  return $value !== null && $value !== '' ? $value : $default;
}

function split_keywords(string $value): array {
  return array_values(array_filter(array_map('trim', explode(',', $value))));
}

function extract_faqs(string $content): array {
  $plain = strip_html_text($content);
  preg_match_all('/([^.!?]{12,120}\?)\s*([^?]{24,320})(?=(?:[^.!?]{12,120}\?)|$)/u', $plain, $matches, PREG_SET_ORDER);

  return array_slice(array_map(fn($match) => [
    'question' => trim($match[1]),
    'answer' => trim($match[2]),
  ], $matches), 0, 6);
}

function answer_points(string $content): array {
  $plain = strip_html_text($content);
  $sentences = preg_split('/(?<=[.!?])\s+/u', $plain) ?: [];
  $points = array_values(array_filter(array_map('trim', $sentences), fn($sentence) => strlen($sentence) >= 48));

  return array_slice($points, 0, 4);
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
$posts = read_posts($postsFile);

foreach ($posts as $item) {
  $candidateSlugs = [
    (string)($item['slug'] ?? ''),
    (string)($item['title'] ?? ''),
    (string)($item['metaTitle'] ?? ''),
    (string)($item['meta_title'] ?? ''),
  ];

  $matchesSlug = in_array($slug, array_map('normalize_slug', $candidateSlugs), true);

  if ($matchesSlug && is_published($item)) {
    $post = $item;
    break;
  }
}

if (!$post) {
  http_response_code(404);
  $title = 'Artigo nao encontrado | Blog CORPAD';
  $availableSlugs = array_slice(array_map(fn($item) => (string)($item['slug'] ?? ''), $posts), 0, 20);
  $debug = e(json_encode([
    'receivedSlug' => $slug,
    'postsFileExists' => file_exists($postsFile),
    'postsCount' => count($posts),
    'availableSlugs' => $availableSlugs,
  ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
  echo "<!doctype html><html lang=\"pt-BR\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><meta name=\"robots\" content=\"noindex\"><title>{$title}</title></head><body><main><h1>Artigo nao encontrado</h1><p>O artigo solicitado nao esta publicado.</p><p><a href=\"/blog/\">Voltar para o blog</a></p></main></body></html>";
  echo "\n<!-- corpad-blog-debug {$debug} -->";
  exit;
}

$postTitle = post_field($post, 'title', '', 'Blog CORPAD');
$contentText = strip_html_text((string)post_field($post, 'content', '', ''));
$title = post_field($post, 'metaTitle', 'meta_title', $postTitle);
$description = post_field($post, 'metaDescription', 'meta_description', post_field($post, 'excerpt', '', excerpt_text($contentText)));
$url = $siteUrl . '/blog/' . rawurlencode((string)post_field($post, 'slug')) . '/';
$image = post_field($post, 'coverImage', 'cover_image', $defaultImage);
$published = post_field($post, 'publishedAt', 'published_at', post_field($post, 'createdAt', 'created_at', null));
$modified = post_field($post, 'updatedAt', 'updated_at', $published);
$authorName = post_field($post, 'authorName', 'author_name', 'CORPAD Digital');
$category = post_field($post, 'category', '', 'Blog');
$keywords = split_keywords((string)post_field($post, 'keyword', '', $category));
$faqs = extract_faqs((string)post_field($post, 'content', '', ''));
$answerPoints = answer_points((string)post_field($post, 'content', '', ''));
$jsonLd = [
  [
    '@context' => 'https://schema.org',
    '@type' => ['Article', 'BlogPosting'],
    '@id' => $url . '#article',
    'headline' => $title,
    'description' => $description,
    'url' => $url,
    'image' => $image,
    'datePublished' => $published,
    'dateModified' => $modified,
    'author' => [
      '@type' => 'Organization',
      'name' => $authorName,
    ],
    'publisher' => [
      '@type' => 'Organization',
      '@id' => $siteUrl . '/#organization',
      'name' => 'CORPAD',
      'logo' => [
        '@type' => 'ImageObject',
        'url' => $defaultImage,
      ],
    ],
    'mainEntityOfPage' => $url,
    'inLanguage' => 'pt-BR',
    'articleSection' => $category,
    'keywords' => $keywords,
    'about' => array_map(fn($keyword) => ['@type' => 'Thing', 'name' => $keyword], $keywords),
    'mentions' => [
      ['@type' => 'Place', 'name' => 'Monte Alto, Sao Paulo, Brasil'],
      ['@type' => 'Organization', 'name' => 'CORPAD', 'url' => $siteUrl],
    ],
    'isPartOf' => [
      '@type' => 'Blog',
      'name' => 'Blog CORPAD',
      'url' => $siteUrl . '/blog/',
    ],
    'speakable' => [
      '@type' => 'SpeakableSpecification',
      'cssSelector' => ['.blog-article h1', '.blog-article > p', '.blog-aeo-answer'],
    ],
  ],
  [
    '@context' => 'https://schema.org',
    '@type' => 'WebPage',
    '@id' => $url . '#webpage',
    'name' => $title,
    'headline' => $postTitle,
    'description' => $description,
    'url' => $url,
    'inLanguage' => 'pt-BR',
    'primaryImageOfPage' => $image,
    'mainEntity' => ['@id' => $url . '#article'],
    'publisher' => ['@id' => $siteUrl . '/#organization'],
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

if (count($faqs) > 0) {
  $jsonLd[] = [
    '@context' => 'https://schema.org',
    '@type' => 'FAQPage',
    '@id' => $url . '#faq',
    'mainEntity' => array_map(fn($faq) => [
      '@type' => 'Question',
      'name' => $faq['question'],
      'acceptedAnswer' => [
        '@type' => 'Answer',
        'text' => $faq['answer'],
      ],
    ], $faqs),
  ];
}
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
    <meta property="article:author" content="<?= e($authorName) ?>" />
    <meta property="article:section" content="<?= e($category) ?>" />
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
            <span><?= e($category) ?></span>
          </nav>
          <h1><?= e($postTitle) ?></h1>
          <p><?= e($description) ?></p>
          <?php if ($image): ?>
            <img src="<?= e($image) ?>" alt="<?= e(post_field($post, 'imageAlt', 'image_alt', $postTitle)) ?>" class="blog-article-cover" />
          <?php endif; ?>
          <section class="blog-aeo-answer" aria-label="Resposta direta do artigo">
            <h2>Resposta direta</h2>
            <p><?= e($description) ?></p>
            <?php if (count($answerPoints) > 0): ?>
              <ul>
                <?php foreach ($answerPoints as $point): ?>
                  <li><?= e($point) ?></li>
                <?php endforeach; ?>
              </ul>
            <?php endif; ?>
          </section>
          <div class="blog-article-content">
            <?= render_content(post_field($post, 'content', '', '')) ?>
          </div>
          <?php if (count($faqs) > 0): ?>
            <section class="blog-article-faq" aria-label="Perguntas frequentes do artigo">
              <h2>Perguntas frequentes</h2>
              <?php foreach ($faqs as $faq): ?>
                <article>
                  <h3><?= e($faq['question']) ?></h3>
                  <p><?= e($faq['answer']) ?></p>
                </article>
              <?php endforeach; ?>
            </section>
          <?php endif; ?>
        </article>
      </main>
    </div>
  </body>
</html>
