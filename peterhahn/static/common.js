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

// Force use catalogi.service()
catalogi(document).ready(function(){
    catalogi('#phshop-itemsizebox').bind('DOMSubtreeModified', catalogi.service);
});

// No-translate section
catalogi.noTranslate = function() {
    // Head
    catalogi('#nav').addClass('notranslate');
    catalogi('#cookiesdirective').addClass('notranslate');
    catalogi('#suche').addClass('notranslate');

    catalogi('.colorbox > ul').addClass('notranslate');
    catalogi('.navigation-main-item').addClass('notranslate');

    // Product page
    catalogi('.sizes').addClass('notranslate');
    catalogi('#phshop-itemsizebox').addClass('notranslate');
    catalogi('.pinfo').addClass('notranslate');

    catalogi('#leftcol > ul:eq(0)').addClass('notranslate');
    catalogi('#rightcol').children('div').addClass('notranslate');

    catalogi('a[href=#bewertung]').addClass('notranslate');
    catalogi('#bewertung').addClass('notranslate');
};

// Main section
catalogi.parse = function() {
    // Head
    catalogi('#iframe').hide();
    catalogi('#siegel').remove();
    catalogi('.topnav').remove();
    catalogi('.directorder').remove();
    catalogi('#suggestLayer').remove();

    catalogi('body').append([
        '<div id="catalogi-head" class="notranslate" style="top: 0px;">',
        '   <div id="catalogi-headInnerBox">',
        '       <p id="catalogi-head-left">',
        '           <a href="http://catalogi.ru/" class="_home" target="_blank">Каталоги.ру</a> | ',
        '           <a href="#" id="catalogi-shops">Интернет-магазины</a> | ',
        '           <a href="#" id="catalogi-catalogs">Каталоги</a> | ',
        '           <a href="#" id="catalogi-payment">Оплата</a> | ',
        '           <a href="#" id="catalogi-delivery">Доставка</a> | ',
        '           <a href="#" id="catalogi-size-table">Таблица размеров</a>',
        '       </p>',
        '       <a href="#" id="catalogi-head-right"><img id="_auth_wait" src="http://cdn.catalogi.ru/static/images/loading.gif" border="0" align="middle"></a>',
        '       <div class="clearfix"></div>',
        '   </div>',
        '</div>'
    ].join('\n'));
    catalogi('#catalogi-head').prependTo('body');

    catalogi('#catalogi-shops').click(function(){
        catalogi.shops();
        return false;
    });
    catalogi('#catalogi-catalogs').text('Каталоги').click(function(){
        catalogi.catalogs();
        return false;
    });
    catalogi('#catalogi-payment').click(function(){
        catalogi.payment();
        return false;
    });
    catalogi('#catalogi-delivery').click(function(){
        catalogi.delivery();
        return false;
    });
    catalogi('#catalogi-size-table').click(function(){
        catalogi.sizeTable();
        return false;
    });
    catalogi('#catalogi-head-right').append('');

    //catalogi('.impliedsubmitIcon').remove();
    catalogi('#impliedsubmit').empty();

    // Basket
    catalogi('#warenkorb > a > div > div:eq(0)').text('Корзина');
    catalogi('#warenkorb > a > div > div:eq(1)').remove();
    catalogi('#warenkorb > a').attr("href", "#").click(function(){
        catalogi.order();
        return false;
    });

    //catalogi('.topnav').empty();
    //catalogi('#social').empty();
    //catalogi('#vorteilskommunikation').hide();
    //catalogi('#siegel').empty();
    //catalogi('.headerrow').empty();
    //catalogi('#iframe').appendTo('.headerrow');

    //// Menu
    catalogi('#nav').append('<li><div class="upper"><a href="http://catalogi.ru/katalog_peter_hahn/">Каталог</a></div></li>');

    // Body
    //catalogi('#skyscraper').empty(); // баннер справа
    //catalogi('#warenkorbContainer').empty();

    // Product page
    catalogi('a[href=#addtocart]').attr("href", "#addtocartCatalogi").text('В корзину');
    catalogi('a[href="#notepad"]').remove();
    catalogi(".hotline").remove();
    catalogi('.mwst').empty();
    catalogi('.outfitLink').remove();

    catalogi('.c2c').remove();
    catalogi('.form2').remove();

    //catalogi('a[href=#bewertung]').parent().remove();

    // Show body after f@cking hiding >_<
    catalogi('body')
        //.delay(800)
        .queue(function (next) {
            catalogi(this).css('visibility', 'visible');
            //catalogi.service();
    });

    catalogi('head')
        .delay(3000)
        .queue(function (next) {
            if(_auth){
                catalogi('#catalogi-head-right')
                    .html('<a href="http://catalogi.ru/cabinet/" ' +
                        'class="my-account-login underline-alternative" ' +
                        'target="_blank">Личный кабинет</a><a href="#" class="_logout"></a>')
                catalogi('._logout').click(function(){
                    catalogi.logout();
                    return false;
                });

            } else {
                catalogi('#catalogi-head-right').text('Вход').click(function(){
                    catalogi.login();
                    return false;
                });
            }
        });

    // Add to basket own function
    //catalogi('a[href=#addtocartCatalogi]').click(function(){
    catalogi('#rightBox').on('click', '.basketWrap a[href=#addtocartCatalogi]', function(e) {
        if (!$(this).hasClass('fail')) {
            var articul = catalogi('.pinfo > span:eq(1)').text().replace(/[^0-9]/gi, '');

            var name1 = catalogi('#producttitel > h1').text();
            var name2 = catalogi('span[itemprop="name"]:eq(0)').text();
            var name  = (name1 == "") ? name2 : name1;

            var price1 = catalogi('span[itemprop="price"]').text().replace('от', '').replace('EUR', '').replace(',', '.').replace('Всё', '').trim();
            var price2 = catalogi('.pricebox > ul > div').find('.newprice').text().replace('от', '').replace('EUR', '').replace(',', '.').replace('Всё', '').trim();
            var price3 = (price1 == "") ? price2 : price1;
            var price4 = catalogi('.pricebox > ul > div > p').text().replace('Всё', '').replace('от', '').replace('EUR', '').replace(',', '.').trim();
            var price  = (price3 == "") ? price4 : price3;

            var color = catalogi('.colors > li[class="activeSelection"]').attr('title');

            var size1 = catalogi('li[class*="selected"] > a > span').text();
            var size2 = catalogi('.selectAct').text();
            var size  = (size1 == "") ? size2 : size1;

            var img = catalogi('img[class="mainphoto"]:eq(0)').attr('src');

            var param = [];
            if (color !== '') param.push(color);
            if (size !== '')
                param.push(size);
            else {
                alert('Выберите размер!');
                return false;
            }

            catalogi.basket.add({
                catalog: 'PH',
                articul: articul,
                name: name,
                size: param.join(' '),
                price: price,
                count: 1,
                img: img
            });
        } else {
            console.log("fail");
        }
    });

    // Subscribe category id
    catalogi.subscribe(false, '29062');

    // Footer
    catalogi('#footer').remove();
    catalogi('.infotext').remove();
};

