<?php
require_once dirname(__FILE__).'/../../lib.php';

$db = new PDO(PDO_DSN, PDO_USER, PDO_PASS);
$db->exec("SET CHARACTER SET utf8");

if(isset($_COOKIE["user"])){
  $_COOKIE["user"] = is_array($_COOKIE["user"]) ? $_COOKIE["user"] : unserialize($_COOKIE["user"]);
  $stm = $db->prepare("SELECT o.*, s.`search_link`, s.`name` as `shop_name` FROM `orders` as o LEFT JOIN `shops` AS s ON s.`alias` = o.`catalog` WHERE o.`user_id`=:user_id AND `state`='Товар под заказ' ORDER BY o.`id` DESC;");
  $stm->bindParam(':user_id', $_COOKIE["user"]["id"]);
}else{
  $stm = $db->prepare("SELECT o.*, s.`search_link`, s.`name` as `shop_name` FROM `orders` as o LEFT JOIN `shops` AS s ON s.`alias` = o.`catalog` WHERE o.`cookie_id`=:cookie_id AND `state`='Товар под заказ' ORDER BY o.`id` DESC;");
  $stm->bindParam(':cookie_id', cookie::getUserId());
}
$stm->execute();
$rows = $stm->fetchAll();
?>
<html>
<head>
  <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
  <meta name="language" content="ru" />
  <link href="http://cdn.catalogi.ru/static/css/jquery.jscrollpane.css" rel="stylesheet" type="text/css" />
  <link href="order.css" rel="stylesheet" type="text/css" />
  <script src="http://code.jquery.com/jquery-latest.min.js"></script>
  <script type="text/javascript" src="http://cdn.catalogi.ru/static/js/jquery.mousewheel.js"></script>
  <script type="text/javascript" src="http://cdn.catalogi.ru/static/js/jquery.jscrollpane.min.js"></script>
  <script type="text/javascript" src="http://cdn.catalogi.ru/static/js/jquery.cookie.js"></script>
  <script type="text/javascript" src="order.js"></script>
  <title>Бланк заказа</title>
</head>
<body>
	<div id="_order_partial" class="notranslate">
	  <h2>Бланк заказа</h2>
	  <div>
	    <table cellpadding="0" cellspacing="4">
<?php foreach($rows as $order):?>
<?php
if($order["search_link"]!=null){
	$order["search_link"]=str_replace('$search_link', str_replace(" ", "", $order["articul"]), $order["search_link"]);
  if(($order["catalog"] == 'BE') || ($order["catalog"] == 'KE') || ($order["catalog"] == 'ER')){
    $order["search_link"] = str_replace('099', '', $order["search_link"] );
  }
	$order["articul"]="<a href=\"".$order["search_link"]."\" target=\"_blank\">".$order["articul"]."</a>";
}

if($order["shop_name"]!=null){
	if($order["d3"] == "1"){
	  $order["catalog"] = str_replace(array("WWW."), "", $order["shop_name"]);
	}else{
	  $order["catalog"] = str_replace(array("WWW.", ".DE", ".FR", ".AT"), "", $order["shop_name"]);
	}
}
?>
<?php echo '<tr class="'.$order["id"].'"><td class="flex">'.$order["catalog"].'</td><td class="flex"><img src="'.$order["img"].'" width="50"/></td><td class="flex">'.$order["articul"].'</td><td class="flex">'.$order["size"].'</td><td class="price flex">'.$order["price"].'</td><td>'.$order["naimenovanie"].'</td><td class="flex">'.$order["date"].'</td><td class="quan flex">'.$order["quan"].'</td><td class="last"><a class="delete remove" href="" title="">Удалить артикул</a></td></tr>';?>
<?php endforeach ?>
	    </table>  
	  </div>

	  <a href="javascript:top.postMessage({action: 'colorboxClose'},'*');" class="order">Продолжить ПРОСМОТР</a>
	  <a href="http://catalogi.ru/zakaz/" class="continue" target="_top">Перейти к ОФОРМЛЕНИЮ ЗАКАЗА</a>
	</div>
</body>
</html>