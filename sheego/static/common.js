/**
* Created by mihailstepancenko on 22.12.15.
*/


var timeout1 = 5000; // basket update

function _googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'de',
    includedLanguages: 'ru',
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  }, 'google_translate_element');
}

// Force use catalogi.service()
catalogi(document).ready(function() {
  catalogi(".product-variant-options").bind("DOMSubtreeModified", function() {
    catalogi.noTranslate();
    catalogi('.price-save-tag').remove();
    catalogi('.price-save').remove();
    catalogi.service();
    catalogi.removeShit();
  });


});

catalogi.noTranslate = function() {


  // Страница товара
  //catalogi('.product-size-dropdown').addClass('notranslate');
};

catalogi.parse = function() {

  //hide all content after first #footer
  // catalogi('#iframe').remove();
  catalogi('#iframe').nextAll().remove();
  catalogi('#iframe').hide();
  //catalogi('.standard').remove();


  catalogi('#topbar-slogan').remove();
  catalogi('#topbar-salutation').remove();
  catalogi('#topbar-bulletpoints').remove();

  catalogi('.firstlevel').remove();
  catalogi('.secondlevel').remove();
  catalogi('.thirdlevel').remove();
  catalogi('.fourthlevel').remove();
  catalogi('.standard').remove();
  catalogi('#stickyfooter').remove();
  catalogi('#nl-layer').remove();
  catalogi("#footer").hide();

  if (catalogi('.sizetable').length > 0) {
    catalogi('.sizetable').replaceWith('<a class="btn btn-text sizetable" onclick="catalogi.sizeTable(); return false" style="cursor:pointer;"  title="таблицы размеров"><span class="arrow">&gt;</span>Диаграмма размера</a>');
  }

  //catalogi('#startbody > script:nth-child(16)').remove();

  //  catalogi("#footer").nextAll().remove();

  if (catalogi('#ccc').length == 0) {
    catalogi( "#header-topbar > div > div" ).append( "<div id='ccc'<div id='topbar-slogan' class='col-md-6 hidden-xs hidden-sm'><a href='http://www.catalogi.ru' target='_blank' class='headerLinks _home catalogiLink' style='cursor:pointer'> Каталоги.ру <span class='hidden-xs hidden-sm hidden-md'>- заказ и доставка одежды из интернет-магазина Sheego.de.</span></a></div>"
    + "<div class=' col-md-6'>"
    + "<a href='#' class='headerLinks hidden-xs hidden-sm' onclick='catalogi.catalogs(); return false' style='margin-left:0px; margin-right:0px; cursor:pointer;'>Онлайн каталоги</a><span class='hidden-xs hidden-sm'>|</span>"
    + "<a href='#' class='headerLinks hidden-xs hidden-sm' onclick='catalogi.shops(); return false' style='margin-left:0px; margin-right:0px; cursor:pointer;'>Интернет-магазины</a><span class='hidden-xs hidden-sm'>|</span>"
    + "<a href='#' class='headerLinks hidden-xs hidden-sm' onclick='catalogi.sizeTable(); return false' style='margin-left:0px; margin-right:0px; cursor:pointer;'>Таблица размеров</a><span class='hidden-xs hidden-sm'>|</span>"
    + "<a href='#' id='delivery' class='headerLinks notranslate hidden-xs hidden-sm' onclick='catalogi.delivery(); return false' style='margin-left:0px; margin-right:0px; cursor:pointer;'> Дocтавка </a><span class='hidden-xs hidden-sm'>|</span>"
    + "<a href='#' class='headerLinks hidden-xs hidden-sm' onclick='catalogi.payment(); return false' style='margin-left:0px; margin-right:0px; cursor:pointer;'>Оплата</a>"
    + "<a href='#' class='hidden-xs hidden-sm hidden-md' style='margin-left: 20px'>+74955404949</a></div></div>"
    + "<div class='col-sm-12 col-xs-12 hidden-md hidden-lg'>"
    + "<a href='http://www.catalogi.ru' target='_blank' class='headerLinks _home catalogiLink' style='cursor:pointer'> Каталоги.ру </a>|"
    + "<a href='#' class='headerLinks' onclick='catalogi.payment(); return false' style='margin-left:0px; margin-right:0px; cursor:pointer;'>Оплата</a>|"
    + "<a href='#'  class='headerLinks notranslate ' onclick='catalogi.delivery(); return false' style='margin-left:0px; margin-right:0px; cursor:pointer;'> Дocтавка </a></div>");

    console.log('aaaaa');

    catalogi('.mainnav__ul').append(""
    + "<li class='mainnav__entry mainnav__entry--start'><a href='#' class='mainnav__entry-title' onclick='catalogi.catalogs(); return false' >Онлайн каталоги</a></li>"
    + "<li class='mainnav__entry mainnav__entry--start'><a href='#' class='mainnav__entry-title' onclick='catalogi.shops(); return false'>Интернет-магазины</a></li>"
    + "<li class='mainnav__entry mainnav__entry--start'><a href='#' class='mainnav__entry-title' onclick='catalogi.sizeTable(); return false' >Таблица размеров</a></li>"
    + "");

  }


  catalogi('#customerbox').css('margin-top','8px');

//подписка
var isshow = localStorage.getItem('status');
    if (isshow== null) {
        localStorage.setItem('isshow', 1);

        console.log('bbb');
        // Show popup here
        catalogi.colorbox({
                iframe: true,
                href: 'http://cdn.catalogi.ru/executable/partials/subscribe.php?group=31386',
                innerWidth: 580,
                innerHeight: 480
              });
    }



  if (catalogi('.at-dv-addToBasket')) {
    catalogi('.at-dv-addToBasket').replaceWith(
      catalogi("<button type='button' class='at-dv-addToBasket btn btn-primary btn-tall ' >В корзину</button>")
      .addClass('notranslate')
      .attr('id', 'addToCartBtn')
      //  .attr('href', '#')
      .bind('click', function(event) {
        //  event.preventDefault();
        addToCart();
      })
      // .bind('tap', function(event) {
      //     //    event.preventDefault();
      //     addToCart();
      // })

    );
  }

  catalogi('.color-item').unbind();
  catalogi('.color-item').children().off();
  catalogi('.color-item').find("*").off();



  // catalogi('.color-item').each(function (index, value) {
  //     catalogi(this).removeAttr("href");
  // });

  catalogi('.colors').find('a').each(function (index, value) {
    catalogi(this).removeClass('js-ajax');
  });

  //size!!!
  // catalogi('.js-moreinfo-size').removeClass('.js-moreinfo-size').removeClass('.js-sizeSelector')


  // catalogi('.js-moreinfo-size').find('button').each(function (index, value) {
  //     catalogi(this).replaceWith("<a class='btn btn-primary btn-small size-selected'>" + catalogi(this).text() + "</a>");
  // });

  // catalogi('.size-selected').bind('click', function(event) {
  //     catalogi('.js-moreinfo-size').find('.btn').each(function (index, value) {
  //         catalogi(this).removeClass('active');
  //     });

  //     catalogi('.at-dv-size').text(" - " + catalogi(this).text());
  // });

  //SEARCH
  catalogi('.form-search').empty();

  catalogi('.form-search').append("<form class='form-search  sitesearch is-sitesearch--desktop at-form-search' onkeypress='return event.keyCode != 13;'>")
  .append("<div class='typeahead-container'>")
  .append("<div class='sitesearch__wrapper form-search-wrapper typeahead-field'>")
  .append("<input type='hidden' name='lang' value='0'>")
  .append("<input type='hidden' name='cl' value='search'>")
  .append("<input type='text' required='' class='typeahead-query sitesearch__input js-searchParam at-search-param parsley-validated' name='searchparam' value='' placeholder='Артикул/Suchbegriff' parsley-required='true'  autocomplete='off'>")
  .append("<button class='btn sitesearch__magnifier typeahead-button' type='button' value=''><span class='searchmagnifier'></span><span class='searchloading js-searchloading'></span>поиск</button></div>")
  .append("<div class='js-parsley-searchfield-error-container'></div>")
  .append("</div></form>");



  setInterval(function() {
    catalogi('.sitesearch__input').on('keyup keypress', function(e) {
      var keyCode = e.keyCode || e.which;
      if (keyCode === 13) {
        e.preventDefault();
        return false;
      }
    });

    catalogi('.sitesearch__input').on('keyup keypress', function(e) {
      var keyCode = e.keyCode || e.which;
      if (keyCode === 13) {
        e.preventDefault();
        return false;
      }
    });

    catalogi('.sitesearch__input').keypress(function(event){

      if (event.keyCode === 10 || event.keyCode === 13)
      event.preventDefault();

    });
    catalogi('.sitesearch__input').keypress(function(event){

      if (event.keyCode === 10 || event.keyCode === 13){
        console.log("bbb");
      }

    });

    catalogi('.sitesearch__input').unbind();
    catalogi('.sitesearch__input').children().off();
    catalogi('.sitesearch__input').find("*").off();


    catalogi('.form-search').unbind();
    catalogi('.form-search').children().off();
    catalogi('.form-search').find("*").off();
    catalogi('.form-search').find("*").addBack().off();
    catalogi('.form-search').children().addBack().off();
  }, 500);

  catalogi('.sitesearch__magnifier').bind('click', function(event) {
    console.log("aaaa");

    var value = catalogi('.form-search').find("[name='searchparam']").val();
    catalogi.cookie('seachString', value, {
      expires: 7,
      path: '/',
      domain: '.catalogi.ru'
    });
    catalogi.ajax({
      url: 'http://cdn.catalogi.ru/executable/actions/_translate.php',
      type: 'get',
      dataType: 'json',
      data: {
        client: 't',
        text: value,
        sl: 'ru',
        tl: 'de'
      },
      success: function(data) {
        console.log('success:' + data);
        console.log(data.text[0]);
        var goingto = "http://www." + "sheego" + ".catalogi.ru/index.php?lang=0&cl=search&searchparam=" + data.text[0];
        window.location = goingto;

      },
      error: function(data) {
        console.log('error:' + data);
        // top.postMessage({action: 'search', search: catalogi('#search').val()},'*');
      }
    });
  });




  //// Шапка
  //catalogi('#iframe').hide();

  // Подписка



  // Showing body after hiding
  catalogi('body')
  .delay(500)
  .queue(function(next) {
    checkBasket();


    catalogi(this).css('visibility', 'visible');

//video
    if (catalogi('video').length > 0) {
      catalogi('video').each(function (index, value) {
        //catalogi(this).attr("src", catalogi(this).attr("src").replace("catalogi.ru","de"));
        var validSource = catalogi(this).find('source').attr('src').replace('catalogi.ru','de');
        catalogi(this).replaceWith('<video style="width:100%" preload="auto" loop="" autoplay="" controls="" muted="" poster=""><source src=" '+ validSource +' "type="video/mp4 "><img src=""></video>');
      });
    }


  });

  catalogi('head')
  .delay(5000)
  .queue(function(next) {
    //catalogi('#footer').remove();

    if (_auth) {
      catalogi('#_auth_wait').remove();
      catalogi('#miniaccount').empty();
      catalogi('#miniaccount')
      .html('<a href="http://catalogi.ru/cabinet/" class="my-account-login underline-alternative" target="_blank"><span class="hidden-xs-inline hidden-sm-inline">Kабинет</span><span class="l-vertical-align-helper "><img style="width: 34px; vertical-align: "src="https://image.freepik.com/free-icon/male-user-shadow_318-34042.png"></span></a>');
      //<a class="accountIco">S<a/>
      //catalogi('.my-account-login').text('S').css('cssText', "font-family: 'jvds icons',sans-serif;font-size:2.1em");

      catalogi('.accountIco').css('cssText', "font-family: 'jvds icons',sans-serif;font-size:2.1em");

      catalogi('.account-nav-listelem').show();
      catalogi('._logout').click(function() {
        catalogi.logout();
        return false;
      });
    } else {
      catalogi('#_auth_wait').remove();
      catalogi('.account-nav-listelem').show();
      catalogi('.account-nav-listelem > a').click(function() {
        catalogi.login();
        return false;
      });
      catalogi('.account-nav-listelem > a').text('Вход');
    }
  });



  //Added  12.05.2016


  //custom header

  //catalogi('#footer').remove();


  //aaaa

  //search divs with background images and change url to valid
  catalogi('div').each(function (index, value) {
    if (catalogi(this).css("background-image") != 'none' && catalogi(this).css("background-image").indexOf('http://media.sheego.catalogi.ru/') > -1) {
      catalogi(this).css("background-image", catalogi(this).css("background-image").replace("catalogi.ru","de") , '!important');
    }
  });


  //search img and change url to valid
  catalogi('img').each(function (index, value) {
    catalogi(this).attr("src", catalogi(this).attr("src").replace("catalogi.ru","de"));
  });


  window.setInterval(function(){
    catalogi('img').each(function (index, value) {
      catalogi(this).attr("src", catalogi(this).attr("src").replace("catalogi.ru","de"));
    });

    // catalogi('source').each(function (index, value) {
    //   catalogi(this).attr("src", catalogi(this).attr("src").replace("catalogi.ru","de"));
    // });

    catalogi('.standard').remove();

    catalogi('div').each(function (index, value) {
      if (catalogi(this).css("background-image") != 'none' && catalogi(this).css("background-image").indexOf('http://media.sheego.catalogi.ru/') > -1) {
        catalogi(this).css("background-image", catalogi(this).css("background-image").replace("catalogi.ru","de") , '!important');
      }
    });
    catalogi('#content.search').css('width', '100%', '!important');
  }, 1000);

  //hide payback-logo
  catalogi('.payback-logo-header').remove();

  //hide basket title
  catalogi('.minibasket__my').remove();
  catalogi('.miniaccount__mysheego-my').remove();
  //change text
  catalogi('.minibasketflyout').remove();

  catalogi('.minibasket__basket').empty();
  catalogi('.minibasket__basket').text('Корзина');


  //кабинет
  catalogi('#miniaccount').empty();
  catalogi( "#miniaccount" ).append( "<div class='myaccount notranslate' style='display: inline-block !important;'><a class='logged notranslate minibasket__text '  onclick='catalogi.login(); return false'><span class='hidden-xs-inline hidden-sm-inline'>Кабинет</span><span class='l-vertical-align-helper '><img style='width: 34px; vertical-align: 'src='https://image.freepik.com/free-icon/male-user-shadow_318-34042.png'></span></a></div>" );
  //catalogi( "#miniaccount" ).css('vertical-align','middle');
  //catalogi( "#miniaccount" ).css('padding-top','0px');






  //smaller font size for menu
  catalogi('#mainnavigation a').css('font-size','16px');
  //search panel
  catalogi('.search').attr("style","left:0px;");



};


