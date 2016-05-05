/**
 * Created by mihailstepancenko on 16.10.15.
 */

function _googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'de',
        includedLanguages: 'ru',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
}


catalogi.noTranslate = function () {
    // Меню
    catalogi('#available-brand-filters').addClass('notranslate');
    catalogi('.categoryNavLink').addClass('notranslate');

    // Стр. товара
    catalogi('[itemprop="sku"]').addClass('notranslate');
    catalogi('[itemprop="brand"]').addClass('notranslate');
    catalogi('.categoryProductName').addClass('notranslate');
    catalogi('h1[itemprop="name"]').attr('origin', catalogi('h1[itemprop="name"]').text().trim().replace('&nbsp;', ' '));

    // Список товаров
    catalogi('div[id*="productImages-"]').addClass('notranslate');
};

catalogi.parse = function () {
    // Мобильная версия
    // - Логотип
    catalogi('[data-tracky*="MobileLogo"] > div > a').removeAttr('data-reveal-href').removeAttr('onclick').click(function(){
        window.location = 'http://www.mia-moda.catalogi.ru/';
    });
    // - Меню
    catalogi('.mobileMenuText').remove();
    catalogi('a[class="categoryToggle"]:contains("Beratung")').remove();
    // - Корзина
    //catalogi('#mobile_lightCartCountContainer').remove();
    catalogi('#topBarCartButton').removeAttr('href').click(function(){
        catalogi.order();
        return false;
    });
    // - Личный кабинет
    catalogi('#topBarAccountButton').hide()
        .delay(3500)
        .queue(function (next) {
            if(_auth){
                catalogi('#topBarAccountButton').show();
                catalogi('#topBarAccountButton').attr('href','http://catalogi.ru/cabinet/').attr('target','_blank');
            } else {
                catalogi('#topBarAccountButton').show();
                catalogi('#topBarAccountButton').removeAttr('href').click(function(){
                    catalogi.login();
                    return false;
                });
            }
        });

    // Основная версия
    // Шапка
    catalogi('header').empty();
    catalogi("#iframe").appendTo("header");

    // Меню
    catalogi('.navMenuTopCategory1').remove();

    // Список
    catalogi('.quickViewHover').remove();
    catalogi('.categoryAvailabilityHover').remove();
    catalogi('[data-tracky*="Damenmode_Kategorien"]').remove();

    // Стр. товара
    catalogi('.shippingCostLink').remove();
    catalogi('.lowAvailabilityHint').remove();
    catalogi('.productAdditionalLinks').remove();
    catalogi('.hotlineInfo').remove();
    catalogi('.availability24hService').remove();

    //Поправка цветов и размеров
    catalogi('.colorTile > div').removeAttr('onclick');
    catalogi('.colorTile > div').removeAttr('onmouseover');
    catalogi('.colorTile > div').click(function (e) {
        catalogi('.colorTile > div').removeClass('selected');
        catalogi(this).addClass('selected');
        catalogi('span.productColorLabel.attributeLabel > font > font').text(' ' + catalogi(this).attr('title'));
        catalogi('#color').attr('value', catalogi(this).attr('id'));

        var newart;
        for (var prop in colorPartNumbers) {
            if (colorPartNumbers.hasOwnProperty(prop)) {
                if (colorPartNumbers[prop] === catalogi(this).attr('id')) {
                    newart = prop;
                    break;
                }
            }
        }
        catalogi('span[itemprop="sku"]').text(newart.slice(0, 5) + '/' + newart.charAt(5) + newart.slice(-1) + 'X');

    });

    catalogi('.sizeTile > div').removeAttr('onclick');
    catalogi('.sizeTile > div').click(function (e) {
        catalogi('.sizeTile').removeClass('selected');
        catalogi(this).parent().addClass('selected');
        catalogi('span.productSizeLabel.attributeLabel > font > font').text(' ' + catalogi(this).attr('id'));
        catalogi('#size').attr('value', catalogi(this).attr('id'));

    });

    // Стр. товара
    // catalogi('#productAjaxDescription').change(function() {
    //     window.clearTimeout(catalogi(this).data("timeout"));
    //     catalogi(this).data("timeout", setTimeout(function () {
    //         catalogi.parse();
    //         catalogi.service();
    //         console.log('ggwp');
    //     }, 1000));
    // });

    catalogi('#productAjaxDescription').bind('DOMNodeInserted', function (e) {

        //стоимость с учетом доставки
        catalogi.service();

        if (!catalogi('#addToCartButton').hasClass('checked')) {
            catalogi('#addToCartButton').removeAttr('onclick');
            catalogi('#addToCartButton').click(function (e) {
                var articul = catalogi('span[itemprop="sku"]').text().replace(/[ \/]/g, '');
                var name = catalogi('div.brandName[itemprop="brand"]').text() + ' ' + catalogi('h1[itemprop="name"]').attr('origin');
                var price = catalogi('input[name="offerPrice"]').val();
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

                catalogi('.additionalAttribute > select option:selected').each(function () {
                    param.push(catalogi(this).text())
                });

                catalogi.basket.add({
                    catalog: 'MA',
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

    // Футер
    catalogi('#footer').remove();

    // Отображение body
    catalogi('body')
        .delay(800)
        .queue(function (next) {
            catalogi(this).css('visibility', 'visible');
            //catalogi.service();
        });

    // Подписка
    //catalogi.subscribe(false, '30460');
};

// Скидка
catalogi.service = function () {
    if ('_service' in window) {
        var _price = catalogi('input[name="offerPrice"]').val();
        if (_price != '') {
            var _delivery = parseFloat(_price) + (( parseFloat(_price) / 100 ) * parseFloat(_service));
            if (catalogi('.vatLabel').text() != 'С учетом доставки € ' + _delivery.toFixed(2)) {
                catalogi('.vatLabel').text('С учетом доставки € ' + _delivery.toFixed(2));
            }
        }
        //console.log(_price);
    }
};

catalogi(function () {
    var re = /(?:[\s.])([a-z0-9][a-z0-9-]+[a-z0-9])(?:[.\s])/;
    var str = window.location.hostname;
    var m;

    if ((m = re.exec(str)) !== null) {
        if (m.index === re.lastIndex) {
            re.lastIndex++;
        }
        var currentDomain = m[0].replace('.','').replace('.','');
    }

    catalogi('[name="headerSearchForm"]').submit(function( event ) {
        catalogi.cookie('seachString', catalogi('#mobileSearchTerm').val(), { expires: 7, path: '/', domain: '.catalogi.ru' });
        catalogi.ajax({
            url: 'http://cdn.catalogi.ru/executable/actions/_translate.php',
            type: 'get',
            dataType: 'json',
            data: {
                client: 't',
                text: catalogi('#mobileSearchTerm').val(),
                sl: 'ru',
                tl: 'de'
            },
            success: function(data){
                console.log('success:' + data);
                top.postMessage({action: 'search', search: data.text[0]},'*');
            },
            error: function(data){
                console.log('error:' + data);
                top.postMessage({action: 'search', search: catalogi('#mobileSearchTerm').val()},'*');
            }
        });
        event.preventDefault();
    });

    catalogi(window).on('message', function (event) {
        switch (event.originalEvent.data.action) {
            case 'search':
                var goingto = "http://www." + currentDomain + ".catalogi.ru/SearchDisplay?searchTerm=";
                goingto = goingto + event.originalEvent.data.search.toLowerCase().replace(' ', '+');
                window.location = goingto + "&storeId=510004&catalogId=510000&langId=-3&beginIndex=0&sType=SimpleSearch&resultCatEntryType=2&showResultsPage=true&searchSource=Q&pageView=&categoryId=";
                break;

            case 'orderCount':
                catalogi('#topBarCartCount').text(event.originalEvent.data.count);
                break;
        }
        console.log(event.originalEvent.data);
    });
    catalogi.noTranslate();
    catalogi.parse();

    //catalogi('.quickViewHover').remove();

    // Выполняется при прокрутке страницы
    catalogi('body').bind('mousewheel', function(e){
        // Список товаров
        catalogi('div[id*="productImages-"]').addClass('notranslate');

        // Отзывы
        catalogi('.bv-trustmarkIcon').remove();
        catalogi('.bv-write-review').remove();
        catalogi('.bv-content-actions-container').remove();
    });
});