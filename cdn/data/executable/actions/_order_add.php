<?php
require_once dirname(__FILE__).'/../lib.php';
header('Access-Control-Allow-Origin: *');

try{
  $db = new PDO(PDO_DSN, PDO_USER, PDO_PASS);
  $db->exec("SET CHARACTER SET utf8");

  if((isset($_POST["user"])) && (!empty($_POST["user"]))){
    $_COOKIE["user"] = $_POST["user"];
  }

  if((isset($_POST["user_id"])) && (!empty($_POST["user_id"]))){
    $_COOKIE["user_id"] = $_POST["user_id"];
  }

  $img    = isset($_POST['img']) ? $_POST['img'] : 'null';
  $stock  = isset($_POST['stock']) ? $_POST['stock'] : 'null';

  if(isset($_COOKIE["user"])){
	$_COOKIE["user"] = is_array($_COOKIE["user"]) ? $_COOKIE["user"] : unserialize($_COOKIE["user"]);
    $stm = $db->prepare("INSERT INTO `orders` VALUES (NULL, :user_id, NULL, NULL, NOW(), :catalog, :articul, :size, :name, 'Товар под заказ', 0, 0, :price, 0, :count, 0, 1, :img, :stock);");
    $stm->bindParam(':user_id', $_COOKIE["user"]["id"]);
    $stm->bindParam(':catalog', $_POST["catalog"]);
    $stm->bindParam(':articul', $_POST["articul"]);
    $stm->bindParam(':size', $_POST["size"]);
    $stm->bindParam(':name', $_POST["name"]);
    $stm->bindParam(':price', $_POST["price"]);
    $stm->bindParam(':count', $_POST["count"]);
    $stm->bindParam(':img', $img);
    $stm->bindParam(':stock', $stock);
  }else{
    $stm = $db->prepare("INSERT INTO `orders` VALUES (NULL, NULL, :cookie_id, NULL, NOW(), :catalog, :articul, :size, :name, 'Товар под заказ', 0, 0, :price, 0, :count, 0, 1, :img, :stock);");
    $stm->bindParam(':cookie_id', cookie::getUserId());
    $stm->bindParam(':catalog', $_POST["catalog"]);
    $stm->bindParam(':articul', $_POST["articul"]);
    $stm->bindParam(':size', $_POST["size"]);
    $stm->bindParam(':name', $_POST["name"]);
    $stm->bindParam(':price', $_POST["price"]);
    $stm->bindParam(':count', $_POST["count"]);
    $stm->bindParam(':img', $img);
    $stm->bindParam(':stock', $stock);
  }
  $stm->execute();
  echo $stm->rowCount();
}catch(PDOException $e){  
  echo $e->getMessage(); 
}

try{
  $db = new PDO(PDO_DSN_TEST, PDO_USER_TEST, PDO_PASS_TEST);
  $db->exec("SET CHARACTER SET utf8");

  if((isset($_POST["user"])) && (!empty($_POST["user"]))){
    $_COOKIE["user"] = $_POST["user"];
  }

  if((isset($_POST["user_id"])) && (!empty($_POST["user_id"]))){
    $_COOKIE["user_id"] = $_POST["user_id"];
  }

  $img    = isset($_POST['img']) ? $_POST['img'] : 'null';
  $stock  = isset($_POST['stock']) ? $_POST['stock'] : 'null';

  if(isset($_COOKIE["user"])){
	$_COOKIE["user"] = is_array($_COOKIE["user"]) ? $_COOKIE["user"] : unserialize($_COOKIE["user"]);
    $stm = $db->prepare("INSERT INTO `orders` VALUES (NULL, :user_id, NULL, NULL, NOW(), :catalog, :articul, :size, :name, 'Товар под заказ', 0, 0, :price, 0, :count, 0, 1, :img, :stock);");
    $stm->bindParam(':user_id', $_COOKIE["user"]["id"]);
    $stm->bindParam(':catalog', $_POST["catalog"]);
    $stm->bindParam(':articul', $_POST["articul"]);
    $stm->bindParam(':size', $_POST["size"]);
    $stm->bindParam(':name', $_POST["name"]);
    $stm->bindParam(':price', $_POST["price"]);
    $stm->bindParam(':count', $_POST["count"]);
    $stm->bindParam(':img', $img);
    $stm->bindParam(':stock', $stock);
  }else{
    $stm = $db->prepare("INSERT INTO `orders` VALUES (NULL, NULL, :cookie_id, NULL, NOW(), :catalog, :articul, :size, :name, 'Товар под заказ', 0, 0, :price, 0, :count, 0, 1, :img, :stock);");
    $stm->bindParam(':cookie_id', cookie::getUserId());
    $stm->bindParam(':catalog', $_POST["catalog"]);
    $stm->bindParam(':articul', $_POST["articul"]);
    $stm->bindParam(':size', $_POST["size"]);
    $stm->bindParam(':name', $_POST["name"]);
    $stm->bindParam(':price', $_POST["price"]);
    $stm->bindParam(':count', $_POST["count"]);
    $stm->bindParam(':img', $img);
    $stm->bindParam(':stock', $stock);
  }
  $stm->execute();
  echo $stm->rowCount();
}catch(PDOException $e){  
  echo $e->getMessage(); 
}