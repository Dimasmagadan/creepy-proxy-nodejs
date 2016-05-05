<?php
/***
 * Настройки для PDO
 **/
define('PDO_DSN', 'mysql:host=188.40.83.217;dbname=antonioooo_catal');
define('PDO_USER', 'antonioooo_catal');
define('PDO_PASS', 'Y70cBrEX');

define('PDO_DSN_TEST', 'mysql:host=188.40.83.245;dbname=catalogiWP');
define('PDO_USER_TEST', 'catalogiWP');
define('PDO_PASS_TEST', 'Y1GA6WDg2MzC');


/***
 * Кодирование кириллицы
 **/
function cylEncode($str){
  $str = str_replace('А', '&#1040;', $str);
  $str = str_replace('а', '&#1072;', $str);
  $str = str_replace('Б', '&#1041;', $str);
  $str = str_replace('б', '&#1073;', $str);
  $str = str_replace('В', '&#1042;', $str);
  $str = str_replace('в', '&#1074;', $str);
  $str = str_replace('Г', '&#1043;', $str);
  $str = str_replace('г', '&#1075;', $str);
  $str = str_replace('Д', '&#1044;', $str);
  $str = str_replace('д', '&#1076;', $str);
  $str = str_replace('Е', '&#1045;', $str);
  $str = str_replace('е', '&#1077;', $str);
  $str = str_replace('Ж', '&#1046;', $str);
  $str = str_replace('ж', '&#1078;', $str);
  $str = str_replace('З', '&#1047;', $str);
  $str = str_replace('з', '&#1079;', $str);
  $str = str_replace('И', '&#1048;', $str);
  $str = str_replace('и', '&#1080;', $str);
  $str = str_replace('Й', '&#1049;', $str);
  $str = str_replace('й', '&#1081;', $str);
  $str = str_replace('К', '&#1050;', $str);
  $str = str_replace('к', '&#1082;', $str);
  $str = str_replace('Л', '&#1051;', $str);
  $str = str_replace('л', '&#1083;', $str);
  $str = str_replace('М', '&#1052;', $str);
  $str = str_replace('м', '&#1084;', $str);
  $str = str_replace('Н', '&#1053;', $str);
  $str = str_replace('н', '&#1085;', $str);
  $str = str_replace('О', '&#1054;', $str);
  $str = str_replace('о', '&#1086;', $str);
  $str = str_replace('П', '&#1055;', $str);
  $str = str_replace('п', '&#1087;', $str);
  $str = str_replace('Р', '&#1056;', $str);
  $str = str_replace('р', '&#1088;', $str);
  $str = str_replace('С', '&#1057;', $str);
  $str = str_replace('с', '&#1089;', $str);
  $str = str_replace('Т', '&#1058;', $str);
  $str = str_replace('т', '&#1090;', $str);
  $str = str_replace('У', '&#1059;', $str);
  $str = str_replace('у', '&#1091;', $str);
  $str = str_replace('Ф', '&#1060;', $str);
  $str = str_replace('ф', '&#1092;', $str);
  $str = str_replace('Х', '&#1061;', $str);
  $str = str_replace('х', '&#1093;', $str);
  $str = str_replace('Ц', '&#1062;', $str);
  $str = str_replace('ц', '&#1094;', $str);
  $str = str_replace('Ч', '&#1063;', $str);
  $str = str_replace('ч', '&#1095;', $str);
  $str = str_replace('Ш', '&#1064;', $str);
  $str = str_replace('ш', '&#1096;', $str);
  $str = str_replace('Щ', '&#1065;', $str);
  $str = str_replace('щ', '&#1097;', $str);
  $str = str_replace('Ъ', '&#1066;', $str);
  $str = str_replace('ъ', '&#1098;', $str);
  $str = str_replace('Ы', '&#1067;', $str);
  $str = str_replace('ы', '&#1099;', $str);
  $str = str_replace('Ь', '&#1068;', $str);
  $str = str_replace('ь', '&#1100;', $str);
  $str = str_replace('Э', '&#1069;', $str);
  $str = str_replace('э', '&#1101;', $str);
  $str = str_replace('Ю', '&#1070;', $str);
  $str = str_replace('ю', '&#1102;', $str);
  $str = str_replace('Я', '&#1071;', $str);
  $str = str_replace('я', '&#1103;', $str);
  return $str;
}

