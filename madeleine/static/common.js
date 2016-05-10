function _googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'de',
        includedLanguages: 'ru',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
}

catalogi(document).ready(function(){
    catalogi('.sizetype').click(function() {
        catalogi.service();
        //console.log("click!");
    });
});

catalogi.noTranslate = function() {
    //catalogi('a[class="close sprite2"]').show();

    // Меню
    catalogi('#Main-Navi').addClass('notranslate');

    // Стр. товара
    catalogi('#optionError').addClass('notranslate');
    catalogi('.single-price').addClass('notranslate');
    catalogi('.web12015_Sale').addClass('notranslate');
    catalogi('.sale-price').addClass('notranslate');
    catalogi('.addtocard').addClass('notranslate');
    catalogi('.pagerContainer').addClass('notranslate');
    catalogi('.sf_sizes').addClass('notranslate');

    catalogi('.web12015cont').addClass('notranslate');
    catalogi('.colorFlagWeb12015New').addClass('notranslate');

    catalogi('#sizesRoot .icon_container').addClass('notranslate');
    catalogi('.title-and-price h1').attr('origin', catalogi('.title-and-price h1').text());
    catalogi('#colorParent .icon_container').each(function(index, el) {
        catalogi(this).attr('origin', catalogi(this).attr('title'));
    });

    // Футер
    //catalogi('.big-teaser[style*="margin-bottom: 20px"]').hide();

    // Страница товара
    catalogi('#sizesRoot').addClass('notranslate');
};

