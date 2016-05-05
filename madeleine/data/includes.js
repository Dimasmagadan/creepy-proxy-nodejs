module.exports = function(catalog, param, options){
    return {
        head :[
            '<meta charset="utf-8">',
            '<meta name="google" value="notranslate" />',
            '<meta name="robots" content="noindex, nofollow"/>',
            '<link href="http://cdn.catalogi.ru/static/css/jquery.jscrollpane.css" rel="stylesheet" type="text/css" />',
            '<link href="http://cdn.catalogi.ru/static/css/jquery.colorbox.css" rel="stylesheet" type="text/css" />',
            '<link href="http://cdn.catalogi.ru/static/css/validationEngine.jquery.css" rel="stylesheet" type="text/css" />',
            '<link href="http://www.'+catalog+'.catalogi.ru/static/common.css" rel="stylesheet" type="text/css" />',
            '<script type="text/javascript" src="http://cdn.catalogi.ru/static/js/jquery-2.1.4.min.js"></script>',
            '<script type="text/javascript" src="http://cdn.catalogi.ru/static/js/jquery.mousewheel.js"></script>',
            '<script type="text/javascript" src="http://cdn.catalogi.ru/static/js/jquery.jscrollpane.min.js"></script>',
            '<script type="text/javascript" src="http://cdn.catalogi.ru/static/js/jquery.colorbox-min.js"></script>',
            '<script type="text/javascript" src="http://cdn.catalogi.ru/static/js/jquery.validationEngine-ru.js"></script>',
            '<script type="text/javascript" src="http://cdn.catalogi.ru/static/js/jquery.validationEngine.js"></script>',
            '<script type="text/javascript" src="http://cdn.catalogi.ru/static/js/jquery.cookie.js"></script>',
            '<script type="text/javascript" src="http://cdn.catalogi.ru/static/js/common.js"></script>',
            '<script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=_googleTranslateElementInit"></script>',
            '<script type="text/javascript" src="http://www.'+catalog+'.catalogi.ru/static/common.js"></script>',
            '<noindex><script async src="data:text/javascript;charset=utf-8;base64,ZnVuY3Rpb24gZ2V0Q29va2llKG5hbWUpIHsKCXZhciBjb29raWUgPSAnICcgKyBkb2N1bWVudC5jb29raWU7Cgl2YXIgc2VhcmNoID0gJyAnICsgbmFtZSArICc9JzsKCXZhciBzZXRTdHIgPSBudWxsOyAKCXZhciBvZmZzZXQgPSAwOwoJdmFyIGVuZCA9IDA7CglpZiAoY29va2llLmxlbmd0aCA+IDApIHsKCQlvZmZzZXQgPSBjb29raWUuaW5kZXhPZihzZWFyY2gpOwoJCWlmIChvZmZzZXQgIT0gLTEpIHsKCQkJb2Zmc2V0ICs9IHNlYXJjaC5sZW5ndGg7CgkJCWVuZCA9IGNvb2tpZS5pbmRleE9mKCc7Jywgb2Zmc2V0KQoJCQlpZiAoZW5kID09IC0xKSB7CgkJCQllbmQgPSBjb29raWUubGVuZ3RoOwoJCQl9CgkJCXNldFN0ciA9IHVuZXNjYXBlKGNvb2tpZS5zdWJzdHJpbmcob2Zmc2V0LCBlbmQpKTsKCQl9Cgl9CglyZXR1cm4oc2V0U3RyKTsKfQpmdW5jdGlvbiBteWxvYWQoYTEsYTIpIHsKCXNldFRpbWVvdXQoZnVuY3Rpb24oKSB7CgkJdmFyIGEzID0gZG9jdW1lbnQ7CgkJYTQgPSBhMy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF07CgkJYTUgPSBhMy5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTsKCQlhNiA9IGVzY2FwZShhMy5yZWZlcnJlcik7CgkJYTUudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnOwoJCWE1LmFzeW5jID0gdHJ1ZTsKCQlhNS5zcmMgPSBhMisnP3VpZD0nK2ExKycmYTY9JythNisnJmE3PScrbG9jYXRpb24uaG9zdCsnJmE4PScrZ2V0Q29va2llKCdteTF3aXRpZCcrYTEpKycmYTk9JytNYXRoLnJhbmRvbSgpOwoJCWE0LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGE1LCBhNCk7Cgl9LDEpCn0gbXlsb2FkKCcxNDY2MjcnLCdodHRwOi8vdXNlci5pZC1kZXRlY3Rvci5ydS92azEvc3RlcDEucGhwJyk7"></script></noindex>',
        ].join("\n"),

        headbottom: [
            '<link href="http://www.'+catalog+'.catalogi.ru/static/rewrite.css" rel="stylesheet" type="text/css" />'
        ].join("\n"),

        body: {
            top: [].join("\n"),

            bottom: [
                '<div id="google_translate_element" style="display: none"></div>',
                '<iframe src="http://cdn.catalogi.ru/executable/index.php?'+param+'" width="'+options.width+'px" height="'+options.height+'px" frameborder="0" name="_head" id="iframe"/>'
            ].join("\n")
        }
    }
};