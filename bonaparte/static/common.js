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
    catalogi('.navigation--entry.headerHint').addClass('notranslate');
    catalogi('.product-size-dropdown').addClass('notranslate');
};

catalogi.parse = function() {





    //юр страницы
    catalogi('footer.footer-main').remove();


    //страница товара
    if (catalogi('.buybox--button')) {
        catalogi('.buybox--button').replaceWith(
            $("<a>В корзину</a>")
            .addClass('notranslate')
            .attr('id', 'addToCartBtn')
            //  .attr('href', '#')
            .bind('click', function(event) {
                //  event.preventDefault();
                addToCart();
            }).bind('tap', function(event) {
                //    event.preventDefault();
                addToCart();
            })

        );
    }
    if (catalogi('.buybox--button')) {
        setInterval(function() {
            if (catalogi('.buybox--button')) {
                catalogi('.link--notepad').remove();
                catalogi.service();
                catalogi('.buybox--button').replaceWith(
                    $("<a>В корзину</a>")
                    .addClass('notranslate')
                    //.addClass('buybox--button block btn is--primary is--icon-right is--center is--large')
                    .attr('id', 'addToCartBtn')
                    //  .attr('href', '#')
                    .bind('click', function(event) {
                        //  event.preventDefault();
                        addToCart();
                    }).bind('tap', function(event) {
                        //    event.preventDefault();
                        addToCart();
                    })

                );
            }
        }, 100);
    }
    // catalogi('.buybox--button').remove();
    // catalogi('.buybox--button-container').append($('<button>')
    //     .addClass('buybox--button block btn is--primary is--icon-right is--center is--large')
    //     .text("В корзину")
    //     .click(function() {
    //         addToCart();
    //     }));


    catalogi('div.product--configurator').append($('<div></div>')
        .text('Таблица размеров').css('cursor', 'pointer').click(function(event) {
            event.preventDefault();
            catalogi.sizeTable();
        }));

    catalogi('.link--notepad').remove();

    //cтраница категории
    catalogi('.action--note').remove();

    // Подписка
    catalogi.subscribe(false, '31818');


    // Showing body after hiding
    catalogi('body')
        .delay(1000)
        .queue(function(next) {

        $('#iframe').show();
        $('#iframe').css('width','100%');
        $('#TopImageMap').remove();
        $('.additionalMenu').remove();
        $('#top').remove();
        $('#languageMenu').remove();
        $('#dropDownCartBoxTitle').remove();
        $('.topSection').css('height','10px')
        $('#iframe').insertBefore('.topSection');
        $('.topLineLink').css('font-size','12px');
        $('.wideFooter').remove();
        $('.ssBox').replaceWith('<div id="ssBox" class="ssBox"><form action="/search" class="search"><div class="ssBoxTextDiv"><input name="ctl00$topMenu$searchBoxUc$ssBoxTextBox" type="text" value="Поиск" title="введите слово для поиска" class="ssBoxTextBox keepValue" autocomplete="off"></div></form><div class="ssBoxButtonDiv"><input class="searchButton"></div></div>');


        $('.searchButton').bind('click', function(event) {
            console.log("aaaa");
        })

    $('.search').unbind();
    $('.search').children().off();
    $('.search').find("*").off();

        //add to cart button
        $('.addToCart').replaceWith('<div id="divAddToCart" class="itemButton addToCart"><input value="Добавить в корзину"  type="button" class="bigButton addToCartButton"></div>');
            $('.addToCartButton').bind('click', function(event) {
                //  event.preventDefault();
                addToCart();
            })

            catalogi('.navigation--entry.headerHint').children().remove();
            catalogi('.navigation--entry.headerHint').text("");
            catalogi('.navigation--entry.headerHint').append($("<a> Каталоги.ру - заказ и доставка одежды из интернет-магазина apart-fashion.de.</a>")
                .attr('href', 'http://www.catalogi.ru')
                .attr('target', '_blank')
                .addClass('headerLinks _home catalogiLink'));


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

    console.log("aaaa");
    try {

        // артикул
        var articul = catalogi('#ctl00_ContentRegion_ctl04_descriptionLabel > ul > li:nth-child(1)').first().text().trim().replace("Номер заказа: ", "");
        // название
        var name = catalogi('.headline').text().trim();
        // количество
        var count = '1';
        // цена
        var price = catalogi('.priceStor')
            .first()
            .text()
            .replace('€', '')
            .replace('*', '')
            .replace(',', '.')
            .replace('EUR ', '')
            .trim();
        // картинка
        //var img = catalogi('.image--thumbnails img').first().attr('srcset').split(',')[0];
        var img = catalogi('#ctl00_ContentRegion_megaThemeImage').attr('src');

        var param = [];
        // цвет

        var color = catalogi('#ctl00_ContentRegion_ctl03_variantRepeater_ctl00_variantOptionDropDownList > option').filter(":selected").text();

        // размер

        var size = catalogi('#ctl00_ContentRegion_ctl03_variantRepeater_ctl01_variantOptionDropDownList > option').filter(":selected").text();

        // отправка запроса
        catalogi.basket.add({
            catalog: 'BP',
            articul: articul,
            name: name,
            size: color + " " + size,
            price: price,
            count: count,
            img: img
        });
        console.log('OK');
    } catch (e) {
        console.log(e);
    }
    setTimeout(function() {
            catalogi.order();
    }, 800);
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
    if ('_service' in window && catalogi('p.product--tax')) {
        catalogi('p.product--tax').children().remove();
        _price = catalogi('.product--price')
            .first()
            .text()
            .replace('€', '')
            .replace('*', '')
            .replace(',', '.')
            .trim();
        _delivery = parseFloat(_price) + ((parseFloat(_price) / 100) * parseFloat(_service));
        catalogi('p.product--tax').text('С учетом доставки € ' + _delivery.toFixed(2));
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
    currentDomain = getCurrentDomain();


        catalogi('.search').submit(function(event) {
        var form = event.currentTarget;
        var value = catalogi(form).find("[name='ctl00$topMenu$searchBoxUc$ssBoxTextBox']").val();
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
                catalogi(form).find("[name='ctl00$topMenu$searchBoxUc$ssBoxTextBox']").val(data.text[0]);
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
                var goingto = "http://www." + currentDomain + ".catalogi.ru/Pages/Search.aspx?search=";
                goingto = goingto + event.originalEvent.data.search.toLowerCase().replace(' ', '+');
                window.location = goingto;
                break
        }
        //console.log(event.originalEvent.data);
    });

    catalogi.noTranslate();
    catalogi.parse();
    //catalogi.removeShit();
    checkSeach();
});




