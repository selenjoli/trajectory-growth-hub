<?php
// Мини-CRM заявок rostedu.ru. Таблицы applications и consents только читает, своё хранит в crm_*.
declare(strict_types=1);

const BASE = 'https://rostedu.ru/crm/';
const PER_PAGE = 50;
const STATUSES = ['new' => 'Новая', 'work' => 'В работе', 'contract' => 'Договор', 'paid' => 'Оплачено', 'lost' => 'Отказ'];

ini_set('display_errors', '0');
header('Cache-Control: no-store');
header('X-Robots-Tag: noindex, nofollow');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: no-referrer');
header("Content-Security-Policy: default-src 'none'; style-src 'unsafe-inline'; form-action https://rostedu.ru; base-uri 'none'; frame-ancestors 'none'");

$home = dirname(__DIR__, 3);
$cfgFile = $home . '/crm-config.php';
if (!is_file($cfgFile)) {
    page('Настройка', '<div class="box"><h1>Админка ещё не настроена</h1><p>Нужно один раз запустить setup.php на хостинге.</p></div>', false);
    exit;
}
$cfg = require $cfgFile;

if (is_dir($home . '/crm-sessions')) {
    session_save_path($home . '/crm-sessions');
}
ini_set('session.use_strict_mode', '1');
ini_set('session.gc_maxlifetime', '43200');
session_name('rostcrm');
session_set_cookie_params(['path' => '/crm/', 'secure' => true, 'httponly' => true, 'samesite' => 'Lax']);
session_start();

try {
    $db = new PDO('mysql:host=localhost;dbname=' . $cfg['db_name'] . ';charset=utf8mb4', $cfg['db_user'], $cfg['db_pass'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
    route($db, $cfg);
} catch (Throwable $e) {
    error_log('crm: ' . $e->getMessage());
    http_response_code(500);
    page('Ошибка', '<div class="box"><h1>Что-то пошло не так</h1><p>Обновите страницу. Если не поможет, напишите разработчику.</p></div>', false);
}

function route(PDO $db, array $cfg): void
{
    if (empty($_SESSION['ok'])) {
        login($db, $cfg);
        return;
    }
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (!hash_equals($_SESSION['csrf'] ?? '', (string)($_POST['csrf'] ?? ''))) {
            http_response_code(403);
            page('Ошибка', '<div class="box"><h1>Форма устарела</h1><p><a href="' . BASE . '">Вернуться к заявкам</a></p></div>');
            return;
        }
        $action = (string)($_POST['action'] ?? '');
        if ($action === 'logout') {
            $_SESSION = [];
            session_destroy();
            go(BASE);
        }
        $id = (int)($_POST['id'] ?? 0);
        if ($id > 0 && $action === 'save') {
            save($db, $id);
        } elseif ($id > 0 && $action === 'note') {
            addNote($db, $id, trim((string)($_POST['body'] ?? '')));
        }
        go(BASE . '?id=' . $id);
    }
    if (isset($_GET['id'])) {
        card($db, (int)$_GET['id']);
    } else {
        listing($db);
    }
}

function login(PDO $db, array $cfg): void
{
    $error = '';
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $ip = hash('sha256', (string)($_SERVER['REMOTE_ADDR'] ?? ''));
        if (blocked($db, $ip, 5) || blocked($db, 'all', 30)) {
            $error = 'Слишком много попыток. Попробуйте через 15 минут.';
        } elseif (password_verify((string)($_POST['password'] ?? ''), $cfg['password_hash'])) {
            session_regenerate_id(true);
            $_SESSION = ['ok' => true, 'csrf' => bin2hex(random_bytes(32))];
            $db->prepare('DELETE FROM crm_login WHERE key_hash = ?')->execute([$ip]);
            go(BASE);
        } else {
            fail($db, $ip);
            fail($db, 'all');
            $error = 'Неверный пароль.';
        }
    }
    $body = '<form class="box login" method="post" action="' . BASE . '"><h1>Заявки</h1>'
        . ($error ? '<p class="err">' . h($error) . '</p>' : '')
        . '<label>Пароль<input type="password" name="password" required autofocus autocomplete="current-password"></label>'
        . '<button>Войти</button></form>';
    page('Вход', $body, false);
}

