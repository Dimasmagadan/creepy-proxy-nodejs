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



    $('#customerbox').css('margin-top','8px');



    if (catalogi('.at-dv-addToBasket')) {
        catalogi('.at-dv-addToBasket').replaceWith(
            $("<button type='button' class='at-dv-addToBasket btn btn-primary btn-tall ' >В корзину</button>")
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

    $('.color-item').unbind();
    $('.color-item').children().off();
    $('.color-item').find("*").off();



    // $('.color-item').each(function (index, value) { 
    //     $(this).removeAttr("href");
    // });

    $('.colors').find('a').each(function (index, value) {
        $(this).removeClass('js-ajax');
    });

    //size!!!
    // $('.js-moreinfo-size').removeClass('.js-moreinfo-size').removeClass('.js-sizeSelector')


    // $('.js-moreinfo-size').find('button').each(function (index, value) { 
    //     $(this).replaceWith("<a class='btn btn-primary btn-small size-selected'>" + $(this).text() + "</a>");
    // });

    // $('.size-selected').bind('click', function(event) {
    //     $('.js-moreinfo-size').find('.btn').each(function (index, value) { 
    //         $(this).removeClass('active');
    //     });

    //     $('.at-dv-size').text(" - " + $(this).text());
    // });

    //SEARCH
   $('.form-search').empty();

    $('.form-search').append("<form class='form-search  sitesearch is-sitesearch--desktop at-form-search' onkeypress='return event.keyCode != 13;'>")
        .append("<div class='typeahead-container'>")
        .append("<div class='sitesearch__wrapper form-search-wrapper typeahead-field'>")
        .append("<input type='hidden' name='lang' value='0'>")
        .append("<input type='hidden' name='cl' value='search'>")
        .append("<input type='text' required='' class='typeahead-query sitesearch__input js-searchParam at-search-param parsley-validated' name='searchparam' value='' placeholder='Артикул/Suchbegriff' parsley-required='true'  autocomplete='off'>")
        .append("<button class='btn sitesearch__magnifier typeahead-button' type='button' value=''><span class='searchmagnifier'></span><span class='searchloading js-searchloading'></span>поиск</button></div>")
        .append("<div class='js-parsley-searchfield-error-container'></div>")
        .append("</div></form>");



    setInterval(function() {
      $('.sitesearch__input').on('keyup keypress', function(e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
          e.preventDefault();
          return false;
        }
      });

      $('.sitesearch__input').on('keyup keypress', function(e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
          e.preventDefault();
          return false;
        }
      });

      $('.sitesearch__input').keypress(function(event){

      if (event.keyCode === 10 || event.keyCode === 13)
          event.preventDefault();

    });
    $('.sitesearch__input').keypress(function(event){

        if (event.keyCode === 10 || event.keyCode === 13){
          console.log("bbb");
        }

      });

      $('.sitesearch__input').unbind();
      $('.sitesearch__input').children().off();
      $('.sitesearch__input').find("*").off();
      

      $('.form-search').unbind();
      $('.form-search').children().off();
      $('.form-search').find("*").off();
       $('.form-search').find("*").addBack().off();
    $('.form-search').children().addBack().off();  
    }, 500);

    $('.sitesearch__magnifier').bind('click', function(event) {
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
    catalogi('#iframe').hide();

    // Подписка
    catalogi.subscribe(false, '31386');


    // Showing body after hiding
    catalogi('body')
        .delay(500)
        .queue(function(next) {
            checkBasket();




            catalogi(this).css('visibility', 'visible');
        });

    catalogi('head')
        .delay(5000)
        .queue(function(next) {


    $( "#header-topbar > div > div" ).append( "<div id='topbar-slogan' class='col-md-6 hidden-xs hidden-sm'><a href='http://www.catalogi.ru' target='_blank' class='headerLinks _home catalogiLink' style='cursor:pointer'> Каталоги.ру <span class='hidden-xs hidden-sm hidden-md'>- заказ и доставка одежды из интернет-магазина Sheego.de.</span></a></div>"
                                            + "<div class=' col-md-6'>"
                                            + "<a href='#' class='headerLinks hidden-xs hidden-sm' onclick='catalogi.catalogs(); return false' style='margin-left:0px; margin-right:0px; cursor:pointer;'>Онлайн каталоги</a><span class='hidden-xs hidden-sm'>|</span>"
                                            + "<a href='#' class='headerLinks hidden-xs hidden-sm' onclick='catalogi.shops(); return false' style='margin-left:0px; margin-right:0px; cursor:pointer;'>Интернет-магазины</a><span class='hidden-xs hidden-sm'>|</span>"
                                            + "<a href='#' class='headerLinks hidden-xs hidden-sm' onclick='catalogi.sizeTable(); return false' style='margin-left:0px; margin-right:0px; cursor:pointer;'>Таблица размеров</a><span class='hidden-xs hidden-sm'>|</span>"
                                            + "<a href='#' id='delivery' class='headerLinks notranslate hidden-xs hidden-sm' onclick='catalogi.delivery(); return false' style='margin-left:0px; margin-right:0px; cursor:pointer;'> Дocтавка </a><span class='hidden-xs hidden-sm'>|</span>"
                                            + "<a href='#' class='headerLinks hidden-xs hidden-sm' onclick='catalogi.payment(); return false' style='margin-left:0px; margin-right:0px; cursor:pointer;'>Оплата</a>" 
                                            + "<a href='#' class='hidden-xs hidden-sm hidden-md' style='margin-left: 20px'>+74955404949</a></div>"
                                            + "<div class='col-sm-12 col-xs-12 hidden-md hidden-lg'>"
                                            + "<a href='http://www.catalogi.ru' target='_blank' class='headerLinks _home catalogiLink' style='cursor:pointer'> Каталоги.ру </a>|"
                                            + "<a href='#' class='headerLinks' onclick='catalogi.payment(); return false' style='margin-left:0px; margin-right:0px; cursor:pointer;'>Оплата</a>|"
                                            + "<a href='#'  class='headerLinks notranslate ' onclick='catalogi.delivery(); return false' style='margin-left:0px; margin-right:0px; cursor:pointer;'> Дocтавка </a></div>");


// <li class="mainnav__entry mainnav__entry--start"> <a class="mainnav__entry-title" href="http://www.sheego.catalogi.ru/" style="font-size: 16px;"><font><font><font><font>старт</font></font></font></font></a></li>
    
    $('.mainnav__ul').append(""
        + "<li class='mainnav__entry mainnav__entry--start'><a href='#' class='mainnav__entry-title' onclick='catalogi.catalogs(); return false' >Онлайн каталоги</a></li>" 
        + "<li class='mainnav__entry mainnav__entry--start'><a href='#' class='mainnav__entry-title' onclick='catalogi.shops(); return false'>Интернет-магазины</a></li>"
        + "<li class='mainnav__entry mainnav__entry--start'><a href='#' class='mainnav__entry-title' onclick='catalogi.sizeTable(); return false' >Таблица размеров</a></li>"
        + "");



            if (_auth) {
                catalogi('#_auth_wait').remove();
                catalogi('.myaccount.notranslate > a').remove();
                catalogi('.myaccount.notranslate')
                    .html('<a href="http://catalogi.ru/cabinet/" class="my-account-login underline-alternative" target="_blank">Личный кабинет</a>');
                catalogi('.myaccount.notranslate > a').text('S').css('cssText', "font-family: 'jvds icons',sans-serif;font-size:2.1em");
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
    $('#topbar-slogan').remove();
    $('#topbar-salutation').remove();
    $('#topbar-bulletpoints').remove();

    $('.firstlevel').remove();
    $('.secondlevel').remove();
    $('.thirdlevel').remove();
    $('.fourthlevel').remove();

    //hide all content after first #footer
    $('#iframe').nextAll().remove();
    $('#iframe').hide();
    // $("#footer").nextAll().hide();
    //aaaa

    //search divs with background images and change url to valid
    $('div').each(function (index, value) { 
        if ($(this).css("background-image") != 'none' && $(this).css("background-image").indexOf('http://media.sheego.catalogi.ru/') > -1) {
            $(this).css("background-image", $(this).css("background-image").replace("catalogi.ru","de") , '!important');
        }
    });


    //search img and change url to valid
    $('img').each(function (index, value) { 
        $(this).attr("src", $(this).attr("src").replace("catalogi.ru","de"));
        });

    window.setInterval(function(){
        $('img').each(function (index, value) { 
        $(this).attr("src", $(this).attr("src").replace("catalogi.ru","de"));
        });
        $('div').each(function (index, value) { 
            if ($(this).css("background-image") != 'none' && $(this).css("background-image").indexOf('http://media.sheego.catalogi.ru/') > -1) {
                $(this).css("background-image", $(this).css("background-image").replace("catalogi.ru","de") , '!important');
            }
        });
        $('#content.search').css('width', '100%', '!important');
    }, 1000);

    //hide payback-logo
    $('.payback-logo-header').remove();

    //hide basket title
    $('.minibasket__my').remove();
    $('.miniaccount__mysheego-my').remove();
    //change text 
    $('.minibasketflyout').remove();

    $('.minibasket__basket').empty();
    $('.minibasket__basket').text('Корзина');


    //кабинет
    $('#miniaccount').empty();
     $( "#miniaccount" ).append( "<div class='myaccount notranslate' style='display: inline-block !important;'><a class='logged notranslate minibasket__text '  onclick='catalogi.login(); return false'><span class='hidden-xs-inline hidden-sm-inline'>Кабинет</span><span class='l-vertical-align-helper '><img style='width: 34px; vertical-align: 'src='https://image.freepik.com/free-icon/male-user-shadow_318-34042.png'></span></a></div>" );
     //$( "#miniaccount" ).css('vertical-align','middle');
     //$( "#miniaccount" ).css('padding-top','0px');
    





    //smaller font size for menu
    $('#mainnavigation a').css('font-size','16px');
    //search panel
    $('.search').attr("style","left:0px;");



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
        var color = $('.at-dv-color').text();
        // if (color && color.length > 0) param.push(color);
        // размер
        // var size1 = catalogi(".configurator--form select option[selected='selected']").text().trim();
        // var size2 = catalogi('li[class*="selected"]:eq(1)').text();
        var size = $('.at-dv-size').text();
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

    // $('.minibasket__countvalue').empty();


    $('#minibasket').empty();
    $('#minibasket').attr("onclick","catalogi.order(); return false");
    $('#minibasket').css('cursor','pointer');
    //$('#minibasket').css('vertical-align','sub');
    //$('#minibasket').css('margin-top','8px');
        $('#minibasket').append(""
                    + "<a class='minibasket__link js-minibasket-href' style='cursor : pointer'>"
                    +    "<span class='minibasket__text hidden-xs-inline hidden-sm-inline'>"   
                    +    "<span class='minibasket__basket'>Корзина</span>"
                    +    "</span>"
                    +    "<span class='minibasket__countvalue l-vertical-align-helped'></span>"
                    +    "<span class='l-vertical-align-helper'></span>"
                    + "</a>"
        + "");
    $('.minibasket__countvalue').text(ordersNumber);

    $('#minibasket').unbind();
    $("#minibasket").children().off();
    $("#minibasket").find("*").off();

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
        catalogi('.pricearea').append($('<div></div>').attr('id', 'deliveryPriceDiv').text('С учетом доставки € ' + _delivery.toFixed(2)));
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

