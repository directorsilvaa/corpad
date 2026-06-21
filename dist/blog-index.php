<?php
declare(strict_types=1);

$siteUrl = 'https://corpad.com.br';
$defaultImage = $siteUrl . '/logo.png?v=20260618';
$postsFile = __DIR__ . '/data/blog-posts.json';

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

function blog_faqs(): array {
  return [
    [
      'question' => 'Sobre quais temas o Blog CORPAD publica?',
      'answer' => 'O Blog CORPAD publica conteudos sobre sites, marketing digital, automacao, tecnologia, cloud, gestao empresarial, consultoria e crescimento para empresas.',
    ],
    [
      'question' => 'Os artigos do blog ajudam em SEO, GEO e AEO?',
      'answer' => 'Sim. Os artigos sao estruturados com titulo, descricao, conteudo rastreavel, dados de artigo, respostas diretas e contexto para mecanismos de busca e ferramentas de IA.',
    ],
    [
      'question' => 'Como encontrar conteudos novos do blog?',
      'answer' => 'As novas publicacoes aparecem no indice do blog, no sitemap.xml e nas paginas dinamicas de artigo quando estao publicadas ou agendadas para uma data ja atingida.',
    ],
    [
      'question' => 'Como falar com a CORPAD depois de ler um artigo?',
      'answer' => 'O contato pode ser feito pelo WhatsApp +55 16 99609-4649 ou pelo e-mail contato@corpad.com.br.',
    ],
  ];
}

$posts = array_values(array_filter(read_posts($postsFile), 'is_published'));
usort($posts, fn($a, $b) => strtotime($b['publishedAt'] ?? $b['createdAt'] ?? 'now') <=> strtotime($a['publishedAt'] ?? $a['createdAt'] ?? 'now'));
$title = 'Blog CORPAD | Tecnologia, Marketing, Gestao e Crescimento';
$description = 'Conteudos sobre sites, marketing digital, automacao, tecnologia, cloud, gestao empresarial e consultoria para empresas.';
$faqs = blog_faqs();
$jsonLd = [
  [
    '@context' => 'https://schema.org',
    '@type' => 'Blog',
    '@id' => $siteUrl . '/blog/#blog',
    'name' => 'Blog CORPAD',
    'url' => $siteUrl . '/blog/',
    'description' => $description,
    'blogPost' => array_map(fn($post) => [
      '@type' => 'BlogPosting',
      'headline' => ($post['metaTitle'] ?? '') ?: ($post['title'] ?? ''),
      'description' => ($post['metaDescription'] ?? '') ?: ($post['excerpt'] ?? ''),
      'url' => $siteUrl . '/blog/' . rawurlencode((string)($post['slug'] ?? '')) . '/',
      'datePublished' => $post['publishedAt'] ?? $post['createdAt'] ?? null,
      'dateModified' => $post['updatedAt'] ?? null,
    ], $posts),
  ],
  [
    '@context' => 'https://schema.org',
    '@type' => 'WebPage',
    '@id' => $siteUrl . '/blog/#webpage',
    'name' => 'Blog CORPAD',
    'headline' => 'Blog CORPAD',
    'description' => $description,
    'url' => $siteUrl . '/blog/',
    'inLanguage' => 'pt-BR',
    'mainEntity' => ['@id' => $siteUrl . '/blog/#blog'],
    'speakable' => [
      '@type' => 'SpeakableSpecification',
      'cssSelector' => ['h1', '.service-ssr-content > p', "[aria-label='Perguntas frequentes do blog']"],
    ],
  ],
  [
    '@context' => 'https://schema.org',
    '@type' => 'FAQPage',
    '@id' => $siteUrl . '/blog/#faq',
    'mainEntity' => array_map(fn($faq) => [
      '@type' => 'Question',
      'name' => $faq['question'],
      'acceptedAnswer' => [
        '@type' => 'Answer',
        'text' => $faq['answer'],
      ],
    ], $faqs),
  ],
];
?><!doctype html>
<html lang="pt-BR" data-corpad-template="dynamic-blog-index">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><?= e($title) ?></title>
    <meta name="description" content="<?= e($description) ?>" />
    <meta name="keywords" content="blog CORPAD, marketing digital, automacao, consultoria empresarial, tecnologia, cloud, gestao, SEO, GEO, AEO" />
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
    <link rel="canonical" href="<?= e($siteUrl) ?>/blog/" />
    <meta property="og:title" content="<?= e($title) ?>" />
    <meta property="og:description" content="<?= e($description) ?>" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="<?= e($siteUrl) ?>/blog/" />
    <meta property="og:image" content="<?= e($defaultImage) ?>" />
    <meta property="og:site_name" content="CORPAD" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="<?= e($title) ?>" />
    <meta name="twitter:description" content="<?= e($description) ?>" />
    <meta name="twitter:image" content="<?= e($defaultImage) ?>" />
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
        <section class="service-ssr-content">
          <p class="section-kicker">Blog CORPAD</p>
          <h1>Conteudos sobre tecnologia, marketing, gestao e crescimento</h1>
          <p><?= e($description) ?></p>
          <section aria-label="Artigos publicados">
            <h2>Artigos publicados</h2>
            <?php if (count($posts) === 0): ?>
              <p>Nenhum artigo publicado foi encontrado no momento.</p>
            <?php endif; ?>
            <?php foreach ($posts as $post): ?>
              <article>
                <h3><a href="/blog/<?= e($post['slug'] ?? '') ?>/"><?= e(($post['metaTitle'] ?? '') ?: ($post['title'] ?? 'Artigo')) ?></a></h3>
                <p><?= e(($post['metaDescription'] ?? '') ?: ($post['excerpt'] ?? '')) ?></p>
                <p><?= e($post['category'] ?? 'Blog') ?></p>
              </article>
            <?php endforeach; ?>
          </section>
          <section aria-label="Perguntas frequentes do blog">
            <h2>Perguntas frequentes</h2>
            <?php foreach ($faqs as $faq): ?>
              <article>
                <h3><?= e($faq['question']) ?></h3>
                <p><?= e($faq['answer']) ?></p>
              </article>
            <?php endforeach; ?>
          </section>
        </section>
      </main>
    </div>
  </body>
</html>
