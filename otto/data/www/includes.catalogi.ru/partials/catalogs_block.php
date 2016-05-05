<?php require_once dirname(__FILE__).'/../lib.php'; ?>
<!DOCTYPE HTML>
<html>
<head>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
  <meta name="language" content="ru" />
  <link href="http://includes.catalogi.ru/css/jquery.jscrollpane.css" rel="stylesheet" type="text/css" />
  <script src="http://code.jquery.com/jquery-latest.min.js"></script>
  <script type="text/javascript" src="http://includes.catalogi.ru/js/jquery.mousewheel.js"></script>
  <script type="text/javascript" src="http://includes.catalogi.ru/js/jquery.jscrollpane.min.js"></script>
	<title>Доставка</title>
  <style>
    #_catalog_block_partial{
      font-family: Arial, Helvetica, sans-serif;
      width: 805px;
      height: 500px;  
    }
    
    #_catalog_block_partial ul{
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    #_catalog_block_partial ul li{
      display: inline-block;
      float: none;
    }
    
    #_catalog_block_partial ul li a{
      border: 0;
    }
    
    #_catalog_block_partial ul li a img{
      display: none;
    }
    #_catalog_block_partial ul li a img:first-child{
      display: block;
    }
  
    #_catalog_block_partial ul li a[state="1"] img{
      display: block;
    }
    #_catalog_block_partial ul li a[state="1"] img:first-child{
      display: none;
    }
  
    #_catalog_block_partial ._scroll{
      overflow: hidden;
      width: 805px;
      height: 460px;
      outline: none;
    }
  
    #_catalog_block_partial ._content{
      white-space: normal !important;
    }
  
    #_catalog_block_partial ._content > div{
      display: none;
    }
  
    #_catalog_block_partial ._content .item{
      position: relative;
      display: inline-block;
      vertical-align: top;
      width: 340px;
      min-height: 113px;
      margin: 0 23px 27px 0;
      padding: 18px 16px;
      border: 1px solid #CDCDCD;
    }
  
    #_catalog_block_partial ._content .item .photo{
      float: left !important;
    }
  
    #_catalog_block_partial ._content .second{
      float: none !important;
    }
  
    #_catalog_block_partial ._content .item .inner{
      overflow: hidden;
      padding: 0 0 0 16px;
      line-height: 14px;
    }
  
    #_catalog_block_partial ._content .item .inner h3{
      margin: 0;
      font-size: 19px;
      font-weight: normal;
      line-height: 21px;
    }
  
    #_catalog_block_partial ._content .item .inner h3 a{
      text-decoration: none;
      color: #EF01A9;
    }
  
    #_catalog_block_partial ._content .item .inner h3 a:hover{
      text-decoration: underline;
    }
  
    #_catalog_block_partial ._content .item .inner p{
      margin: 0 0 5px;
      font-size: 11px;
      color: #7B7B7B;
    }
  
    #_catalog_block_partial ._content .item .inner p a{
      color: #7B7B7B;
      text-decoration: none;
    }
  
    #_catalog_block_partial ._content .item .new {
      position: absolute;
      right: 7px;
      top: 7px;
      padding: 1px 4px;
      border: 1px solid #F9C7C7;
      line-height: 13px;
      font-size: 10px;
      color: #E40102;
    }
  </style>
  <base href="http://www.catalogi.ru/" />
