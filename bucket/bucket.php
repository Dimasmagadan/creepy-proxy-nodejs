<?php
require_once 'lib.php';

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

$ggwp = array();
foreach($rows as $order) {
    $id = $order["articul"];

    if($order["search_link"]!=null){
        $order["search_link"]=str_replace('$search_link', str_replace(" ", "", $order["articul"]), $order["search_link"]);
        if(($order["catalog"] == 'BE') || ($order["catalog"] == 'KE') || ($order["catalog"] == 'ER')){
            $order["search_link"] = str_replace('099', '', $order["search_link"] );
        }
        $order["articul"]="<a href=\"".$order["search_link"]."\" target=\"_blank\">".$order["articul"]."</a>";
    }

    $title = $order["naimenovanie"];
    $url = $order["articul"];
    $site = $order["shop_name"];
    $img = $order["img"];
    $size = $order["size"];
    $color = '';
    $price = $order["price"];
    $number = $order["quan"];

    $arr = [
        'id' => $id,
        'title' => $title,
        'url' => $url,
        'site' => $site,
        'img' => $img,
        'size' => $size,
        'color' => $color,
        'price' => $price,
        'number' => $number
    ];
    array_push($ggwp, $arr);
}

header('Content-Type: application/json');
echo json_encode($ggwp, JSON_PRETTY_PRINT);
die();