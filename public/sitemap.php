<?php
declare(strict_types=1);

$siteUrl = 'https://corpad.com.br';
$postsFile = __DIR__ . '/data/blog-posts.json';
$today = gmdate('Y-m-d');

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

$paths = [
  '/',
  '/corpad-digital/',
  '/corpad-consultoria/',
  '/portfolio/',
  '/clientes/',
  '/blog/',
  '/termos-de-uso/',
  '/servicos/criacao-de-sites/',
  '/servicos/e-commerce/',
  '/servicos/hospedagem-de-sites/',
  '/servicos/e-mail-profissional/',
  '/servicos/marketing-digital/',
  '/servicos/trafego-pago/',
  '/servicos/automacao/',
  '/corpad-consultoria/servicos/servidores-em-nuvem/',
  '/corpad-consultoria/servicos/assessoria-empresarial/',
  '/corpad-consultoria/servicos/assessoria-em-ti/',
  '/corpad-consultoria/servicos/inteligencia-de-dados/',
  '/corpad-consultoria/servicos/telefonia-em-nuvem/',
  '/corpad-consultoria/servicos/bpo-financeiro/',
  '/criacao-de-sites-monte-alto/',
  '/criacao-de-sites-ribeirao-preto/',
  '/marketing-digital-ribeirao-preto/',
  '/trafego-pago-ribeirao-preto/',
  '/consultoria-empresarial-monte-alto/',
  '/consultoria-empresarial-ribeirao-preto/',
];

$posts = array_values(array_filter(read_posts($postsFile), 'is_published'));

header('Content-Type: application/xml; charset=utf-8');
header('Cache-Control: no-cache');
echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
echo "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n";

foreach ($paths as $path) {
  echo "  <url>\n";
  echo "    <loc>" . htmlspecialchars($siteUrl . $path, ENT_XML1, 'UTF-8') . "</loc>\n";
  echo "    <lastmod>{$today}</lastmod>\n";
  echo "    <changefreq>monthly</changefreq>\n";
  echo "    <priority>" . ($path === '/' ? '1.0' : '0.8') . "</priority>\n";
  echo "  </url>\n";
}

foreach ($posts as $post) {
  if (empty($post['slug'])) {
    continue;
  }

  $lastmod = substr((string)($post['updatedAt'] ?? $post['publishedAt'] ?? $post['createdAt'] ?? $today), 0, 10);
  echo "  <url>\n";
  echo "    <loc>" . htmlspecialchars($siteUrl . '/blog/' . rawurlencode((string)$post['slug']) . '/', ENT_XML1, 'UTF-8') . "</loc>\n";
  echo "    <lastmod>" . htmlspecialchars($lastmod, ENT_XML1, 'UTF-8') . "</lastmod>\n";
  echo "    <changefreq>monthly</changefreq>\n";
  echo "    <priority>0.7</priority>\n";
  echo "  </url>\n";
}

echo "</urlset>\n";
