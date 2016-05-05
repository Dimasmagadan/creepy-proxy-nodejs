<?php 
require_once dirname(__FILE__).'/../lib.php';
session_set_cookie_params(0, '/', 'catalogi.ru');


ob_start();
?>
<?php if(isset($_COOKIE["user"])): ?>
<style>
  #_logout_partial{
    font-family: Arial, Helvetica, sans-serif;
  }

  #_logout_partial table td{
    border: none;
  }

  #_logout_partial h2{
    text-align: center;
    margin: 0 0 15px;
    font-weight: normal;
    color: #EF0F97;
  }

  #_logout_partial p{
    text-align: center;
    font-size: 15px;
    color: #848284;
    margin: 30px 0;
  }
  
  #_logout_partial a{
    background-image: url(http://catalogi.ru/css/images/button-bg2.png);
    background-position: left top;
    background-repeat: no-repeat;
    text-decoration: none;
    text-align: center;
    line-height: 37px;
    font-size: 15px;
    cursor: pointer;
    display: block;
    margin: 0 auto;
    border: none;
    width: 229px;
    height: 37px;
    color: #333;
  }
</style>
<div id="_logout_partial" class="notranslate">
  <h2>Выход из личного кабинета</h2>
  <p>Работа с личным кабинетом была успешно завершена!</p>
  <a href="#" id="_close">Закрыть окно</a>
</div>
<script>
  catalogi('#_logout_partial #_close').click(function(){
    catalogi.colorbox.close()
  });
</script>
<?php else: ?>
<style>
  #_login_partial{
    font-family: Arial, Helvetica, sans-serif;
    width: 400px;
  }

  #_login_partial h2{
    text-align: center;
    margin: 0 0 15px;
    font-weight: normal;
    color: #EF0F97;
  }

  #_login_partial table{
    margin: 0 auto;
  }

  #_login_partial table tr td{
    border: none;
    padding: 7px;
  }

  #_login_partial p{
    text-align: center;
    font-size: 15px;
    color: #848284;
  }

  #_login_partial a{
    text-decoration: none;
    font-size: 15px;
    color: #848284;
  }

  #_login_partial input[type="text"],
  #_login_partial input[type="password"]{
    background-image: url(http://catalogi.ru/css/images/input-text-bg2.png);
    background-position: left top;
    background-repeat: no-repeat;
    text-align: center;
    line-height: 31px;
    font-size: 15px;
    color: #848284;
    border: none;
    width: 229px;
    height: 31px;
  }
  
  #_login_partial input[type="submit"]{
    background-image: url(http://catalogi.ru/css/images/button-bg2.png);
    background-position: left top;
    background-repeat: no-repeat;
    text-align: center;
    line-height: 37px;
    font-size: 12px;
    cursor: pointer;
    border: none;
    width: 229px;
    height: 37px;
  }
  
  #_login_partial label{
    font-size: 12px;
    font-weight: normal;
    color: #848284;
    display: inline;
  }


  #_forgote_partial h2{
    text-align: center;
    margin: 0 0 15px;
    font-weight: normal;
    color: #EF0F97;
  }

  #_forgote_partial p{
    text-align: center;
    font-size: 12px;
    color: #848284;
  }
</style>
<div id="_login_partial" class="notranslate">
  <h2>Авторизация</h2>
  <form action="#" method="post">
    <table border="0" cellpadding="5" cellspacing="0" align="center">
      <tr>
        <td align="center"><input type="text" value="<?php echo isset($_COOKIE["login"]) ? $_COOKIE["login"] : ''; ?>" class="validate[required]" placeholder="Код клиента"/></td>
      </tr>
      <tr>
        <td align="center"><input type="password" value="<?php echo isset($_COOKIE["password"]) ? $_COOKIE["password"] : ''; ?>" class="validate[required]" placeholder="Пароль"/></td>
      </tr>
      <tr>
        <td align="center">
          <input type="checkbox" <? if(!empty($_COOKIE["login"]) || !isset($_COOKIE["user_id"])) echo 'checked="checked"'; ?> />
          <label>Запомнить меня на этом компьюте</label>
        </td>
      </tr>
      <tr>
        <td align="center"><input type="submit" value="Вход"/></td>
      </tr>
      <tr>
        <td align="center"><a href="#" class="_forgote">Забыли пароль?</a></td>
      </tr>
    </table>
  </form>
</div>
<div style="display: none;">
  <div id="_forgote_partial" class="notranslate">
    <style>
      #_forgote_partial{
        font-family: Arial, Helvetica, sans-serif;
      }
  
      #_forgote_partial h2{
        text-align: center;
        margin: 0 0 15px;
        font-weight: normal;
        color: #EF0F97;
      }
    
      #_forgote_partial p{
        text-align: center;
        font-size: 12px;
        color: #848284;
      }
    </style>
    <h2>Восстановление пароля</h2>
    <p>Для восстановления пароля свяжитесь с менеджером по телефону:<br />+7(495) 540-49-49</p>
  </div>
</div>
<script>
  catalogi("#_login_partial form").validationEngine({promptPosition: 'topLeft', focusFirstField : false});
  
  catalogi("#_login_partial form").submit(function(){
    isValid = catalogi(this).validationEngine('validate');
    if(isValid){
      catalogi.ajax({
        url: '/header/actions/_user.php',
        type: 'post',
        data:{
          login: catalogi('#_login_partial input[type="text"]').val(),
          password: catalogi('#_login_partial input[type="password"]').val(),
          remember: catalogi('#_login_partial input[type="checkbox"]')[0].checked
        },
        success: function(data){
          if(parseInt(data)>0){
            window.location.href = '/';
          }else{
            catalogi("#_login_partial form").validationEngine('showPrompt', 'Нет такого пользователя', 'load')
          }
        },
        error: function(data){
          alert('error')
        }
      });      
    }
    return false;
  });

  catalogi('#_login_partial ._forgote').click(function(){
    catalogi.colorbox({
      inline:true,
      href: '#_forgote_partial',
      innerWidth:394,
      innerHeight:100
    });
  });
</script>
<?php endif ?>
<?php
$out = cylEncode(ob_get_contents());
ob_end_clean();
echo $out;
?>