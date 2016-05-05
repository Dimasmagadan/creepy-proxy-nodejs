<?php
require_once dirname(__FILE__).'/../lib.php';
header('Access-Control-Allow-Origin: *');
$products = json_decode($_POST['products'], true);
try{

  //$_COOKIE["user"] = is_array($_COOKIE["user"]) ? $_COOKIE["user"] : unserialize($_COOKIE["user"]);

  $db = new PDO(PDO_DSN, PDO_USER, PDO_PASS);
  $db->exec("SET CHARACTER SET utf8");
  $row = 0;

  if((isset($_POST["user"])) && (!empty($_POST["user"]))){
    $_COOKIE["user"] = $_POST["user"];
  }

  if((isset($_POST["user_id"])) && (!empty($_POST["user_id"]))){
    $_COOKIE["user_id"] = $_POST["user_id"];
  }



  foreach($products as $product){
    if(isset($_COOKIE["user"])){

      $img    = isset($product['img']) ? $product['img'] : 'null';
      $_COOKIE["user"] = is_array($_COOKIE["user"]) ? $_COOKIE["user"] : unserialize($_COOKIE["user"]);
      $stm = $db->prepare("INSERT INTO `orders` VALUES (NULL, :user_id, NULL, NULL, CURDATE(), :catalog, :articul, :size, :name, 'Товар под заказ', 0, 0, :price, 0, :count, 0, 1, :img, NULL);");
      $stm->bindParam(':user_id', $_COOKIE["user"]["id"]);
      $stm->bindParam(':catalog', $product["catalog"]);
      $stm->bindParam(':articul', $product["articul"]);
      $stm->bindParam(':size', $product["size"]);
      $stm->bindParam(':name', $product["name"]);
      $stm->bindParam(':price', $product["price"]);
      $stm->bindParam(':count', $product["count"]);
      $stm->bindParam(':img', $img);
    }else{
      $img    = isset($product['img']) ? $product['img'] : 'null';
      $stm = $db->prepare("INSERT INTO `orders` VALUES (NULL, NULL, :cookie_id, NULL, CURDATE(), :catalog, :articul, :size, :name, 'Товар под заказ', 0, 0, :price, 0, :count, 0, 1, :img, NULL);");
      $stm->bindParam(':cookie_id', cookie::getUserId());
      $stm->bindParam(':catalog', $product["catalog"]);
      $stm->bindParam(':articul', $product["articul"]);
      $stm->bindParam(':size', $product["size"]);
      $stm->bindParam(':name', $product["name"]);
      $stm->bindParam(':price', $product["price"]);
      $stm->bindParam(':count', $product["count"]);
      $stm->bindParam(':img', $img);
    }
    $stm->execute();
    $row = $row+$stm->rowCount();
  }
  echo $row;
}catch(PDOException $e){  
  echo $e->getMessage(); 
}
