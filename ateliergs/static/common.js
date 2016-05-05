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
    // Шапка
    catalogi('.col-xs-12.col-sm-10.col-md-10.header_right').addClass('notranslate');

    // Страница товара
    catalogi('.size-advertise-wrapper').addClass('notranslate');
};

catalogi.parse = function() {
    //// Шапка
    catalogi('#iframe').hide();
    catalogi('.header-popover-wrapper').remove();
    catalogi('.benefit-wrapper').children().remove();
    catalogi('.hotline-wrapper').remove();
    catalogi('.shopping-cart-wrapper').remove();


    catalogi('#navbar-meta ul.nav').children().remove();
    catalogi('#navbar-meta ul.nav').append($('<li>').text('+74955404949').addClass('textInHeader'));
    catalogi('#navbar-meta ul.nav').append($('<li>').text('|').addClass('textInHeader'));
    catalogi('#navbar-meta ul.nav').append($('<li>').text('Доставка').addClass('textInHeader').click(function() {
        catalogi.delivery();
    }));
    catalogi('#navbar-meta ul.nav').append($('<li>').text('|').addClass('textInHeader'));
    catalogi('#navbar-meta ul.nav').append($('<li>').text('Оплата').addClass('textInHeader').click(function() {
        catalogi.payment();
    }));
    catalogi('#navbar-meta ul.nav').append($('<li>').text('|').addClass('textInHeader'));
    catalogi('#navbar-meta ul.nav').append($('<li>').text('Интернет-магазины').addClass('textInHeader').click(function() {
        catalogi.shops();
    }));
    catalogi('#navbar-meta ul.nav').append($('<li>').text('|').addClass('textInHeader'));
    catalogi('#navbar-meta ul.nav').append($('<li>').text('Онлайн каталоги').addClass('textInHeader').click(function() {
        catalogi.catalogs();
    }));

    catalogi('#navbar-meta ul.nav').append($('<li>')
        .append($("<a> Каталоги.ру</a>")
            .attr('href', 'http://www.catalogi.ru')
            .attr('target', '_blank')
            .addClass('headerLinks _home catalogiLink')));

    catalogi('#main-navigation li.index_6').remove();
    catalogi('#main-navigation a.home-link').children().remove();
    catalogi('#main-navigation a.home-link').append($('<span></span>')
        .css('cssText', "font-family: 'jvds icons',sans-serif;font-size:1.5em").text("2"));



    //login
    var cartBtn = $("<button></button>")
        .attr('type', 'button')
        .attr('id', 'loginBtn')
        .addClass('btn btn-navbar btn-secondary')
        .css('border', 'none');

    // cartBtn.append($('<span></span>').addClass('cart-label visible-md-inline-block visible-lg-inline-block').text("Кабинет"));
    cartBtn.append($('<span></span>').css('cssText', "font-family: 'jvds icons',sans-serif;font-size:35px")
        .text("S").click(function() {
            event.preventDefault();
            catalogi.login();
        }));


    catalogi('.navbar-button-wrapper').append(cartBtn);

    //подписка на новости
    catalogi('#newsletterLayer').remove();

    //cart
    cartBtn = $("<button></button>")
        .attr('type', 'button')
        .addClass('btn btn-navbar btn-secondary')
        .css('border', 'none');

    //  cartBtn.append($('<span></span>').addClass('cart-label visible-md-inline-block visible-lg-inline-block').text("Корзина"));
    cartBtn.append($('<span></span>').css('cssText', "font-family: 'jvds icons',sans-serif;font-size:35px").text("C"));
    cartBtn.click(function() {
        event.preventDefault();
        catalogi.order();
        setTimeout(function() {
            catalogi('#cboxLoadedContent').css('width', catalogi('#cboxLoadedContent').css('width').replace('px', '') + 40 + 'px');
            catalogi('#cboxLoadedContent').css('height', catalogi('#cboxLoadedContent').css('height').replace('px', '') + 40 + 'px');
        }, 500);
    });

    catalogi('.navbar-button-wrapper').append(cartBtn);

    catalogi('.btn.btn-navbar.btn-secondary.btn-search').children().remove();
    catalogi('.btn.btn-navbar.btn-secondary.btn-search')
        .append($('<span></span>').css('cssText', "font-family: 'jvds icons',sans-serif;font-size:35px").text("B"));


    catalogi('.filter-sort-tab-wrapper').remove();

    //side menu
    catalogi('.navbar-button.navbar-toggle.collapsed .icon-text').text('Меню');



    catalogi('.navbar-offcanvas-login-wrapper').remove();
    catalogi('.nav.navbar-service.visible-xs').children().remove();
    catalogi('.nav.navbar-service.visible-xs').append($("<li>").append($("<a>")
        .text("онлайн каталоги").click(function() {
            catalogi.catalogs();
        })));
    catalogi('.nav.navbar-service.visible-xs').append($("<li>").append($("<a>")
        .text("интернет-магазины").click(function() {
            catalogi.shops();
        })));
    catalogi('.nav.navbar-service.visible-xs').append($("<li>").append($("<a>")
        .text("оплата").click(function() {
            catalogi.payment();
        })));
    catalogi('.nav.navbar-service.visible-xs').append($("<li>").append($("<a>")
        .text("доставка").click(function() {
            catalogi.delivery();
        })));
    catalogi('.nav.navbar-service.visible-xs').append($("<li>").append($("<a>")
        .text("таблица размеров").click(function() {
            catalogi.sizeTable();
        })));



    //юридические страницы
    catalogi('footer').remove();




    // Страница товара
    // catalogi('.size-advertise-wrapper')
    catalogi('.size-advertise-wrapper').children().remove();
    catalogi('.size-advertise-wrapper').append($('<div></div>')
        .text('Таблица размеров').addClass('btn-icon').css('cursor', 'pointer').click(function(event) {
            event.preventDefault();
            catalogi.sizeTable();
        }));

    catalogi('.tax-delivery-wrapper').children().remove();
    catalogi('.tax-delivery-wrapper').append($('<div>').attr('id', 'deliveryPriceDiv'));



    catalogi('.product-detail-wrapper .row').first().append($('<button>')
        .addClass('add-to-cart btn btn-primary').text('to basket').click(function() {
            addToCart();
        }));

    catalogi('#button-add-to-cart').attr('onclick', 'addToCart()');









    //search
    catalogi("#header_search_form button[type='submit']").children().remove();
    catalogi("#header_search_form button[type='submit']")
        .append($('<span></span>').css('cssText', "font-family: 'jvds icons',sans-serif").text("B"));

    catalogi('#search').attr('placeholder', 'найти');

    catalogi("form[role='search']").submit(function(event) {
        var form = event.currentTarget;

        var value = catalogi(form).find("input[name='q']").val();

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
                catalogi(form).find("input[name='q']").val(data.text[0]);
                form.submit();
            },
            error: function(data) {
                console.log('error:' + data);
                // top.postMessage({action: 'search', search: catalogi('#search').val()},'*');
            }
        });
        return false;
    });



    // Подписка
    catalogi.subscribe(false, '35346');


    // Showing body after hiding
    catalogi('body')
        .delay(500)
        .queue(function(next) {
            checkBasket();
            catalogi('.basket .pre').remove();
            catalogi('.wording .price').remove();


            if (catalogi("[data-include='http://www.janvanderstorm.catalogi.ru/basket']").children().length == 0) {
                catalogi("[data-include='http://www.janvanderstorm.catalogi.ru/basket']").html("<div class='minibasket-area'>" +
                    "<a class='wkempty' ><span class='minibasketicon'><span class='glyphicon basket'>Корзина</span>" +
                    "</span><span class='wording'><span class='basket'>Корзина</span><span class='article'>" +
                    "<span class='num'>0</span><span class='text'>Artikel</span></span></span></a></div>");
                catalogi('a[title*="Warenkorb"]').attr('href', '#').click(function(event) {
                    event.preventDefault();
                    catalogi.order();
                    setTimeout(function() {
                        catalogi('#cboxLoadedContent').css('width', catalogi('#cboxLoadedContent').css('width').replace('px', '') + 40 + 'px');
                        catalogi('#cboxLoadedContent').css('height', catalogi('#cboxLoadedContent').css('height').replace('px', '') + 40 + 'px');
                    }, 500);

                    //return false;
                });
                catalogi('.basket').text('Корзина');

            }

            catalogi('#account-nav').append('<img id="_auth_wait" src="http://cdn.catalogi.ru/static/images/loading.gif" border="0" align="middle">');
            catalogi('.account-nav-listelem').hide();
            catalogi('.product-size-guide').remove();
            catalogi('.price-save-tag').remove();
            catalogi('.price-save').remove();
            catalogi('a[href*="/de/login"]').parent().parent().remove();

            catalogi(this).css('visibility', 'visible');
        });

    catalogi('head')
        .delay(5000)
        .queue(function(next) {
            setInterval(function() {
                catalogi('.size-advertise-wrapper').children().remove();
                catalogi('.size-advertise-wrapper').append($('<div></div>').text('Таблица размеров').addClass('btn-icon').css('cursor', 'pointer').click(function(event) {
                    event.preventDefault();
                    catalogi.sizeTable();
                }));
                catalogi('#button-add-to-cart').attr('data-target', '');
                catalogi('#button-add-to-cart').attr('onclick', 'addToCart()');
                catalogi.service();
            }, 500);

            if (_auth) {
                catalogi('#_auth_wait').remove();
                catalogi('#loginBtn').children().remove();
                catalogi('#loginBtn')
                    .html('<a href="http://catalogi.ru/cabinet/" class="my-account-login underline-alternative" target="_blank">Личный кабинет</a>');
                catalogi('#loginBtn > a').text('S').css('cssText', "font-family: 'jvds icons',sans-serif;font-size:35px");
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
};



function checkBasket() {
    window.clearInterval(window.timer1);
    catalogi('.basket').text('Корзина');

    var ordersNumber = catalogi.cookie('ordersNum');
    if (ordersNumber)
        catalogi('.wording .article .num').text(ordersNumber);
    console.log('ordersNumber: ' + ordersNumber);
    catalogi('#mbflyout-area').remove();

    window.timer1 = window.setInterval("checkBasket();", timeout1);
}

function checkSeach() {
    //catalogi('#mbflyout-area').remove();
    //catalogi('.minicart-amount').remove();
    //var seachString = catalogi.cookie('seachString');
    //if (seachString)
    //    catalogi('#search').val(seachString);
}



// Скидка
catalogi.service = function() {
    if ('_service' in window && catalogi('.tax-delivery-wrapper')) {
        catalogi('.tax-delivery-wrapper').children().remove();
        catalogi('#deliveryPriceDiv').remove();
        _price = catalogi('.price-wrapper').first().text().replace('€', '').replace(',', '.').trim().replace(' ', '');
        _delivery = parseFloat(_price) + ((parseFloat(_price) / 100) * parseFloat(_service));
        catalogi('.tax-delivery-wrapper').append($('<div></div>').attr('id', 'deliveryPriceDiv').text('С учетом доставки € ' + _delivery.toFixed(2)));
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

function addToCart(event) {
    try {

        // артикул
        var articul = "<a href='" + window.location.href + "' target='_blank'>" + catalogi("span.order-nr").first().text().replace('-', '') + "</a>";
        // название
        var name = catalogi('h1.product-headline').text().trim();
        // количество
        var count = catalogi("#cart-quantity").val() ? catalogi("#cart-quantity").val() : 1;
        // цена
        var price = catalogi('.price-wrapper').first().text().replace('€', '').replace(',', '.').trim().replace(' ', '');
        // картинка
        var img = catalogi('.product-detail-view img').attr('src');

        var param = [];

        // цвет
        var color1 = catalogi('.btn.color-pattern.active img').attr('alt');
        var color2 = catalogi('li[class*="selected"]:eq(0)').attr('title');
        var color = (color1 == "") ? color2 : color1;
        if (color && color.length > 0) param.push(color);

        // размер
        var size1 = catalogi('.btn.sizes-box.active ').text();
        var size2 = catalogi('li[class*="selected"]:eq(1)').text();
        var size = ((size1 == "") ? size2 : size1).trim();
        if (size == 'Выберите размер' || size == 'Выберите размер ') {
            alert('Выберите размер!');
            return;
        }
        if (size && size.length > 0) param.push(size);

        // отправка запроса
        catalogi.basket.add({
            catalog: 'AtelierGS.de',
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
        catalogi('#cboxLoadedContent').css('width', catalogi('#cboxLoadedContent').css('width').replace('px', '') + 40 + 'px');
        catalogi('#cboxLoadedContent').css('height', catalogi('#cboxLoadedContent').css('height').replace('px', '') + 40 + 'px');
    }, 500);
    return false;
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
