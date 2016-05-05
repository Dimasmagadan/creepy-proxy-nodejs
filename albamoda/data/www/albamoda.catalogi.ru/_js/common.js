function _googleTranslateElementInit(){
  catalogi.noTranslate();
  new google.translate.TranslateElement({pageLanguage: 'de', includedLanguages: 'ru', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');
}

catalogi.noTranslate = function(){
  // Шапка
  catalogi('#tnav_sh880130 a.level4').addClass('notranslate');
  catalogi('#tnav_sh25609786 .categoriesList:eq(1) a.level4').addClass('notranslate');
  catalogi('#tnav_sh399557 .categoriesList:eq(1) a.level4').addClass('notranslate');
  catalogi('#tnav_sh579334 .categoriesList:eq(1) a.level4').addClass('notranslate');
  catalogi('#tnav_sh850468 .categoriesList:eq(2) a.level4').addClass('notranslate');
  catalogi('.grepFilter_f_s_brand').addClass('notranslate');
  catalogi('#f_s_brand .dropdown').addClass('notranslate');
  catalogi('.productTextInfo .sheadline span').addClass('notranslate');

  // Список
  if(!catalogi('h1[itemprop="name"]').is('[origin]')){
    catalogi('h1[itemprop="name"]').attr('origin', catalogi('h1[itemprop="name"]').text());
  }
  
  if(!catalogi('.moreOfManufacturerLink').is('.notranslate')){
    catalogi('.moreOfManufacturerLink').addClass('notranslate'); 
    catalogi('.moreOfManufacturerLink').text(catalogi('.moreOfManufacturerLink').text().replace('ab',''));   
  }

  // Стр. товара
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

  // Футер
}

catalogi.parse = function(){
  catalogi('#un-button').text('Связаться с нами');

  //Замена сылок
  catalogi('a').each(function(index, el){
    if(catalogi(this).is('[href]')){
      catalogi(this).attr('href', catalogi(this).attr('href').replace('albamoda.de', 'albamoda.catalogi.ru'));
    }
  });

  // Шапка
  catalogi('header').prepend(catalogi('#_head')); 

  // Список

  // Стр. товара
  catalogi('.pager > a:eq(0)').text('предыдущий товар');
  catalogi('.pager > a:eq(1)').text('следующий');


  if(!catalogi('#showSizeChart').hasClass('cboxElement')){
    catalogi('#showSizeChart').addClass('notranslate');
    catalogi('#showSizeChart').removeAttr('id').attr('href','http://catalogi.ru/header/pages/_size_table.html')
    .colorbox({
      iframe: true,
      innerWidth: 780,
      innerHeight: 520
    }).html('Таблица размеров<span class="rsaquo">›</span>');
  }

  // Футер

  // Обработчик смены контента

  setInterval(function(){
    catalogi('.availabilityInfo').text('К сожалению данный размер распродан');
    catalogi.noTranslate();

    var _price = catalogi('.priceReduced').attr('data-price-computer');
    if(_price != ''){
      var _delivery = parseFloat(_price)+(( parseFloat(_price)/100 )* parseFloat(catalogi('#_head').attr('service')));
      if(!catalogi('.delivery.notranslate').is('span')){
        catalogi('#priceBox').append('<span class="delivery notranslate" style="position: absolute; bottom: 0; right: 0"><span>')
      }

      if( catalogi('.delivery').text() != 'С учетом доставки € '+_delivery.toFixed(2) ){
        catalogi('.delivery').text('С учетом доставки € '+_delivery.toFixed(2));
        catalogi('#priceBox').css({height: '100px'});
      }
    }
  }, 10);

  // Перевод строки поиска
  catalogi('#_searchform').submit(function(){
		catalogi.ajax({
		  url: '/header/actions/_translate.php',
      type: 'get',
      dataType: 'json',
      data: {
        client: 't',
        text: catalogi('#_searchfield').val(),
        sl: 'ru',
        tl: 'de'
      },
      success: function(data){
		    catalogi('#_searchfield').val(data.sentences[0].trans);
        window.location.href = '/suche.html?query='+catalogi('#_searchfield').val();
        //catalogi('#freitextsuche').get(0).submit();
      },
      error: function(data){
        console.log(data)
      }
		});
    return false;
  });

  // Отображение body
  catalogi('body').css('visibility', 'visible');
  catalogi.subscribe();
}

catalogi(document).ready(function(){
  catalogi.parse();
  catalogi.init();
});