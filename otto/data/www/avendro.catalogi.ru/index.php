<?php
define("START_TIME", microtime(true));
define('CATALOG_HOST', 'www.avendro.catalogi.ru');
define('CATALOG_ALIAS', 'OT');
define('CATALOG_STRING', 'Интернет-магазин Avendro - member of OTTO group. Каталоги.ру - заказ и доставка одежды из европейских интернет-магазинов.');
define('CATALOG_GOOGLE_HASH', 'bb6a1efd930178ba-e42582e69da641b1-g36b6ec91b8bb2b58-10');

require_once '/var/www/otto/data/www/includes.catalogi.ru/index.php';

$host = str_replace('avendro.catalogi.ru', 'otto.de', $_SERVER['HTTP_HOST']);
$uri = $_SERVER['REQUEST_URI'];

if($host == 'm.otto.de'){
  $url = 'http://'.$host.$uri;
}else{
  $url = 'https://'.$host.$uri;
}

// Редиректы с ненужных стр.
if($uri === '/'){
  //header('Location: http://www.avendro.catalogi.ru/damenmode');
  header('Location: http://catalogi.ru/site_view.php?url=http://www.otto.de/damenmode');
}


//Обработка входящих заголовков
$_req_header = getallheaders();
$req_header = array();


if(isset($_req_header['Cookie'])){
  $req_header[] = 'Cookie: '.$_req_header['Cookie'];
}

if(isset($_req_header['Content-Length'])){
  $req_header[] = 'Content-Length: '.$_req_header['Content-Length'];
}

if(isset($_req_header['Origin'])){
  $req_header[] = 'Origin: '.str_replace('avendro.catalogi.ru', 'otto.de', $_req_header['Origin']);
}

if(isset($_req_header['Referer'])){
  $req_header[] = 'Referer: '.str_replace('avendro.catalogi.ru', 'otto.de', $_req_header['Referer']);
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
//$req_header[] = 'Content-Type: Mozilla/5.0 (Linux; Android 4.1.1; ALCATEL ONE TOUCH 5020D Build/JRO03C) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.92 Mobile Safari/537.36';
//$_req_header['User-Agent'] = 'Mozilla/5.0 (Linux; Android 4.1.1; ALCATEL ONE TOUCH 5020D Build/JRO03C) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.92 Mobile Safari/537.36';
//$_req_header['User-Agent'] = 'Mozilla/5.0 (Linux; U; Android 4.1.1; ru-ru; ALCATEL ONE TOUCH 5020D Build/JRO03C) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.1 Mobile Safari/534.30';

/***
 * CURL запрос
 **/

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_PROXY, '188.40.243.166:3129');
curl_setopt($ch, CURLOPT_HTTPHEADER, $req_header);
curl_setopt($ch, CURLOPT_HEADER, 1);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($ch, CURLOPT_USERAGENT, $_req_header['User-Agent']);

if($_SERVER['REQUEST_METHOD'] == 'POST'){
  curl_setopt($ch, CURLOPT_POST, true);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $HTTP_RAW_POST_DATA);
}
$out = curl_exec($ch);

if($host == 'm.otto.de'){
  $headers = substr($out, 0, curl_getinfo($ch, CURLINFO_HEADER_SIZE)-4);
  $html = substr($out, curl_getinfo($ch, CURLINFO_HEADER_SIZE));  
}else{
  $headers = substr($out, 0, curl_getinfo($ch, CURLINFO_HEADER_SIZE)+39);
  $html = substr($out, curl_getinfo($ch, CURLINFO_HEADER_SIZE)+39);  
}

curl_close($ch);


/***
 * Работа с контеном
 **/

// Замена ссылок
$html = str_replace('otto.de', 'avendro.catalogi.ru', $html);
$html = str_replace('https://assets.cdn-avendro.catalogi.ru', 'http://assets.cdn-otto.de', $html);
$html = str_replace('images.avendro.catalogi.ru', 'images.otto.de', $html);
$html = str_replace('Mehr von', 'Больше от', $html);

