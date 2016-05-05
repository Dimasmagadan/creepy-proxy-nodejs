<?php
require_once dirname(__FILE__).'/../lib.php';
header('Access-Control-Allow-Origin: *');

$db = new PDO(PDO_DSN, PDO_USER, PDO_PASS);
$db->exec("SET CHARACTER SET utf8");

if((isset($_POST["user"])) && (!empty($_POST["user"]))){
  $_COOKIE["user"] = $_POST["user"];
}

if((isset($_POST["user_id"])) && (!empty($_POST["user_id"]))){
  $_COOKIE["user_id"] = $_POST["user_id"];
}

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

foreach($rows as $order){
	if($order["search_link"]!=null){
		$order["search_link"]=str_replace('$search_link', str_replace(" ", "", $order["articul"]), $order["search_link"]);
    if(($order["catalog"] == 'BE') || ($order["catalog"] == 'KE') || ($order["catalog"] == 'ER')){
      //$order["articul"] = str_replace('099', '', $order["articul"]);
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

  echo '<tr class="'.$order["id"].'"><td>'.$order["catalog"].'</td><td class="flex"><img src="'.$order["img"].'" width="50"/></td><td>'.$order["articul"].'</td><td>'.$order["size"].'</td><td class="price">'.$order["price"].'</td><td>'.$order["naimenovanie"].'</td><td class="flex">'.$order["date"].'</td><td class="quan">'.$order["quan"].'</td><td class="last"><a class="delete remove" href="" title="">Удалить артикул</a></td></tr>';
}