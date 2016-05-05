function _googleTranslateElementInit(){
  catalogi.noTranslate();
  new google.translate.TranslateElement({pageLanguage: 'de', includedLanguages: 'ru', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');
}

catalogi.noTranslate = function(){
  // Шапка

  // Список

  // Стр. товара
  catalogi('.artikel_bezeichnung').addClass('notranslate');
  catalogi('#hide_select_farbe #select_artikel option').each(function(el, index){
    catalogi(this).attr('origin', catalogi(this).text());
  });

  catalogi('#hide_select_groesse #select_artikel option').each(function(el, index){
    catalogi(this).attr('origin', catalogi(this).text());
  });

  // Футер
}

catalogi.parse = function(){
	// Шапка
  catalogi('#warenkorb > a').each(function(){
    $(this).attr('href','#')
    .click(function(){
      catalogi.order();
    });
  });


	// Список

	// Стр. товара
  catalogi('#aj_wk_art_az').text('');
  catalogi.service() //С учетом доставки

  //Переопределение функ. добавления в корзину
  window.warenkorbFunktion = function(){
    var articul = catalogi('#artikel_bestellnummer .option_field').text().replace(/ /g,'');
    var name    = catalogi('.artikel_bezeichnung').text();
    var price   = catalogi('span[itemprop="price"]').text().replace(',','.');
    var color   = catalogi('#hide_select_farbe #select_artikel option:selected').attr('origin');
    var size    = catalogi('#hide_select_groesse #select_artikel option:selected').attr('origin');
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
  if('_service' in window){
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
	catalogi.noTranslate();
	catalogi.parse(); 
});