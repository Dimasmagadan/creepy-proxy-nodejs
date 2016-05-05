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

    catalogi('.product-size-dropdown').addClass('notranslate');
};

catalogi.parse = function() {
    //// Шапка
    catalogi('#iframe').hide();
    catalogi('.navigation--entry.entry--notepad').remove();
    catalogi('.navigation--entry.entry--account .account--display').text('Кабинет');
    catalogi('.navigation--entry.entry--account').click(function(event) {
        event.preventDefault();
        catalogi.login();
    });


    //страница товара
    catalogi('.buybox--button').remove();
    catalogi('.buybox--button-container').append($('<button>')
        .addClass('buybox--button block btn is--primary is--icon-right is--center is--large')
        .text("В корзину")
        .click(function() {
            addToCart();
        }));






    // Подписка
    catalogi.subscribe(false, '31818');


    // Showing body after hiding
    catalogi('body')
        .delay(1000)
        .queue(function(next) {

            catalogi('.navigation--entry.entry--cart').remove();
            var basketBtn = $("<li>")
                .addClass('navigation--entry entry--cart')
                .attr('role', 'menuitem');
            basketBtn.html("<a class='btn is--icon-left cart--link'" + " href='http://www.apart-fashion.catalogi.ru/checkout/cart' title='покупка'>" +
                "<span class='cart--display '><font><font>покупка</font></font></span>" + "<i class='icon--basket '></i>" +
                "<span class='account--display '><font><font>Корзина</font></font></span></a>");
            catalogi('.navigation--list.block-group').append(basketBtn);
            catalogi('.navigation--entry.entry--cart .cart--amount')
                .removeClass().addClass('account--display')
                .css('font-weight', 'normal!important')
                .text('Корзина');
            //catalogi('.navigation--entry.entry--cart a').off();
            catalogi('.navigation--entry.entry--cart').click(function(event) {
                event.preventDefault();
                catalogi.order();
            });
            checkBasket();

            if (catalogi('.buybox--button')) {
                setInterval(function() {
                    catalogi('.buybox--button').remove();
                    catalogi('.buybox--button-container').append($('<button>')
                        .addClass('buybox--button block btn is--primary is--icon-right is--center is--large')
                        .text("В корзину")
                        .click(function(event) {
                            event.stopPropagation();
                            addToCart();
                        }));
                }, 1000);
            }

            // if (catalogi("[data-include='http://www.janvanderstorm.catalogi.ru/basket']").children().length == 0) {
            //     catalogi("[data-include='http://www.janvanderstorm.catalogi.ru/basket']").html("<div class='minibasket-area'>" +
            //         "<a class='wkempty' ><span class='minibasketicon'><span class='glyphicon basket'>Корзина</span>" +
            //         "</span><span class='wording'><span class='basket'>Корзина</span><span class='article'>" +
            //         "<span class='num'>0</span><span class='text'>Artikel</span></span></span></a></div>");
            //     catalogi('a[title*="Warenkorb"]').attr('href', '#').click(function(event) {
            //         event.preventDefault();
            //         catalogi.order();
            //         setTimeout(function() {
            //             catalogi('#cboxLoadedContent').css('width', catalogi('#cboxLoadedContent').css('width').replace('px', '') + 40 + 'px');
            //             catalogi('#cboxLoadedContent').css('height', catalogi('#cboxLoadedContent').css('height').replace('px', '') + 40 + 'px');
            //         }, 500);
            //
            //         //return false;
            //     });
            //     catalogi('.basket').text('Корзина');
            //
            // }



            catalogi(this).css('visibility', 'visible');
        });

    catalogi('head')
        .delay(5000)
        .queue(function(next) {

            if (_auth) {
                catalogi('.navigation--entry.entry--account').off();
                catalogi('.navigation--entry.entry--account a')
                    .attr('href', "http://catalogi.ru/cabinet/")
                    .attr('target', '_blank');
            } else {

            }
        });
};

function addToCart() {
    try {

        // артикул
        var articul = "<a href='" + window.location.href + "' target='_blank'>" +
            catalogi('span.entry--label').text() + "</a>";
        // название
        var name = catalogi('.product--info > h1.product--title').text().trim();
        // количество
        var count = catalogi('#sQuantity').val();
        // цена
        var price = catalogi('.product--price')
            .first()
            .text()
            .replace('€', '')
            .replace('*', '')
            .replace(',', '.')
            .trim();
        // картинка
        var img = catalogi('.image--thumbnails img').first().attr('srcset').split(',')[0];
        var param = [];

        // цвет
        var color1 = catalogi(catalogi('.configurator--form').children()[2]).text().trim();
        var color2 = "undef"
        var color = (color1 == "") ? color2 : color1;
        if (color && color.length > 0) param.push(color);

        // размер
        var size1 = catalogi(".configurator--form select option[selected='selected'").text().trim();
        var size2 = catalogi('li[class*="selected"]:eq(1)').text();
        var size = ((size1 == "") ? size2 : size1).trim();
        if (size == 'Выберите размер' || size == 'Выберите размер ') {
            alert('Выберите размер!');
            return;
        }
        if (size && size.length > 0) param.push(size);

        // отправка запроса
        catalogi.basket.add({
            catalog: 'APART-FASHION.DE',
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
    if ('_service' in window && catalogi('.pricearea .price .value')) {
        catalogi('#deliveryPriceDiv').remove();
        _price = catalogi('.pricearea .price .value').text().replace('€', '').replace(',', '.').trim();
        _delivery = parseFloat(_price) + ((parseFloat(_price) / 100) * parseFloat(_service));
        catalogi('.pricearea').append($('<div></div>').attr('id', 'deliveryPriceDiv').text('С учетом доставки € ' + _delivery.toFixed(2)));
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

    catalogi('.main-search--form').submit(function(event) {

        var form = event.currentTarget;

        var value = catalogi(form).find("[name='sSearch']").val();

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
                catalogi(form).find("[name='sSearch']").val(data.text[0]);
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