function blocked(PDO $db, string $key, int $limit): bool
{
    $st = $db->prepare('SELECT fails FROM crm_login WHERE key_hash = ? AND last_at > NOW() - INTERVAL 15 MINUTE');
    $st->execute([$key]);
    return (int)$st->fetchColumn() >= $limit;
}

function fail(PDO $db, string $key): void
{
    $db->prepare('INSERT INTO crm_login (key_hash, fails, last_at) VALUES (?, 1, NOW())
        ON DUPLICATE KEY UPDATE fails = IF(last_at > NOW() - INTERVAL 15 MINUTE, fails + 1, 1), last_at = NOW()')->execute([$key]);
}

function listing(PDO $db): void
{
    $status = (string)($_GET['status'] ?? '');
    $q = trim((string)($_GET['q'] ?? ''));
    $pageNo = max(1, (int)($_GET['page'] ?? 1));
    $dateCol = dateColumn($db, 'applications');

    $where = [];
    $args = [];
    if (isset(STATUSES[$status])) {
        $where[] = "COALESCE(l.status, 'new') = ?";
        $args[] = $status;
    }
    if ($q !== '') {
        $like = '%' . addcslashes($q, '\\%_') . '%';
        $parts = [];
        foreach (['name', 'phone', 'email', 'city', 'center_name', 'program', 'comment'] as $c) {
            $parts[] = "a.$c LIKE ?";
            $args[] = $like;
        }
        $digits = preg_replace('/\D+/', '', $q);
        if (strlen($digits) >= 4) {
            $parts[] = "REPLACE(REPLACE(REPLACE(REPLACE(a.phone, ' ', ''), '-', ''), '(', ''), ')', '') LIKE ?";
            $args[] = '%' . $digits . '%';
        }
        $where[] = '(' . implode(' OR ', $parts) . ')';
    }
    $sqlWhere = $where ? ' WHERE ' . implode(' AND ', $where) : '';
    $from = ' FROM applications a LEFT JOIN crm_leads l ON l.application_id = a.id';

    $st = $db->prepare('SELECT COUNT(*)' . $from . $sqlWhere);
    $st->execute($args);
    $total = (int)$st->fetchColumn();

    $offset = ($pageNo - 1) * PER_PAGE;
    $st = $db->prepare('SELECT a.*, COALESCE(l.status, \'new\') AS crm_status, l.assignee AS crm_assignee' . $from . $sqlWhere
        . ' ORDER BY a.id DESC LIMIT ' . PER_PAGE . ' OFFSET ' . $offset);
    $st->execute($args);
    $rows = $st->fetchAll();

    $counts = [];
    foreach ($db->query("SELECT COALESCE(l.status, 'new') AS s, COUNT(*) AS n" . $from . ' GROUP BY s') as $r) {
        $counts[$r['s']] = (int)$r['n'];
    }

    $tabs = '<a class="tab' . ($status === '' ? ' on' : '') . '" href="' . url(['q' => $q]) . '">Все <b>' . array_sum($counts) . '</b></a>';
    foreach (STATUSES as $k => $label) {
        $tabs .= '<a class="tab' . ($status === $k ? ' on' : '') . '" href="' . url(['status' => $k, 'q' => $q]) . '">' . h($label) . ' <b>' . ($counts[$k] ?? 0) . '</b></a>';
    }

    $list = '';
    foreach ($rows as $r) {
        $href = BASE . '?id=' . (int)$r['id'];
        $list .= '<a class="row" href="' . $href . '">'
            . '<span class="who"><b>' . h($r['name'] ?: 'Без имени') . '</b><small>' . h(implode(' · ', array_filter([$r['phone'], $r['email']]))) . '</small></span>'
            . '<span class="what">' . h($r['program'] ?: '—') . '<small>' . h(implode(' · ', array_filter([$r['center_name'], $r['city']]))) . '</small></span>'
            . '<span class="when">' . h($dateCol ? when($r[$dateCol]) : '№ ' . $r['id']) . ($r['crm_assignee'] ? '<small>' . h($r['crm_assignee']) . '</small>' : '') . '</span>'
            . pill($r['crm_status']) . '</a>';
    }
    if ($list === '') {
        $list = '<p class="empty">' . ($q !== '' || $status !== '' ? 'По этому запросу заявок нет.' : 'Заявок пока нет.') . '</p>';
    }

    $pager = '';
    if ($pageNo > 1) {
        $pager .= '<a href="' . url(['status' => $status, 'q' => $q, 'page' => $pageNo - 1]) . '">← Новее</a>';
    }
    if ($offset + PER_PAGE < $total) {
        $pager .= '<a href="' . url(['status' => $status, 'q' => $q, 'page' => $pageNo + 1]) . '">Старее →</a>';
    }

    $body = '<form class="search" method="get" action="' . BASE . '">'
        . ($status !== '' ? '<input type="hidden" name="status" value="' . h($status) . '">' : '')
        . '<input type="search" name="q" value="' . h($q) . '" placeholder="Имя, телефон, почта, город, программа"><button>Найти</button></form>'
        . '<nav class="tabs">' . $tabs . '</nav><div class="list">' . $list . '</div>'
        . ($pager ? '<div class="pager">' . $pager . '</div>' : '');
    page('Заявки', $body);
}

function card(PDO $db, int $id): void
{
    $st = $db->prepare('SELECT a.*, COALESCE(l.status, \'new\') AS crm_status, COALESCE(l.assignee, \'\') AS crm_assignee
        FROM applications a LEFT JOIN crm_leads l ON l.application_id = a.id WHERE a.id = ?');
    $st->execute([$id]);
    $r = $st->fetch();
    if (!$r) {
        http_response_code(404);
        page('Не найдено', '<div class="box"><h1>Такой заявки нет</h1><p><a href="' . BASE . '">К списку</a></p></div>');
        return;
    }
    $dateCol = dateColumn($db, 'applications');
    $csrf = '<input type="hidden" name="csrf" value="' . h($_SESSION['csrf']) . '"><input type="hidden" name="id" value="' . $id . '">';

    $phone = (string)$r['phone'];
    $email = (string)$r['email'];
    $facts = [
        ['Телефон', $phone !== '' ? '<a href="tel:' . h(preg_replace('/[^\d+]/', '', $phone)) . '">' . h($phone) . '</a>' : '—'],
        ['Почта', $email !== '' ? '<a href="mailto:' . h($email) . '">' . h($email) . '</a>' : '—'],
        ['Программа', h($r['program'] ?: '—')],
        ['Город', h($r['city'] ?: '—')],
        ['Центр', h($r['center_name'] ?: '—')],
        ['Страница', pageLink((string)$r['page'])],
    ];
    if ($dateCol) {
        $facts[] = ['Получена', h(when($r[$dateCol]))];
    }
    $factsHtml = '';
    foreach ($facts as [$k, $v]) {
        $factsHtml .= '<dt>' . h($k) . '</dt><dd>' . $v . '</dd>';
    }

    $options = '';
    foreach (STATUSES as $k => $label) {
        $options .= '<option value="' . $k . '"' . ($r['crm_status'] === $k ? ' selected' : '') . '>' . h($label) . '</option>';
    }

    $st = $db->prepare('SELECT * FROM crm_notes WHERE application_id = ? ORDER BY id DESC');
    $st->execute([$id]);
    $notes = '';
    foreach ($st as $n) {
        $notes .= '<li><small>' . h(when($n['created_at'])) . '</small>' . nl2br(h($n['body'])) . '</li>';
    }

    $st = $db->prepare('SELECT * FROM consents WHERE application_id = ? LIMIT 1');
    $st->execute([$id]);
    $consent = $st->fetch();
    $consentCol = $consent ? dateColumn($db, 'consents') : null;
    $consentHtml = $consent
        ? '<details class="consent"><summary>Согласие получено' . ($consentCol ? ': ' . h(when($consent[$consentCol])) : '') . '</summary><p>' . nl2br(h((string)$consent['consent_text'])) . '</p></details>'
        : '<p class="consent warn">Согласие к этой заявке не найдено.</p>';

    $comment = trim((string)$r['comment']);
    $body = '<p class="back"><a href="' . BASE . '">← Все заявки</a></p>'
        . '<div class="card"><section class="box"><div class="head"><h1>' . h($r['name'] ?: 'Без имени') . '</h1>' . pill($r['crm_status']) . '</div>'
        . '<dl>' . $factsHtml . '</dl>'
        . ($comment !== '' ? '<h2>Комментарий из формы</h2><p class="said">' . nl2br(h($comment)) . '</p>' : '')
        . $consentHtml . '</section>'
        . '<section class="box"><h2>Работа с заявкой</h2><form method="post" action="' . BASE . '" class="work">' . $csrf . '<input type="hidden" name="action" value="save">'
        . '<label>Статус<select name="status">' . $options . '</select></label>'
        . '<label>Ответственный<input name="assignee" maxlength="100" value="' . h($r['crm_assignee']) . '"></label>'
        . '<button>Сохранить</button></form>'
        . '<h2>История</h2><form method="post" action="' . BASE . '" class="note">' . $csrf . '<input type="hidden" name="action" value="note">'
        . '<textarea name="body" rows="3" maxlength="5000" required placeholder="Что обсудили, что дальше"></textarea><button>Добавить</button></form>'
        . ($notes !== '' ? '<ul class="notes">' . $notes . '</ul>' : '<p class="empty">Записей пока нет.</p>')
        . '</section></div>';
    page((string)($r['name'] ?: 'Заявка'), $body);
}

function save(PDO $db, int $id): void
{
    $status = (string)($_POST['status'] ?? '');
    if (!isset(STATUSES[$status]) || !exists($db, $id)) {
        return;
    }
    $assignee = mb_substr(trim((string)($_POST['assignee'] ?? '')), 0, 100);
    $st = $db->prepare("SELECT COALESCE(l.status, 'new') FROM applications a LEFT JOIN crm_leads l ON l.application_id = a.id WHERE a.id = ?");
    $st->execute([$id]);
    $old = (string)$st->fetchColumn();
    $db->prepare('INSERT INTO crm_leads (application_id, status, assignee, updated_at) VALUES (?, ?, ?, NOW())
        ON DUPLICATE KEY UPDATE status = VALUES(status), assignee = VALUES(assignee), updated_at = NOW()')->execute([$id, $status, $assignee]);
    if ($old !== $status) {
        addNote($db, $id, 'Статус: ' . (STATUSES[$old] ?? $old) . ' → ' . STATUSES[$status]);
    }
}

function addNote(PDO $db, int $id, string $body): void
{
    if ($body === '' || !exists($db, $id)) {
        return;
    }
    $db->prepare('INSERT INTO crm_notes (application_id, body, created_at) VALUES (?, ?, NOW())')->execute([$id, mb_substr($body, 0, 5000)]);
}

function exists(PDO $db, int $id): bool
{
    $st = $db->prepare('SELECT 1 FROM applications WHERE id = ?');
    $st->execute([$id]);
    return (bool)$st->fetchColumn();
}

/** Колонка с датой: в чужих таблицах её имя заранее неизвестно. */
function dateColumn(PDO $db, string $table): ?string
{
    $cols = array_column($db->query('SHOW COLUMNS FROM ' . $table)->fetchAll(), 'Field');
    foreach (['created_at', 'created', 'submitted_at', 'date', 'date_created', 'createdAt'] as $c) {
        if (in_array($c, $cols, true)) {
            return $c;
        }
    }
    return null;
}

function pageLink(string $page): string
{
    if ($page === '') {
        return '—';
    }
    $href = str_starts_with($page, '/') ? 'https://rostedu.ru' . $page : $page;
    return preg_match('~^https://~', $href) ? '<a href="' . h($href) . '" rel="noreferrer" target="_blank">' . h($page) . '</a>' : h($page);
}

function pill(string $status): string
{
    return '<span class="pill s-' . h($status) . '">' . h(STATUSES[$status] ?? $status) . '</span>';
}

function when(?string $value): string
{
    $t = $value ? strtotime($value) : false;
    return $t ? date('d.m.Y H:i', $t) : '—';
}

function url(array $params): string
{
    $params = array_filter($params, fn($v) => $v !== '' && $v !== null);
    return h(BASE . ($params ? '?' . http_build_query($params) : ''));
}

function h(?string $s): string
{
    return htmlspecialchars((string)$s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function go(string $to): void
{
    header('Location: ' . $to, true, 303);
    exit;
}

function page(string $title, string $body, bool $signedIn = true): void
{
    header('Content-Type: text/html; charset=utf-8');
    $top = $signedIn
        ? '<header><a class="brand" href="' . BASE . '">Траектория РОСТА <span>заявки</span></a><form method="post" action="' . BASE . '"><input type="hidden" name="csrf" value="' . h($_SESSION['csrf'] ?? '') . '"><input type="hidden" name="action" value="logout"><button class="link">Выйти</button></form></header>'
        : '';
    echo '<!doctype html><html lang="ru"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>' . h($title) . ' · CRM</title><style>' . css() . '</style><body>' . $top . '<main>' . $body . '</main></body></html>';
}

function css(): string
{
    return ':root{--g:#0E8A4E;--ink:#1c2420;--mute:#66706a;--line:#e3e7e4;--bg:#f5f6f4}*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.45 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}a{color:var(--g)}
header{display:flex;justify-content:space-between;align-items:center;padding:14px 20px;background:#fff;border-bottom:1px solid var(--line)}.brand{font-weight:700;color:var(--ink);text-decoration:none}.brand span{color:var(--mute);font-weight:400}
main{max-width:1120px;margin:0 auto;padding:20px}h1{font-size:26px;line-height:1.2;margin:0}h2{font-size:17px;margin:24px 0 10px}h2:first-child{margin-top:0}
button{font:inherit;font-weight:600;color:#fff;background:var(--g);border:0;border-radius:8px;padding:10px 18px;cursor:pointer}button.link{background:none;color:var(--mute);padding:4px;font-weight:400}
input,select,textarea{font:inherit;width:100%;padding:10px 12px;border:1px solid #cbd2cd;border-radius:8px;background:#fff;color:inherit}label{display:block;font-size:14px;color:var(--mute)}label input,label select{margin-top:4px;color:var(--ink)}
.box{background:#fff;border:1px solid var(--line);border-radius:12px;padding:22px}.login{max-width:360px;margin:12vh auto 0;display:grid;gap:16px}.err{color:#b3261e;margin:0}
.search{display:flex;gap:8px;margin-bottom:14px}.tabs{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px}.tab{padding:6px 12px;border-radius:99px;background:#fff;border:1px solid var(--line);color:var(--ink);text-decoration:none;font-size:14px}.tab b{color:var(--mute);font-weight:600}.tab.on{background:var(--ink);border-color:var(--ink);color:#fff}.tab.on b{color:#fff}
.list{background:#fff;border:1px solid var(--line);border-radius:12px;overflow:hidden}.row{display:grid;grid-template-columns:1.3fr 1.5fr 130px 96px;gap:14px;align-items:center;padding:13px 16px;color:inherit;text-decoration:none;border-top:1px solid var(--line)}.row:first-child{border-top:0}.row:hover{background:#fafbfa}.row small{display:block;color:var(--mute);font-size:13px;overflow-wrap:anywhere}.row>span{min-width:0}.when{font-size:14px}
.pill{justify-self:start;font-size:13px;font-weight:600;padding:3px 10px;border-radius:99px;white-space:nowrap;background:#eef1ef;color:#3e4842}.s-new{background:#fdf0d5;color:#7a5200}.s-work{background:#dcecfb;color:#134e80}.s-contract{background:#e8e3fa;color:#47348f}.s-paid{background:#d9f1e3;color:#0b6339}.s-lost{background:#eef1ef;color:#66706a}
.empty{color:var(--mute);padding:14px 16px;margin:0}.pager{display:flex;justify-content:space-between;gap:16px;padding:14px 2px}.back{margin:0 0 12px}.card{display:grid;grid-template-columns:1fr 1fr;gap:16px;align-items:start}.head{display:flex;justify-content:space-between;gap:12px;align-items:flex-start;margin-bottom:16px}
dl{display:grid;grid-template-columns:96px 1fr;gap:7px 12px;margin:0}dt{color:var(--mute);font-size:14px}dd{margin:0;overflow-wrap:anywhere}.said{background:var(--bg);border-radius:8px;padding:12px;margin:0;overflow-wrap:anywhere}.consent{margin:18px 0 0;font-size:14px;color:var(--mute)}.consent p{margin:8px 0 0}.warn{color:#7a5200}
.work{display:grid;grid-template-columns:1fr 1fr auto;gap:10px;align-items:end}.note{display:grid;gap:8px;justify-items:start}.notes{list-style:none;margin:16px 0 0;padding:0}.notes li{padding:10px 0;border-top:1px solid var(--line);overflow-wrap:anywhere}.notes small{display:block;color:var(--mute);font-size:13px}
@media(max-width:820px){main{padding:14px}.card{grid-template-columns:1fr}.row{grid-template-columns:1fr auto;gap:4px 12px}.what,.when{grid-column:1}.row .pill{grid-column:2;grid-row:1}.work{grid-template-columns:1fr}.work button{justify-self:start}}';
}
