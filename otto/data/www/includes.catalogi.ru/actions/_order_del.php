<?php
require_once dirname(__FILE__).'/../lib.php';

session_set_cookie_params(0, '/', 'catalogi.ru');

try{
  $db = new PDO(PDO_DSN, PDO_USER, PDO_PASS);
  $db->exec("SET CHARACTER SET utf8");
  
  if(isset($_COOKIE["user"])){
	$_COOKIE["user"] = is_array($_COOKIE["user"]) ? $_COOKIE["user"] : unserialize($_COOKIE["user"]);
	
    $stm = $db->prepare("DELETE FROM `orders` WHERE `user_id`=:user_id AND `id`=:id;");
    $stm->bindParam(':user_id', $_COOKIE["user"]["id"]);
    $stm->bindParam(':id', $_POST["id"]);
  }else{
    $stm = $db->prepare("DELETE FROM `orders` WHERE `cookie_id`=:cookie_id AND `id`=:id;");
    $stm->bindParam(':cookie_id', cookie::getUserId());
    $stm->bindParam(':id', $_POST["id"]);
  }
  $stm->execute();
  echo $stm->rowCount();
}catch(PDOException $e){
  echo $e->getMessage(); 
}