<html>
<head>
  <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
  <meta name="language" content="ru" />
  <link href="http://cdn.catalogi.ru/static/css/jquery.jscrollpane.css" rel="stylesheet" type="text/css" />
  <link href="http://cdn.catalogi.ru/static/css/validationEngine.jquery.css" rel="stylesheet" type="text/css" />
  <link href="login.css" rel="stylesheet" type="text/css" />
  <script src="http://code.jquery.com/jquery-latest.min.js"></script>
  <script type="text/javascript" src="http://cdn.catalogi.ru/static/js/jquery.mousewheel.js"></script>
  <script type="text/javascript" src="http://cdn.catalogi.ru/static/js/jquery.jscrollpane.min.js"></script>
  <script type="text/javascript" src="http://cdn.catalogi.ru/static/js/jquery.validationEngine-ru.js"></script>
  <script type="text/javascript" src="http://cdn.catalogi.ru/static/js/jquery.validationEngine.js"></script>
  <script type="text/javascript" src="login.js"></script>
  <title>Авторизация</title>
</head>
<body>
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
          <td align="center">
            <a href="#" class="_forgote">Забыли пароль?</a>
            <div class="info">
              Регистрация новых клиентов происходит автоматически<br />при оформлении заказа
            </div>
          </td>
        </tr>
      </table>
    </form>
  </div>
  <div style="display: none;">
    <div id="_forgote_partial" class="notranslate">
      <h2>Восстановление пароля</h2>
      <p>Для восстановления пароля свяжитесь с менеджером по телефону:<br>+7(495) 540-49-49</p>
    </div>
  </div>
</body>
</html>