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

var currentDomain;

function getCurrentDomain() {
    var domain = null;

    var re = /(?:[\s.])([a-z0-9][a-z0-9-]+[a-z0-9])(?:[.\s])/;
    var str = window.location.hostname;
    var m;

    if ((m = re.exec(str)) !== null) {
        if (m.index === re.lastIndex) {
            re.lastIndex++;
        }
        domain = m[0].replace('.', '').replace('.', '');
    }

    return domain;
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
    //  catalogi('.navigation--entry.headerHint').addClass('notranslate');
    //  catalogi('.product-size-dropdown').addClass('notranslate');
};

catalogi.parse = function() {
    //// Шапка
    catalogi('#iframe').hide();

    //desctop menu
    catalogi('.categoryNavESpot a')
        .css('color', 'white')
        .attr('onclick', '')
        .attr('href', 'http://catalogi.ru/katalog_wenz/');

    //catalogi('.headerTopNavigation').css('margin-top', '6px');
    //service links
    catalogi('.headerTopNavigation').children().remove();
    catalogi('.headerTopNavigation').append($('<li>').text('+74955404949').addClass('textInHeader notranslate'));
    catalogi('.headerTopNavigation').append($('<li>').text('|').addClass('textInHeader notranslate'));
    catalogi('.headerTopNavigation').append($('<li>').text('Доставка').addClass('textInHeader notranslate').click(function() {
        catalogi.delivery();
    }));
    catalogi('.headerTopNavigation').append($('<li>').text('|').addClass('textInHeader notranslate'));
    catalogi('.headerTopNavigation').append($('<li>').text('Оплата').addClass('textInHeader notranslate').click(function() {
        catalogi.payment();
    }));
    catalogi('.headerTopNavigation').append($('<li>').text('|').addClass('textInHeader notranslate'));
    catalogi('.headerTopNavigation').append($('<li>').text('Интернет-магазины').addClass('textInHeader notranslate').click(function() {
        catalogi.shops();
    }));
    catalogi('.headerTopNavigation').append($('<li>').text('|').addClass('textInHeader notranslate'));
    catalogi('.headerTopNavigation').append($('<li>').text('Онлайн каталоги').addClass('textInHeader notranslate').click(function() {
        catalogi.catalogs();
    }));

    catalogi('.storeHeaderBar').append($("<a> Каталоги.ру - заказ и доставка одежды из интернет-магазина wenz.de.</a>")
        .attr('href', 'http://www.catalogi.ru')
        .attr('target', '_blank')
        .addClass('headerLinks _home notranslate')
        .css('padding-top', '5px'));


    //basket area
    catalogi('.leafletHeaderIcon').remove();

    catalogi('#miniShopCart').unbind('click');
    catalogi('#miniShopCart').bind('click', function() {
        top.postMessage({
            action: 'basket'
        }, '*');
        return false;
    });
    catalogi('div.miniCartAmountContainer').remove();
    catalogi('#mobile_lightAmountContainer').remove();

    //footer
    catalogi('#footer').remove();

    //mobile menu links
    catalogi('#topBarMenuButton').click(function() {
            setTimeout(function() {

                catalogi('#mobileCategoryMenu ul.firstLevel').append($("<li>").append($("<a>")
                    .text("онлайн каталоги").addClass('category').css("padding", '0.5em').click(function() {
                        catalogi.catalogs();
                    })));
                catalogi('#mobileCategoryMenu ul.firstLevel').append($("<li>").append($("<a>")
                    .text("интернет-магазины").addClass('category').css("padding", '0.5em').click(function() {
                        catalogi.shops();
                    })));
                catalogi('#mobileCategoryMenu ul.firstLevel').append($("<li>").append($("<a>")
                    .text("оплата").addClass('category').css("padding", '0.5em').click(function() {
                        catalogi.payment();
                    })));
                catalogi('#mobileCategoryMenu ul.firstLevel').append($("<li>").append($("<a>")
                    .text("доставка").addClass('category').css("padding", '0.5em').click(function() {
                        catalogi.delivery();
                    })));
                catalogi('#mobileCategoryMenu ul.firstLevel').append($("<li>").append($("<a>")
                    .text("таблица размеров").addClass('category').css("padding", '0.5em').click(function() {
                        catalogi.sizeTable();
                    })));
            }, 200);
        })
        //search
    setTimeout(function() {
        //catalog link
        catalogi('.categoryNavESpot a').attr('href', 'http://catalogi.ru/katalog_wenz/');
        //desctop search form
        catalogi('.desktopSearchButton').attr('onclick')
        catalogi('#headerSearchForm').attr('onsubmit', 'desctopSearch($(this).closest("form"))');
        catalogi('#headerSearchForm').submit(desctopSearch);
        //mobile search form
        catalogi('#mobileSearchForm').attr('onsubmit', '');
        catalogi('#mobileSearchForm').submit(function(event) {
            var form = event.currentTarget;
            var value = catalogi(form).find("[name='searchTerm']").val();
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
                    catalogi(form).find("[name='searchTerm']").val(data.text[0]);
                    form.submit();
                },
                error: function(data) {
                    console.log('error:' + data);
                    // top.postMessage({action: 'search', search: catalogi('#search').val()},'*');
                }
            });

            return false;
        });
    }, 2000);


    //product page
    catalogi('#fitanalytics-size-advisor').unbind('click');
    catalogi('#fitanalytics-size-advisor').click(catalogi.sizeTable)
    catalogi('.shippingCostLink').remove();
    catalogi('.addToWishlist').remove();
    catalogi('#productAjaxDescription').bind('DOMNodeInserted', function(e) {
        //стоимость с учетом доставки
        catalogi.service();
        catalogi('.shippingCostLink').remove();
        catalogi('.addToWishlist').remove();
        if (!catalogi('#addToCartButton').hasClass('checked')) {
            catalogi('#addToCartButton').removeAttr('onclick');
            catalogi('#addToCartButton').click(function(e) {
                var articul = catalogi('#productId>span>span').text().replace(/[ \/]/g, '');

                var name = catalogi('div.brandName[itemprop="brand"]').text() + ' ' + catalogi('div[itemprop="name"]').attr('origin');
                var price = (catalogi('span[itemprop="offers"] span.price.reduced').length === 0) ?
                    catalogi('div.price span.price').text().trim().replace(/[€ ]/g, '') : catalogi('div.price span.reduced').text().trim().replace(/[€ а-яА-Я]/g, '');
                var count = catalogi('#quantityField').val();
                var color = catalogi('#color').val();
                var size = catalogi('#size').val();
                var img = catalogi('#imgLink1').attr('data-image');

                var param = [];

                if (color !== '') {
                    param.push(color);
                }

                if (size !== '') {
                    param.push(size);
                }

                catalogi('.additionalAttribute > select').each(function() {
                    param.push(catalogi(this).val())
                });

                catalogi.basket.add({
                    catalog: 'WZ',
                    articul: articul,
                    name: name,
                    size: param.join(' '),
                    price: price,
                    count: count,
                    img: img
                });

            }).addClass('checked');
        }

    });

    // Подписка
    catalogi.subscribe(false, '30460');

    setTimeout(function() {
        var script = null;
        script = document.createElement('script');
        script.src = "http://www.wenz.catalogi.ru/static/js/kmo.min.js";
        document.getElementsByTagName('head')[0].appendChild(script);
        script = document.createElement('script');
        script.src = "http://www.wenz.catalogi.ru/static/js/kmoquery.min.js";
        document.getElementsByTagName('head')[0].appendChild(script);
        script = document.createElement('script');
        script.src = "http://www.wenz.catalogi.ru/static/js/Product.min.js";
        document.getElementsByTagName('head')[0].appendChild(script);

    }, 1000);

    setTimeout(function() {
        catalogi('.productBoxContainer img').each(function(i, e) {
            var images = JSON.parse(catalogi('#' + $(e).attr('data-original')).text());
            $(e).attr('src', images.MAIN).removeClass('lazyLoad');
        });
    }, 2000);

    // Showing body after hiding
    catalogi('body')
        .delay(1000)
        .queue(function(next) {





            catalogi(this).css('visibility', 'visible');
        });

    catalogi('head')
        .delay(5000)
        .queue(function(next) {

            if (_auth) {
                catalogi('.accountHeaderIcon a')
                    .attr('href', 'http://catalogi.ru/cabinet/');
            } else {
                catalogi('.accountHeaderIcon a').click(function(event) {
                    event.preventDefault();
                    catalogi.login();
                });
            }
        });
};

