function _googleTranslateElementInit(){
  catalogi.noTranslate();
  new google.translate.TranslateElement({pageLanguage: 'de', includedLanguages: 'ru', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');
}

catalogi.noTranslate = function(){
  // Шапка

  // Список

  // Стр. товара
  catalogi('.m_produktHeadWrap h4').attr('origin', catalogi('.m_produktHeadWrap h4').text());

  // Футер
}

catalogi.parse = function(){
  catalogi('#un-button').text('Связаться с нами');

  // Шапка
  // catalogi('#header').prepend(catalogi('#_head'));
  catalogi('#contextMenu ul li:eq(0) a').attr('href', 'http://catalogi.ru/');
  catalogi('#contextMenu ul li:eq(2) a').attr('href', 'http://catalogi.ru/internet_magaziny/').text('Онлайн магазины');
  if( catalogi.cookie('user') ){
    catalogi('#contextMenu ul li:eq(3) a').attr('href', 'http://catalogi.ru/cabinet/').text('Личный кабинет');
  }else{
    catalogi('#contextMenu ul li:eq(3) a').attr('href', '/header/partials/user.php').colorbox().text('Вход');
  }

  catalogi('#contextMenu ul li:eq(4) a').attr('href', 'http://includes.catalogi.ru/pages/_delivery.html').colorbox({
    iframe: true,
    innerWidth: 200,
    innerHeight: 250
  }).text('Доставка');
  catalogi('#contextMenu ul li:eq(5) a').colorbox({
    href: '/header/partials/order.php',
    initialWidth: 190
  }).text('Корзина ('+catalogi('#_basket span').text()+')');

  catalogi('#contextMenu ul li:eq(6) a').attr('href', 'http://includes.catalogi.ru/pages/_payment.html').colorbox({
    iframe: true,
    innerWidth: 200,
    innerHeight: 250
  }).text('Оплата');
  catalogi('#contextMenu ul li:eq(7) a').attr('href', 'http://catalogi.ru/katalogi/').text('Онлайн каталоги');

  // Список

  // Стр. товара

    // стоимость с учетом доставки
      catalogi('#ResultPreis').bind('DOMNodeInserted', function(e){
        var _price = catalogi('#ResultPreis span:eq(0)').text().replace('€','').replace('Heute','').replace('jetzt','').replace(',','.').trim();

        if(_price !== ''){
          var productId = catalogi('input[name="orderid"]').val();
          for(var key in art){
            if(productId == art[key].id){
              var _price = art[key].price.replace(',','.');
            }
          }
        }

        if(_price){     
          var _delivery = parseFloat(_price)+(( parseFloat(_price)/100 )* parseFloat(catalogi('meta[name="service"]').attr('value')));   
          if(catalogi('#adsWk').prev().text() != 'С учетом доставки € '+_delivery.toFixed(2) ){
            catalogi('#adsWk').prev().text('С учетом доставки € '+_delivery.toFixed(2));
          }
        }
      });

    // Переопределение метода добавления в корзину
    catalogi('#addToB').click(function(){
      var param = [];
      var name  = catalogi('.m_produktHeadWrap h4').attr('origin');
      var productId = catalogi('input[name="orderid"]').val();
      for(var key in art){
        if(productId == art[key].id){
          var articul = art[key].articleNumber;
          var price   = art[key].price.replace(',','.');
          for(var dim in art[key].variants){
            param.push(art[key].variants[dim]);
          }
        }
      }

      catalogi.basket.add({
        catalog: 'OT',
        articul: articul,
        name: name,
        size: param.join(' '),
        price: price,
        count: 1
      });

      return false;
    });

  // Перевод строки поиска

  // Футер

  // Отображение body
  catalogi('body').css('visibility', 'visible');
}

catalogi(document).ready(function(){
  catalogi.parse();
  catalogi.init();
});