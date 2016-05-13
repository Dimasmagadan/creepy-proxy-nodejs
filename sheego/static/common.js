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



    if (catalogi('.at-dv-addToBasket')) {
        catalogi('.at-dv-addToBasket').replaceWith(
            $("<button type='button' class='at-dv-addToBasket btn btn-primary btn-tall '>В корзину</button>")
            .addClass('notranslate')
            .attr('id', 'addToCartBtn')
            //  .attr('href', '#')
            .bind('click', function(event) {
                //  event.preventDefault();
                addToCart();
            }).bind('tap', function(event) {
                //    event.preventDefault();
                addToCart();
            })

        );
    }
    if (catalogi('.at-dv-addToBasket')) {
        setInterval(function() {
            if (catalogi('.at-dv-addToBasket')) {
                // catalogi('.link--notepad').remove();
                // catalogi.service();
                catalogi('.at-dv-addToBasket').replaceWith(
                    $("<button type='button' class='at-dv-addToBasket btn btn-primary btn-tall'>В корзину</button>")
                    .addClass('notranslate')
                    .attr('id', 'addToCartBtn')
                    .bind('click', function(event) {
                        //  event.preventDefault();
                        addToCart();
                    }).bind('tap', function(event) {
                        //    event.preventDefault();
                        addToCart();
                    })

                );
            }
        }, 1000);
    }





    //// Шапка
    catalogi('#iframe').hide();

    // Добавление в корзину
    catalogi('.addToCartForm').submit(function(event) {
        try {

            var complekt = catalogi('.variantselectform');

            if (complekt.length == 1) {
                var queryString = $('.addToCartForm').serialize();
                // артикул
                var articul = "<a href='" + window.location.href + "' target='_blank'>" + catalogi(".articlenumber .num").text() + "</a>";
                // название
                var name = catalogi('.articlemain .articlename').text().trim();
                // количество
                var count = catalogi("input[name=quantity]").val();
                // цена
                var price = catalogi('.pricearea .price .value').first().text().replace(',', '.');
                // картинка
                if (window.innerWidth < 770) {
                    var img = catalogi('#thumbslider img').attr('data-src');
                } else {
                    var img = catalogi('#thumbimages img').attr('src');
                }


                var param = [];

                // цвет
                var color1 = catalogi('#colorSelect .active').attr('data-original-title');
                var color2 = catalogi('li[class*="selected"]:eq(0)').attr('title');
                var color = (color1 == "") ? color2 : color1;
                if (color && color.length > 0) param.push(color);

                // размер
                var size1 = catalogi('.button-holder .active').text();
                var size2 = catalogi('li[class*="selected"]:eq(1)').text();
                var size = ((size1 == "") ? size2 : size1).trim();
                if (size == 'Выберите размер' || size == 'Выберите размер ') {
                    alert('Выберите размер!');
                    return;
                }
                if (size && size.length > 0) param.push(size);

                // отправка запроса
                catalogi.basket.add({
                    catalog: 'Janvanderstorm.de',
                    articul: articul,
                    name: name,
                    size: (param.join(' ').trim() == '') ? 0 : param.join(' ').trim(),
                    price: price,
                    count: count,
                    img: img
                });

            } else {
                var numberPattern = /\d+/g;

                var namePart = catalogi('.articlemain .articlenumber').text();
                namePart = namePart.match(numberPattern);
                namePart = "<a href='" + window.location.href + "' target='_blank'>" + namePart + "</a>";
                for (var i = 0; i < complekt.length; i++) {
                    if (catalogi(complekt[i]).find('.checkbox.dark.active').length > 0) {
                        var objToSend = {
                            catalog: 'Janvanderstorm.de',
                            articul: "<a href='" + window.location.href + "' target='_blank'>" + JSON.parse(catalogi(complekt[i]).attr('data-variantselect')).productId + "</a>",
                            name: "Комплект " + catalogi(complekt[i]).find('.articlename').text(),
                            size: "size " + catalogi(complekt[i]).find('.variantselect .button-holder .active').text(),
                            price: catalogi(complekt[i]).find('.price .value').text().replace(',', '.'),
                            count: 1,
                            img: catalogi(complekt[i]).find('.imgholder img').attr('src')
                        };
                        catalogi.basket.add(objToSend);
                    }
                    //alert(catalogi(complekt[i]).find('.imgholder img').attr('src'));
                }
            }

            console.log('OK');
        } catch (e) {
            console.log(e);
        }
        setTimeout(function() {
            catalogi('#cboxLoadedContent').css('width', catalogi('#cboxLoadedContent').css('width').replace('px', '') + 40 + 'px');
            catalogi('#cboxLoadedContent').css('height', catalogi('#cboxLoadedContent').css('height').replace('px', '') + 40 + 'px');
        }, 500);
        return false;
    });





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


    $( "#header-topbar > div > div" ).append( "<div id='topbar-slogan' class='col-md-6 hidden-xs hidden-sm'><a href='http://www.catalogi.ru' target='_blank' class='headerLinks _home catalogiLink'> Каталоги.ру <span class='hidden-xs hidden-sm hidden-md'>- заказ и доставка одежды из интернет-магазина Sheego.de.</span></a></div>"
                                            + "<div class=' col-md-6'>"
                                            + "<a href='#' class='headerLinks hidden-xs hidden-sm' onclick='catalogi.catalogs(); return false' style='margin-left:0px; margin-right:0px;'>Онлайн каталоги</a><span class='hidden-xs hidden-sm'>|</span>"
                                            + "<a href='#' class='headerLinks hidden-xs hidden-sm' onclick='catalogi.shops(); return false' style='margin-left:0px; margin-right:0px;'>Интернет-магазины</a><span class='hidden-xs hidden-sm'>|</span>"
                                            + "<a href='#' class='headerLinks hidden-xs hidden-sm' onclick='catalogi.sizeTable(); return false' style='margin-left:0px; margin-right:0px;'>Таблица размеров</a><span class='hidden-xs hidden-sm'>|</span>"
                                            + "<a href='#' id='delivery' class='headerLinks notranslate hidden-xs hidden-sm' onclick='catalogi.delivery(); return false' style='margin-left:0px; margin-right:0px;'> Дocтавка </a><span class='hidden-xs hidden-sm'>|</span>"
                                            + "<a href='#' class='headerLinks hidden-xs hidden-sm' onclick='catalogi.payment(); return false' style='margin-left:0px; margin-right:0px;'>Оплата</a>" 
                                            + "<a href='#' class='hidden-xs hidden-sm hidden-md' style='margin-left: 20px'>+74955404949</a></div>"
                                            + "<div class='col-sm-12 col-xs-12 hidden-md hidden-lg'>"
                                            + "<a href='http://www.catalogi.ru' target='_blank' class='headerLinks _home catalogiLink'> Каталоги.ру </a>|"
                                            + "<a href='#' class='headerLinks' onclick='catalogi.payment(); return false' style='margin-left:0px; margin-right:0px;'>Оплата</a>|"
                                            + "<a href='#'  class='headerLinks notranslate ' onclick='catalogi.delivery(); return false' style='margin-left:0px; margin-right:0px;'> Дocтавка </a></div>");


