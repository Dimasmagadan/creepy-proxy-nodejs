<?php
define("START_TIME", microtime(true));
define("START_MEMO", memory_get_usage());

session_start();

require_once dirname(__FILE__).'/../catalogi.ru/_header/_header.php';
require_once dirname(__FILE__).'/../catalogi.ru/_header/_redirect.php';

//Текущий url
$hostFragment = array_reverse(explode('.',$_SERVER['HTTP_HOST']));
$baseHost = $hostFragment[2].'.'.$hostFragment[1].'.'.$hostFragment[0];
$host = $_SERVER['HTTP_HOST'];
$uri = ($_SERVER['REQUEST_URI'] == '/') ? '/damenbekleidung/damenmode/sh764775.html' : $_SERVER['REQUEST_URI'];


if(count($hostFragment)>3){
  $url = 'http://'.(preg_replace('/('.quotemeta($baseHost).')/is', 'albamoda.de', $host)).$uri;
}else{
  $url = 'http://www.'.(preg_replace('/('.quotemeta($baseHost).')/is', 'albamoda.de', $host)).$uri;
}

$_in_header = GetAllHeaders();
$in_header = array();


if(isset($_in_header['Cookie'])){
  $in_header[] = 'Cookie: '.$_in_header['Cookie'];
}

if(isset($_in_header['Accept'])){
  $in_header[] = 'Accept: '.$_in_header['Accept'];
}

if(isset($_in_header['Accept-Language'])){
  $in_header[] = 'Accept-Language: '.$_in_header['Accept-Language'];
}


// Формирование курл запрос

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_HTTPHEADER, $in_header);
curl_setopt($ch, CURLOPT_HEADER, 1);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_USERAGENT, $_in_header['User-Agent']);

if($_SERVER['REQUEST_METHOD'] == 'POST'){
  curl_setopt($ch, CURLOPT_POST, true);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $HTTP_RAW_POST_DATA);
}

$out = curl_exec($ch);
$out_headers_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
$out_headers = substr($out, 0, $out_headers_size - 4);
$html = substr($out, $out_headers_size);
curl_close($ch);

$curl_memo        = memory_get_usage() - START_MEMO;
$curl_avg         = json_encode(sys_getloadavg());
$curl_time        = sprintf("%.5f sec", microtime(true)-START_TIME);

// Кодирование контента в utf8
$html = mb_convert_encoding($html, "UTF-8", "auto");

// Замена ссылок
$html = preg_replace("/(albamoda\\.de)/is", $baseHost, $html);

$html = preg_replace("/(albamoda\\.catalogi\\.ru\\.config\\.jsonp)/is", 'albamoda.de.config.jsonp', $html);

// Замена кодировки (если не utf8)
$html = preg_replace("/charset=iso-8859-1/is", "charset=UTF-8", $html);

// Фикс перевода
$html = str_replace("www.albamoda.de/images/app/common/bkgd/herren.png", "/images/herren.png", $html);
$html = str_replace("www.albamoda.de/images/app/common/bkgd/damenmode.png", "/images/damenmode.png", $html);
$html = str_replace("www.albamoda.de/images/app/common/bkgd/damenmode_mo.png", "/images/damenmode_mo.png", $html);

$html = str_replace("Nicht alle Farben/Größen/- Ausführungen reduziert", "Не все цвета/размеры со скидкой", $html);
$html = str_replace("In die Einkaufstasche", "Заказать", $html);
$html = str_replace(">Wohnen", ">Для дома", $html);

$html = str_replace("class=\"rsaquo\"", "class=\"rsaquo notranslate\"", $html);
$html = str_replace("/js/script-compressed.js", "/lib/script-compressed.js", $html);

