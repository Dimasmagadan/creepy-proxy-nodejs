function _googleTranslateElementInit() {
    catalogi.noTranslate();
    new google.translate.TranslateElement({
        pageLanguage: 'de',
        includedLanguages: 'ru',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
}

catalogi.noTranslate = function() {
    // Шапка
    catalogi('img[itemprop="logo"]').attr('src', 'http://catalogi.ru/images/site/logo.png')
        //catalogi('.categoryNavList').addClass('notranslate');
        //catalogi('.headerContentContainer').addClass('notranslate');
    catalogi('span:contains("Neu")').text('Новинки');
    catalogi('span:contains("Damen")').text('Женщинам');
    catalogi('span:contains("Herren")').text('Мужчинам');
    catalogi('span:contains("Marken")').text('Бренды');
    catalogi('span:contains("Schuhe")').text('Обувь');
    catalogi('span:contains("Wäsche")').text('Белье');
    catalogi('span:contains("Schmuck & Uhren")').text('Бижутерия');
    catalogi('span:contains("Wohnen")').text('Декор');
    catalogi('.categoryNavESpot').addClass('notranslate');
    catalogi('.categoryNavESpot a').text('Каталог');
    catalogi('span[title="SALE"]').addClass('notranslate');
    catalogi('.accountHeaderIcon').addClass('notranslate');
    catalogi('.accountHeaderIcon .headerIconText').text('Кабинет');
    catalogi('#miniShopCart').addClass('notranslate');
    catalogi('#miniShopCart .headerIconText').text('Корзина');
    catalogi('#categoryNavigation > div > ul > li.last.categoryNavESpot > div > p > a').attr('href', '');
    // Список
    //console.log(catalogi('title').text() + ' ' + catalogi('title').text().search(/marken/i));
    if (catalogi('title').text().search(/marken/i) >= 0) {
        catalogi('.secondLevelNav').addClass('notranslate');
        catalogi('.secondLevelNav > li > ul').addClass('translate');
    }
    catalogi('#available-brand-filters').addClass('notranslate');
    // Стр. товара
    catalogi('[itemprop="brand"]').addClass('notranslate');
    //catalogi('.categoryProductName').addClass('notranslate');
    catalogi('.categoryProductBrand').addClass('notranslate');
    catalogi('[itemprop="name"]').attr('origin', catalogi('div[itemprop="name"]').text().trim().replace('&nbsp;', ' '));

    // Футер
};

catalogi.parse = function() {

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

    // Удаляем оригинальное меню с подпиской
    catalogi('#newsletterPopupContainer').remove();
    catalogi('.reveal-modal-bg').remove();

    // Шапка
    catalogi('.categoryNavESpot a')
        .css('color', 'white')
        .attr('onclick', '')
        .attr('href', 'http://catalogi.ru/katalog_wenz/');
    catalogi('.categoryNavESpot a').attr('href', 'http://catalogi.ru/katalog_wenz/');

    catalogi("#iframe").hide();
    catalogi('.leafletHeaderIcon').remove();
    // Show body after f@cking hiding >_<
    catalogi('body')
        .delay(800)
        .queue(function(next) {



            $(this).css('visibility', 'visible');
            console.log('visible');
        });

    catalogi('#miniShopCart').unbind('click');
    catalogi('#miniShopCart').bind('click', function() {
        top.postMessage({
            action: 'basket'
        }, '*');
        return false;
    });
    catalogi('div.main-menu.mobile').remove();
    catalogi('div.miniCartAmountContainer').remove();
    // Список
    catalogi('.quickViewHover').remove();
    catalogi('.categoryAvailabilityHover').remove();

    //главная страница
    catalogi('.generatedLink').each(function() {
        var lnk = catalogi(this).attr('data-reveal-href').split('&');
        catalogi(this).attr('href', lnk[lnk.length - 1].substr(4).replace(/%2f/g, '/').replace(/%3a/g, ':'));
        catalogi(this).attr('data-reveal-href', catalogi(this).attr('href'));
    });


    setTimeout(function() {
        //search  headerSearchForm
        catalogi('#headerSearchForm').attr('onsubmit', '');
        catalogi('#headerSearchForm').submit(function(event) {

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


    //catalogi('a[onclick*="Katalog"]').attr('href', 'http://catalogi.ru/katalog_view.php?url=wenz');
    catalogi('div[data-tracky*="Facebook"]').remove();

    catalogi('#outfitPrice');

    // Стр. товара
    catalogi('div.reveal-modal.modal-OutfitDetail-Popup').attr('id', 'popupContainer');
    catalogi('a[data-reveal-=""]').attr('data-reveal-id', 'popupContainer');

    catalogi('#productAjaxDescription').bind('DOMNodeInserted', function(e) {
        //стоимость с учетом доставки
        catalogi.service();

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

    catalogi('#mainContent').bind('DOMNodeInserted', function() {
        catalogi('.quickViewHover').remove();
        catalogi('.categoryAvailabilityHover').remove();
    });

    catalogi('.outfitProductContainer').each(function() {

        catalogi(this).attr('saved-img', catalogi(this).find('.outfitProductImage img').attr('src'));

    });

    catalogi('.outfitProductContainer').bind('DOMNodeInserted', function(e) {
        catalogi.serviceCustom(catalogi(this));
        catalogi('[itemprop="brand"]').addClass('notranslate');
        catalogi(this).find('.outfitProductImage img').attr('src', catalogi(this).attr('saved-img'));
        recalculateTotal();
        catalogi(this).find('.outfitSubmit').unbind('onchange');
        catalogi(this).find('.outfitSubmit').bind('onchange', recalculateTotal());


        if (!catalogi('#outfitAddToCart').hasClass('checked')) {
            catalogi('#outfitAddToCart').removeAttr('onclick');
            catalogi('#outfitAddToCart').click(function(e) {

                catalogi('.outfitProductContainer').each(function() {

                    var articul = catalogi(this).find('span[itemprop="identifier"]').text().replace(/[ \/]/g, '');
                    if (articul === "") return;
                    var name = '[Outfit: ' + catalogi.urlParam('outfitId') + '] ' + catalogi(this).find('div.brandName[itemprop="brand"]').text() + ' ' + catalogi(this).find('div[itemprop="name"]').text();
                    var price = (catalogi(this).find('span[itemprop="offers"] span.price.reduced').length === 0) ?
                        catalogi(this).find('div.price span.price').text().trim().replace(/[€ ]/g, '') : catalogi(this).find('div.price span.reduced').text().trim().replace(/[€ а-яА-Я]/g, '');
                    var count = 1;
                    var color = '';
                    var size = catalogi(this).find('span.productSizeLabel.attributeLabel').text().trim().replace(/[\D]/g, '');
                    var img = 'http://wenz.catalogi.ru' + catalogi(this).find('div.outfitProductImage > a > img').attr('src');

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

                });


            }).addClass('checked');
        }
    });

    catalogi('div#mainContent > div').bind('DOMNodeInserted', function(e) {
        console.log()
    });
    // Футер
    catalogi('.footer').remove();

    // Подписка
    catalogi.subscribe(false, '30460');


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

function recalculateTotal() {
    var total = 0;
    catalogi('.outfitProductContainer').each(function() {
        if (catalogi(this).find('.outfitSubmit').is(':checked'))
            var _price = (catalogi(this).find('div.price span.price.reduced').length === 0) ? catalogi(this).find('div.price span.price').text().trim().replace(/[€ ]/g, '') : catalogi(this).find('div.price span.price.reduced').text().trim().replace(/[€ а-яА-Я]/g, '');
        if (!isNaN(parseFloat(_price)))
            total += parseFloat(_price);
    });
    total.toPrecision(2);
    catalogi('#outfitPrice').text('€ ' + total.toFixed(2));

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

catalogi.serviceCustom = function(element) {
    if ('_service' in window) {
        var _price = (element.find('div.price span.price.reduced').length === 0) ? element.find('div.price span.price').text().trim().replace(/[€ ]/g, '') : element.find('div.price span.price.reduced').text().trim().replace(/[€ а-яА-Я]/g, '');
        if (_price != '') {
            var _delivery = parseFloat(_price.replace(',', '.')) + ((parseFloat(_price.replace(',', '.')) / 100) * parseFloat(_service));
            if (element.find('.vatLabel').text() != 'С учетом доставки € ' + _delivery.toFixed(2)) {
                element.find('.vatLabel').text('С учетом доставки € ' + _delivery.toFixed(2));
            }
        }

        var _priceTotal = catalogi('#outfitPrice').text().trim().replace(/[€ ]/g, '');
        if (_priceTotal != '') {
            var _delivery = parseFloat(_priceTotal.replace(',', '.')) + ((parseFloat(_priceTotal.replace(',', '.')) / 100) * parseFloat(_service));
            if (catalogi('div.outfitPriceListing > span.vatLabel').text() != 'С учетом доставки € ' + _delivery.toFixed(2)) {
                catalogi('div.outfitPriceListing > span.vatLabel').text('С учетом доставки € ' + _delivery.toFixed(2));
            }
        }
    }
};

catalogi.urlParam = function(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    } else {
        return results[1] || 0;
    }
};

catalogi(function() {
    /***
     * Обработка команд с ifame
     **/
    catalogi(window).on('message', function(event) {
        switch (event.originalEvent.data.action) {
            case 'search':

                catalogi('#desktopSearchTerm').val(event.originalEvent.data.search).parents('form').submit();
                break;

            case 'orderCount':
                catalogi('#miniCartAmount').text(event.originalEvent.data.count);
                break;
        }
        console.log(event.originalEvent.data);
    });

    _googleTranslateElementInit();
    catalogi.noTranslate();
    catalogi.parse();

});
