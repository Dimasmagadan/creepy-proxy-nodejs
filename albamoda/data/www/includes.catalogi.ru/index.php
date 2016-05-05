<?php
session_set_cookie_params(0, '/', 'catalogi.ru');

if(isset($_COOKIE["user"])){
  setcookie('isAuth',  'true', time()+60*60*24*30*12*10, "/", "catalogi.ru");
}else{
  setcookie('isAuth',  'false', time()+60*60*24*30*12*10, "/", "catalogi.ru");
}

require_once 'lib.php';

/***
 * Интеграция в базовый шаблон
 **/
function getIncludes(){
  ob_start();
?>
<meta name="google" value="notranslate" />
<meta name="google-translate-customization" content="<?php echo CATALOG_GOOGLE_HASH?>" />
<link href="http://includes.catalogi.ru/css/jquery.jscrollpane.css" rel="stylesheet" type="text/css" />
<link href="http://includes.catalogi.ru/css/jquery.colorbox.css" rel="stylesheet" type="text/css" />
<link href="http://includes.catalogi.ru/css/validationEngine.jquery.css" rel="stylesheet" type="text/css" />
<?php if(showTranslate(CATALOG_ALIAS)): ?>
<link href="http://includes.catalogi.ru/css/skiptranslate.css" rel="stylesheet" type="text/css" />
<?php endif ?>
<link rel='stylesheet' id='usernoise-button-css'  href='/usernoise/css/button.css' type='text/css' media='all' />
<link href="http://includes.catalogi.ru/css/common.css" rel="stylesheet" type="text/css" />
<link href="/_css/override.css" rel="stylesheet" type="text/css"/>
<script type="text/javascript" src="http://includes.catalogi.ru/js//jquery-1.10.1.min.js"></script>
<script type="text/javascript" src="http://includes.catalogi.ru/js/jquery.mousewheel.js"></script>
<script type="text/javascript" src="http://includes.catalogi.ru/js/jquery.jscrollpane.min.js"></script>
<script type="text/javascript" src="http://includes.catalogi.ru/js/jquery.colorbox-min.js"></script>
<script type="text/javascript" src="http://includes.catalogi.ru/js/jquery.validationEngine-ru.js"></script>
<script type="text/javascript" src="http://includes.catalogi.ru/js/jquery.validationEngine.js"></script>
<script type="text/javascript" src="http://includes.catalogi.ru/js/jquery.cookie.js"></script>
<script type="text/javascript" src="http://188.40.83.217/js/defaultvalue.js"></script>
<script type='text/javascript'>
/* <![CDATA[ */
var usernoiseButton = {
	"text":"Feedback", // The text shown on the button
	"class":"un-left un-has-border", // un-left, un-right, un-top and un-bottom define the button positioning, un-has-border - if it will have a border
	"style":"", // You can add some extra CSS rules if you want.
	"windowUrl":"/usernoise/index.php", // Please make sure this URL is pointing to your actual Usernoise folder!
	"showButton":"1" // 0 to disable the button and show a window programmatically.
	};
/* ]]> */
</script>
<script type='text/javascript' src='/usernoise/js/button.js'></script>
<script type="text/javascript" src="http://includes.catalogi.ru/js/common.js"></script>
<script type="text/javascript" src="/_js/common.js"></script>
<script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=_googleTranslateElementInit"></script>
<?php
  $_includes = cylEncode(ob_get_contents());
  ob_end_clean();
  return $_includes;
}


/***
 * Интеграция в планшетный шаблон
 **/
