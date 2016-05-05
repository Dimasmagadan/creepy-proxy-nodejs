<?php require_once dirname(__FILE__).'/../lib.php'; ?>
<!DOCTYPE HTML>
<html>
<head>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
  <meta name="language" content="ru" />
  <link href="http://catalogi.ru/_header/css/jquery.jscrollpane.css" rel="stylesheet" type="text/css" />
  <script src="http://code.jquery.com/jquery-latest.min.js"></script>
  <script type="text/javascript" src="http://catalogi.ru/_header/js/jquery.mousewheel.js"></script>
  <script type="text/javascript" src="http://catalogi.ru/_header/js/jquery.jscrollpane.min.js"></script>
	<title>Доставка</title>
  <style>
    #_shops_block_partial{
      width: 805px;
      height: 500px;
      outline: none;
    }
  
    #_shops_block_partial table{
      font-family: Arial, Helvetica, sans-serif;
      border-collapse: collapse;
      white-space: normal !important;
      width: 795px;
      height: 500px;
    }
  
    #_shops_block_partial table tr td{
      border-left: none !important;
      border-right: none !important;
      border-top: none !important;
      border-bottom: 1px solid #B1BBC4;
      vertical-align: middle !important;
      text-align: left !important;
      font-size: 11px;
      padding: 3px 0;
      color: #787878;
    }
    
    #_shops_block_partial table tr td a{
      text-transform: uppercase;
      display: inline-block;
      font-size: 12px;
      color: #000;
    }
  
    #_shops_block_partial table tr td .name{
      background: url("http://catalogi.ru/css/images/icon-shop.png") no-repeat 0 50%;
      height: 25px;
      width: 34px;
    }
  </style>
  <base href="http://www.catalogi.ru/" />
</head>
<body>
  <div id="_shops_block_partial" class="notranslate catalogi_scroll">
    <table>
  <?php
  $db = new PDO(PDO_DSN, PDO_USER, PDO_PASS);
  $db->exec("SET CHARACTER SET utf8");
  $stm = $db->prepare("SELECT s.`id` as id, s.`name` as name, s.`url` as url, s.`description` as description, s.`domain_3` as domain_3, c.`name` as category_name, c.`round_icon_small` as category_img, sc.`url` as category_url FROM `shops` as s LEFT JOIN `shops_categories` as sc ON sc.`shop_id`=s.`id` LEFT JOIN `categories` as c ON c.`id`=sc.`category_id` WHERE s.`publish`=1 ORDER BY s.`order`, s.`id`, c.`order`;");
  $stm->execute();
  
  $prev_shop_id=null;
  $categories="";
  $shop_url = "";
  $site_view = "";
  
  foreach($stm->fetchAll(PDO::FETCH_OBJ) as $shop){
    // фиксируем id первого магазина
    if(!isset($prev_shop)){
      $prev_shop=$shop;
    }
  				
  
    // если попался другой магазин, то выводим предыдущий
    if($shop->id!=$prev_shop->id){
    	echo '<tr> 
    		<td width="44"><a id="'.$prev_shop->id.'" href="'.$site_view.'" target="_blank" class="shop_to_order"><div class="name"></div></a></td>
    		<td align="left"><a id="'.$prev_shop->id.'" href="'.$site_view.'" target="_blank" class="shop_to_order">'.$prev_shop->name.'</a></td>
    		<td class="categories">'.$categories.'</td> 
    		<td>'.$prev_shop->description.'</td>
    	</tr>';
    
    	$categories="";
    	$prev_shop=$shop;
    	$shop_url = "";
    	$site_view = "";
    }
  			
  	if($shop->domain_3 == 0){
  		$shop->category_url = 'http://catalogi.ru/site_view.php?url='.$shop->category_url;
  	}
  
  	// добавляем категорию
  	if($shop->category_img!=null){
  		$categories.='<a id="'.$shop->id.'" href="'.$shop->category_url.'" title="'.$shop->category_name.'" target="_blank" class="shop_to_order"><img src="http://catalogi.ru/images/icons/'.$shop->category_img.'" width="33" height="35" alt="'.$shop->category_name.'" /></a>';
  	}else{
      $categories = 'категории временно не указаны';
  	}
  				
  
  
  	$shop_url=$shop->url;
  
  	if($shop->domain_3 == 1){
  		$site_view = $shop_url;
  	}else{
  		$site_view = 'http://catalogi.ru/site_view.php?url='.$shop_url;
  	}
  }
  
  echo '<tr> 
  	<td width="44"><a id="'.$shop->id.'" href="/site_view.php?url='.$shop->url.'" target="_blank" class="shop_to_order"><div class="name"></div></a></td>
  	<td align="left" width="140"><a id="'.$shop->id.'" href="/site_view.php?url='.$shop->url.'" target="_blank" class="shop_to_order">'.$shop->name.'</a></td>
  	<td class="categories" width="240">'.$categories.'</td> 
  	<td>'.$shop->description.'</td>
  </tr>';
  
  ?>
    </table>
  </div>
  <script language="javascript">
    // Прокрутка
    $('#_shops_block_partial').jScrollPane({autoReinitialise: false});
    $('a').attr('target','_blank');
  </script>
</body>
</html>