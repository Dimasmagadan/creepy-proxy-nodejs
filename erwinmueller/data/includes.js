module.exports = function(catalog, param, options){
  return {
    head :[
      '<meta name="google" value="notranslate" />',
      '<meta name="google-translate-customization" content="'+options.translate_hash+'" />',
      '<link href="http://includes.catalogi.ru/new/css/jquery.jscrollpane.css" rel="stylesheet" type="text/css" />',
      '<link href="http://includes.catalogi.ru/new/css/jquery.colorbox.css" rel="stylesheet" type="text/css" />',
      '<link href="http://includes.catalogi.ru/new/css/validationEngine.jquery.css" rel="stylesheet" type="text/css" />',
      '<link href="http://includes.catalogi.ru/new/usernoise/css/button.css" rel="stylesheet" type="text/css" />',
      '<link href="http://includes.catalogi.ru/cat/'+catalog+'/common.css" rel="stylesheet" type="text/css" />',
      '<script type="text/javascript" src="http://yandex.st/jquery/2.1.1/jquery.min.js"></script>',
      '<script type="text/javascript" src="http://includes.catalogi.ru/new/js/jquery.mousewheel.js"></script>',
      '<script type="text/javascript" src="http://includes.catalogi.ru/new/js/jquery.jscrollpane.min.js"></script>',
      '<script type="text/javascript" src="http://includes.catalogi.ru/new/js/jquery.colorbox-min.js"></script>',
      '<script type="text/javascript" src="http://includes.catalogi.ru/new/js/jquery.validationEngine-ru.js"></script>',
      '<script type="text/javascript" src="http://includes.catalogi.ru/new/js/jquery.validationEngine.js"></script>',
      '<script type="text/javascript" src="http://includes.catalogi.ru/new/js/jquery.cookie.js"></script>',
      '<script type="text/javascript">',
      '/* <![CDATA[ */',
      'var usernoiseButton = {',
      '  "text":"Обратная связь", // The text shown on the button',
      '  "class":"un-left un-has-border", // un-left, un-right, un-top and un-bottom define the button positioning, un-has-border - if it will have a border',
      '  "style":"", // You can add some extra CSS rules if you want.',
      '  "windowUrl":"http://includes.catalogi.ru/new/usernoise/index.php", // Please make sure this URL is pointing to your actual Usernoise folder!',
      '  "showButton":"1" // 0 to disable the button and show a window programmatically.',
      '  };',
      '/* ]]> */',
      '</script>',
      '<script type="text/javascript" src="http://includes.catalogi.ru/new/usernoise/js/button.js"></script>',
      '<script type="text/javascript" src="http://includes.catalogi.ru/new/js/common.js"></script>',
      '<script type="text/javascript" src="http://includes.catalogi.ru/cat/'+catalog+'/common.js"></script>',
      '<script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=_googleTranslateElementInit"></script>'
    ].join("\n"),

    frame :[
      '<meta name="google" value="notranslate" />',
      '<meta name="google-translate-customization" content="'+options.translate_hash+'" />',
      '<link href="http://includes.catalogi.ru/new/css/jquery.jscrollpane.css" rel="stylesheet" type="text/css" />',
      '<link href="http://includes.catalogi.ru/new/css/jquery.colorbox.css" rel="stylesheet" type="text/css" />',
      '<link href="http://includes.catalogi.ru/new/css/validationEngine.jquery.css" rel="stylesheet" type="text/css" />',
      '<link href="http://includes.catalogi.ru/cat/'+catalog+'/frame.css" rel="stylesheet" type="text/css" />',
      '<script type="text/javascript" src="http://yandex.st/jquery/2.1.1/jquery.min.js"></script>',
      '<script type="text/javascript" src="http://includes.catalogi.ru/new/js/jquery.mousewheel.js"></script>',
      '<script type="text/javascript" src="http://includes.catalogi.ru/new/js/jquery.jscrollpane.min.js"></script>',
      '<script type="text/javascript" src="http://includes.catalogi.ru/new/js/jquery.colorbox-min.js"></script>',
      '<script type="text/javascript" src="http://includes.catalogi.ru/new/js/jquery.validationEngine-ru.js"></script>',
      '<script type="text/javascript" src="http://includes.catalogi.ru/new/js/jquery.validationEngine.js"></script>',
      '<script type="text/javascript" src="http://includes.catalogi.ru/new/js/jquery.cookie.js"></script>',
      '<script type="text/javascript" src="http://includes.catalogi.ru/new/js/frame.js"></script>',
      '<script type="text/javascript" src="http://includes.catalogi.ru/cat/'+catalog+'/frame.js"></script>',
      '<script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=_googleTranslateElementInit"></script>'
    ].join("\n"),

    mobile :[
      '<meta name="google" value="notranslate" />',
      '<meta name="google-translate-customization" content="'+options.translate_hash+'" />',
      '<link href="http://includes.catalogi.ru/new/css/jquery.colorbox.css" rel="stylesheet" type="text/css" />',
      '<link href="http://includes.catalogi.ru/cat/'+catalog+'/mobile.css" rel="stylesheet" type="text/css" />',
      '<script type="text/javascript" src="http://includes.catalogi.ru/new/params.php?'+param+'"></script>',
      '<script type="text/javascript" src="http://yandex.st/jquery/2.1.1/jquery.min.js"></script>',
      '<script type="text/javascript" src="http://includes.catalogi.ru/new/js/jquery.colorbox-min.js"></script>',
      '<script type="text/javascript" src="http://includes.catalogi.ru/new/js/jquery.cookie.js"></script>',
      '<script type="text/javascript" src="http://includes.catalogi.ru/new/js/mobile.js"></script>',
      '<script type="text/javascript" src="http://includes.catalogi.ru/cat/'+catalog+'/mobile.js"></script>',
      '<script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=_googleTranslateElementInit"></script>'
    ].join("\n"),

    body: {
      top: [
        '<div id="google_translate_element" style="display: none"></div>',
        '<iframe src="http://includes.catalogi.ru/new/index.php?'+param+'" width="'+options.width+'px" height="'+options.height+'px" frameborder="0" name="_head" id="iframe"/>'
      ].join("\n"),

      bottom: [
        '<!--LiveInternet counter--><script type="text/javascript"><!--',
        'document.write("<a href=\'http://www.liveinternet.ru/click;CatalogiRU_NEW\' "+',
        '"target=_blank><img src=\'//counter.yadro.ru/hit;CatalogiRU_NEW?t45.6;r"+',
        'escape(document.referrer)+((typeof(screen)=="undefined")?"":',
        '";s"+screen.width+"*"+screen.height+"*"+(screen.colorDepth?',
        'screen.colorDepth:screen.pixelDepth))+";u"+escape(document.URL)+',
        '";"+Math.random()+',
        '"\' alt=\'\' title=\'LiveInternet\' "+',
        '"border=\'0\' width=\'31\' height=\'31\'><\/a>")',
        '//--></script><!--/LiveInternet-->',
      ].join("\n"),

      mobile: [
        '<div id="google_translate_element" style="display: none"></div>',
        '<iframe src="http://includes.catalogi.ru/new/mobile.php?'+param+'" width="0" height="0" frameborder="0" name="_head" id="iframe"/>'
      ].join("\n"),
    }
  }
}