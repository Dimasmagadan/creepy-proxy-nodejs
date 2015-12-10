/**
 * Created by mihailstepancenko on 02.12.15.
 */

function _googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'de',
        includedLanguages: 'ru',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
}

// Force use catalogi.service()
catalogi(document).ready(function(){
    catalogi(".product-variant-options").bind("DOMSubtreeModified", function() {
        catalogi('.price-save-tag').remove();
        catalogi('.price-save').remove();
        catalogi.service();
        catalogi.removeShit();
    });
});

catalogi.noTranslate = function(){
    // Меню
    catalogi("span:contains('Top Marken')").parent().parent().addClass('notranslate');

    // Все остальное
    catalogi('.brands-main-title').addClass('notranslate');
    catalogi('.all-brands-container').addClass('notranslate');
};

catalogi.parse = function() {
    // Шапка
    catalogi('#iframe').hide();
    catalogi('.my-account').remove();
    catalogi('#account-nav > li > a').attr('href', '#');
    catalogi('#wishlist-link').remove();

    // Разное
    catalogi('a[href*="/impressionen/de/login"]').parent().parent().remove();
    catalogi('a[href*="agb#Preise"]').parent().remove(); //Ссылка про НДС

    // Каталоги
    catalogi('#content-main > article:eq(1)').remove();
    catalogi('a[href="/impressionen/de/service/katalogbestellung"]').remove();

    // Меню
    catalogi('a[data-etracker-event*="Header, Metanavi, Direkt bestellen"]').attr('href', '#').attr('class', 'catalogi-shops').removeAttr('data-etracker-event').removeAttr('data-etracker-campaign');
    catalogi('a[data-etracker-event*="Header, Metanavi, Katalog bestellen"]').attr('href', '#').attr('class', 'catalogi-catalogs').removeAttr('data-etracker-event').removeAttr('data-etracker-campaign');
    catalogi('a[data-etracker-event*="Header, Metanavi, Newsletter "]').attr('href', '#').attr('class', 'catalogi-payment').removeAttr('data-etracker-event').removeAttr('data-etracker-campaign');
    catalogi('.catalogi-payment').parent().parent().clone().appendTo('#meta-nav > ul');
    catalogi('.catalogi-payment:eq(1)').attr('class', 'catalogi-delivery');
    catalogi('.catalogi-payment').parent().parent().clone().appendTo('#meta-nav > ul');
    catalogi('.catalogi-payment:eq(1)').attr('class', 'catalogi-size-table');

    catalogi('.catalogi-shops > span').text('Интернет-магазины').click(function(){
        catalogi.shops();
        return false;
    });
    catalogi('.catalogi-catalogs > span').text('Каталоги').click(function(){
        catalogi.catalogs();
        return false;
    });
    catalogi('.catalogi-payment > span').text('Оплата').click(function(){
        catalogi.payment();
        return false;
    });
    catalogi('.catalogi-delivery > span').text('Доставка').click(function(){
        catalogi.delivery();
        return false;
    });
    catalogi('.catalogi-size-table > span').text('Таблица размеров').click(function(){
        catalogi.sizeTable();
        return false;
    });

    // Корзина
    catalogi('#minicart-data').remove();
    catalogi('a[title*="Warenkorb"]').attr('href', '#').click(function(){
        catalogi.order();
        return false;
    });
    catalogi('a[title*="Warenkorb"] > span:eq(0)').text('Корзина');
    catalogi('a[title*="Warenkorb"] > span:eq(2)').load('http://cdn.catalogi.ru/executable/actions/_order_count.php');

    // Страница товара
    catalogi('#add-to-watchlist-button').remove();
    catalogi('#quick-shopper').remove();
    catalogi('.product-helper-guides').remove();
    catalogi('.product-button-panel').append(catalogi('.add-to-cart-button'));
    catalogi('.product-button-panel > form > div:eq(1)').remove();

    // Добавление в корзину
    catalogi('.add-to-cart-button').click(function(event){
        try{
            // артикул
            var articul 	= catalogi('.js-display-variant-number').text();
            // название
            var name 		= shop.product.name;
            // количество
            var count   	= catalogi("input.quantity").val();
            // цена
            var price       = catalogi('.price-formatted').text().replace('€','').trim();
            // картинка
            var img         = catalogi('.js-display-variant-primary-image').attr('content');

            var param = [];

            // цвет
            var color1 		= catalogi('#product-color-dropdown > span > span:eq(0)').text();
            var color2 		= catalogi('li[class*="selected"]:eq(0)').attr('title');
            var color 		= (color1 == "") ? color2 : color1;
            if (color && color.length > 0) param.push(color);

            // размер
            var size1 		= catalogi('.product-size-dropdown > div > span > span:eq(0)').text();
            var size2		= catalogi('li[class*="selected"]:eq(1)').text();
            var size 		= ((size1 == "") ? size2 : size1).trim();
            if (size == 'Выберите размер' || size == 'Выберите размер ') {
                alert('Выберите размер!');
                return;
            }
            if (size && size.length > 0) param.push(size);

            // отправка запроса
            catalogi.basket.add({
                catalog: 'IM',
                articul: articul,
                name: name,
                size: (param.join(' ').trim() == '') ? 0 : param.join(' ').trim(),
                price: price,
                count: count,
                img: img
            });

            console.log('OK');
        } catch(e) {
            console.log(e);
        }
        return false;
    });

    // Футер
    catalogi('#seo-text').remove();
    catalogi('#page-footer').remove();

    // Show body after f@cking hiding >_<
    catalogi('body')
        .delay(900)
        .queue(function (next) {
            catalogi(this).css('visibility', 'visible');
            catalogi('.product-size-guide').remove();
            catalogi('.price-save-tag').remove();
            catalogi('.price-save').remove();
            catalogi('a[href*="/impressionen/de/login"]').parent().parent().remove();
        });

    catalogi('head')
        .delay(3000)
        .queue(function (next) {
            if(_auth){
                catalogi('#account-nav > li > a').text('Выход');
                catalogi('#account-nav > li > a').attr('href', 'http://catalogi.ru/cabinet/');
                catalogi('#account-nav > li > a').click(function(){
                    catalogi.logout();
                    return false;
                });
            } else {
                catalogi('#account-nav > li > a').click(function(){
                    catalogi.login();
                    return false;
                });
                catalogi('#account-nav > li > a').text('Вход');
            }
        });
};