// Парсинг контента если это HTML страница
if(preg_match_all("/id=\"main\"/is", $html, $match) ){
  $html = new simple_html_dom($html,
    $lowercase=false,
    $forceTagsClosed=false,
    $target_charset = DEFAULT_TARGET_CHARSET, 
    $stripRN = false, 
    $defaultBRText=DEFAULT_BR_TEXT, 
    $defaultSpanText=DEFAULT_SPAN_TEXT
  );

  //$html->find('script', 0)->outertext = '';

/*
  foreach($html->find('script') as $key=>$val){
    echo $key."=>\n";
    echo $val;
    echo "\n";
  }
*/

  // Шапка
  $html->find('.callback', 0)->outertext = '';
  $html->find('#headerbanner', 0)->outertext = '';
  $html->find('#logo', 0)->outertext = '';
  $html->find('#metanavigation', 0)->outertext = '';
  $html->find('.miniBasket', 0)->outertext = '';
  $html->find('#suchBox', 0)->outertext = '';
  $html->find('li[class="tnav7 tnav tnav_big extras"]', 0)->outertext = '';

/*
  foreach($html->find('.categoriesList', 2)->find('.level4') as $item){
    $item->class .= ' notranslate';
  }

  foreach($html->find('.categoriesList', 3)->find('.level4') as $item){
    $item->class .= ' notranslate';
  }

  foreach($html->find('.categoriesList', 5)->find('.level4') as $item){
    $item->class .= ' notranslate';
  }

  foreach($html->find('.categoriesList', 8)->find('.level4') as $item){
    $item->class .= ' notranslate';
  }

  foreach($html->find('.categoriesList', 12)->find('.level4') as $item){
    $item->class .= ' notranslate';
  }
*/

  // Стр. товара
  $html->find('#social', 0)->outertext = '';
  //$html->find('.reviewDetails', 0)->outertext = '';
  $html->find('#contentInfoLinks', 0)->outertext = '';
  $html->find('h1[itemprop="name"]', 0)->class = 'notranslate';
  $html->find('.chooseModel', 0)->class .= ' notranslate';
  if($html->find('#manufacturerToolTip', 0)){
    $html->find('#manufacturerToolTip', 0)->next_sibling()->class = 'notranslate';
  }
  $html->find('#priceBox .priceReduced', 0)->innertext = '€'.str_replace('EUR', '', $html->find('#priceBox .priceReduced', 0)->innertext);
  $html->find('#priceBox', 0)->innertext .= '<span class="delivery notranslate">С учетом доставки € '.(str_replace('.', ',', delivery($html->find('.priceReduced', 0)->plaintext))).'</span>';

  // Стр. комплекта
  foreach($html->find('p.productName') as $item){
    $item->class .= ' notranslate'; 
  }
  // Футер
  $html->find('.alba_txt', 0)->outertext = '';

  //Шаблоны
  $google_translate   = file_get_html('view/google_translate.html');

  $pre_head           = file_get_html('view/pre_head.html');
  $post_head          = file_get_html('view/post_head.html');
  $pre_body           = file_get_html('view/pre_body.html');
  $post_body          = file_get_html('view/post_body.html');
  
  // Интеграция шапки catalogi.ru и гугл переводчика
  $html->find('header', 0)->innertext = $_header.$html->find('header', 0)->innertext;
  $html->find('footer', 0)->innertext = $google_translate;

  $html->find('head', 0)->innertext    = $pre_head.$html->find('head', 0)->innertext;
  $html->find('head', 0)->innertext   .= $post_head.showTranslate('AM');
  $html->find('body', 0)->innertext    = $pre_body.$html->find('body', 0)->innertext;
  $html->find('body', 0)->innertext   .= $post_body.sprintf("<!-- Page generated: %.5f sec -->", microtime(true)-START_TIME);

}

if(preg_match_all("/id=\"availMatrix\"/is", $html, $match) ){
  $html = new simple_html_dom($html,
    $lowercase=false,
    $forceTagsClosed=false,
    $target_charset = DEFAULT_TARGET_CHARSET, 
    $stripRN = false, 
    $defaultBRText=DEFAULT_BR_TEXT, 
    $defaultSpanText=DEFAULT_SPAN_TEXT
  );

  $html->find('.toBasketButton', 0)->outertext = '';
}

// Таблица размеров
if($uri == '/shadowbox_masstabelle/boxedService.html'){
  $html = new simple_html_dom($html,
    $lowercase=false,
    $forceTagsClosed=false,
    $target_charset = DEFAULT_TARGET_CHARSET, 
    $stripRN = false, 
    $defaultBRText=DEFAULT_BR_TEXT, 
    $defaultSpanText=DEFAULT_SPAN_TEXT
  );

  // Интерграция гугл переводчика
  $google_translate   = file_get_html('view/google_translate.html');
  $popup_head   = file_get_html('view/popup_head.html');
  $html->find('head', 0)->innertext .= $popup_head;
  $html->find('body', 0)->innertext .= $google_translate;
}

// Обработка заголовка запроса
foreach(explode("\n", $out_headers) as $header){
  // Установка размера актуального контента
  //$str = preg_replace("/(albamoda\\.de)/is", $baseHost, $header);
  $str = str_replace('Transfer-Encoding: chunked', '', $str);
  header($str, false);
}

header('Content-Length: '.strlen($html));


// Установка кукиза сессии
cookie::getUserId();

// Установка кукиза для авто-перевода
setcookie('googtrans', '/de/ru', null, '/', '.catalogi.ru');
setcookie('googtrans', '/de/ru', null, '/', 'albamoda.catalogi.ru');


$parse_memo       = memory_get_usage() - START_MEMO;
$parse_avg        = json_encode(sys_getloadavg());
$parse_time       = sprintf("%.5f sec", microtime(true)-START_TIME);

$request_uri      = $_SERVER['REQUEST_URI'];
$user_agent       = $_SERVER['HTTP_USER_AGENT'];
$http_server      = $_SERVER['SERVER_NAME'];
$remote_addr      = $_SERVER['REMOTE_ADDR'];

setStat($request_uri, $curl_memo, $curl_avg, $curl_time, $parse_memo, $parse_avg, $parse_time, $user_agent, $http_server, $remote_addr);

echo $html;