</head>
<body>
<div id="_catalog_block_partial" class="notranslate catalogi_scroll">
	<ul>
		<li><a href="http://www.catalogi.ru/php/catalogs.php?category_url=zhenskoj_odezhdy" title="Женская Одежда" state="1"><img src="http://www.catalogi.ru/images/site/add-nav-ladieswear.png" width="102" height="35" alt="ЖЕНСКАЯ ОДЕЖДА" /><img src="http://www.catalogi.ru/images/site/add-nav-ladieswear2.png" width="102" height="35" alt="ЖЕНСКАЯ ОДЕЖДА" /></a></li>
		<li><a href="http://www.catalogi.ru/php/catalogs.php?category_url=muzhskoj_odezhdy" title="Мужская Одежда"><img src="http://www.catalogi.ru/images/site/add-nav-menswear.png" width="103" height="35" alt="МУЖСКАЯ ОДЕЖДА" /><img src="http://www.catalogi.ru/images/site/add-nav-menswear2.png" width="103" height="35" alt="МУЖСКАЯ ОДЕЖДА" /></a></li>
		<li><a href="http://www.catalogi.ru/php/catalogs.php?category_url=detskoj_odezhdy" title="Детская Одежда"><img src="http://www.catalogi.ru/images/site/add-nav-children-wear.png" width="99" height="35" alt="ДЕТСКАЯ ОДЕЖДА" /><img src="http://www.catalogi.ru/images/site/add-nav-children--wear2.png" width="99" height="35" alt="ДЕТСКАЯ ОДЕЖДА" /></a></li>
		<li><a href="http://www.catalogi.ru/php/catalogs.php?category_url=odezhdy_bolshih_razmerov" title="Большие Размеры"><img src="http://www.catalogi.ru/images/site/add-nav-big-sizes.png" width="108" height="35" alt="БОЛЬШИЕ РАЗМЕРЫ" /><img src="http://www.catalogi.ru/images/site/add-nav-big-sizes2.png" width="108" height="35" alt="БОЛЬШИЕ РАЗМЕРЫ" /></a></li>
		<li><a href="http://www.catalogi.ru/php/catalogs.php?category_url=tovarov_dlya_doma" title="Товары Для Дома"><img src="http://www.catalogi.ru/images/site/add-nav-household-goods.png" width="108" height="35" alt="ТОВАРЫ ДЛЯ ДОМА" /><img src="http://www.catalogi.ru/images/site/add-nav-household-goods2.png" width="108" height="35" alt="ТОВАРЫ ДЛЯ ДОМА" /></a></li>
		<li><a href="http://www.catalogi.ru/php/catalogs.php?category_url=obuvi_i_aksessuarov" title="Обувь, Аксессуары"><img src="http://www.catalogi.ru/images/site/add-nav-shoes.png" width="120" height="35" alt="ОБУВЬ, АКСЕССУАРЫ" /><img src="http://www.catalogi.ru/images/site/add-nav-shoes2.png" width="120" height="35" alt="ОБУВЬ, АКСЕССУАРЫ" /></a></li>
		<li><a href="http://www.catalogi.ru/php/catalogs.php?category_url=dlya_sporta_i_otdyha" title="Для Спорта И Отдыха"><img src="http://www.catalogi.ru/images/site/add-nav-sportwear.png" width="113" height="35" alt="ДЛЯ СПОРТА И ОТДЫХА" /><img src="http://www.catalogi.ru/images/site/add-nav-sportwear2.png" width="113" height="35" alt="ДЛЯ СПОРТА И ОТДЫХА" /></a></li>
	</ul>

	<div class="_scroll">
    <div class="_content">
      <?php echo file_get_contents('http://www.catalogi.ru/php/catalogs.php?category_url=zhenskoj_odezhdy') ?>
    </div>
  </div>
</div>
  <script>
    // Прокрутка
    $('#_catalog_block_partial ._scroll').jScrollPane({autoReinitialise: false});
  
    $('#_catalog_block_partial').on('_resize_item', function(){
      // Размеры блоков
      $('#_catalog_block_partial .item:even').each(function(){
        _this = $(this);
        _next = _this.next();
        
        height_1 = _this.height(); 
        height_2 = _next.height();
        
        if(height_1 != height_2){
          if(height_1 > height_2){
            _next.height(height_1);
          }else{
            _this.height(height_2);
          }
        }
      });
    });
  
    $('#_catalog_block_partial ul li a').click(function(){
      $('#_catalog_block_partial ul li a[state="1"]').attr('state','0');
      $(this).attr('state','1');

      $('#_catalog_block_partial > ._scroll ._content').load($(this).attr('href'), function(data){
        $('#_catalog_block_partial > ._scroll ._content a').attr('target','_blank');
        $('#_catalog_block_partial').trigger('_resize_item');
        $('#_catalog_block_partial ._scroll').data('jsp').reinitialise();
        $('#_catalog_block_partial ._scroll').data('jsp').scrollToY(0);
      });

  
      return false;
    });
  
    $('#_catalog_block_partial').trigger('_resize_item');
    $('a').attr('target','_blank');
  </script>
</html>