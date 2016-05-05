<!DOCTYPE HTML>
<html>
<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<title>Подписка</title>
  <link href="http://cdn.catalogi.ru/static/css/validationEngine.jquery.css" rel="stylesheet" type="text/css" />
  <script src="http://code.jquery.com/jquery-latest.min.js"></script>
  <script type="text/javascript" src="http://cdn.catalogi.ru/static/js/jquery.validationEngine-ru.js"></script>
  <script type="text/javascript" src="http://cdn.catalogi.ru/static/js/jquery.validationEngine.js"></script>

  <style>
    body{
      font-family: Arial,sans-serif;
    }

    .header{
      letter-spacing: 1px;
      text-align: center;
      font-weight: bold;
      font-size: 24px;
      color: #d01d21;
    }
    
    .info{
      letter-spacing: 1px;
      text-align: center;
      font-size: 14px;
      line-height: 20px;
      padding: 10px 0;
    }
    
    #logo{
      margin: 5px auto;
      display: block;
      width: 130px;
    }

    table.subscribe{
      background-color: #f5f5f3;
      color: #686868;
      width: 561px;
      margin: auto;
    }

    table.subscribe tr td{
      padding: 5px;
    }

    table.subscribe .slogan{
      font-weight: bold;
      font-size: 14px;
    }

    table.subscribe p{
      letter-spacing: 0px;
      text-align: left;
    }
    
    table.subscribe img.magazine{
      margin: -20px 0 0 0;
      display: block;
    }
    
    table.subscribe form input{
      border: 1px solid #aaa;
      padding: 5px 20px;
      margin: 5px 0;
      width: 230px;
      color: #555;
    }

    table.subscribe ul{
      font-size: 14px;
      font-weight: bold;
    }
    
    table.subscribe .footer{
      text-align: center;
      font-size: 11px;
      visibility: hidden;
    }

    a.btn{
      -webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;
      background: #efc5ca; /* Old browsers */
      background: -moz-linear-gradient(top,  #efc5ca 0%, #d24b5a 50%, #ba2737 51%, #f18e99 100%); /* FF3.6+ */
      background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#efc5ca), color-stop(50%,#d24b5a), color-stop(51%,#ba2737), color-stop(100%,#f18e99)); /* Chrome,Safari4+ */
      background: -webkit-linear-gradient(top,  #efc5ca 0%,#d24b5a 50%,#ba2737 51%,#f18e99 100%); /* Chrome10+,Safari5.1+ */
      background: -o-linear-gradient(top,  #efc5ca 0%,#d24b5a 50%,#ba2737 51%,#f18e99 100%); /* Opera 11.10+ */
      background: -ms-linear-gradient(top,  #efc5ca 0%,#d24b5a 50%,#ba2737 51%,#f18e99 100%); /* IE10+ */
      background: linear-gradient(to bottom,  #efc5ca 0%,#d24b5a 50%,#ba2737 51%,#f18e99 100%); /* W3C */
      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#efc5ca', endColorstr='#f18e99',GradientType=0 ); /* IE6-9 */
      display: inline-block;
      text-align: center;
      font-weight: bold;
      font-size: 14px;
      cursor: pointer;
      margin: 5px 0;
      padding: 5px;
      width: 130px;
      color: #fff;
    }
  </style>
  <script>
  catalogi = jQuery.noConflict(true);
  catalogi(document).ready(function(){
    catalogi('.subscribe form').validationEngine({promptPosition: 'topLeft'});
    
    catalogi('.subscribe form').submit(function(){
      var name      = catalogi('input[name="name"]').val();
      var email     = catalogi('input[name="email"]').val();
      catalogi('a#send').html('<img src="http://cdn.catalogi.ru/static/images/ajax-loader.gif" />');
      catalogi('input[name="name"]').attr('disabled','1');
      catalogi('input[name="email"]').attr('disabled','1');
      catalogi.ajax({
        type: 'POST',
        url: 'http://cdn.catalogi.ru/executable/partials/smartresponder.php',
        dataType: 'xml',
        data: {
          name: name,
          mail: email,
          group: '<?php echo $_GET['group'] ?>'
        },
        success: function(data){
          if(catalogi(data).find('error').is('error')){
            catalogi('input[name="email"]').validationEngine('showPrompt', catalogi(data).find('error').attr('message'))
          }else{
            catalogi('.subscribe form').hide();
            catalogi('#send').hide();
            catalogi('.header').html('Спасибо за Вашу регистрацию!');
            catalogi('.info').html('<b>Получите ответное письмо</b>,<br />с ссылкой для подтверждения подписки, чтобы получать новости от нас.<br />Пожалуйста, нажмите на ссылку отправленную в письме для<br />подтверждения регистрации.');
            catalogi('.subscribe .footer').css('visibility', 'visible');
          }
        },
        complete: function(){
          catalogi('a#send').html('Подписатся');
          catalogi('input[name="name"]').removeAttr('disabled');
          catalogi('input[name="email"]').removeAttr('disabled'); 
        }
      });
      return false;
    });
    catalogi('a#send').click(function(){
      catalogi('form').submit();
    });   
  });
  </script>
  <script src="http://code.jquery.com/jquery-latest.min.js"></script>
</head>

<body>
  <div class="header">Подпишитесь на нашу рассылку!</div>
  <div class="info">Каталоги.ру - зарегистрируйтесь прямо сейчас и пользуйтесь <br />нашими специальными предложениями!</div>
  <img src="http://cdn.catalogi.ru/static/images/logo.png" id="logo" />
  <table class="subscribe">
    <tr>
      <td valign="top" width="160">
        <?php if( $_GET['group'] !== 'undefined' && $_GET['group'] !== '76136' ):?><img src="/static/images/catalogs/<?php echo $_GET['group'] ?>.png" class="magazine" /><?php endif ?>
      </td>
      <td>
        <div class="slogan">Будьте первыми!</div>
        <form action="#" method="GET">
          <input type="text" id="name" name="name" placeholder="Введите Ваше имя на русском" value="" autocomplete="off" class="validate[required]"/><br />
          <input type="text" id="email" name="email" placeholder="Введите адрес электронной почты" value="" autocomplete="off" class="validate[required]"/>
        </form>
        <p>Исключительно для подписавшихся на рассылку:</p>
        <ul>
          <li>Купоны и скидки</li>
          <li>Тенденции моды и советы стилистов</li>
          <li>Самые лучшие цены - SALE</li>
        </ul>
        <a class="btn" id="send">Подписаться</a>
      </td>
    </tr>
    <tr>
      <td colspan="2">
        <div class="footer">Конечно, вы можете легко отписаться от рассылки в любое время. Ссылка отказаться от подписки, находится в конце каждого бюллетеня.</div>
      </td>
    </tr>
  </table>
</body>
</html>