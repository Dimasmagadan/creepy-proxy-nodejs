function _googleTranslateElementInit(){
	catalogi.noTranslate();
  new google.translate.TranslateElement({pageLanguage: 'de', includedLanguages: 'ru', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');
}

catalogi.noTranslate = function(){
  // Шапка
 
  // Список

  // Стр. товара
  if(catalogi('.product-article-order-number').is('span')){
  	var hash = catalogi('.product-article-order-number').attr('id').replace('productArticleOrderNumber','');

  	catalogi('#productComponentForm'+hash+'_21 option').each(function(){
  		catalogi(this).attr('origin', catalogi(this).text());
  	});

  	catalogi('#productComponentForm'+hash+'_2321 option').each(function(){
  		catalogi(this).attr('origin', catalogi(this).text());
  	});
  	catalogi('#productComponentForm'+hash+'_2321').attr('origin', catalogi('#productComponentForm'+hash+'_2321').text());
  }
  catalogi('.productname').attr('origin', catalogi('.productname').text().trim());

  catalogi('.product-title-header').each(function(){
  	catalogi(this).attr('origin', catalogi(this).text().trim());
  });
  if('twoForOneFirstUid' in window){
  	catalogi('#productForm_'+twoForOneFirstUid+' option').each(function(){
  		catalogi(this).attr('origin', catalogi(this).text());
  	});
  }

  // Футер
}

catalogi.parse = function(){
	// Шапка
	catalogi('a[href="/Teaservideo.7440.0.html?TB_iframe=true&width=954&height=500&outerCloseButton=true&position=3x160"]').attr('href', 'http://www.babista.de/Teaservideo.7440.0.html?TB_iframe=true&width=954&height=500&outerCloseButton=true&position=3x160');

	catalogi('a[title="Beratung"]').attr('href', 'http://catalogi.ru/katalog_babista/').text('Каталог');
	catalogi('a[title="Beratung"]').next().remove();

	catalogi('a[href="/Newsletter.6021.0.html"]').click(function(){
		catalogi.subscribe(true, '48272');
		return false;
	}).attr('href', '#');
	catalogi('a[href="/Katalog.a1284.0.html"]').attr('href', 'http://catalogi.ru/katalog_babista/');

	// Список

	// Стр. товара
	catalogi('.sizeconsultant').click(function(){
		jQuery('.sizeconsultant').unbind('click');
		catalogi.sizeTable();
		return false;
	}).text('Таблица размеров');

	if(catalogi('.product-article-order-number').is('span')){
		var hash = catalogi('.product-article-order-number').attr('id').replace('productArticleOrderNumber','');

		// С учетом доставки
		catalogi('#productPrice'+hash).bind('DOMNodeInserted', function(e){
			catalogi.service();
		})

		
		// Переопределеиня метода добавления в корзину
		catalogi('#productAddToBasket'+hash).attr('onclick', '_productAddToBasket()');
		window._productAddToBasket = function(){
			var articul = catalogi('.product-article-order-number').text();
			var name 		= catalogi('.productname').attr('origin');
			var price 	= catalogi('#productPrice'+hash).text().replace('€','').replace(',','.').trim();
			var size 		= catalogi('#productComponentForm'+hash+'_21 option:selected').attr('origin');
			var color 	= catalogi('#productComponentForm'+hash+'_2321 option:selected').attr('origin') || catalogi('#productComponentForm'+hash+'_2321').attr('origin');

			var param   = [];

	    if(size !== ''){
	      param.push(size);
	    }

			if(color !== ''){
	      param.push(color);
	    }

	    catalogi.basket.add({
	      catalog: 'BB',
	      articul: articul,
	      name: name,
	      size: param.join(' '),
	      price: price,
	      count: 1
	    });
		}		
	}

	// Отмена исходных функций
	window.emos_ecEvent = function(){};
	window.setCookieAvailTrackingCode = function(){};
	window.setCookieAvailSearchstring = function(){};

	// Переопределения метода добавление комплекта
	window.twoForOneComponentAddToBasketSubmit = function(a,b){
		var Uids = [twoForOneFirstUid, twoForOneSecondUid];
		var Ids = [twoForOneFirstId, twoForOneSecondId];
		var products = [];
		catalogi('#productForm_'+a+' .product_detail').each(function(index, obj){
			var hash = '_'+Uids[index]+'_'+Ids[index];
			var articul = dataLayer[3].ProduktID;
			var name 		= '[2 по цене 1] - '+catalogi(this).find('.product-title-header').attr('origin');
			var price 	= dataLayer[4].Produktpreis;
			var size 		= catalogi(this).find('#productComponentForm'+hash+'_21 option:selected').attr('origin');
			var color 	= catalogi(this).find('#productComponentForm'+hash+'_2321 option:selected').attr('origin') || catalogi('#productComponentForm'+hash+'_2321').attr('origin');

			var param   = [];

	    if(size !== ''){
	      param.push(size);
	    }

			if(color !== ''){
	      param.push(color);
	    }

	    products.push({
	      catalog: 'BB',
	      articul: articul,
	      name: name,
	      size: param.join(' '),
	      price: price,
	      count: 1
	    });

		});

		catalogi.basket.addFit(products);
	}

	// Футер

	// Отображение body
  	catalogi('body').css('visibility', 'visible');

	// Подписка
	catalogi.subscribe(false, '48272');
}

// Скидка
catalogi.service = function(){
	if(catalogi('.product-article-order-number').is('span') && '_service' in window){
		var hash = catalogi('.product-article-order-number').attr('id').replace('productArticleOrderNumber','');
		var _price 	= catalogi('#productPrice'+hash).text().replace('€','').replace(',','.').trim();
		var _delivery = parseFloat(_price)+(( parseFloat(_price)/100 )* parseFloat( _service ));
    if( catalogi('.pricebox > p').text() != 'С учетом доставки € '+_delivery.toFixed(2) ){
      catalogi('.pricebox > p').text('С учетом доставки € '+_delivery.toFixed(2));
    }
	}
}

catalogi(function(){
	/***
	 * Обработка команд с ifame
	 **/
	catalogi(window).on('message', function(event){
		switch(event.originalEvent.data.action){
			case 'search':
				catalogi('#searchterm').val(event.originalEvent.data.search).parent().submit();
				break
		}
		console.log(event.originalEvent.data);
	});	

	catalogi.noTranslate();
	catalogi.parse(); 
});