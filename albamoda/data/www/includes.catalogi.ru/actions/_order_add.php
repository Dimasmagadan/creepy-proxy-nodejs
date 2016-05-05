<?php
require_once dirname(__FILE__).'/../lib.php';

session_set_cookie_params(0, '/', 'catalogi.ru');

try{
  $db = new PDO(PDO_DSN, PDO_USER, PDO_PASS);
  $db->exec("SET CHARACTER SET utf8");
  $img = isset($product['img']) ? $product['img'] : 'null';
  
  if(isset($_COOKIE["user"])){
	$_COOKIE["user"] = is_array($_COOKIE["user"]) ? $_COOKIE["user"] : unserialize($_COOKIE["user"]);
    $stm = $db->prepare("INSERT INTO `orders` VALUES (NULL, :user_id, NULL, NULL, CURDATE(), :catalog, :articul, :size, :name, 'Товар под заказ', 0, 0, :price, 0, :count, 0, 1, :img, null);");
    $stm->bindParam(':user_id', $_COOKIE["user"]["id"]);
    $stm->bindParam(':catalog', $_POST["catalog"]);
    $stm->bindParam(':articul', $_POST["articul"]);
    $stm->bindParam(':size', $_POST["size"]);
    $stm->bindParam(':name', $_POST["name"]);
    $stm->bindParam(':price', $_POST["price"]);
    $stm->bindParam(':count', $_POST["count"]);
    $stm->bindParam(':img', $img);
  }else{
    $stm = $db->prepare("INSERT INTO `orders` VALUES (NULL, NULL, :cookie_id, NULL, CURDATE(), :catalog, :articul, :size, :name, 'Товар под заказ', 0, 0, :price, 0, :count, 0, 1, :img, null);");
    $stm->bindParam(':cookie_id', cookie::getUserId());
    $stm->bindParam(':catalog', $_POST["catalog"]);
    $stm->bindParam(':articul', $_POST["articul"]);
    $stm->bindParam(':size', $_POST["size"]);
    $stm->bindParam(':name', $_POST["name"]);
    $stm->bindParam(':price', $_POST["price"]);
    $stm->bindParam(':count', $_POST["count"]);
    $stm->bindParam(':img', $img);
  }
  $stm->execute();
  echo $stm->rowCount();
}catch(PDOException $e){  
  echo $e->getMessage(); 
}