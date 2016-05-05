<?php
require_once dirname(__FILE__).'/../lib.php';
session_set_cookie_params(0, '/', 'catalogi.ru');


ob_start();

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
<style>
/*** Блан заказа ***/
#_order_partial{
  font-family: Arial, Helvetica, sans-serif;
  height: 250px;
  width: 700px;
}

#_order_partial h2{
  margin: 0 0 20px 0;
  text-align: center;
  font-weight: normal;
  font-size: 22px;
  color: #EF0F97;
}

#_order_partial > div{
  overflow: hidden;
  height: 190px;
  margin: 5px 0;
  outline: none;
}

#_order_partial table{
  border-collapse: separate !important;
  border-spacing: 5px !important;
  width: 100%;
}

#_order_partial table tr td{
  padding: 4px 2px;
  text-align: center;
  border: 1px solid #888;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  word-break: break-all;
  line-height: 12px;
  font-size: 12px;
  color: #848284;
}

#_order_partial table tr td.last{
  width: auto;
  border: none;
  background: none;
}

#_order_partial table tr td > a{
  text-decoration: underline;
  color: #848284;
}

#_order_partial table tr td > a:hover{
  text-decoration: none;
}

#_order_partial table tr td > a.delete{
  padding: 0 0 0 15px;
  background: url("http://catalogi.ru/css/images/icon-delete.gif") no-repeat 0 3px;
  color: #E66C2A;
  float: right;
  font-size: 11px;
  display: inline !important;
}

#_order_partial .order{
  background: url("http://catalogi.ru/css/images/button_190.png") no-repeat;
  text-decoration: none;
  font-size: 11px;
  text-align: center;
  line-height: 28px;
  display: block;
  width: 190px;
  height: 28px;
  float: left;
  color: #333;
}

#_order_partial .continue{
  background: url("http://catalogi.ru/css/images/button_190.png") no-repeat;
  -webkit-border-radius: 0px;
  -moz-border-radius: 0px;
  border-radius: 0px;
  text-decoration: none;
  font-weight: normal;
  font-size: 11px;
  text-align: center;
  line-height: 28px;
  position: static;
  display: block;
  width: 190px;
  height: 28px;
  float: right;
  color: #333;
}

@media only screen and (max-width: 480px){
  #_order_partial{
    width: 190px;
  }
  #_order_partial table tr td.flex{
    display: none;
  }
  #_order_partial table tr td > a.delete{
    overflow: hidden;
    display: block;
    height: 15px;
    width: 0;
  }
}
</style>
<div id="_order_partial" class="notranslate">
  <h2>Бланк заказа</h2>
  <div>
    <table cellpadding="0" cellspacing="4">
<?php foreach($rows as $order):?>
<?php
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
?>
      <?php echo '<tr class="'.$order["id"].'"><td class="flex">'.$order["catalog"].'</td><td class="flex">'.$order["img"].'</td><td class="flex">'.$order["articul"].'</td><td class="flex">'.$order["size"].'</td><td class="price flex">'.$order["price"].'</td><td>'.$order["naimenovanie"].'</td><td class="flex">'.$order["date"].'</td><td class="quan flex">'.$order["quan"].'</td><td class="last"><a class="delete remove" href="" title="">Удалить артикул</a></td></tr>';?>
<?php endforeach ?>
    </table>  
  </div>

  <a href="javascript:catalogi.colorbox.close();" class="order">Продолжить ПРОСМОТР</a>
  <a href="http://catalogi.ru/zakaz/" class="continue">Перейти к ОФОРМЛЕНИЮ ЗАКАЗА</a>
</div>
<script>
  catalogi('#_order_partial > div').jScrollPane({autoReinitialise: true});

  catalogi('#_order_partial .delete').click(function(){
    var tr = catalogi(this).parents('tr');
    catalogi.basket.del(tr.attr('class'), function(){
      tr.remove();
    });
    return false
  });
  
  catalogi('#_order_partial').on('_order_update', function(){
    catalogi('#_order_partial table').load('/header/actions/_order_get.php', function(){
      catalogi(this).find('.delete').each(function(){
        catalogi(this).bind('click', function(){
          var tr = catalogi(this).parents('tr');
          catalogi.basket.del(tr.attr('class'), function(){
            tr.remove();
          });
          return false;
        });
      });
    });
  });
</script>
<?php
$out = cylEncode(ob_get_contents());
ob_end_clean();
echo $out;
?>