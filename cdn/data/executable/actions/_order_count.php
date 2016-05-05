<?php
require_once dirname(__FILE__).'/../lib.php';
header('Access-Control-Allow-Origin: *');

error_reporting(0);

try{
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
  $count = 0;
  foreach($rows as $order){
    $count = $count + (intval($order["quan"]));
  }
  
  echo $count;
}catch(PDOException $e){  
  echo $e->getMessage(); 
}
?>
