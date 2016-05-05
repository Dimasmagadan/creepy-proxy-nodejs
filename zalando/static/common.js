/**
 * Created by mihailstepancenko on 11.01.16.
 */

//function formatDate(date) {
//    var diff = new Date() - date;
//    var d = date;
//    d = ['0'+d.getDate(),'0'+(d.getMonth()+1),''+d.getFullYear(), '0'+d.getHours(),'0'+d.getMinutes() ];
//    for(var i=0; i<d.length; i++) {
//        d[i] = d[i].slice(-2);
//    }
//
//    return d.slice(0,3).join('.')+' '+d.slice(3).join(':');
//}

function _googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'de',
        includedLanguages: 'ru',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
}

catalogi.noTranslate = function(){
    // Шапка
    catalogi('.metaNaviIcons').addClass('notranslate');
    catalogi('.posWrapper').addClass('notranslate');
    catalogi('.subNav').addClass('notranslate');
    catalogi('#header-search-container').addClass('notranslate');

    // Меню
    catalogi('.navigation').addClass('notranslate');

    // Список брендов
    catalogi('.brandIndex').addClass('notranslate');
    catalogi('div[class*="brandBlock"]').addClass('notranslate');

    // Стр. товара
    catalogi('.boxPrice').addClass('notranslate');
};

catalogi.parse = function(){
    // Шапка
    catalogi('.headerUsp').show();
    catalogi('#iframe').hide();
    catalogi('#cartCountv2').remove();

    // Поиск
    catalogi('#searchContent').attr('class', 'inputText');

    // Корзина
    catalogi('.cartWrapper > a').remove();
    catalogi('.cartWrapper > div').remove();
    catalogi('.cartWrapper').html([
        '<a href="#"><span class="iconFont"></span>',
        '<span class="text">Корзина</span>',
        '</a>'
    ].join('\n'));
    catalogi('.cartWrapper').click(function(){
        catalogi.order();
        return false;
    });

    // Меню
    catalogi('#modalLoginLinkWishList').remove();
    catalogi('#customerAccountBox > a').remove();
    catalogi('#customerAccountBoxLayer').remove();
    catalogi('.cookieAdvice').remove();
    catalogi('.posWrapper p').each(function(){
        catalogi(this).removeAttr('title');
    });
    catalogi('.posWrapper p:eq(0)').html('Интернет магазин <a href="/">ZALANDO.DE</a>');
    catalogi('.posWrapper p:eq(1)').html('<a href="http://www.catalogi.ru">Каталоги.ру</a> Заказ и доставка одежды из европейских интернет-магазинов в Россию');
    catalogi('.posWrapper p:eq(2)').html([
        '<ul>',
        '  <li><a href="#">Интернет-магазины</a></li>',
        '  <li><a href="#">Каталоги</a></li>',
        '  <li><a href="#">Оплата</a></li>',
        '  <li><a href="#">Доставка</a></li>',
        '</ul>'
    ].join('\n'));
    catalogi('.posWrapper p:eq(2) li:eq(0)').click(function(){
        catalogi.shops();
        return false;
    });
    catalogi('.posWrapper p:eq(2) li:eq(1)').click(function(){
        catalogi.catalogs();
        return false;
    });
    catalogi('.posWrapper p:eq(2) li:eq(2)').click(function(){
        catalogi.payment();
        return false;
    });
    catalogi('.posWrapper p:eq(2) li:eq(3)').click(function(){
        catalogi.delivery();
        return false;
    });

    // Стр. товара
    catalogi('.shopTheLookButton').remove();
    catalogi('.expressDeliveryAvailable').remove();
    catalogi('.socialBlock').remove();

    // Добавление в корзину
    catalogi('#ajaxAddToCartBtn').remove();
    catalogi('<div/>', {
        id: 'addToCart',
        class: 'zalButton',
        text: 'Добавить в корзину'
    }).appendTo('.cartButtonBox');

    catalogi("#addToCart").on("click", function(){
        try{
            jQuery("#addToCart").unbind('click');

            var articul = catalogi("#articleSimpleSku").val();
            if (articul == '') {
                alert('Выберите размер!');
                return !1
            }

            var name    = catalogi('span[itemprop="name"]').text();
            var price   = catalogi('#articlePrice').text().replace('€','').trim().replace('.','').replace(',','.');
            //var color   = catalogi('.colorList li.active img').attr('alt').split('- ')[1];
            var color   = '';
            var size    = catalogi("#listProductSizes").find("li.active").text();
            var img   = catalogi('.reactCarousel_item-current > img').attr('src');

            var param   = [];
            if(color && color != ''){
                param.push(color)
            }
            if(size && size != ''){
                param.push(size)
            }

            catalogi.basket.add({
                catalog: 'ZL',
                articul: articul,
                name: name,
                size: (param.join(' ').trim() == '') ? 0 : param.join(' ').trim(),
                price: price,
                count: '1',
                img: img
            });
        } catch(e) {
            console.log(e);
        }

        return false;
    });

    // Футер
    catalogi('.backToTopButton').remove();
    catalogi('#myfeed').remove();
    catalogi('.downTeaser').remove();

    // Отображение body
    catalogi('body')
        .delay(500)
        .queue(function (next) {
            catalogi.service();

            catalogi('#customerAccountBox')
                .append('<img id="_auth_wait" src="http://cdn.catalogi.ru/static/images/loading.gif" border="0" align="middle">');
            catalogi(this).css('visibility', 'visible');
        });
    catalogi('head')
        .delay(5000)
        .queue(function (next) {
            if(_auth){
                catalogi('#_auth_wait').remove();
                catalogi('#customerAccountBox').html([
                    '<a href="http://catalogi.ru/cabinet/" target="_blank">',
                    '<span class="iconFont"></span>',
                    '<span class="text">Личный кабинет</span>',
                    '</a>',
                ].join('\n'));
            } else {
                catalogi('#_auth_wait').remove();
                catalogi('#customerAccountBox').html([
                    '<a href="#">',
                    '<span class="iconFont"></span>',
                    '<span class="text">Вход</span>',
                    '</a>'
                ].join('\n'));
                catalogi('#customerAccountBox > a').click(function(){
                    catalogi.login();
                    return false;
                });
            }
        });

    // Подписка
    catalogi.subscribe(false, '22452');
};

