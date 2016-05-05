function _googleTranslateElementInit(){
    new google.translate.TranslateElement({pageLanguage: 'de', includedLanguages: 'ru', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');
}

catalogi.noTranslate = function(){
    // Меню
    catalogi('.navleiste').addClass('notranslate');

    // Список брендов
    if(!catalogi('h1[itemprop="name"]').is('[origin]')){
        catalogi('h1[itemprop="name"]').attr('origin', catalogi('h1[itemprop="name"]').text());
    }
    if(!catalogi('.moreOfManufacturerLink').is('.notranslate')){
        catalogi('.moreOfManufacturerLink').addClass('notranslate');
        catalogi('.moreOfManufacturerLink').text(catalogi('.moreOfManufacturerLink').text().replace('ab',''));
    }

    // Стр. товара
    //catalogi('.borderBox').addClass('notranslate');
    catalogi('.changeOutfit').addClass('notranslate');
    catalogi('#showAvailMatrix').addClass('notranslate');
    catalogi('.pager').addClass('notranslate');
    if(!catalogi('#quickLookHeader b').is('[origin]')){
        catalogi('#quickLookHeader b').attr('origin', catalogi('#quickLookHeader b').text());
    }

    catalogi('.productName').each(function(){
        if(!catalogi(this).is('[origin]')){
            catalogi(this).attr('origin', catalogi(this).text());
        }
    });

    catalogi('#modelSelector li').each(function(){
        if(!catalogi(this).is('[origin]')){
            catalogi(this).attr('origin', catalogi(this).attr('title'));
        }
    });

    if(!catalogi('#modelSelector em').is('[origin]')){
        catalogi('#modelSelector em').attr('origin', catalogi('#modelSelector em').text());
    }

    catalogi('.chooseModel li').each(function(){
        if(!catalogi(this).is('[origin]')){
            catalogi(this).attr('origin', catalogi(this).text());
        }
    });
};

catalogi.parse = function(){
    // Шапка
    catalogi('#headerbanner').remove();
    catalogi('#suchBox').remove();
    catalogi('#jubilaeum').remove();
    catalogi('.lmPromo').remove();
    catalogi('.miniBasket').remove();
    catalogi('header').prepend(catalogi('#iframe'));

    // Страница товара
    catalogi('.pager > a:eq(0)').text('< предыдущий товар');
    catalogi('.pager > a:eq(1)').text('следующий товар >');
    if(!catalogi('#showSizeChart').hasClass('cboxElement')){
        catalogi('#showSizeChart').addClass('notranslate');
        catalogi('#showSizeChart').removeAttr('id').attr('href','http://catalogi.ru/header/pages/_size_table.html')
            .colorbox({
                iframe: true,
                innerWidth: 780,
                innerHeight: 520
            }).html('Таблица размеров<span class="rsaquo">›</span>');
    }
    catalogi('#merken').remove();
    catalogi('#showDictionaryTerms').remove();
    catalogi('#printArticleInformation').remove();
    catalogi('#showAvailMatrix').parent().remove();
    catalogi('.oldPrice').remove();

    catalogi('.basketButton').remove();
    catalogi('<a />', {
        id: 'basketAdd',
        class: 'button basketButton',
        text: 'Добавить в корзину',
        href: '#',
        onclick: 'return false;'
    }).appendTo( "#ads_bg" );
    catalogi('<span />', {"class": 'bagLogo'}).appendTo( ".basketButton" );

    catalogi('.outfitComplete').remove();
    catalogi('.outfitStyles').attr("style", "");

    // Разное
    catalogi('.callback').remove();
    catalogi('#similarArticle').remove();
    catalogi('.showProductQuickLook').remove();

    // Футер
    catalogi('footer').remove();

    // Добавление в корзину
    catalogi('#basketAdd').click(function(e) {
        var articul = catalogi('#articleNumberWithPromotionCode').val();
        var name = catalogi('#infoHeader > h1').text();
        var price = catalogi('.priceContent > span:eq(0)').text().replace(',','.').replace('EUR','').trim();

        if (catalogi(".sizeSelectorNew").find('input').attr('type') != 'hidden') {
            var size = catalogi('li[class*="chosenItem"]').attr('data-size');
            if (!size) {
                alert('Выберите размер!');
                return false;
            }
        }
        if (catalogi( ".selectPromoItemImg" ).length) {
            var color = catalogi('li[class*="aktiv"]').attr('alt');
            if (!color) {
                alert('Выберите цвет!');
                return false;
            }
            articul = catalogi('li[class*="aktiv"]').attr('data-articleno-promo');
        }

        var img = catalogi('#largeImage').find('img').attr('src');

        var param   = [];
        if(color && color != ''){
            param.push(color)
        }
        if(size && size != ''){
            param.push(size)
        }

        catalogi.basket.add({
            catalog: 'AM',
            articul: articul,
            name: name,
            price: price,
            size: (param.join(' ').trim() == '') ? 0 : param.join(' ').trim(),
            count: 1,
            img: img
        });
        return false;
    });

    // Отображение body
    catalogi('body').css('visibility', 'visible');

    // Подписка
    catalogi.subscribe(false, '41980');
};

// Скидка
catalogi.service = function(){
    if('_service' in window){
        var _price = catalogi('.priceContent > span:eq(0)').text().replace(',','.').replace('EUR','').trim();
        if(_price != ''){
            catalogi('.shipping').remove();
            catalogi('<span />', {"class": 'shipping'}).insertAfter( ".priceContent" );

            var _delivery = parseFloat(_price)+(( parseFloat(_price)/100 )* parseFloat( _service ));
            if( catalogi('.shipping').text() != 'С учетом доставки € '+_delivery.toFixed(2) ){
                catalogi('.shipping').text('С учетом доставки € '+_delivery.toFixed(2));
            }
        }
    }
};

catalogi(document).ready(function(){
    catalogi('.infoSelects').click(function() {
        setTimeout(function() {catalogi.service();}, 1000);
    });

    var re = /(?:[\s.])([a-z0-9][a-z0-9-]+[a-z0-9])(?:[.\s])/;
    var str = window.location.hostname;
    var m;

    if ((m = re.exec(str)) !== null) {
        if (m.index === re.lastIndex) {
            re.lastIndex++;
        }
        var currentDomain = m[0].replace('.','').replace('.','');
    }

    catalogi(window).on('message', function(event) {
        switch (event.originalEvent.data.action) {
            case 'search':
                var goingto = "http://www." + currentDomain + ".catalogi.ru/suche.html?query=";
                goingto = goingto + event.originalEvent.data.search.toLowerCase().replace(' ', '+');
                window.location = goingto;
                break
        }
        console.log(event.originalEvent.data);
    });

    catalogi.noTranslate();
    catalogi.parse();
});