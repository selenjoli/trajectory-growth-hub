<?php
declare(strict_types=1);

require __DIR__ . '/lib.php';

header('Content-Type: application/json; charset=utf-8');
ini_set('display_errors', '0');
$out = ['php' => PHP_VERSION, 'fpm' => function_exists('fastcgi_finish_request')];
foreach (['curl', 'zip', 'dom', 'iconv', 'mbstring'] as $ext) {
    $out[$ext] = extension_loaded($ext);
}
$home = dirname(__DIR__, 3);
$out['write'] = is_writable($home);
$t = microtime(true);
try {
    $out['sections'] = count(listing('https://disk.yandex.ru/d/rfaQBP6LK9dwVQ', '/'));
    $out['ms'] = (int)round((microtime(true) - $t) * 1000);
} catch (Throwable $e) {
    $out['yandex'] = $e->getMessage();
}
try {
    $pub = json_decode(fetchUrl(API . http_build_query(['public_key' => 'https://disk.360.yandex.ru/i/EmmVnk5PRswpTw'])), true);
    $out['file'] = strlen(fetchUrl($pub['file']));
} catch (Throwable $e) {
    $out['file'] = $e->getMessage();
}
try {
    $out['docx'] = fromDocx((string)file_get_contents(__DIR__ . '/proba.docx'));
    $out['txt'] = fromTxt((string)iconv('UTF-8', 'CP1251', "Первый абзац\r\n\r\n- пункт один"));
} catch (Throwable $e) {
    $out['docx'] = $e->getMessage();
}
foreach (['http://cloud-api.yandex.net/', 'https://yandex.ru.evil.com/'] as $bad) {
    try {
        fetchUrl($bad);
        $out['bad'][] = $bad;
    } catch (Throwable $e) {
        $out['refused'][] = $e->getMessage();
    }
}
echo json_encode($out, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_HEX_TAG);
