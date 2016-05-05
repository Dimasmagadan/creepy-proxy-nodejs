function _googleTranslateElementInit(){
  console.log('test');
  new google.translate.TranslateElement({pageLanguage: 'de', includedLanguages: 'ru', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');
}

catalogi.noTranslate = function(){
  // Шапка

 
  // Список

  // Стр. товара
  catalogi('.price-box').addClass('notranslate')
  catalogi('.product-name h1').attr('origin', catalogi('.product-name h1').text());
  catalogi('#product_addtocart_form option').each(function(index, el){
    catalogi(this).attr('origin', catalogi(this).text());
  });

  // Футер
}

catalogi.parse = function(){
	  //Замена сылок
  setInterval(function(){
    catalogi('a').each(function(index, el){
      if(catalogi(this).is('[href]')){
        catalogi(this).attr('href', catalogi(this).attr('href').replace('de.bonaparteshop.com', 'bonaparte.catalogi.ru'));
      }
    });    
  },1000);

	// Шапка
	catalogi('.header').prepend(catalogi('#iframe'));

	catalogi('.follow-box li > a:eq(0)').attr('href','https://www.facebook.com/Catalogi.ru');
  catalogi('.follow-box li > a:eq(1)').attr('href','http://www.youtube.com/user/CatalogiRU');
  catalogi('.follow-box li > a:eq(2)').attr('href','http://vk.com/catalogi_ru');
  catalogi('.follow-box li > a:eq(3)').attr('href','https://twitter.com/Catalogi_ru');

  if(catalogi('#newsletter-validate-detail').is('form')){
    catalogi('#newsletter-validate-detail input').remove();

    catalogi('<input id="username" class="form-control required-entry" type="text" name="name" />').insertBefore('#newsletter-validate-detail button[type="submit"]');
    catalogi('<input id="newsletter" class="form-control required-entry validate-email" type="text" name="email" />').insertBefore('#newsletter-validate-detail button[type="submit"]');
    
    new Varien.searchForm('newsletter-validate-detail', 'username', 'Введите Ваше имя на русском');
    new Varien.searchForm('newsletter-validate-detail', 'newsletter', 'Введите адрес эл. почты');

    catalogi('#newsletter-validate-detail').submit(function(event){
      var name      = catalogi('#newsletter-validate-detail input[name="name"]').val();
      var email     = catalogi('#newsletter-validate-detail input[name="email"]').val();
      catalogi('#newsletter-validate-detail input[name="name"]').attr('disabled','1');
      catalogi('#newsletter-validate-detail input[name="email"]').attr('disabled','1');
      catalogi('#newsletter-validate-detail button[type="submit"]').attr('disabled','1');

      catalogi.ajax({
        type: 'POST',
        url: 'http://includes.catalogi.ru/new/partials/smartresponder.php',
        dataType: 'xml',
        data: {
          name: 	name,
          mail: 	email,
          group: '35132'
        },
        success: function(data){
          if(catalogi(data).find('error').is('error')){
            catalogi('#newsletter-validate-detail').prev().html(catalogi(data).find('error').attr('message'));
          }else{
            catalogi('#newsletter-validate-detail').prev().html('Спасибо за Вашу регистрацию!');
          }
        },
        complete: function(){
          catalogi('#newsletter-validate-detail input[name="name"]').removeAttr('disabled');
          catalogi('#newsletter-validate-detail input[name="email"]').removeAttr('disabled');
          catalogi('#newsletter-validate-detail button[type="submit"]').removeAttr('disabled');
        }
      });
      return false;
    });
  };

  catalogi('a[href="http://bonaparte.catalogi.ru/checkout/cart/"]')
  .attr('href','#')
  .removeAttr('title')
  .click(function(event){
		catalogi.order()
		return false;
	});

	// Список


	// Стр. товара

	catalogi('h3:contains("ÜBER BON\'A PARTE")').parent().remove();
  catalogi('h3:contains("KUNDENBETREUUNG")').parent().remove();


	catalogi('#size-ajax a')
	.removeAttr('onclick')
	.click(function(event){
		catalogi.sizeTable();
		return false;
	});

	catalogi('#shopping .price-box .price:eq(0)').bind('DOMNodeInserted', function(e){
    // стоимость с учетом доставки
    catalogi.service();
  });

  // Переопределение метода добавления в корзину
  if('productAddToCartForm' in window){
    productAddToCartForm.submit = function(button, url){
      if (this.validator.validate()){
        var colorReg  = new RegExp('(.*?) - (\\d+)',["i"]);
        var sizeReg   = new RegExp('(.*?) - .*? - ([+-]?\\d*\\.\\d+)(?![-+0-9\\.])',["i"]);

        var colorStr  = catalogi('#cross_select option:selected').attr('origin') || catalogi('input.emulate-select.color-disable').val();
        var sizeStr   = catalogi('option[value="'+catalogi('[name="super_attribute[506]"]').val()+'"]').attr('origin').replace(',','.');

        var colorArr  = colorReg.exec(colorStr);
        var sizeArr   = sizeReg.exec(sizeStr);

        if( colorArr != null && sizeArr != null ){
          //var articul = colorArr[2];
          var articul = catalogi('span[itemprop="identifier"]').text();
          var name    = catalogi('.product-name h1').attr('origin');
          var price   = sizeArr[2]
          var color   = colorArr[1];
          var size    = sizeArr[1];

          var param   = [];

          if(color && color != ''){
            param.push(color)
          }

          if(size && size != '' && size != 'One size'){
            param.push(size)
          }

          catalogi.basket.add({
            catalog: 'BP',
            articul: articul,
            name: name,
            price: price,
            size: param.length > 0 ? param.join(' ') : '0',
            count: 1,
            img: catalogi('.MagicZoomPlus > img').attr('src')
          });
        }
      }
    }
  }

	// Футер

	// Отображение body
  	catalogi('body').css('visibility', 'visible');

	// Подписка
	catalogi.subscribe(false, '35132');
}

// Скидка
catalogi.service = function(){
	if('_service' in window && catalogi('#shopping .price-box .price:eq(0)').is('span')){

    if(!catalogi('#_delivery').is('span')){
      catalogi('<span id="_delivery" class="notranslate"></span>').insertAfter(catalogi('.price-box .price:eq(0)').parents('.price-box'));
    }

    var _price = catalogi('.price-box .price:eq(0)').text().replace(',','.').replace('€','').trim();
    if(_price != ''){
      var _delivery = parseFloat(_price)+(( parseFloat(_price)/100 )* parseFloat( _service ));
      if( catalogi('#_delivery').text() != 'С учетом доставки € '+_delivery.toFixed(2) ){
        catalogi('#_delivery').text('С учетом доставки € '+_delivery.toFixed(2));
      }
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
				catalogi('#search').val(event.originalEvent.data.search).parents('form').submit();
				break
		}
		console.log(event.originalEvent.data);
	});	

	catalogi.noTranslate();
	catalogi.parse(); 
});