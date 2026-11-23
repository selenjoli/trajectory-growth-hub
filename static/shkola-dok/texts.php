<?php
declare(strict_types=1);

require __DIR__ . '/lib.php';

const FOLDER = 'https://disk.yandex.ru/d/rfaQBP6LK9dwVQ';
const TTL = 20;

ini_set('display_errors', '0');
header('Content-Type: text/javascript; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: public, max-age=60');

if (FOLDER === '') {
    exit;
}
$cache = dirname(__DIR__, 3) . '/sc-texts-' . substr(md5(FOLDER), 0, 8) . '.js';
$old = is_file($cache) ? (string)file_get_contents($cache) : '';
$stale = $old === '' || time() - (int)filemtime($cache) > TTL;

if ($old === '') {
    $mark = $cache . '.try';
    if (is_file($mark) && time() - (int)filemtime($mark) < 60) {
        exit;
    }
    touch($mark);
    try {
        refresh(FOLDER, $cache);
        readfile($cache);
    } catch (Throwable $e) {
        error_log('sc texts: ' . $e->getMessage());
    }
    exit;
}

if ($stale) {
    touch($cache);
}
header('Content-Length: ' . strlen($old));
echo $old;
if ($stale) {
    ignore_user_abort(true);
    if (function_exists('fastcgi_finish_request')) {
        fastcgi_finish_request();
    } else {
        while (ob_get_level() > 0) {
            ob_end_flush();
        }
        flush();
    }
    try {
        refresh(FOLDER, $cache);
    } catch (Throwable $e) {
        error_log('sc texts: ' . $e->getMessage());
    }
}