catalogi.parse = function() {
    // Шапка
    catalogi('#AcceptCookiesBannerTemplate').remove();
    catalogi('#header').prepend(catalogi('#iframe'));
    catalogi('<li><a href="http://www.madeleine.catalogi.ru/kataloge/blaetterkataloge/">Онлайн каталоги</a></li>').insertBefore(catalogi('a[href="/news-specials/fashion-trends/"]').parent());
    catalogi('a[href="/news-specials/"]').attr('href', 'http://www.madeleine.catalogi.ru/kataloge/blaetterkataloge/').text('Каталоги');

    catalogi('a[href="https://www.madeleine.catalogi.ru/kataloge/kataloganforderung/"]').attr('href', '/kataloge/blaetterkataloge/');
    catalogi('div[onclick*="Flyout:Newsletter"]').attr('onclick','#');
    catalogi('a[href^="https://www.madeleine.catalogi.ru/service/newsletter/"]').attr('href','#');

    // Страница каталогов
    catalogi('a[href="/service/mymadeleine-vorteile/"]').hide();
    catalogi('a[href="/service/freundschaftswerbung/"]').hide();
    catalogi('a[href="/service/boutique-aktionen/"]').hide();
    catalogi('a[href="/service/kataloge/kataloganforderung/"]').hide();
    catalogi('a[href="/service/kundenbewertung/"]').hide();
    catalogi('a[href*="/service/newsletter/"]').hide();
    catalogi('a[href="/service/store-outletaktionen/"]').hide();
    catalogi('a[href="/service/merkzettel/"]').hide();
    catalogi('a[href="/service/"]').hide();
    catalogi('a[href="#"]').hide();
    catalogi('[style*="madeleine-blaetter-kataloge"]').hide();

    // Меню
    catalogi('.fl_col_1 > a > span').text('мода');
    catalogi('.fl_col_2 > a > span').text('обувь & аксессуары');
    catalogi('.fl_col_3 > a > span').text('тренды');
    catalogi('.fl_col_4 > a > span').text('sale');
    catalogi('.fl_col_5').remove();
    catalogi('.fl_col_6').attr('class','fl_main fl_col_6 fl_main_last fl_col_advisory web-11080');
    catalogi('.fl_col_6 > div').remove();
    catalogi('.fl_col_6 > a').attr('href','//madeleine.catalogi.ru/service/kataloge/blaetterkataloge/');
    catalogi('.fl_col_6 > a > span').text('каталоги');

    // Стр. товара
    catalogi('a[class="next"]').eq(0).click(function(event) {
        catalogi.sizeTable();
        return false;
    }).text('Таблица размеров');
    catalogi('.size-standard > span:eq(0)').remove();
    catalogi('.size-standard > span').text('Нормальный');
    catalogi('.size-short > span:eq(0)').remove();
    catalogi('.size-short > span').text('Короткий');
    catalogi('.size-long > span:eq(0)').remove();
    catalogi('.size-long > span').text('Длинный');

    catalogi('#tc-tab503').remove();
    catalogi('.mav3-info-btns').remove();

    // фикс кнопки close в предпросмотре
    catalogi('.close.sprite2').attr('style','');

    // Перевод сообщений
    LocalizedText.Shop_Article_AddToCart_Hint_PleaseSelect = 'Выберите цвет и размер.';
    LocalizedText.Shop_Article_AddToCart_Hint_PleaseSelectSize = 'Пожалуйста, выберите размер.';
    LocalizedText.Shop_Article_AddToCart_Hint_PleaseSelectColor = 'Пожалуйста, выберите цвет';
    LocalizedText.Shop_Article_AddToCart_Hint_Invalid = 'Недопустимая комбинация';

    // Переопределение метода добавление в корзину
    ArticleView.addToCart = function() {
        if (catalogi('.color-size .error').length == 0) {
            var articul = catalogi('#orderNo').text().replace(/ /g, '').trim();
            var name = catalogi('.title-and-price h1').attr('origin');
            var price = catalogi('.single-price').text().replace('€', '').replace(',', '.').trim();
            var color = catalogi('#colorParent .icon_container.active').attr('origin');
            var size = catalogi('#picked_size').text();
            var img = catalogi('.mainImage').attr('src');

            var param = [];
            if (color !== '') {
                param.push(color);
            }
            if (size !== '') {
                param.push(size);
            }

            catalogi.basket.add({
                catalog: 'ML',
                articul: articul,
                name: name,
                size: param.join(' '),
                price: price,
                count: 1,
                img: img
            });
        }
        return false;
    };

    // Отображение body
    catalogi('body').delay(500).queue(function (next) {catalogi(this).css('visibility', 'visible');});

    // Подписки
    catalogi('.img_ts').click(function() {catalogi.subscribe(true, '22452');});
    catalogi('#email').click(function() {catalogi.subscribe(true, '22452');});
    catalogi.subscribe(false, '22452');

    // Футер
    catalogi('.black-impress').remove();
    catalogi('#newletter-social').remove();
};

catalogi.service = function() {
    if('_service' in window){
        catalogi(".single-price").text(function(index, text) {
            console.log("done");
            return text.replace("ab", "от");
        });

        //var _price = catalogi('[name="offerPrice"]').val();
        var _price = catalogi('.single-price').text().replace('от', '').replace('€', '').replace(',', '.').trim();
        if  (_price != '') {
            var _delivery = parseFloat(_price)+(( parseFloat(_price)/100 )* parseFloat( _service ));
            if( catalogi('.addtocard > p').text() != 'С учетом доставки '+_delivery.toFixed(2)+' €' ) {
                catalogi('.addtocard > p').text('С учетом доставки '+_delivery.toFixed(2)+' €');
            }
        }
    }
};

catalogi(function() {
    catalogi(window).on('message', function(event) {
        switch (event.originalEvent.data.action) {
            case 'search':
                var goingto = "http://www.madeleine.catalogi.ru/Suche/Ihre-Suche-";
                goingto = goingto + event.originalEvent.data.search.toLowerCase().replace(' ', '+') + "?SearchType=quicksearch";
                window.location = goingto;
                break
        }
        console.log(event.originalEvent.data);
    });

    catalogi.noTranslate();
    catalogi.parse();
});
