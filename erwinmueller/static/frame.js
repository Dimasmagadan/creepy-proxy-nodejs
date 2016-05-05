function _googleTranslateElementInit(){
  new google.translate.TranslateElement({pageLanguage: 'de', includedLanguages: 'ru', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');
}

catalogi.noTranslate = function(){
  // Шапка

  // Список

  // Стр. товара
  catalogi('#preisfeld span[itemprop="price"]').addClass('notranslate');
  catalogi('#bestell_nr_oben span:eq(1)').addClass('notranslate');
  catalogi('span[itemprop="name"]').addClass('notranslate');
  catalogi('#ausw_farbe .auswahl').attr('origin', catalogi('#ausw_farbe .auswahl').text());
  catalogi('#ausw_farbe .einzel').attr('origin', catalogi('#ausw_farbe .einzel').text());
  catalogi('#ausw_groesse .auswahl').attr('origin', catalogi('#ausw_groesse .auswahl').text());
  catalogi('#ausw_groesse .einzel').attr('origin', catalogi('#ausw_groesse .einzel').text());

  // Футер
}

catalogi.parse = function(){
	// Шапка

	// Список

	// Стр. товара
  catalogi.service() //С учетом доставки

  //Переопределение функ. добавления в корзину
  window.warenkorbFunktion = function(){
    var articul = catalogi('#bestell_nr_oben span:eq(1)').text().replace(/\./g,'');
    var name    = catalogi('span[itemprop="name"]').text();
    var price   = catalogi('#preisfeld span[itemprop="price"]').text().replace(',','.');
    var color   = catalogi('#ausw_farbe .auswahl').attr('origin');
    if(!color){
      color     = catalogi('#ausw_farbe .einzel').attr('origin');
    }
    var size    = catalogi('#ausw_groesse .auswahl').attr('origin');
    if(!size){
      size      = catalogi('#ausw_groesse .einzel').attr('origin');
    }

    var count   = catalogi('#wk_menge').val();

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
}

// Скидка
catalogi.service = function(){
  if('_service' in top){
    var _price = catalogi('#preisfeld span[itemprop="price"]').text().replace(',','.').replace('€','').trim();
    if(_price != ''){
      var _delivery = parseFloat(_price)+(( parseFloat(_price)/100 )* parseFloat( top._service ));
      if( catalogi('span[itemprop="offerDetails"]').next().text() != 'С учетом доставки € '+_delivery.toFixed(2) ){
        catalogi('span[itemprop="offerDetails"]').next().text('С учетом доставки € '+_delivery.toFixed(2));
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
				//
				break
		}
		console.log(event.originalEvent.data);
	});	

	catalogi.noTranslate();
	catalogi.parse(); 
});