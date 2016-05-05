catalogi = jQuery.noConflict(true);

catalogi.updatedWnd = false;
catalogi.updateCode = "";

/***
 * Методы бланка заказа
 **/
catalogi.basket = {
    // Добавление товара
    add: function(product){
        catalogi('#iframe')
            .get(0)
            .contentWindow
            .postMessage({
                action: 'add',
                product: product
            },
                'http://cdn.catalogi.ru'
            );
    },

  // Добавление комплекта товаров
  addFit: function(products){
    catalogi('#iframe').get(0).contentWindow.postMessage({action: 'addFit', products: products},'http://cdn.catalogi.ru');
  }
}

/***
 * Методы всплывающих блоков
 **/

 // Онлайн магазины
catalogi.shops = function(){
	catalogi.colorbox({
		href: 'http://cdn.catalogi.ru/executable/partials/shops_block.php',
    iframe: true,
    innerWidth: 820,
    innerHeight: 530
  });
}

// Онлайн каталоги
catalogi.catalogs = function(){
	catalogi.colorbox({
		href: 'http://cdn.catalogi.ru/executable/partials/catalogs_block.php',
    iframe: true,
    innerWidth: 820,
    innerHeight: 530
  });
}

// Доставка
catalogi.delivery = function(){
	catalogi.colorbox({
		href: 'http://cdn.catalogi.ru/executable/pages/_delivery.html',
    iframe: true,
    initialWidth: 190,
    initialHeight: 200,
    innerWidth: catalogi(document).width() > 300 ? 410 : 200,
    innerHeight: 250
  });
}

// Оплата
catalogi.payment = function(){
	catalogi.colorbox({
		href: 'http://cdn.catalogi.ru/executable/pages/_payment.html',
    iframe: true,
    initialWidth: 190,
    initialHeight: 200,
    innerWidth: catalogi(document).width() > 300 ? 410 : 200,
    innerHeight: 250
  });
}

// Таблица размеров
catalogi.sizeTable = function(){
	catalogi.colorbox({
		href: 'http://cdn.catalogi.ru/executable/pages/_size_table.html',
    iframe: true,
    innerWidth: 780,
    innerHeight: 520,
  });
}

// Бланк заказа
catalogi.order = function(){
	catalogi.colorbox({
		href: 'http://cdn.catalogi.ru/executable/partials/order/order.php',
		iframe: true,
    initialWidth: 190,
    initialHeight: 250,
    innerWidth: window.innerWidth < 480 ? 190 : 910,
    innerHeight: 470
  });
}

// Авторизация
catalogi.login = function(){
	catalogi.colorbox({
		href: 'http://cdn.catalogi.ru/executable/partials/user/login.php',
    iframe: true,
    initialWidth: 190,
    initialHeight: 200,
    innerWidth:410,
    innerHeight:325
  });
}

// Выход
catalogi.logout = function(){
	catalogi.colorbox({
		href: 'http://cdn.catalogi.ru/executable/partials/user/logout.php',
    iframe: true,
    initialWidth: 190,
    initialHeight: 200,
    innerWidth:410,
    innerHeight:190,
    onCleanup: function(){
      window.location.href = 'http://cdn.catalogi.ru/executable/actions/_user.php';
    }
  });
}

// Подписка
catalogi.subscribe = function(checkCookie, group){
  console.log(catalogi.cookie('_subscribe'));
  if(!catalogi.cookie('_subscribe') || checkCookie){
    setTimeout(function(){
      catalogi.cookie('_subscribe', '1', {path: '/'});
      catalogi.colorbox({
        iframe: true,
        href: 'http://cdn.catalogi.ru/executable/partials/subscribe.php?group='+group,
        innerWidth: 580,
        innerHeight: 480
      });      
    },1000);
  }
};

catalogi(function(){

	/***
	 * Обработка команд с ifame
	 **/
	catalogi(window).on('message', function(event){
		switch(event.originalEvent.data.action){
      
      /***
       * Внешнии операции
       **/
      case 'colorboxClose':
        catalogi.colorbox.close();
        break

      case 'usernoiseClose':
        usernoiseButton.button.hideWindow();
        break

      case 'location':
        window.location.href = event.originalEvent.data.url;
        break

      // Запрос на обновление количиства товаров в бланке заказа
      case 'count':
        catalogi('#iframe').get(0).contentWindow.postMessage({action: 'count'},'http://cdn.catalogi.ru');
        break

      /***
       * Установка внешних параметров
       **/
      case '_service':
        window._service = event.originalEvent.data._service;
        catalogi.service();
        break

      case '_skiptranslate':
        if(event.originalEvent.data._skiptranslate == '1'){ catalogi('head').append('<link href="http://cdn.catalogi.ru/static/css/skiptranslate.css" rel="stylesheet" type="text/css" />') }
        break

      case '_auth':
        window._auth = event.originalEvent.data._auth;
        break


      /***
       * Команды всплывающих блоков
       **/
			case 'shops':
				catalogi.shops();
				break

			case 'catalogs':
				catalogi.catalogs();
				break

			case 'delivery':
				catalogi.delivery();
				break

			case 'payment':
				catalogi.payment();
				break

			case 'sizeTable':
				catalogi.sizeTable();
				break

			case 'basket':
				catalogi.order();
				break

			case 'login':
				catalogi.login();
				break

			case 'logout':
				catalogi.logout();
				break
		}
    console.log(event.originalEvent.data);
  });
});


// Обраотка фокуса стр.
catalogi(window).focus(function(){
	if(catalogi.updatedWnd){
	  return;
	}

	catalogi.updatedWnd = true;

  if(catalogi.cookie("isAuth") == 'true' && '_auth' in window && !_auth){
    window.location.reload(true);
  }

  if(catalogi.cookie("isAuth") == 'false' && '_auth' in window && _auth){
    window.location.reload(true);
  }

  if(catalogi.updateCode!=catalogi.cookie("updateCode")){
    catalogi.updateCode = catalogi.cookie("updateCode");
    catalogi('#iframe').get(0).contentWindow.postMessage({action: 'count'},'http://cdn.catalogi.ru');
    if(catalogi('iframe.cboxIframe').is('iframe')){
      catalogi('iframe.cboxIframe').get(0).contentWindow.postMessage({action: 'update'},'http://cdn.catalogi.ru');
    }
  }
});

catalogi(window).blur(function(){
	if(!catalogi.updatedWnd){
	  return;
	}

	catalogi.updatedWnd = false;
});