function addToCart() {
  try {

    // артикул
    var articul = catalogi('.at-dv-artNr').first().text().trim();
    // название
    var name = catalogi('.at-dv-itemName').first().text().trim();
    // количество
    var count = catalogi('#sQuantity').val();
    // цена
    var price = catalogi('.at-lastprice')
    .first()
    .text()
    .replace('€', '')
    .replace('*', '')
    .replace(',', '.')
    .trim();
    // картинка
    //var img = catalogi('.image--thumbnails img').first().attr('srcset').split(',')[0];
    var img = catalogi('.js-thumb-img img').first().attr('src');
    // var img = (img_normal ? img_normal : img_safari).split(',')[0];

    var param = [];
    // цвет
    // var color1 = catalogi(catalogi('.configurator--form').children()[2]).text().trim();
    // var color2 = "undef";
    var color = catalogi('.at-dv-color').text();
    // if (color && color.length > 0) param.push(color);
    // размер
    // var size1 = catalogi(".configurator--form select option[selected='selected']").text().trim();
    // var size2 = catalogi('li[class*="selected"]:eq(1)').text();
    var size = catalogi('.at-dv-size').text();
    // console.log(articul + name);
    // if (size == 'Выберите размер' || size == 'Выберите размер ') {
    //     alert('Выберите размер!');
    //     return;
    // }
    // if (size && size.length > 0) param.push(size);

    // отправка запроса
    catalogi.basket.add({
      catalog: 'SG',
      articul: articul,
      name: name,
      size: color + size,
      price: price,
      count: '1',
      img: img
    });
    console.log('OK');
  } catch (e) {
    console.log(e);
  }
  return false;  setTimeout(function() {
    if (catalogi('#cboxLoadedContent').length == 0) {
      catalogi.order();
    }
  }, 800);

  return false;
}