function getTabletIncludes(){
  ob_start();
?>
<meta name="google" value="notranslate" />
<meta name="google-translate-customization" content="<?php echo CATALOG_GOOGLE_HASH?>" />
<link href="http://includes.catalogi.ru/css/jquery.jscrollpane.css" rel="stylesheet" type="text/css" />
<link href="http://includes.catalogi.ru/css/jquery.colorbox.css" rel="stylesheet" type="text/css" />
<link href="http://includes.catalogi.ru/css/validationEngine.jquery.css" rel="stylesheet" type="text/css" />
<?php if(showTranslate(CATALOG_ALIAS)): ?>
<link href="http://includes.catalogi.ru/css/skiptranslate.css" rel="stylesheet" type="text/css" />
<?php endif ?>
<link rel='stylesheet' id='usernoise-button-css'  href='/usernoise/css/button.css' type='text/css' media='all' />
<link href="http://includes.catalogi.ru/css/common.css" rel="stylesheet" type="text/css" />
<link href="/_css/tablet.css" rel="stylesheet" type="text/css"/>
<script src="http://code.jquery.com/jquery-latest.min.js"></script>
<script type="text/javascript" src="http://includes.catalogi.ru/js/jquery.mousewheel.js"></script>
<script type="text/javascript" src="http://includes.catalogi.ru/js/jquery.jscrollpane.min.js"></script>
<script type="text/javascript" src="http://includes.catalogi.ru/js/jquery.colorbox-min.js"></script>
<script type="text/javascript" src="http://includes.catalogi.ru/js/jquery.validationEngine-ru.js"></script>
<script type="text/javascript" src="http://includes.catalogi.ru/js/jquery.validationEngine.js"></script>
<script type="text/javascript" src="http://includes.catalogi.ru/js/jquery.cookie.js"></script>
<script type="text/javascript" src="http://188.40.83.217/js/defaultvalue.js"></script>
<script type='text/javascript'>
/* <![CDATA[ */
var usernoiseButton = {
	"text":"Feedback", // The text shown on the button
	"class":"un-left un-has-border", // un-left, un-right, un-top and un-bottom define the button positioning, un-has-border - if it will have a border
	"style":"", // You can add some extra CSS rules if you want.
	"windowUrl":"/usernoise/index.php", // Please make sure this URL is pointing to your actual Usernoise folder!
	"showButton":"1" // 0 to disable the button and show a window programmatically.
	};
/* ]]> */
</script>
<script type='text/javascript' src='/usernoise/js/button.js'></script>
<script type="text/javascript" src="http://includes.catalogi.ru/js/common.js"></script>
<script type="text/javascript" src="/_js/tablet.js"></script>
<script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=_googleTranslateElementInit"></script>
<?php
  $_includes = cylEncode(ob_get_contents());
  ob_end_clean();
  return $_includes;
}

/***
 * Интеграция в мобильный шаблон
 **/
function getMobileIncludes(){
  ob_start();
?>
<meta name="google" value="notranslate" />
<meta name="google-translate-customization" content="<?php echo CATALOG_GOOGLE_HASH?>" />
<meta name="service" value="<?php echo delivery() ?>" />
<link href="http://includes.catalogi.ru/css/jquery.jscrollpane.css" rel="stylesheet" type="text/css" />
<link href="http://includes.catalogi.ru/css/jquery.colorbox.css" rel="stylesheet" type="text/css" />
<link href="http://includes.catalogi.ru/css/validationEngine.jquery.css" rel="stylesheet" type="text/css" />
<?php if(showTranslate(CATALOG_ALIAS)): ?>
<link href="http://includes.catalogi.ru/css/skiptranslate.css" rel="stylesheet" type="text/css" />
<?php endif ?>
<link rel='stylesheet' id='usernoise-button-css'  href='/usernoise/css/button.css' type='text/css' media='all' />
<link href="http://includes.catalogi.ru/css/common.css" rel="stylesheet" type="text/css" />
<link href="/_css/mobile.css" rel="stylesheet" type="text/css"/>
<script src="http://code.jquery.com/jquery-latest.min.js"></script>
<script type="text/javascript" src="http://includes.catalogi.ru/js/jquery.mousewheel.js"></script>
<script type="text/javascript" src="http://includes.catalogi.ru/js/jquery.jscrollpane.min.js"></script>
<script type="text/javascript" src="http://includes.catalogi.ru/js/jquery.colorbox-min.js"></script>
<script type="text/javascript" src="http://includes.catalogi.ru/js/jquery.validationEngine-ru.js"></script>
<script type="text/javascript" src="http://includes.catalogi.ru/js/jquery.validationEngine.js"></script>
<script type="text/javascript" src="http://includes.catalogi.ru/js/jquery.cookie.js"></script>
<script type="text/javascript" src="http://188.40.83.217/js/defaultvalue.js"></script>
<script type='text/javascript'>
/* <![CDATA[ */
var usernoiseButton = {
  "text":"Feedback", // The text shown on the button
  "class":"un-left un-has-border", // un-left, un-right, un-top and un-bottom define the button positioning, un-has-border - if it will have a border
  "style":"", // You can add some extra CSS rules if you want.
  "windowUrl":"/usernoise/index.php", // Please make sure this URL is pointing to your actual Usernoise folder!
  "showButton":"1" // 0 to disable the button and show a window programmatically.
  };
/* ]]> */
</script>
<script type='text/javascript' src='/usernoise/js/button.js'></script>
<script type="text/javascript" src="http://includes.catalogi.ru/js/common.js"></script>
<script type="text/javascript" src="/_js/mobile.js"></script>
<script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=_googleTranslateElementInit"></script>
<?php
  $_includes = cylEncode(ob_get_contents());
  ob_end_clean();
  return $_includes;
}

