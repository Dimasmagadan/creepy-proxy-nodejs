//function _googleTranslateElementInit(){
//    new google.translate.TranslateElement({pageLanguage: 'de', includedLanguages: 'ru', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');
//}

function _googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'de',
        includedLanguages: 'ru',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
}

catalogi.noTranslate = function(){
    // Всплывающая херня
    catalogi('.reveal-modal-bg').remove();
    catalogi('#newsletterPopupContainer').remove();

    // Шапка
    catalogi('.categoryNavListTitle:contains("Marken")').parent().addClass('notranslate');
    catalogi('.categoryNavListTitle:contains("Marken")')
        .delay(500)
        .queue(function (next) {
            $(this).parent().addClass('notranslate');
        });

    catalogi('span.categoryNavLink:contains("Neu!")').text('Новинки!');
    catalogi('span.categoryNavLink:contains("Damen")').text('ЖЕНЩИНАМ');
    catalogi('span.categoryNavLink:contains("Herren")').text('МУЖЧИНАМ');
    catalogi('span.categoryNavLink:contains("Wäsche")').text('БЕЛЬЕ');
    catalogi('span.categoryNavLink:contains("Schuhe")').text('ОБУВЬ');
    catalogi('span.categoryNavLink:contains("Schmuck")').text('УКРАШЕНИЯ');
    catalogi('span.categoryNavLink:contains("Wohnen & Haushalt")').text('ТОВАРЫ ДЛЯ ДОМА');
    catalogi('span.categoryNavLink:contains("Schnäppchen")').text('РАСПРОДАЖА');

    // Меню
    catalogi('.categoryNavESpot').empty();
    catalogi('.categoryProductAttributeContainer').empty();

    // Список
    catalogi('.categoryProductBrand').addClass('notranslate');
    catalogi('#sidebar .gotChild a:contains("Marken")').parent().children(".secondLevelNav").addClass('notranslate');
    catalogi('#brandFilterContainer').addClass('notranslate');

    // Стр. товара
    catalogi('.brandName').addClass('notranslate');
    catalogi('span[itemprop="identifier"]').addClass('notranslate');
    catalogi('#productId').addClass('notranslate');
    if(!catalogi('.productName').is('[origin]')){
        catalogi('.productName').attr('origin', catalogi('.productName').text());
    }

    catalogi('#BVRRSummaryContainer').bind('DOMNodeInserted', function(e){
        catalogi('.bv-rating-stars').addClass('notranslate');
    });
}

catalogi.parse = function(){
    var _addToCart = function() {
        var articul1 = catalogi('span[itemprop="sku"]').text();
        var articul2 = catalogi('span[itemprop="identifier"]').text();
        var articul = (articul1 == "") ? articul2 : articul1;

        var price1   = catalogi('[id^="offerPrice_"]').text().replace('€', '').replace(',', '.').replace('jetzt', '').replace('Сейчас', '').replace('Всё', '').trim();
        var price2   = catalogi('[id^="offerPrice_"] > font > font').text().replace('€', '').replace(',', '.').replace('jetzt', '').replace('Сейчас', '').replace('Всё', '').trim();
        var price = (price1 == "") ? price2 : price1;
           // price = parseInt(price, );

        var name    = catalogi('.productName').attr('origin');
        var color   = catalogi('[name="colorId"]').val();
        var attr    = catalogi('[name="attrId"]').val();
        var size    = catalogi('[name="sizeId"]').val();
        var img     = "http://www.klingel.de"+catalogi('#productImage').attr('src');

        var param   = [];

        if(color && color != ''){
            param.push(color)
        }
        if(attr && attr != ''){
            param.push(attr)
        }
        if(size && size != ''){
            param.push(size)
        }

        catalogi.basket.add({
            catalog: 'KL',
            articul: articul,
            name: name,
            price: price,
            size: param.length > 0 ? param.join(' ') : '0',
            count: 1,
            img: img
        });

        return !1
    }

    // Шапка
    catalogi('#iframe').insertAfter('header');

	// Список
    catalogi('#catalogEntryGrid').bind('DOMNodeInserted', function(e){
        catalogi.noTranslate();
    });

    // Быстрый просмотр
    catalogi('#popupContainer').bind('DOMNodeInserted', function(e){
        catalogi.noTranslate();

        catalogi('#productAjaxDescription').bind('DOMNodeInserted', function(e){
            if(catalogi('#addToCartButton').is('[onclick]')){
                catalogi('#addToCartButton').removeAttr('onclick').on("click", _addToCart);
            }

            // стоимость с учетом доставки
            catalogi.service();
        });

        if(catalogi('#addToCartButton').is('[onclick]')){
            catalogi('#addToCartButton').removeAttr('onclick').on("click", _addToCart);
        }
    });

    // Стр. товара
    catalogi('#productAjaxDescription').bind('DOMNodeInserted', function(e){
        catalogi.noTranslate();
        if(catalogi('#addToCartButton').is('[onclick]')){
            catalogi('#addToCartButton').removeAttr('onclick').on("click", _addToCart);
        }

        // стоимость с учетом доставки
        catalogi.service();
    });


    catalogi('#addToCartButton').removeAttr('onclick').on("click", _addToCart);

    // Отображение body
    catalogi('body').css('visibility', 'visible');

    // Подписка
    catalogi.subscribe(false, '31060');
}

// Скидка
catalogi.service = function(){
    if('_service' in window){
        var _price = catalogi('[id^="offerPrice_"] > font > font').text().replace('€', '').replace(',', '.').trim();
        if(_price != ''){
            var _delivery = parseFloat(_price)+(( parseFloat(_price)/100 )* parseFloat( _service ));
            if( catalogi('.vatLabel').text() != 'С учетом доставки € '+_delivery.toFixed(2) ){
                catalogi('.vatLabel').text('С учетом доставки € '+_delivery.toFixed(2));

                console.log("update: "+_delivery.toFixed(2));
            }
        }
    }
}


catalogi(function(){
	/***
	 * Обработка команд с ifame
	 **/
	catalogi(window).on('message', function(event){
		switch(event.originalEvent.data.action){
			case 'search':
				catalogi('#desktopSearchTerm').val(event.originalEvent.data.search).parents('#headerSearchForm').submit();
				break
		}
		console.log(event.originalEvent.data);
	});	

	catalogi.noTranslate();
	catalogi.parse(); 
});