function checkBasket() {
  window.clearInterval(window.timer1);
  catalogi('.basket').text('Корзина');

  var ordersNumber = catalogi.cookie('ordersNum');
  if (ordersNumber)
  catalogi('.wording .article .num').text(ordersNumber);
  console.log('ordersNumber: ' + ordersNumber);

  // catalogi('.minibasket__countvalue').empty();


  catalogi('#minibasket').empty();
  catalogi('#minibasket').attr("onclick","catalogi.order(); return false");
  catalogi('#minibasket').css('cursor','pointer');
  //catalogi('#minibasket').css('vertical-align','sub');
  //catalogi('#minibasket').css('margin-top','8px');
  catalogi('#minibasket').append(""
  + "<a class='minibasket__link js-minibasket-href' style='cursor : pointer'>"
  +    "<span class='minibasket__text hidden-xs-inline hidden-sm-inline'>"
  +    "<span class='minibasket__basket'>Корзина</span>"
  +    "</span>"
  +    "<span class='minibasket__countvalue l-vertical-align-helped'></span>"
  +    "<span class='l-vertical-align-helper'></span>"
  + "</a>"
  + "");
  catalogi('.minibasket__countvalue').text(ordersNumber);

  catalogi('#minibasket').unbind();
  catalogi("#minibasket").children().off();
  catalogi("#minibasket").find("*").off();

  // catalogi('#minibasket').click(function(event) {
  //             event.preventDefault();
  //             catalogi.order();
  //         });

  catalogi('#mbflyout-area').remove();

  window.timer1 = window.setInterval("checkBasket();", timeout1);
}