// <li class="mainnav__entry mainnav__entry--start"> <a class="mainnav__entry-title" href="http://www.sheego.catalogi.ru/" style="font-size: 16px;"><font><font><font><font>старт</font></font></font></font></a></li>
    $('.mainnav__ul ').append(""
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

    //hide all content after first #footer
    $('#iframe').nextAll().remove();
    $('#iframe').hide();
    // $("#footer").nextAll().hide();

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
    }, 1000);

    //hide payback-logo
    $('.payback-logo-header').remove();

    //hide basket title
    $('.minibasket__my').remove();
    $('.miniaccount__mysheego-my').remove();
    //change text 
    $('#minibasket > a > span.minibasket__text.hidden-xs-inline.hidden-sm-inline > span.minibasket__basket > font > font > font > font > font > font > font > font > font > font').text("Корзина");
    $('#miniaccount').empty();
 $( "#miniaccount" ).append( "<div class='myaccount notranslate' style='display: inline-block !important;'><a class='logged notranslate minibasket__text hidden-xs-inline hidden-sm-inline'  onclick='catalogi.login(); return false'>Кабинет</a></div>" );
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
        var color1 = catalogi(catalogi('.configurator--form').children()[2]).text().trim();
        var color2 = "undef";
        var color = (color1 == "") ? color2 : color1;
        if (color && color.length > 0) param.push(color);
        // размер
        var size1 = catalogi(".configurator--form select option[selected='selected']").text().trim();
        var size2 = catalogi('li[class*="selected"]:eq(1)').text();
        var size = ((size1 == "") ? size2 : size1).trim();
        console.log(articul + name);
        // if (size == 'Выберите размер' || size == 'Выберите размер ') {
        //     alert('Выберите размер!');
        //     return;
        // }
        // if (size && size.length > 0) param.push(size);

        // отправка запроса
        catalogi.basket.add({
            catalog: 'sheego',
            articul: articul,
            name: name,
            size: (param.join(' ').trim() == '') ? 0 : param.join(' ').trim(),
            price: price,
            count: count,
            img: img
        });
        console.log('OK');
    } catch (e) {
        console.log(e);
    }
    setTimeout(function() {
        if (catalogi('#cboxLoadedContent').length == 0) {
            catalogi.order();
        }
    }, 500);
    return false;
}


function checkBasket() {
    window.clearInterval(window.timer1);
    catalogi('.basket').text('Корзина');

    var ordersNumber = catalogi.cookie('ordersNum');
    if (ordersNumber)
        catalogi('.wording .article .num').text(ordersNumber);
    console.log('ordersNumber: ' + ordersNumber);

    $('#minibasket > a > span.minibasket__countvalue.l-vertical-align-helped > font > font > font > font').text(ordersNumber);

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



    catalogi('.searchform').submit(function(event) {

        var form = event.currentTarget;

        var value = catalogi(form).find("[name='search']").val();

        //var value = catalogi("[name='search'")[0].value ? catalogi("[name='search'")[0].value : catalogi("[name='search'")[1].value;
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
                catalogi(form).find("[name='search']").val(data.text[0]);
                form.submit();
            },
            error: function(data) {
                console.log('error:' + data);
                // top.postMessage({action: 'search', search: catalogi('#search').val()},'*');
            }
        });
        return false;
    });

    catalogi(window).on('message', function(event) {
        switch (event.originalEvent.data.action) {
            case 'search':
                var goingto = "http://www." + currentDomain + ".catalogi.ru/" + currentDomain + "/de/s?_sb=true&query=";
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
