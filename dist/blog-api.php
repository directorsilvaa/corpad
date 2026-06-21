<?php
declare(strict_types=1);

session_start();

const CORPAD_ADMIN_EMAIL = 'admin@corpad.local';
const CORPAD_ADMIN_PASSWORD = 'troque-esta-senha';

$dataDir = __DIR__ . '/data';
$postsFile = $dataDir . '/blog-posts.json';
$uploadDir = __DIR__ . '/uploads/blog';

function send_json($data, int $status = 200): void {
  http_response_code($status);
  header('Content-Type: application/json; charset=utf-8');
  header('Cache-Control: no-store');
  echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
  exit;
}

function read_json_body(): array {
  $raw = file_get_contents('php://input') ?: '';
  $data = json_decode($raw, true);
  return is_array($data) ? $data : [];
}

function ensure_storage(string $dataDir, string $uploadDir): void {
  if (!is_dir($dataDir)) {
    mkdir($dataDir, 0755, true);
  }

  if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
  }

  $denyFile = $dataDir . '/.htaccess';
  if (!file_exists($denyFile)) {
    file_put_contents($denyFile, "Require all denied\n");
  }
}

function read_posts(string $postsFile): array {
  if (!file_exists($postsFile)) {
    return [];
  }

  $posts = json_decode(file_get_contents($postsFile) ?: '[]', true);
  return is_array($posts) ? $posts : [];
}

function write_posts(string $postsFile, array $posts): void {
  file_put_contents(
    $postsFile,
    json_encode(array_values($posts), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT),
    LOCK_EX
  );
}

function is_published(array $post): bool {
  $status = $post['status'] ?? 'draft';
  $publishedAt = $post['publishedAt'] ?? null;

  if ($status === 'published') {
    return true;
  }

  return $status === 'scheduled' && is_string($publishedAt) && strtotime($publishedAt) <= time();
}

function require_admin(): void {
  if (($_SESSION['corpad_admin'] ?? false) !== true) {
    send_json(['error' => 'Nao autorizado. Entre no painel novamente.'], 401);
  }
}

function normalize_post(array $post, ?array $current = null): array {
  $now = gmdate('c');
  $status = $post['status'] ?? 'draft';
  $publishedAt = $post['publishedAt'] ?? null;

  if (($status === 'published' || $status === 'scheduled') && !$publishedAt) {
    $publishedAt = $now;
  }

  return [
    'id' => $current['id'] ?? ($post['id'] ?? bin2hex(random_bytes(16))),
    'title' => trim((string)($post['title'] ?? '')),
    'subtitle' => (string)($post['subtitle'] ?? ''),
    'slug' => trim((string)($post['slug'] ?? '')),
    'category' => (string)($post['category'] ?? 'Blog'),
    'excerpt' => (string)($post['excerpt'] ?? ''),
    'coverImage' => (string)($post['coverImage'] ?? ''),
    'imageAlt' => (string)($post['imageAlt'] ?? ''),
    'content' => (string)($post['content'] ?? ''),
    'authorName' => (string)($post['authorName'] ?? 'Equipe CORPAD'),
    'authorPhoto' => (string)($post['authorPhoto'] ?? ''),
    'authorRole' => (string)($post['authorRole'] ?? 'Conteudo institucional'),
    'authorBio' => (string)($post['authorBio'] ?? ''),
    'metaTitle' => (string)($post['metaTitle'] ?? ($post['title'] ?? '')),
    'metaDescription' => (string)($post['metaDescription'] ?? ($post['excerpt'] ?? '')),
    'keyword' => (string)($post['keyword'] ?? ''),
    'ctaLabel' => (string)($post['ctaLabel'] ?? 'Falar com um consultor'),
    'ctaUrl' => (string)($post['ctaUrl'] ?? 'https://wa.me/5516996094649'),
    'ctaText' => (string)($post['ctaText'] ?? 'Quer melhorar os resultados da sua empresa?'),
    'status' => in_array($status, ['draft', 'published', 'scheduled'], true) ? $status : 'draft',
    'publishedAt' => $publishedAt,
    'createdAt' => $current['createdAt'] ?? $now,
    'updatedAt' => $now,
  ];
}

ensure_storage($dataDir, $uploadDir);

$action = $_GET['action'] ?? '';

if ($action === 'session') {
  send_json(['loggedIn' => ($_SESSION['corpad_admin'] ?? false) === true]);
}

if ($action === 'login') {
  $body = read_json_body();
  $email = (string)($body['email'] ?? '');
  $password = (string)($body['password'] ?? '');

  if ($email === CORPAD_ADMIN_EMAIL && $password === CORPAD_ADMIN_PASSWORD) {
    $_SESSION['corpad_admin'] = true;
    send_json(['loggedIn' => true]);
  }

  send_json(['error' => 'E-mail ou senha incorretos.'], 401);
}

if ($action === 'logout') {
  $_SESSION['corpad_admin'] = false;
  session_destroy();
  send_json(['loggedIn' => false]);
}

if ($action === 'list') {
  $publishedOnly = ($_GET['publishedOnly'] ?? '') === 'true';
  $posts = read_posts($postsFile);

  if ($publishedOnly) {
    $posts = array_values(array_filter($posts, 'is_published'));
  }

  usort($posts, fn($a, $b) => strtotime($b['createdAt'] ?? 'now') <=> strtotime($a['createdAt'] ?? 'now'));
  send_json(['posts' => $posts]);
}

if ($action === 'get') {
  $slug = trim((string)($_GET['slug'] ?? ''));
  $posts = read_posts($postsFile);

  foreach ($posts as $post) {
    if (($post['slug'] ?? '') === $slug && is_published($post)) {
      send_json(['post' => $post]);
    }
  }

  send_json(['post' => null], 404);
}

if ($action === 'save') {
  require_admin();
  $body = read_json_body();
  $input = is_array($body['post'] ?? null) ? $body['post'] : [];
  $id = (string)($body['id'] ?? '');
  $posts = read_posts($postsFile);
  $updated = false;

  if ($id !== '') {
    foreach ($posts as $index => $post) {
      if (($post['id'] ?? '') === $id) {
        $posts[$index] = normalize_post($input, $post);
        $updated = true;
        break;
      }
    }
  }

  if (!$updated) {
    $posts[] = normalize_post($input);
  }

  write_posts($postsFile, $posts);
  send_json(['posts' => $posts]);
}

if ($action === 'delete') {
  require_admin();
  $body = read_json_body();
  $id = (string)($body['id'] ?? '');
  $posts = array_values(array_filter(read_posts($postsFile), fn($post) => ($post['id'] ?? '') !== $id));
  write_posts($postsFile, $posts);
  send_json(['posts' => $posts]);
}

if ($action === 'upload') {
  require_admin();
  $body = read_json_body();
  $dataUrl = (string)($body['dataUrl'] ?? '');

  if (!preg_match('/^data:image\/(png|jpe?g|webp|gif);base64,/', $dataUrl, $matches)) {
    send_json(['error' => 'Imagem invalida.'], 400);
  }

  $extension = $matches[1] === 'jpeg' ? 'jpg' : $matches[1];
  $binary = base64_decode(substr($dataUrl, strpos($dataUrl, ',') + 1), true);

  if ($binary === false) {
    send_json(['error' => 'Nao foi possivel processar a imagem.'], 400);
  }

  $fileName = bin2hex(random_bytes(12)) . '.' . $extension;
  file_put_contents($uploadDir . '/' . $fileName, $binary, LOCK_EX);
  send_json(['url' => '/uploads/blog/' . $fileName]);
}

send_json(['error' => 'Acao invalida.'], 400);
