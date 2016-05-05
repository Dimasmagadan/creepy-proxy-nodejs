function _googleTranslateElementInit() {
    catalogi.noTranslate();
    new google.translate.TranslateElement({
        pageLanguage: 'de',
        includedLanguages: 'ru',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
}

catalogi.noTranslate = function () {
    // Шапка
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
    catalogi('span[title="SALE"]').addClass('notranslate');
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
    catalogi('.categoryProductName').addClass('notranslate');
    catalogi('[itemprop="name"]').attr('origin', catalogi('div[itemprop="name"]').text().trim().replace('&nbsp;', ' '));

    // Футер
};

catalogi.parse = function () {
    // Шапка
    catalogi('.header').empty();
    catalogi('.metanav_all').empty();
    catalogi("#iframe").appendTo(".header");
    // Список
    // Стр. товара
    // Поправка цветов и размеров

    catalogi('#productAjaxDescription').bind('DOMNodeInserted', function (e) {
    //стоимость с учетом доставки

    });
    catalogi('#mainContent').bind('DOMNodeInserted', function() {catalogi('.quickViewHover').remove();
        catalogi('.categoryAvailabilityHover').remove();});

    catalogi('.outfitProductContainer').each(function() {

        catalogi(this).attr('saved-img', catalogi(this).find('.outfitProductImage img').attr('src'));

    });

    catalogi('.outfitProductContainer').bind('DOMNodeInserted', function(e) {
        catalogi.serviceCustom(catalogi(this))
        catalogi(this).find('.outfitProductImage img').attr('src', catalogi(this).attr('saved-img'));
    });

    catalogi('div#mainContent > div').bind('DOMNodeInserted', function(e) {console.log()});
    // Футер
    catalogi('footer').remove();
    // Отображение body
    catalogi('body').css('visibility', 'visible');

    // Подписка
    catalogi.subscribe(false, '30460');
};

function recalculateTotal() {
    var total = 0;
    catalogi('.outfitProductContainer').each(function() {
        if (catalogi(this).find('.outfitSubmit').is(':checked'))
            total += parseFloat(catalogi(this).find('div.price span.price').text().trim().replace(/[€ ]/g,''));
    });
    caatk

}

// Скидка
catalogi.service = function () {
    if ('_service' in window) {
        var _price = (catalogi('span[itemprop="offers"] span.price.reduced').length === 0) ?
            catalogi('div.price span.price').text().trim().replace(/[€ ]/g,'') : catalogi('div.price span.reduced').text().trim().replace(/[€ а-яА-Я]/g,'');
        if (_price != '') {
            var _delivery = parseFloat(_price) + (( parseFloat(_price) / 100 ) * parseFloat(_service));
            if (catalogi('.vatLabel').text() != 'С учетом доставки € ' + _delivery.toFixed(2)) {
                catalogi('.vatLabel').text('С учетом доставки € ' + _delivery.toFixed(2));
            }
        }
    }
};

catalogi.serviceCustom = function (element) {
    if ('_service' in window) {
        var _price = (element.find('div.price span.price.reduced').length === 0) ? element.find('div.price span.price').text().trim().replace(/[€ ]/g,'') : element.find('div.price span.price.reduced').text().trim().replace(/[€ ]/g,'');
        if (_price != '') {
            var _delivery = parseFloat(_price) + (( parseFloat(_price) / 100 ) * parseFloat(_service));
            if (element.find('.vatLabel').text() != 'С учетом доставки € ' + _delivery.toFixed(2)) {
                element.find('.vatLabel').text('С учетом доставки € ' + _delivery.toFixed(2));
            }
        }
    }
};

catalogi(function () {
    /***
     * Обработка команд с ifame
     **/
    catalogi(window).on('message', function (event) {
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