/***
 * Парсинг HTTP заголовка
 **/
function http_parse_headers($header){
  $retVal = array();
  $fields = explode("\r\n", preg_replace('/\x0D\x0A[\x09\x20]+/', ' ', $header));
  foreach( $fields as $field ) {
    if( preg_match('/([^:]+): (.+)/m', $field, $match) ){
      $match[1] = preg_replace('/(?<=^|[\x09\x20\x2D])./e', 'strtoupper("\0")', strtolower(trim($match[1])));
      if( isset($retVal[$match[1]]) ){
        if (!is_array($retVal[$match[1]])){
          $retVal[$match[1]] = array($retVal[$match[1]]);
        }
        $retVal[$match[1]][] = $match[2];
      }else{
        $retVal[$match[1]] = trim($match[2]);
      }
    }
  }
  return $retVal;
}

/***
 * Альтернативный перевод
 * строки в вещесственное число
 **/
function float($str, $set=false){            
  if(preg_match("/([0-9\.,-]+)/", $str, $match)){
    $str = $match[0];
    if(strstr($str, ',')){
      $str = str_replace('.', '', $str);
      $str = str_replace(',', '.', $str);
      return floatval($str);
    }else{
      if(preg_match("/^[0-9]*[\.]{1}[0-9-]+$/", $str) == true && $set['single_dot_as_decimal'] == true){
        return floatval($str);
      }else{
        $str = str_replace('.', '', $str);
        return floatval($str);
      }                
    }
  }else{
    return 0;
  }
}

/***
 * Получение стоимости доставки
 **/
function delivery(){
  try{
    $db = new PDO(PDO_DSN, PDO_USER, PDO_PASS);
    $db->exec("SET CHARACTER SET utf8");
    
    if(isset($_COOKIE["user"])){
	
	  $_COOKIE["user"] = is_array($_COOKIE["user"]) ? $_COOKIE["user"] : unserialize($_COOKIE["user"]);
	
      $stm = $db->prepare("SELECT * FROM `total_orders` WHERE `user_id`=:user_id");
      $stm->bindParam(':user_id', $_COOKIE["user"]["id"]);
      $stm->execute();
      $rows = $stm->fetchAll();
      foreach($rows as $row){
        $param[$row['type']] = $row['summ'];
      }
      
      $service = $param[60]-$param[70];
    }else{
      $service = 15;
    }
  }catch(PDOException $e){  
    return 0; 
  }

  //$price = float($str);
  //$delivery = $price + (($price/100)*$service);

  return $service;//round($delivery, 2);
}

/***
 * Скрыть/показать гугл переводчик
 **/
function showTranslate($alias){
  try{
    $db = new PDO(PDO_DSN, PDO_USER, PDO_PASS);
    $db->exec("SET CHARACTER SET utf8");

    $stm = $db->prepare("SELECT * FROM `shops` WHERE `alias`=:alias LIMIT 1");
    $stm->bindParam(':alias', $alias);
    $stm->execute();
    $row = $stm->fetch();
  }catch(PDOException $e){  
    return ''; 
  }

  if($row['is_translated'] == '1'){
    return false;
  }else{
    return true;
  }
}

class cookie
{
	public static $user_id;

	static function getUserId(){
		if(!isset($_COOKIE["user_id"])){
			$unique_id = substr(md5(microtime()), 0, 14);
			self::setCookie("user_id", $unique_id);
			self::$user_id=$unique_id;
		}
		else{
		  self::$user_id=$_COOKIE["user_id"];
		}

    return self::$user_id;
  }
	static function setCookie($name, $value){
		setcookie($name, $value, time()+60*60*24*30*12*10, "/", '.catalogi.ru');
	}
}

class joomla
{
	static function loadModule($id){

	}

	static function loadContent($alias){
    $db = new PDO(PDO_DSN, PDO_USER, PDO_PASS);
    $db->exec("SET CHARACTER SET utf8");
    $stm = $db->prepare("SELECT `title` as 'title', `introtext` as 'text' FROM `jos_content` WHERE `alias`=:alias;");
    $stm->bindParam(':alias', $alias);
    $stm->execute();
    $content = $stm->fetch();
    return $content;
	}
}