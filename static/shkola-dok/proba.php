<?php
declare(strict_types=1);
$out = [];
foreach ((array)glob(dirname(__DIR__, 3) . '/sc-texts-*') as $f) {
    $out[] = [basename($f), filesize($f), time() - filemtime($f)];
    if (isset($_GET['clean'])) {
        unlink($f);
    }
}
header('Content-Type: application/json');
echo json_encode($out);