// Скидка
catalogi.service = function(){
    if('_service' in window && catalogi('.js-display-variant-price')){
        _price = catalogi('.price-formatted').text().replace('€','').trim();
        _delivery = parseFloat(_price)+(( parseFloat(_price)/100 )* parseFloat( _service ));
        catalogi('.product-shipping-costs').text('С учетом доставки € '+_delivery.toFixed(2));
    }
};

// Удаляем трекеры/аналитику
catalogi.removeShit = function(){
    catalogi('script[src*="criteo"]').remove();
    catalogi('script[src*="adserverpub"]').remove();
    catalogi('script[src*="eu-sonar"]').remove();
    catalogi('script[src*="adnxs"]').remove();
    catalogi('script[src*="adscale"]').remove();
    catalogi('script[src*="yieldlab"]').remove();
    catalogi('script[src*="doubleclick"]').remove();
    catalogi('script[src*="fonts"]').remove();

    console.log('> ADshit removed.');
};

// On load
catalogi(function(){
    catalogi(window).on('message', function(event) {
        switch (event.originalEvent.data.action) {
            case 'search':
                var goingto = "http://www.impressionen.catalogi.ru/impressionen/de/s?_sb=true&query=";
                goingto = goingto + event.originalEvent.data.search.toLowerCase().replace(' ', '+');
                window.location = goingto;
                break
        }
        console.log(event.originalEvent.data);
    });

    catalogi.noTranslate();
    catalogi.parse();
    catalogi.removeShit();
});