// Стоимоть доставки
catalogi.service = function(){
    if('_service' in window){
        var _price = catalogi('#articlePrice').text().replace('€','').trim().replace('.','').replace(',','.');
        if(_price != ''){
            var _delivery = parseFloat(_price)+(( parseFloat(_price)/100 )* parseFloat( _service ));
            if( catalogi('.inclTax').text() != 'С учетом доставки € '+_delivery.toFixed(2) ){
                catalogi('.inclTax').text('С учетом доставки € '+_delivery.toFixed(2));
            }
        }
    }
};

///*** моб. версия ***/
//catalogi.serviceMob = function(){
//    if('_service' in window){
//        var _price = catalogi('.js-priceWrapper').text().replace(',','.').replace('€','').replace('ab','').replace('от','').trim();
//        if(_price != ''){
//            var _delivery = parseFloat(_price)+(( parseFloat(_price)/100 )* parseFloat( _service ));
//            if( catalogi('.freeShipping').text() != 'С учетом доставки € '+_delivery.toFixed(2) ){
//                catalogi('.freeShipping').text('С учетом доставки € '+_delivery.toFixed(2));
//            }
//        }
//    }
//}


catalogi(function(){
    var re = /(?:[\s.])([a-z0-9][a-z0-9-]+[a-z0-9])(?:[.\s])/;
    var str = window.location.hostname;
    var m;

    if ((m = re.exec(str)) !== null) {
        if (m.index === re.lastIndex) {
            re.lastIndex++;
        }
        var currentDomain = m[0].replace('.','').replace('.','');
    }

    catalogi('.miniSearch').appendTo('#header-search-container');
    catalogi('#searchMiniFormTop').remove();
    catalogi('#searchButtonTopSubmit').click(function() {
        catalogi.cookie('seachString', catalogi('#searchContent').val(), { expires: 7, path: '/', domain: '.catalogi.ru' });
        catalogi.ajax({
            url: 'http://cdn.catalogi.ru/executable/actions/_translate.php',
            type: 'get',
            dataType: 'json',
            data: {
                client: 't',
                text: catalogi('#searchContent').val(),
                sl: 'ru',
                tl: 'de'
            },
            success: function(data){
                console.log('success:' + data);
                top.postMessage({action: 'search', search: data.text[0]},'*');
            },
            error: function(data){
                console.log('error:' + data);
                top.postMessage({action: 'search', search: catalogi('#searchContent').val()},'*');
            }
        });
        return false;
    });

    catalogi(window).on('message', function(event) {
        switch (event.originalEvent.data.action) {
            case 'search':
                var goingto = "http://www." + currentDomain + ".catalogi.ru/katalog/?q=";
                goingto = goingto + event.originalEvent.data.search.toLowerCase().replace(' ', '+');
                window.location = goingto;
                break
        }
        console.log(event.originalEvent.data);
    });

    //catalogi(window).on('message', function(event){
    //    switch(event.originalEvent.data.action){
    //        case 'search':
    //            if(catalogi('#searchContent').length > 0) catalogi('#searchContent').val(event.originalEvent.data.search).parents('form').get(0).submit();
    //            if(catalogi('#searchTop').length > 0) catalogi('#searchTop').val(event.originalEvent.data.search).parents('form').get(0).submit();
    //            break
    //    }
    //    console.log(event.originalEvent.data);
    //});

    catalogi.noTranslate();
    catalogi.parse();
    catalogi.service();
});