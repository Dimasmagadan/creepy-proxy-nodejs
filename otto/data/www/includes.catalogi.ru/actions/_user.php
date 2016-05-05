<?php
require_once dirname(__FILE__).'/../lib.php';

session_set_cookie_params(0, '/', 'catalogi.ru');


if(isset($_COOKIE["user"])){
  unset($_COOKIE["user"]);
  
	setcookie('user',    '', -1, "/", "catalogi.ru");
	setcookie('fio',     '', -1, "/", "catalogi.ru");
	setcookie('code',    '', -1, "/", "catalogi.ru");
	setcookie('phone',   '', -1, "/", "catalogi.ru");
	setcookie('address', '', -1, "/", "catalogi.ru");
	setcookie('email',   '', -1, "/", "catalogi.ru");
	setcookie('plata',   '', -1, "/", "catalogi.ru");
	setcookie('isAuth',  'false', time()+60*60*24*30*12*10, "/", "catalogi.ru");

  if (isset($_SERVER['HTTP_REFERER'])){
    header('Location: '.$_SERVER['HTTP_REFERER']);
  }else{
    header('Location: /');
  }
}else{
  if(($_SERVER['REQUEST_METHOD'] == 'POST') && isset($_SERVER['HTTP_X_REQUESTED_WITH']) && !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest'){
    $db = new PDO(PDO_DSN, PDO_USER, PDO_PASS);
    $db->exec("SET CHARACTER SET utf8");
    $stm = $db->prepare("SELECT * FROM `users` WHERE `login`=:login AND `password`=MD5(:password) LIMIT 1;");
    $stm->bindParam(':login', $_POST['login']);
    $stm->bindParam(':password', $_POST['password']);
    $stm->execute();
    $user = $stm->fetch();
    if($user){
      $_COOKIE["user"] = serialize($user);
      setcookie('user',  serialize($user), time()+60*60*24*30*12*10, "/", "catalogi.ru");
      	  
      setcookie('isAuth',  'true', time()+60*60*24*30*12*10, "/", "catalogi.ru");

      if($_POST["remember"]=== 'true'){
        // setcookie('login',  $_POST["login"], time()+60*60*24*30*12*10, "/", "catalogi.ru");
        // setcookie('password',  $_POST["password"], time()+60*60*24*30*12*10, "/", "catalogi.ru");
      }else{
        // setcookie('login',  '', time()+60*60*24*30*12*10, "/", "catalogi.ru");
        // setcookie('password',  '', time()+60*60*24*30*12*10, "/", "catalogi.ru");
      }

      $stm = $db->prepare("UPDATE `orders` SET `user_id`=:user_id, `cookie_id`=NULL WHERE `cookie_id`=:cookie_id;");
      $stm->bindParam(':user_id', $user['id']);
      $stm->bindParam(':cookie_id', $_COOKIE["user_id"]);
      $stm->execute();

      $stm = $db->prepare("UPDATE `users` SET `last_visit_date`=CURDATE();");
      $stm->execute();

      echo 1;
      
    }else{
      echo 0;
    }
  }else{
    if (isset($_SERVER['HTTP_REFERER'])){
      header('Location: '.$_SERVER['HTTP_REFERER']);
    }else{
      header('Location: /');
    }
  }
}


  