catalogi.service = function() {
    if('_service' in window) {
        // Cut useless items
        catalogi('.sizebox > a').remove();
        catalogi('a[href=#addtocart]').attr("href", "#addtocartCatalogi").text('В корзину');

        // Calculate delivery price
        var _price1 = catalogi('span[itemprop="price"]').text().replace('от', '').replace('EUR', '').replace(',', '.').trim();
        var _price2 = catalogi('.pricebox > ul > div').find('.newprice').text().replace('от', '').replace('EUR', '').replace(',', '.').trim();
        var _price3   = (_price1 == "") ? _price2 : _price1;
        var _price4 = catalogi('.pricebox > ul > div > p').text().replace('от', '').replace('EUR', '').replace(',', '.').trim();
        var _price5   = (_price3 == "") ? _price4 : _price3;
        var _price6   = catalogi('.curprice:eq(0)').text().replace('от', '').replace('ab', '').replace('EUR', '').replace(',', '.').trim();
        var _price   = (_price5 == "") ? _price6 : _price5;
        //console.log(_price);

        if(_price != '') {
            var _delivery = parseFloat(_price)+(( parseFloat(_price)/100 )* parseFloat( _service ));
            catalogi('.mwst').text('С учетом доставки '+_delivery.toFixed(2) + ' EUR');
        }
    }
};

catalogi(function() {
    var re = /(?:[\s.])([a-z0-9][a-z0-9-]+[a-z0-9])(?:[.\s])/;
    var str = window.location.hostname;
    var m;

    if ((m = re.exec(str)) !== null) {
        if (m.index === re.lastIndex) {
            re.lastIndex++;
        }
        var currentDomain = m[0].replace('.','').replace('.','');
    }

    // Поиск
    catalogi('#suche').attr('action', '');
    catalogi('input[value="Finden"]').attr('value','Найти');
    catalogi('#suche').find('input[type="submit"]').click(function() {
        catalogi.cookie('seachString', catalogi('#query').val(), { expires: 7, path: '/', domain: '.catalogi.ru' });
        catalogi.ajax({
            url: 'http://cdn.catalogi.ru/executable/actions/_translate.php',
            type: 'get',
            dataType: 'json',
            data: {
                client: 't',
                text: catalogi('#query').val(),
                sl: 'ru',
                tl: 'de'
            },
            success: function(data){
                console.log('success:' + data);
                top.postMessage({action: 'search', search: data.text[0]},'*');
            },
            error: function(data){
                console.log('error:' + data);
                top.postMessage({action: 'search', search: catalogi('#query').val()},'*');
            }
        });
        return false;
    });
    catalogi('#suche > input').removeAttr('placeholder').removeAttr('data-error').removeAttr('data-placeholder');

    catalogi(window).on('message', function(event) {
        switch (event.originalEvent.data.action) {
            case 'search':
                var goingto = "http://www.peterhahn.catalogi.ru/search.php?query=";
                goingto = goingto + event.originalEvent.data.search.toLowerCase().replace(' ', '+');
                window.location = goingto;
                break
        }
        console.log(event.originalEvent.data);
    });

    catalogi.noTranslate();
    catalogi.parse();
    catalogi.service();
});