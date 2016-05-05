catalogi = jQuery.noConflict(true);

/***
 * Методы бланка заказа
 **/
catalogi.basket = {

  // Добавление товара
  add: function(product){
    catalogi.ajax({
      url: 'http://cdn.catalogi.ru/executable/actions/_order_add.php',
      type: 'post',
      data: product,
      success: function(data){
        if(parseInt(data) > 0){

          // Обновление кукиз
          catalogi.cookie("last_order_add_page", window.location.toString(), {domain: "catalogi.ru", path: "/"});
          catalogi.cookie("updateCode", Math.random(), {domain: "catalogi.ru", path: "/"});
          
          // Обновления количества товаров
          catalogi.basket.count();
          
          // Вывод всплывающего блока бланка заказа
          top.postMessage({action: 'basket'},'*');
        }else{
          alert('Ошибка сервера! Попробуйте добавить заказ позднее.');
        }
      },
      error: function(data){
        console.log(data)
      }
    });
  },

  addFit: function(products){
    catalogi.ajax({
      url: 'http://cdn.catalogi.ru/executable/actions/_order_add_fit.php',
      type: 'post',
      data: {
        products: JSON.stringify(products)
      },
      success: function(data){
        if(parseInt(data) > 0){

          // Обновление кукиз
          catalogi.cookie("last_order_add_page", window.location.toString(), {domain: "catalogi.ru", path: "/"});
          catalogi.cookie("updateCode", Math.random(), {domain: "catalogi.ru", path: "/"});
          
          // Обновления количества товаров
          catalogi.basket.count();
          
          // Вывод всплывающего блока бланка заказа
          top.postMessage({action: 'basket'},'*');
        }else{
          alert('Ошибка сервера! Попробуйте добавить заказ позднее.');
        }
      },
      error: function(data){
        console.log(data)
      }
    });
  },

  // Обновление количиства товаров в бланке заказа
  count: function(){
    catalogi('#_basket span').load('http://cdn.catalogi.ru/executable/actions/_order_count.php');

    var ordersNum = catalogi('#_basket span').text();
    catalogi.cookie('ordersNum', ordersNum, { expires: 7, path: '/', domain: '.catalogi.ru' });


      //localStorage.setItem('ordersNum', ordersNum);
      //
      //  var output = "LOCALSTORAGE DATA:\n------------------------------------\n";
      //  if (localStorage) {
      //    if (localStorage.length) {
      //        for (var i = 0; i < localStorage.length; i++) {
      //            output += localStorage.key(i) + ': ' + localStorage.getItem(localStorage.key(i)) + '\n';
      //        }
      //    } else {
      //        output += 'There is no data stored for this domain.';
      //    }
      //  } else {
      //    output += 'Your browser does not support local storage.';
      //  }
      //  console.log(output);

    top.postMessage({action: 'orderCount', count: catalogi('#_basket span').text() },'*');
  }
};

catalogi(function(){

  /***
   * Установка внешних параметров
   **/
  // Скидка
  top.postMessage({action: '_service', _service: catalogi('#_head').attr('service') },'*');

  // Флаг скритыя переводчика
  top.postMessage({action: '_skiptranslate', _skiptranslate: catalogi('#_head').attr('skiptranslate') },'*');

  // Флаг статуса авторизации
  top.postMessage({action: '_auth', _auth: catalogi('#_logout_link').is('a') },'*');

  /***
   * Вызов методов всплывающих блоков
   **/

  // Онлайн магазины
  catalogi('#_shops_block_link').click(function(){
    top.postMessage({action: 'shops'},'*');
    return false;
  });

  // Онлайн каталоги
  catalogi('#_catalogs_block_link').click(function(){
    top.postMessage({action: 'catalogs'},'*');
    return false;
  });

  // Доставка
  catalogi('#_delivery_link').click(function(){
    top.postMessage({action: 'delivery'},'*');
    return false;
  });

  // Оплата
  catalogi('#_pay_link').click(function(){
    top.postMessage({action: 'payment'},'*');
    return false;
  });

  // Таблица размеров
  catalogi('#size_table_link').click(function(){
    top.postMessage({action: 'sizeTable'},'*');
    return false;
  });

  // Бланк заказа
  catalogi('#_basket').click(function(){
    top.postMessage({action: 'basket'},'*');
    return false;
  });

  // Авторизация
  catalogi('#_login_link').click(function(){
    top.postMessage({action: 'login'},'*');
    return false;
  });

  // Выход
  catalogi('#_logout_link').click(function(){
    top.postMessage({action: 'logout'},'*');
    return false;
  });

  /***
   * Перевод строки поиска
   **/
  catalogi('._search').submit(function(){
    catalogi.ajax({
      url: 'http://cdn.catalogi.ru/executable/actions/_translate.php',
      type: 'get',
      dataType: 'json',
      data: {
        client: 't',
        text: catalogi('._search input[type="text"]').val(),
        sl: 'ru',
        tl: 'de'
      },
      success: function(data){
        console.log('success:' + data)
        top.postMessage({action: 'search', search: data.text[0]},'*');
      },
      error: function(data){
        console.log('error:' + data)
        top.postMessage({action: 'search', search: catalogi('._search input[type="text"]').val()},'*');
      }
    });
    return false;
  });
  //catalogi('#_head #_center ._search form').submit(function(){
  //  catalogi.ajax({
  //    url: 'http://includes.catalogi.ru/new/actions/_translate.php',
  //    type: 'get',
  //    dataType: 'json',
  //    data: {
  //      client: 't',
  //      text: catalogi('#_head #_center ._search input[type="text"]').val(),
  //      sl: 'ru',
  //      tl: 'de'
  //    },
  //    success: function(data){
  //      top.postMessage({action: 'search', search: data.sentences[0].trans},'*');
  //    },
  //    error: function(data){
  //      console.log(data)
  //    }
  //  });
  //  return false;
  //});

  /***
   * Обработка команд с главного окна
   **/
  catalogi(window).on('message', function(event){
    switch(event.originalEvent.data.action){
      
      // Добавление товара в блан заказа
      case 'add':
        catalogi.basket.add(event.originalEvent.data.product);
        break

      // Добавление товара в блан заказа
      case 'addFit':
        catalogi.basket.addFit(event.originalEvent.data.products);
        break

      // Обновление количиства товаров в бланке заказа
      case 'count':
        catalogi.basket.count();
        break
    }
    console.log(event.originalEvent.data);
  });
});