function desctopSearch(event) {
    if (event.currentTarget) {
        var form = event.currentTarget;
    } else {
        var form = event;
    }


    var value = catalogi(form).find("[name='searchTerm']").val();

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
            catalogi(form).find("[name='searchTerm']").val(data.text[0]);
            form.submit();
        },
        error: function(data) {
            console.log('error:' + data);
            // top.postMessage({action: 'search', search: catalogi('#search').val()},'*');
        }
    });

    return false;
}



function checkBasket() {
    window.clearInterval(window.timer1);
    catalogi('.basket').text('Корзина');

    var ordersNumber = catalogi.cookie('ordersNum');
    if (ordersNumber)
        catalogi('.wording .article .num').text(ordersNumber);
    console.log('ordersNumber: ' + ordersNumber);
    catalogi('#mbflyout-area').remove();

    //  window.timer1 = window.setInterval("checkBasket();", timeout1);
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
    if ('_service' in window) {
        var _price = (catalogi('span[itemprop="offers"] span.price.reduced').length === 0) ?
            catalogi('div.price span.price').text().trim().replace(/[€ ]/g, '') : catalogi('div.price span.reduced').text().trim().replace(/[€ а-яА-Я]/g, '');
        if (_price != '') {
            var _delivery = parseFloat(_price.replace(',', '.')) + ((parseFloat(_price.replace(',', '.')) / 100) * parseFloat(_service));
            if (catalogi('.vatLabel').text() != 'С учетом доставки € ' + _delivery.toFixed(2)) {
                catalogi('.vatLabel').text('С учетом доставки € ' + _delivery.toFixed(2));
            }
        }
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
    currentDomain = getCurrentDomain();



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
    //catalogi.removeShit();
    checkSeach();
});
