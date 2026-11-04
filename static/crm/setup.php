<?php
// Разовая настройка мини-CRM. Запуск только из SSH: php ~/www/rostedu.ru/crm/setup.php
// Спрашивает доступ к базе и пароль входа, пишет ~/crm-config.php (600), создаёт таблицы crm_*.
declare(strict_types=1);

if (PHP_SAPI !== 'cli') {
    http_response_code(404);
    exit;
}

function ask(string $label, bool $hidden = false): string
{
    echo $label . ': ';
    if ($hidden) {
        shell_exec('stty -echo');
    }
    $value = trim((string)fgets(STDIN));
    if ($hidden) {
        shell_exec('stty echo');
        echo "\n";
    }
    return $value;
}

$home = dirname(__DIR__, 3);
$cfgFile = $home . '/crm-config.php';
$cfg = is_file($cfgFile) ? require $cfgFile : [];

echo "Настройка CRM. Пароли при вводе не видны, это нормально.\n";
if (!$cfg || strtolower(ask('Заново ввести доступ к базе? (да/нет)')) === 'да') {
    $cfg['db_name'] = ask('Имя базы (Доступ к MySQL, та, в которой лежит applications)');
    $cfg['db_user'] = ask('Логин MySQL');
    $cfg['db_pass'] = ask('Пароль MySQL', true);
}

$db = new PDO('mysql:host=localhost;dbname=' . $cfg['db_name'] . ';charset=utf8mb4', $cfg['db_user'], $cfg['db_pass'], [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
]);

foreach (['applications', 'consents'] as $table) {
    if (!$db->query("SHOW TABLES LIKE '$table'")->fetchColumn()) {
        exit("В этой базе нет таблицы $table. Запустите снова и укажите другую базу. Ничего не изменено.\n");
    }
}

do {
    $password = ask('Придумайте пароль входа в CRM (от 12 знаков)', true);
    $again = ask('Повторите пароль', true);
    $good = strlen($password) >= 12 && $password === $again;
    if (!$good) {
        echo "Пароли не совпали или короче 12 знаков. Ещё раз.\n";
    }
} while (!$good);
$cfg['password_hash'] = password_hash($password, PASSWORD_DEFAULT);

$db->exec('CREATE TABLE IF NOT EXISTS crm_leads (
    application_id BIGINT NOT NULL PRIMARY KEY,
    status VARCHAR(20) NOT NULL DEFAULT \'new\',
    assignee VARCHAR(100) NOT NULL DEFAULT \'\',
    updated_at DATETIME NOT NULL,
    KEY status_idx (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4');
$db->exec('CREATE TABLE IF NOT EXISTS crm_notes (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    application_id BIGINT NOT NULL,
    body TEXT NOT NULL,
    created_at DATETIME NOT NULL,
    KEY application_idx (application_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4');
$db->exec('CREATE TABLE IF NOT EXISTS crm_login (
    key_hash VARCHAR(64) NOT NULL PRIMARY KEY,
    fails INT NOT NULL DEFAULT 0,
    last_at DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4');

umask(0077);
if (!is_dir($home . '/crm-sessions')) {
    mkdir($home . '/crm-sessions', 0700);
}
file_put_contents($cfgFile, "<?php\nreturn " . var_export($cfg, true) . ";\n", LOCK_EX);
chmod($cfgFile, 0600);

// В вывод идут только названия колонок и количество, без данных заявок.
foreach (['applications', 'consents'] as $table) {
    $cols = array_column($db->query("SHOW COLUMNS FROM $table")->fetchAll(PDO::FETCH_ASSOC), 'Field');
    $count = $db->query("SELECT COUNT(*) FROM $table")->fetchColumn();
    echo "$table: записей $count; колонки: " . implode(', ', $cols) . "\n";
}
echo "Готово. Вход: https://rostedu.ru/crm/\n";