$html = str_replace('<span class="js_shortname">avendro-Welten</span>', '<span class="js_shortname">Новинки</span>', $html);
$html = str_replace('<span class="js_shortname">Damen</span>', '<span class="js_shortname">Женщинам</span>', $html);
$html = str_replace('<span class="js_shortname">Herren</span>', '<span class="js_shortname">Мужчинам</span>', $html);
$html = str_replace('<span class="js_shortname">Kinder</span>', '<span class="js_shortname">Детям</span>', $html);
$html = str_replace('<span class="js_shortname">Wäsche/Bademode</span>', '<span class="js_shortname">Белье и купальники</span>', $html);
$html = str_replace('<span class="js_shortname">Sport</span>', '<span class="js_shortname">Спорт</span>', $html);
$html = str_replace('<span class="js_shortname">Schuhe</span>', '<span class="js_shortname">Обувь</span>', $html);
$html = str_replace('<span class="js_shortname">Große Größen</span>', '<span class="js_shortname">Большие размеры</span>', $html);
$html = str_replace('<span class="js_shortname">Multimedia</span>', '<span class="js_shortname">Мультимедиа</span>', $html);
$html = str_replace('<span class="js_shortname">Haushalt</span>', '<span class="js_shortname">Товары для дома</span>', $html);
$html = str_replace('<span class="js_shortname">Möbel</span>', '<span class="js_shortname">Мебель</span>', $html);
$html = str_replace('<span class="js_shortname">Heimtextilien</span>', '<span class="js_shortname">Текстиль</span>', $html);
$html = str_replace('<span class="js_shortname">Baumarkt</span>', '<span class="js_shortname">Инструмент</span>', $html);
$html = str_replace('<span class="js_shortname">Spielzeug</span>', '<span class="js_shortname">Игрушки</span>', $html);
$html = str_replace('<span class="js_shortname">Beauty</span>', '<span class="js_shortname">Красота</span>', $html);
$html = str_replace('<span class="js_shortname">Marken</span>', '<span class="js_shortname">Бренды</span>', $html);
$html = str_replace('<span class="js_shortname">%Sale%</span>', '<span class="js_shortname">Sale</span>', $html);
$html = str_replace('eep-alive', '', $html);
$html = str_replace('X-UA-Compatible: IE=edge', '', $html);

$html = str_replace('OTTO entdecken', 'Avendro - member of ОТТО group', $html);
$html = str_replace('shopTeaserHeadline', 'shopTeaserHeadline notranslate', $html);


// Интеграция шапки в бозовый шаблон
if(strpos($html, '<nav>') !== false){
  $includesView = getIncludes();
  $headView     = getHeader();
  $countersView = getCounters();
  $html = str_replace('<head>', "<head>".$includesView, $html);
  $html = str_replace('<head xmlns:esi="http://www.edge-delivery.org/esi/1.0">', '<head xmlns:esi="http://www.edge-delivery.org/esi/1.0">'.$includesView, $html);
  $html = str_replace('</body>', $headView.$countersView.sprintf("<!-- Page generated: %.5f sec -->", microtime(true)-START_TIME)."</body>", $html);
}

if($host == 'm.otto.de'){
  $mobileIncludesView = getMobileIncludes();
  $headView     = getHeader();
  $countersView = getCounters();
  $html = str_replace('</head>', $mobileIncludesView."</head>", $html);
  $html = str_replace('</body>', $headView.$countersView.sprintf("<!-- Page generated: %.5f sec -->", microtime(true)-START_TIME)."</body>", $html);
}

/***
 * Обработа заголовков
 **/
$headers = str_replace('otto.de', 'avendro.catalogi.ru', $headers);
$headers = str_replace('https', 'http', $headers);
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


if(array_key_exists('X-Varnish', $res_headers)){
  header('X-Varnish: '.$res_headers['X-Varnish']);
}

if(array_key_exists('Via', $res_headers)){
  header('Via: '.$res_headers['Via']);
}

// Установка кукиза для авто-перевода
setcookie('googtrans', '/de/ru', null, '/', '.catalogi.ru');
setcookie('googtrans', '/de/ru', null, '/', 'avendro.catalogi.ru');

echo $html;