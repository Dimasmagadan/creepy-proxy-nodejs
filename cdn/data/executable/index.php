<?php


$showErrors = TRUE;
//error_reporting(E_ALL ^ E_DEPRECATED ^ E_NOTICE);
error_reporting(E_ALL^E_NOTICE);
ini_set('display_errors', $showErrors);
ini_set('html_errors', $showErrors);

require_once dirname(__FILE__).'/lib.php';
header('Access-Control-Allow-Origin: *');
// собираем метки //
$utm_medium = isset($_GET["utm_medium"]) ? $_GET["utm_medium"] : "";
$utm_source = isset($_GET["utm_source"]) ? $_GET["utm_source"] : "";
$utm_campaign = isset($_GET["utm_campaign"]) ? $_GET["utm_campaign"] : "";

if ($utm_medium != "" || $utm_source != "" || $utm_campaign != "") {
	$utm = array(
		"medium" => $utm_medium,
		"source" => $utm_source,
		"campaign" => $utm_campaign,
		"host" => $_SERVER['HTTP_HOST']
		
	);
	setcookie("utm", serialize($utm), time()+60*60*24*30*12*10, "/", ".catalogi.ru");
}
// собираем метки [end] //
?>
<!DOCTYPE HTML>
<html>
<head>
	<link href="http://cdn.catalogi.ru/static/css/common.css" rel="stylesheet" type="text/css">
	<script type="text/javascript" src="http://cdn.catalogi.ru/static/js/jquery-2.1.4.min.js"></script>
	<script type="text/javascript" src="http://cdn.catalogi.ru/static/js/jquery.cookie.js"></script>
	<script type="text/javascript" src="http://cdn.catalogi.ru/static/js/head.js"></script>
</head>
<body>
<div id="_head" class="notranslate" service="<?php echo delivery() ?>" skiptranslate="<?php echo showTranslate($_GET['alias']) ? '1': '0' ?>">
  <div>
    <div id="_center">
      <a href="http://www.<?php echo $_GET['catalog']; ?>.catalogi.ru/" id="_logo" target="_top"><img src="http://188.40.83.217/images/site/logo.png" width="249" height="97" border="0" /></a>
      <div class="_table">
        <div class="_tr">
          <div class="_td">
            <div class="_phone">+7(495)540-49-49</div>
            <div class="_home"><a href="http://catalogi.ru/" target="_blank">Каталоги.ру</a></div>
          </div>
          <div class="_td">
            <div class="_links">
              <ul>
                <li><a href="#" id="_delivery_link">Доставка</a></li>
                <li><a href="#" id="_pay_link">Оплата</a></li>
                <li><a href="#" id="size_table_link">Таблица размеров</a></li>
              </ul>
            </div>
          </div>
          <div class="_td">
<?php if(isset($_COOKIE["user"])): ?>
            <div class="_account"><a href="http://catalogi.ru/cabinet/" target="_top">Личный кабинет</a><a href="#" class="_logout" id="_logout_link"></a></div>
<?php else: ?>
            <a href="#" class="_login" id="_login_link">Вход</a>
<?php endif ?>
          </div>
        </div>
        <div class="_tr">
          <div class="_td">
            <div class="_btns">
              <div>
                <a id="_shops_block_link" href="#">Интернет-магазины</a>
              </div>
              <div>
                <a id="_catalogs_block_link" href="#">Онлайн каталоги</a>
              </div>
            </div>
          </div>
          <div class="_td">
            <div class="_search notranslate">
            <form>
            	<input type="text" value="" placeholder="Название товара или артикул">
            	<input type="submit" class="_submit" value="">
            </form>
            </div>
          </div>
          <div class="_td">
            <div id="_basket">
              <span><?php include dirname(__FILE__).'/actions/_order_count.php'; ?></span>
               товаров
            </div>
          </div>
        </div>
      </div>
      <div class="_info"><?php echo $_GET['info']; ?></div>
    </div>
  </div>
</div>
</body>
</html>