function checkSeach() {
  catalogi('#mbflyout-area').remove();
  catalogi('.minicart-amount').remove();
  //var seachString = catalogi.cookie('seachString');
  //if (seachString)
  //    catalogi('#search').val(seachString);
}

// Скидка
catalogi.service = function() {
  if ('_service' in window && catalogi('.pricearea .price .value')) {
    catalogi('#deliveryPriceDiv').remove();
    _price = catalogi('.pricearea .price .value').text().replace('€', '').replace(',', '.').trim();
    _delivery = parseFloat(_price) + ((parseFloat(_price) / 100) * parseFloat(_service));
    catalogi('.pricearea').append(catalogi('<div></div>').attr('id', 'deliveryPriceDiv').text('С учетом доставки € ' + _delivery.toFixed(2)));
    // catalogi('.product-shipping-costs').text('С учетом доставки € '+_delivery.toFixed(2));
  }
};

// Удаляем трекеры/аналитику
catalogi.removeShit = function() {
  catalogi('script[src*="criteo"]').remove();
  catalogi('script[src*="adserverpub"]').remove();
  catalogi('script[src*="eu-sonar"]').remove();
  catalogi('script[src*="adnxs"]').remove();
  catalogi('script[src*="adscale"]').remove();
  catalogi('script[src*="yieldlab"]').remove();
  catalogi('script[src*="doubleclick"]').remove();
  catalogi('script[src*="fonts"]').remove();

  //console.log('> ADshit removed.');
};



