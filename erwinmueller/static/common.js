function _googleTranslateElementInit(){
  new google.translate.TranslateElement({pageLanguage: 'de', includedLanguages: 'ru', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');
}

catalogi.noTranslate = function(){
  // Шапка
  //catalogi('#nav').addClass('notranslate');
  catalogi('#dropdown_19000').addClass('notranslate');
  catalogi('#nav_16000').addClass('notranslate');
  catalogi('#nav_45000').addClass('notranslate');
  catalogi('#nav_55000').addClass('notranslate');
  catalogi('#FILTER_SEL_MARKE_UL').addClass('notranslate');
 
  // Список
  catalogi('#art_info_artikelnummer').addClass('notranslate');
  catalogi('#art_info_artikelnummer > div').addClass('translate');

  catalogi('#katArtikelbezeichnung').bind('DOMNodeInserted', function(e){
    if(!catalogi('#katArtikelbezeichnung').is('[origin]')){
      catalogi('#katArtikelbezeichnung').attr('origin', catalogi('#katArtikelbezeichnung').text());
    }
  });

  // Стр. товара
  catalogi('#preisfeld span[itemprop="price"]').addClass('notranslate');
  catalogi('#bestell_nr_oben span:eq(1)').addClass('notranslate');
  catalogi('span[itemprop="name"]').addClass('notranslate');
  catalogi('#details > span:eq(1)').attr('origin',catalogi('#details > span:eq(1)').text());
  catalogi('#select_farbe > .auswahl').attr('origin', catalogi('#select_farbe > .auswahl').text() );

  // Футер
}

catalogi.parse = function(){
	// Шапка
  catalogi('#head_bg').append(catalogi('#iframe'));
  catalogi('#navibalken').append('<div style="float:left;padding:0px 0px 0px 40px;"><a href="/shop/service-DE-de-EM/service/_onlinekat/"><img src="http://includes.catalogi.ru/cat/erwinmueller/katalogs.png" border="0"></a></div>');
  catalogi('#navi_left > .service_shops_inaktiv').append('<div style="float:left;padding:0px 0px 0px 40px;"><a href="/shop/service-DE-de-EM/service/_onlinekat/"><img src="http://includes.catalogi.ru/cat/erwinmueller/katalogs.png" border="0"></a></div>');
  catalogi('a[href="http://erwinmueller.catalogi.ru/shop/newsletter-DE-de-EM/add/"], a[href="http://kueche-erwinmueller.catalogi.ru/shop/newsletter-DE-de-TK/add/"], a[href="http://kinder-erwinmueller.catalogi.ru/shop/newsletter-DE-de-KI/add/"]')
  .attr('href','#')
  .click(function(){
    catalogi.subscribe(true, '76922');
    return false;
  });

	// Список

	// Стр. товара
  catalogi('#top-bewertung > .top-button-links > div').parents('#top-bewertung').hide();

  //Переопределение функ. добавления в корзину
  window.warenkorbFunktion = function(){
    if(catalogi('#katArtAnsicht').is('div')){
      var articul = '099'+catalogi('#katArtikelnummer').text();
      var name    = catalogi('#katArtikelbezeichnung').attr('origin');
      var price   = catalogi('#katArtikelpreis').text().replace(',','.');
      var color   = catalogi('#katArtikelausfuehrungen').val();
      var size    = catalogi('#katArtikelgroessen').val();
      var count   = catalogi('#warenkorbMengeDazu').val();   
    }else{
      var articul = catalogi('#bestell_nr_oben span:eq(1)').text().replace(/\./g,'');
      var name    = catalogi('span[itemprop="name"]').text();
      var price   = catalogi('#preisfeld span[itemprop="price"]').text().replace(',','.');
      var color   = catalogi('#select_farbe > .auswahl').attr('origin');
      var size    = catalogi('#details > span:eq(1)').attr('origin');
      var count   = catalogi('#wk_menge').val();
    }

    var param   = [];

    if(color && color != ''){
      param.push(color)
    }

    if(size && size != ''){
      param.push(size)
    }

    catalogi.basket.add({
      catalog: 'ER',
      articul: articul,
      size: param.length > 0 ? param.join(' ') : '0',
      price: price,
      name: name,
      count: count
    });
  }

	// Футер

	// Отображение body
  	catalogi('body').css('visibility', 'visible');

	// Подписка
	catalogi.subscribe(false, '76922');
}

// Скидка
catalogi.service = function(){
	if('_service' in window){
    var _price = catalogi('#preisfeld span[itemprop="price"]').text().replace(',','.').replace('€','').trim();
    if(_price != ''){
      var _delivery = parseFloat(_price)+(( parseFloat(_price)/100 )* parseFloat( _service ));
      if( catalogi('#ajax-popup').text() != 'С учетом доставки € '+_delivery.toFixed(2) ){
        catalogi('#ajax-popup').text('С учетом доставки € '+_delivery.toFixed(2));
      }
    }
	}
}


catalogi(function(){
  dynPopup = function(){};

	/***
	 * Обработка команд с ifame
	 **/
	catalogi(window).on('message', function(event){
		switch(event.originalEvent.data.action){
			case 'search':
				catalogi('#q').val(event.originalEvent.data.search).parents('form').submit();
				break
		}
		console.log(event.originalEvent.data);
	});	

	catalogi.noTranslate();
	catalogi.parse(); 
});