/***
 * Шапка в базовый шаблон
 **/
function getHeader(){
  ob_start();
?>
<div id="_head" class="notranslate" service="<?php echo delivery() ?>">
  <div>
    <div id="_center">
      <a href="http://<?php echo CATALOG_HOST ?>/" id="_logo"><img src="http://188.40.83.217/images/site/logo.png" border="0" /></a>
      <div class="_table">
        <div class="_tr">
          <div class="_td">
            <div class="_phone">+7(495)540-49-49</div>
            <div class="_home"><a href="http://catalogi.ru/" target="_blank">Каталоги.ру</a></div>
          </div>
          <div class="_td">
            <div class="_links">
              <ul>
                <li><a href="http://includes.catalogi.ru/pages/_delivery.html" id="_delivery_link">Доставка</a></li>
                <li><a href="http://includes.catalogi.ru/pages/_payment.html" id="_pay_link">Оплата</a></li>
                <li><a href="http://includes.catalogi.ru/pages/_size_table.html" id="size_table_link">Таблица размеров</a></li>
              </ul>
            </div>
          </div>
          <div class="_td">
<?php if(isset($_COOKIE["user"])): ?>
            <div class="_account"><a href="http://catalogi.ru/cabinet/">Личный кабинет</a><a href="/header/partials/user.php" class="_logout" id="_logout_link"></a></div>
<?php else: ?>
            <a href="/header/partials/user.php" class="_login" id="_login_link">Вход</a>
<?php endif ?>
          </div>
        </div>
        <div class="_tr">
          <div class="_td">
            <div class="_btns">
              <div>
                <a id="_shops_block_link" href="http://includes.catalogi.ru/partials/shops_block.php">Интернет-магазины</a>
              </div>
              <div>
                <a id="_catalogs_block_link" href="http://includes.catalogi.ru/partials/catalogs_block.php">Онлайн каталоги</a>
              </div>
            </div>
          </div>
          <div class="_td">
            <div class="_search notranslate">
<?php require_once '_view/search_form.php'; ?>
            </div>
          </div>
          <div class="_td">
            <div id="_basket">
              <span><?php echo _count() ?></span>
               товаров
            </div>
          </div>
        </div>
      </div>
      <div class="_info"><?php echo CATALOG_STRING ?></div>
    </div>
  </div>
</div>
<div id="google_translate_element" style="display: none"></div>
<?php
  $_header = cylEncode(ob_get_contents());
  ob_end_clean();
  return $_header;
}

/***
 * Интеграция для iframe
 **/
function getFrame(){
  ob_start();
?>
<meta name="google" value="notranslate" />
<meta name="google-translate-customization" content="<?php echo CATALOG_GOOGLE_HASH?>" />
<?php if(showTranslate(CATALOG_ALIAS)): ?>
<link href="http://includes.catalogi.ru/css/skiptranslate.css" rel="stylesheet" type="text/css" />
<?php endif ?>
<script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=_googleTranslateElementInit"></script>
<script type="text/javascript" src="/_js/frame.js"></script>
<style>
body{
  visibility: hidden;
}
</style>
<?php
  $_frame = cylEncode(ob_get_contents());
  ob_end_clean();
  return $_frame;
}

/***
 *  Счетчики
 **/
function getCounters(){
  ob_start();
?>
<div style="display:none">
<!--LiveInternet counter--><script type="text/javascript"><!--
document.write("<a href='http://www.liveinternet.ru/click;CatalogiRU_NEW' "+
"target=_blank><img src='//counter.yadro.ru/hit;CatalogiRU_NEW?t45.6;r"+
escape(document.referrer)+((typeof(screen)=="undefined")?"":
";s"+screen.width+"*"+screen.height+"*"+(screen.colorDepth?
screen.colorDepth:screen.pixelDepth))+";u"+escape(document.URL)+
";"+Math.random()+
"' alt='' title='LiveInternet' "+
"border='0' width='31' height='31'><\/a>")
//--></script><!--/LiveInternet-->
</div>
<?php
  $_counters = cylEncode(ob_get_contents());
  ob_end_clean();
  return $_counters;
}
?>