// On load
catalogi(function() {
  var re = /(?:[\s.])([a-z0-9][a-z0-9-]+[a-z0-9])(?:[.\s])/;
  var str = window.location.hostname;
  var m;

  if ((m = re.exec(str)) !== null) {
    if (m.index === re.lastIndex) {
      re.lastIndex++;
    }
    var currentDomain = m[0].replace('.', '').replace('.', '');
  }
  catalogi('#mbflyout-area').remove();


  catalogi('.form-search').submit(function(event) {
    var value = catalogi('.form-search').find("[name='searchparam']").val();
    catalogi.cookie('seachString', value, {
      expires: 7,
      path: '/',
      domain: '.catalogi.ru'
    });
    catalogi.ajax({
      url: 'http://cdn.catalogi.ru/executable/actions/_translate.php',
      type: 'get',
      dataType: 'json',
      data: {
        client: 't',
        text: value,
        sl: 'ru',
        tl: 'de'
      },
      success: function(data) {
        console.log('success:' + data);
        console.log(data.text[0]);
        var goingto = "http://www." + "sheego" + ".catalogi.ru/index.php?lang=0&cl=search&searchparam=" + data.text[0];
        window.location = goingto;

      },
      error: function(data) {
        console.log('error:' + data);
        // top.postMessage({action: 'search', search: catalogi('#search').val()},'*');
      }
    });
  });

  catalogi(window).on('message', function(event) {
    switch (event.originalEvent.data.action) {
      case 'search':
      var goingto = "http://www." + currentDomain + ".catalogi.ru/index.php?lang=0&cl=search&searchparam=";
      goingto = goingto + event.originalEvent.data.search.toLowerCase().replace(' ', '+');
      window.location = goingto;
      break
    }
    console.log(event.originalEvent.data);
  });

  catalogi.noTranslate();
  catalogi.parse();
  catalogi.removeShit();
  checkSeach();

});
