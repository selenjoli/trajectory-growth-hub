<?php
// Тексты разделов для smartcookiesclub.ru/sc_info: «ТЕКСТ НА САЙТЕ.docx» (или .txt) из открытой папки Яндекс Диска.
declare(strict_types=1);

const LIMIT = 3000000;
const API = 'https://cloud-api.yandex.net/v1/disk/public/resources?';
const W = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main';

function fetchUrl(string $url): string
{
    $host = (string)parse_url($url, PHP_URL_HOST);
    if (strncmp($url, 'https://', 8) !== 0 || !preg_match('/(^|\.)yandex\.(net|ru)$/', $host)) {
        throw new RuntimeException('чужой адрес');
    }
    $data = '';
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_MAXREDIRS => 4,
        CURLOPT_PROTOCOLS => CURLPROTO_HTTPS,
        CURLOPT_REDIR_PROTOCOLS => CURLPROTO_HTTPS,
        CURLOPT_CONNECTTIMEOUT => 5,
        CURLOPT_TIMEOUT => 15,
        CURLOPT_WRITEFUNCTION => function ($ch, string $part) use (&$data): int {
            if (strlen($data) + strlen($part) > LIMIT) {
                return 0;
            }
            $data .= $part;
            return strlen($part);
        },
    ]);
    $ok = curl_exec($ch);
    $code = (int)curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    curl_close($ch);
    if ($ok === false || $code !== 200) {
        throw new RuntimeException('Яндекс не ответил: ' . $code);
    }
    return $data;
}

function listing(string $key, string $path): array
{
    $json = json_decode(fetchUrl(API . http_build_query(['public_key' => $key, 'path' => $path, 'limit' => 200])), true);
    if (!isset($json['_embedded']['items'])) {
        throw new RuntimeException('это не папка');
    }
    return $json['_embedded']['items'];
}

function addParagraph(array &$out, array $runs, string $kind): void
{
    $last = count($runs) - 1;
    foreach ($runs as $i => $run) {
        $text = (string)preg_replace('/\s+/u', ' ', $run[1]);
        $runs[$i][1] = $i === 0 ? ltrim($text) : $text;
        if ($i === $last) {
            $runs[$i][1] = rtrim($runs[$i][1]);
        }
    }
    if (trim(implode('', array_column($runs, 1))) !== '') {
        $out[] = ['k' => $kind, 'r' => $runs];
    }
}

function fromDocx(string $data): array
{
    $file = (string)tempnam(sys_get_temp_dir(), 'sct');
    try {
        file_put_contents($file, $data);
        $zip = new ZipArchive();
        if ($zip->open($file) !== true) {
            throw new RuntimeException('документ не открылся');
        }
        $stat = $zip->statName('word/document.xml');
        if (!$stat || $stat['size'] > LIMIT) {
            throw new RuntimeException('документ слишком большой');
        }
        $xml = (string)$zip->getFromName('word/document.xml');
        $zip->close();
    } finally {
        @unlink($file);
    }
    if (strpos($xml, '<!DOCTYPE') !== false || strpos($xml, '<!ENTITY') !== false) {
        throw new RuntimeException('недопустимый документ');
    }
    $doc = new DOMDocument();
    if (!$doc->loadXML($xml, LIBXML_NONET | LIBXML_NOERROR | LIBXML_NOWARNING)) {
        throw new RuntimeException('документ повреждён');
    }
    $xp = new DOMXPath($doc);
    $xp->registerNamespace('w', W);
    $out = [];
    foreach ($xp->query('//w:p') as $p) {
        $style = (string)$xp->evaluate('string(w:pPr/w:pStyle/@w:val)', $p);
        $kind = preg_match('/heading|title|заголов/iu', $style) ? 'h' : ($xp->query('w:pPr/w:numPr', $p)->length ? 'li' : 'p');
        $runs = [];
        foreach ($xp->query('.//w:r', $p) as $r) {
            $b = $xp->query('w:rPr/w:b', $r)->item(0);
            $bold = $b instanceof DOMElement && !in_array($b->getAttributeNS(W, 'val'), ['0', 'false', 'none'], true) ? 1 : 0;
            $text = '';
            foreach ($r->childNodes as $c) {
                if ($c->localName === 't') {
                    $text .= $c->textContent;
                } elseif (in_array($c->localName, ['br', 'cr', 'tab'], true)) {
                    $text .= ' ';
                }
            }
            if ($text === '') {
                continue;
            }
            $n = count($runs) - 1;
            if ($n >= 0 && $runs[$n][0] === $bold) {
                $runs[$n][1] .= $text;
            } else {
                $runs[] = [$bold, $text];
            }
        }
        if ($runs) {
            addParagraph($out, $runs, $kind);
        }
    }
    return $out;
}

function fromTxt(string $data): array
{
    if (!preg_match('//u', $data)) {
        $data = (string)iconv('CP1251', 'UTF-8//IGNORE', $data);
    }
    $data = (string)preg_replace('/^\x{FEFF}/u', '', $data);
    $out = [];
    foreach (preg_split('/\R/u', $data) as $line) {
        if (preg_match('/^\s*[-•–—*]\s+(.*)$/u', $line, $m)) {
            addParagraph($out, [[0, $m[1]]], 'li');
        } else {
            addParagraph($out, [[0, $line]], 'p');
        }
    }
    return $out;
}

function build(string $key): string
{
    $texts = [];
    foreach (listing($key, '/') as $section) {
        if ($section['type'] !== 'dir') {
            continue;
        }
        foreach (listing($key, $section['path']) as $f) {
            if ($f['type'] !== 'file' || !preg_match('/^текст на сайте.*\.(docx|txt)$/iu', $f['name'])) {
                continue;
            }
            if (empty($f['file'])) {
                throw new RuntimeException('у папки запрещено скачивание');
            }
            $data = fetchUrl($f['file']);
            $texts[$section['name']] = preg_match('/\.docx$/i', $f['name']) ? fromDocx($data) : fromTxt($data);
            break;
        }
    }
    return 'window.SC_TEXTS=' . json_encode((object)$texts, JSON_UNESCAPED_UNICODE | JSON_HEX_TAG | JSON_THROW_ON_ERROR) . ';';
}

function refresh(string $key, string $cache): void
{
    $js = build($key);
    $tmp = $cache . '.' . getmypid();
    if (file_put_contents($tmp, $js) === strlen($js)) {
        rename($tmp, $cache);
    }
}
