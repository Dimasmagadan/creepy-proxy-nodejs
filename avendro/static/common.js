function _googleTranslateElementInit(){
    new google.translate.TranslateElement({pageLanguage: 'de', includedLanguages: 'ru', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');
}


catalogi.noTranslate = function(){
    //// Шапка
    //catalogi("a:contains('Marken')").parent().next('ul').addClass('notranslate');
    //catalogi("a:contains('Marken')").parents('ul.flyOutCategory').find('li > a').each(function(){
    //  if(!catalogi(this).is('.headline') && catalogi(this).is('.more')){
    //    catalogi(this).addClass('notranslate');
    //  }
    //});
    //
    //catalogi("a:contains('Бренды')").parent().next('ul').addClass('notranslate');
    //catalogi("a:contains('Бренды')").parents('ul.flyOutCategory').find('li > a').each(function(){
    //  if(!catalogi(this).is('.headline') && !catalogi(this).is('.more')){
    //    catalogi(this).addClass('notranslate');
    //  }
    //});
    //
    //// Перевод пунктов меню
    //
    //if(!catalogi(".js_shortname:eq(0)").hasClass('notranslate')){catalogi(".js_shortname:eq(0)").addClass('notranslate').text('Новинки')};
    //if(!catalogi(".js_shortname:eq(1)").hasClass('notranslate')){catalogi(".js_shortname:eq(1)").addClass('notranslate').text('Женщинам')};
    //if(!catalogi(".js_shortname:eq(2)").hasClass('notranslate')){catalogi(".js_shortname:eq(2)").addClass('notranslate').text('Мужчинам')};
    //if(!catalogi(".js_shortname:eq(3)").hasClass('notranslate')){catalogi(".js_shortname:eq(3)").addClass('notranslate').text('Детям')};
    //if(!catalogi(".js_shortname:eq(4)").hasClass('notranslate')){catalogi(".js_shortname:eq(4)").addClass('notranslate').text('Белье и купальники')};
    //if(!catalogi(".js_shortname:eq(5)").hasClass('notranslate')){catalogi(".js_shortname:eq(5)").addClass('notranslate').text('Спорт')};
    //if(!catalogi(".js_shortname:eq(6)").hasClass('notranslate')){catalogi(".js_shortname:eq(6)").addClass('notranslate').text('Обувь')};
    //if(!catalogi(".js_shortname:eq(7)").hasClass('notranslate')){catalogi(".js_shortname:eq(7)").addClass('notranslate').text('Большие размеры')};
    //if(!catalogi(".js_shortname:eq(8)").hasClass('notranslate')){catalogi(".js_shortname:eq(8)").addClass('notranslate').text('Мультимедиа')};
    //if(!catalogi(".js_shortname:eq(9)").hasClass('notranslate')){catalogi(".js_shortname:eq(9)").addClass('notranslate').text('Товары для дома')};
    //if(!catalogi(".js_shortname:eq(10)").hasClass('notranslate')){catalogi(".js_shortname:eq(10)").addClass('notranslate').text('Мебель')};
    //if(!catalogi(".js_shortname:eq(11)").hasClass('notranslate')){catalogi(".js_shortname:eq(11)").addClass('notranslate').text('Текстиль')};
    //if(!catalogi(".js_shortname:eq(12)").hasClass('notranslate')){catalogi(".js_shortname:eq(12)").addClass('notranslate').text('Инструмент')};
    //if(!catalogi(".js_shortname:eq(13)").hasClass('notranslate')){catalogi(".js_shortname:eq(13)").addClass('notranslate').text('Игрушки')};
    //if(!catalogi(".js_shortname:eq(14)").hasClass('notranslate')){catalogi(".js_shortname:eq(14)").addClass('notranslate').text('Красота')};
    //if(!catalogi(".js_shortname:eq(15)").hasClass('notranslate')){catalogi(".js_shortname:eq(15)").addClass('notranslate').text('Бренды')};
    //if(!catalogi(".js_shortname:eq(16)").hasClass('notranslate')){catalogi(".js_shortname:eq(16)").addClass('notranslate').text('Sale')};
    //
    //// Список
    //catalogi('a[href="#Marke"]').parents('div.c_expanderGroup').find('div:last-child').addClass('notranslate');
    //catalogi('span.brand').addClass('notranslate');
    //
    //// Стр. товара
    //
    //// Футер
};

catalogi.parse = function(){
    // Шапка
    //catalogi('header').prepend(catalogi('#_head'));
  //
  //
  //// Список
  //
  //// Стр. товара
  //catalogi('a[data-tracking-event="sizeTable.show"]')
  //.attr('href','http://includes.catalogi.ru/pages/_size_table.html')
  //.colorbox({
  //  iframe: true,
  //  innerWidth: 780,
  //  innerHeight: 520
  //}).text('Таблица размеров');
  //
  //// Футер
  //
  //setInterval(function(){
  //  catalogi('span.soldout:contains("ausverkauft")').parent('td').addClass('notranslate');
  //  catalogi('span.available:contains("lieferbar")').text('В наличии');
  //  catalogi('span.delayed:contains("längere Lieferzeit")').text('Ожидается');
  //  catalogi('span.soldout:contains("ausverkauft")').text('Распродано');
  //  catalogi.noTranslate();
  //
  //  var _price = catalogi('span[itemprop="price"]').text().replace(',','.').trim();
  //  if(_price != ''){
  //    var _delivery = parseFloat(_price)+(( parseFloat(_price)/100 )* parseFloat(catalogi('#_head').attr('service')));
  //    if(!catalogi('.installments').is('div')){
  //      catalogi('<div class="installments"><div>').insertAfter(catalogi('span[itemprop="price"]').parent());
  //    }
  //
  //    if( catalogi('.installments').text() != 'С учетом доставки € '+_delivery.toFixed(2) ){
  //      catalogi('.installments').text('С учетом доставки € '+_delivery.toFixed(2));
  //    }
  //  }
  //}, 100);
  //
  //catalogi('#addToBasket').click(function(){
  //  var param = [];
  //  var variation = product.products[catalogi('meta[itemprop="sku"]').attr('content')].variations[catalogi('#js_variationId').val()];
  //  for(var key in variation.dimensions.dimension){
  //    for(var div in variation.dimensions.dimension[key]){
  //      param.push(variation.dimensions.dimension[key][div].value);
  //    }
  //  }
  //
  //  if(param.length == 0){
  //    param.push('0');
  //  }
  //
  //  var articul = product.products[catalogi('meta[itemprop="sku"]').attr('content')].variations[catalogi('#js_variationId').val()].articleNumberWithPromotion;
  //  var name    = product.products[catalogi('meta[itemprop="sku"]').attr('content')].variations[catalogi('#js_variationId').val()].name;
  //  var price   = catalogi('span[itemprop="price"]').text().replace(',','.').trim();
  //  var count   = catalogi('#quantity').val();
  //  var img     = catalogi('#mainProductImage').attr('src');
  //  catalogi.basket.add({
  //    catalog: 'OT',
  //    articul: articul,
  //    name: name,
  //    size: param.join(' '),
  //    price: price,
  //    count: count,
  //    img: img
  //  });
  //
  //  return false;
  //});

  //catalogi.noTranslate();
  //catalogi('body').css('visibility', 'visible');
  //catalogi.subscribe();
};

// Скидка
catalogi.service = function(){
    //if('_service' in window){
    //    var _price = catalogi('.priceContent > span:eq(0)').text().replace(',','.').replace('EUR','').trim();
    //    if(_price != ''){
    //        catalogi('.shipping').remove();
    //        catalogi('<span />', {"class": 'shipping'}).insertAfter( ".priceContent" );
    //
    //        var _delivery = parseFloat(_price)+(( parseFloat(_price)/100 )* parseFloat( _service ));
    //        if( catalogi('.shipping').text() != 'С учетом доставки € '+_delivery.toFixed(2) ){
    //            catalogi('.shipping').text('С учетом доставки € '+_delivery.toFixed(2));
    //        }
    //    }
    //}
};

catalogi(document).ready(function(){
    var re = /(?:[\s.])([a-z0-9][a-z0-9-]+[a-z0-9])(?:[.\s])/;
    var str = window.location.hostname;
    var m;

    if ((m = re.exec(str)) !== null) {
        if (m.index === re.lastIndex) {
            re.lastIndex++;
        }
        var currentDomain = m[0].replace('.','').replace('.','');
    }

    catalogi(window).on('message', function(event) {
        switch (event.originalEvent.data.action) {
            case 'search':
                var goingto = "http://www." + currentDomain + ".catalogi.ru/suche/";
                goingto = goingto + event.originalEvent.data.search.toLowerCase().replace(' ', '+');
                window.location = goingto;
                break
        }
        console.log(event.originalEvent.data);
    });

    catalogi.noTranslate();
    catalogi.parse();
});