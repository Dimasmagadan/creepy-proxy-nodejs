<?php
  
define("START_TIME", microtime(true));
define('CATALOG_HOST', 'www.albamoda.catalogi.ru');
define('CATALOG_ALIAS', 'AM');
define('CATALOG_STRING', 'Интернет-магазин ALBAMODA. Каталоги.ру - заказ и доставка одежды из европейских интернет-магазинов.');
define('CATALOG_GOOGLE_HASH', '65d92dc04ca1ff9b-5a65b58e03081166-g0e83fdfa67daa7ea-14');

require_once dirname(__FILE__).'/../includes.catalogi.ru/index.php';

$host = str_replace('albamoda.catalogi.ru', 'albamoda.de', $_SERVER['HTTP_HOST']);
$uri = $_SERVER['REQUEST_URI'];

// Редиректы с ненужных стр.
if($uri == '/'){
  header('Location: http://www.albamoda.catalogi.ru/damenbekleidung/damenmode/sh764775.html');
}

//Обработка входящих заголовков
$_req_header = GetAllHeaders();
$req_header = array();


if(isset($_req_header['Cookie'])){
  $req_header[] = 'Cookie: '.$_req_header['Cookie'];
}

if(isset($_req_header['Content-Length'])){
  $req_header[] = 'Content-Length: '.$_req_header['Content-Length'];
}

if(isset($_req_header['Origin'])){
  $req_header[] = 'Origin: '.str_replace('albamoda.catalogi.ru', 'albamoda.de', $_req_header['Origin']);
}

if(isset($_req_header['Referer'])){
  $req_header[] = 'Referer: '.str_replace('albamoda.catalogi.ru', 'albamoda.de', $_req_header['Referer']);
}

if(isset($_req_header['Accept'])){
  $req_header[] = 'Accept: '.$_req_header['Accept'];
}

if(isset($_req_header['Accept-Language'])){
  $req_header[] = 'Accept-Language: '.$_req_header['Accept-Language'];
}

if(isset($_req_header['Content-Type'])){
  $req_header[] = 'Content-Type: '.$_req_header['Content-Type'];
}

if(isset($_req_header['X-Requested-With'])){
  $req_header[] = 'X-Requested-With: '.$_req_header['X-Requested-With'];
}
// $req_header[] = 'Content-Type: Mozilla/5.0 (Linux; Android 4.1.1; ALCATEL ONE TOUCH 5020D Build/JRO03C) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.92 Mobile Safari/537.36';
// $_req_header['User-Agent'] = 'Mozilla/5.0 (Linux; Android 4.1.1; ALCATEL ONE TOUCH 5020D Build/JRO03C) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.92 Mobile Safari/537.36';
// $_req_header['User-Agent'] = 'Mozilla/5.0 (Linux; U; Android 4.1.1; ru-ru; ALCATEL ONE TOUCH 5020D Build/JRO03C) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.1 Mobile Safari/534.30';
/***
 * CURL запрос
 **/
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $host.$uri);
curl_setopt($ch, CURLOPT_HTTPHEADER, $req_header);
curl_setopt($ch, CURLOPT_HEADER, 1);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_USERAGENT, $_req_header['User-Agent']);

if($_SERVER['REQUEST_METHOD'] == 'POST'){
  curl_setopt($ch, CURLOPT_POST, true);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $HTTP_RAW_POST_DATA);
}
$out = curl_exec($ch);
$headers = substr($out, 0, curl_getinfo($ch, CURLINFO_HEADER_SIZE) - 4);
$html = substr($out, curl_getinfo($ch, CURLINFO_HEADER_SIZE));
curl_close($ch);


/***
 * Работа с контеном
 **/

// Замена ссылок
$html = str_replace('albamoda.de', 'albamoda.catalogi.ru', $html);
$html = str_replace('http://www.albamoda.catalogi.ru/js/script-compressed.js', '/_js/script-compressed.js', $html);
$html = str_replace('http://www.albamoda.catalogi.ru/m/basket.xhtml', 'http://catalogi.ru/zakaz/', $html);
$html = str_replace('Warenkorb', 'Корзина', $html);
$html = str_replace('Verfügbare Farben und Größen ', 'Таблица размеров', $html);

$html = preg_replace("/(albamoda\\.catalogi\\.ru\\.config\\.jsonp)/is", 'albamoda.de.config.jsonp', $html);


// Интеграция шапки в бозовый шаблон
if(strpos($html, 'id="logo"') !== false){
  $includesView = getIncludes();
  $headView     = getHeader();
  $countersView = getCounters();
  $html = str_replace('<head>', "<head>".$includesView, $html);
  $html = str_replace('</body>', $headView.'</body>', $html);
  $html = str_replace('</body>', $countersView.sprintf("<!-- Page generated: %.5f sec -->", microtime(true)-START_TIME)."</body>", $html);
}

if(strpos($html, 'id="jqt"') !== false){
  $mobileIncludesView = getMobileIncludes();
  $headView     = getHeader();
  $countersView = getCounters();
  $html = str_replace('<head>', "<head>".$mobileIncludesView, $html);
  $html = str_replace('</body>', $headView.'</body>', $html);
  $html = str_replace('</body>', $countersView.sprintf("<!-- Page generated: %.5f sec -->", microtime(true)-START_TIME)."</body>", $html);
}

/***
 * Обработа заголовков
 **/
$headers = str_replace('albamoda.de', 'albamoda.catalogi.ru', $headers);
$res_headers = http_parse_headers($headers);

// Формирование заголовков ответа
if(array_key_exists('Content-Type', $res_headers)){
  header('Content-Type: '.$res_headers['Content-Type']);
}

if(array_key_exists('Location', $res_headers)){
  header('Location: '.$res_headers['Location']);
}

if(array_key_exists('Set-Cookie', $res_headers)){
  if(is_array($res_headers['Set-Cookie'])){
    foreach($res_headers['Set-Cookie'] as $cookie){
      header('Set-Cookie: '.$cookie, false);
    }    
  }else{
    header('Set-Cookie: '.$res_headers['Set-Cookie'], false);
  }
}

// Установка кукиза для авто-перевода
setcookie('googtrans', '/de/ru', null, '/', '.catalogi.ru');
setcookie('googtrans', '/de/ru', null, '/', 'albamoda.catalogi.ru');

echo $html;

// $path =  dirname(__FILE__);
// file_put_contents($path.'/uri.txt', sprintf("%.5f", microtime(true)-START_TIME).'|'.$_SERVER['REQUEST_URI']."\n", FILE_APPEND);