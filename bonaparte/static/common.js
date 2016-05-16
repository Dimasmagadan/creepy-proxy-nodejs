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






    //// Шапка
    catalogi('#iframe').hide();
    catalogi('.navigation--entry.entry--notepad').remove();
    catalogi('.navigation--entry.entry--account .account--display').text('Кабинет');
    catalogi('.navigation--entry.entry--account').click(function(event) {
        event.preventDefault();
        catalogi.login();
    });
    catalogi('.navigation--entry.headerHint').children().remove();
    catalogi('.headerHint').css('width', '80%');
    //catalogi('.navigation--entry.headerHint').append(
    //    catalogi("<a> Каталоги.ру - заказ и доставка одежды из интернет-магазина " + currentDomain + "!!!</a>")
    //        .attr('href', 'http://www.catalogi.ru')
    //        .attr('target', '_blank')
    //        .addClass('headerLinks _home catalogiLink')
    //);


    catalogi('ul.service--list').children().remove();
    catalogi('ul.service--list')
        .append($('<li>')
            .addClass('service--entry')
            .append($("<a>")
                .addClass("service--link icon--phone")
                .text('+74955404949')));
    catalogi('ul.service--list')
        .append($('<li>')
            .addClass('service--entry')
            .append($("<a>")
                .addClass("service--link")
                .text('доставка')
                .click(function() {
                    catalogi.delivery();
                })));
    catalogi('ul.service--list')
        .append($('<li>')
            .addClass('service--entry')
            .append($("<a>")
                .addClass("service--link")
                .text('оплата')
                .click(function() {
                    catalogi.payment();
                })));
    catalogi('ul.service--list')
        .append($('<li>')
            .addClass('service--entry')
            .append($("<a>")
                .addClass("service--link")
                .text('интернет-магазины')
                .click(function() {
                    catalogi.shops();
                })));
    catalogi('ul.service--list')
        .append($('<li>')
            .addClass('service--entry')
            .append($("<a>")
                .addClass("service--link")
                .text('онлайн каталоги')
                .click(function() {
                    catalogi.catalogs();
                })));

    catalogi('.shop-sites--navigation').children().remove();
    catalogi('.shop-sites--navigation').append($("<li>").addClass('navigation--entry')
        .append($("<a>").addClass('navigation--link link--go-forward')
            .text("онлайн каталоги").click(function() {
                catalogi.catalogs();
            })));
    catalogi('.shop-sites--navigation').append($("<li>").addClass('navigation--entry')
        .append($("<a>").addClass('navigation--link link--go-forward')
            .text("интернет-магазины").click(function() {
                catalogi.shops();
            })));
    catalogi('.shop-sites--navigation').append($("<li>").addClass('navigation--entry')
        .append($("<a>").addClass('navigation--link link--go-forward')
            .text("оплата").click(function() {
                catalogi.payment();
            })));
    catalogi('.shop-sites--navigation').append($("<li>").addClass('navigation--entry')
        .append($("<a>").addClass('navigation--link link--go-forward')
            .text("доставка").click(function() {
                catalogi.delivery();
            })));
    catalogi('.shop-sites--navigation').append($("<li>").addClass('navigation--entry')
        .append($("<a>").addClass('navigation--link link--go-forward')
            .text("таблица размеров").click(function() {
                catalogi.sizeTable();
            })));

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
        $('#topSection').css('height','10px')
        $('#iframe').insertBefore('.topSection');

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
    try {

        // артикул
        var articul = catalogi('span[class=entry--label]').text();
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
        //var img = catalogi('.image--thumbnails img').first().attr('srcset').split(',')[0];
        var img_normal = catalogi('.image--thumbnails img').first().attr('srcset');
        var img_safari = catalogi('.image--thumbnails img').first().attr('src');
        var img = (img_normal ? img_normal : img_safari).split(',')[0];

        var param = [];
        // цвет
        var color1 = catalogi(catalogi('.configurator--form').children()[2]).text().trim();
        var color2 = "undef";
        var color = (color1 == "") ? color2 : color1;
        if (color && color.length > 0) param.push(color);
        // размер
        var size1 = catalogi(".configurator--form select option[selected='selected']").text().trim();
        var size2 = catalogi('li[class*="selected"]:eq(1)').text();
        var size = ((size1 == "") ? size2 : size1).trim();
        if (size == 'Выберите размер' || size == 'Выберите размер ') {
            alert('Выберите размер!');
            return;
        }
        if (size && size.length > 0) param.push(size);

        // отправка запроса
        catalogi.basket.add({
            catalog: 'AP',
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
    setTimeout(function() {
        if (catalogi('#cboxLoadedContent').length == 0) {
            catalogi.order();
        }
    }, 500);
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
    //catalogi.removeShit();
    checkSeach();
});
