var cluster = require('cluster');

if(cluster.isMaster){
  console.log('Start master');
  cluster.fork();
  cluster.fork();
  cluster.fork();
  cluster.fork();

  cluster.on('disconnect', function(worker) {
    console.error('Worker disconnect!');
    cluster.fork();
  });

}else{
  console.log('Start worker');

  var domain            = require('domain'),
      http              = require('http'),
      url               = require('url'),
      querystring       = require('querystring'),
      Iconv             = require('iconv').Iconv,
      includes          = require('./includes'),
      proxy             = require('./proxy');

  var iconv             = new Iconv('latin1', 'utf-8');

  var server = http.createServer(function(req, res){

    var errHandler = domain.create();

    errHandler.on('error', function(err){
      console.error('error', err.stack);

      try{
        var killtimer = setTimeout(function() {
          process.exit(1);
        }, 10);

        killtimer.unref();

        server.close();

        cluster.worker.disconnect();

        res.statusCode = 500;
        res.setHeader('Content-Type','text/html; charset=UTF-8');
        res.end('Сервис временно недоступен!');
      }catch(er){
        console.error('Error sending HTTP response', er, req.url);
      }
    });

    errHandler.add(req);
    errHandler.add(res);

    errHandler.run(function(){
      var _post     = '';

      req.addListener("data", function(data){
        _post += data;
      });

      var query = querystring.parse(url.parse(req.url).query);
      var param = {
        catalog:  'erwinmueller',
        alias:    'ER',
        info:     'Интернет-магазин ERWIN MULLER. Каталоги.ру - заказ и доставка одежды из европейских интернет-магазинов.'
      };

      var options = {
        translate_hash: 'f99efe6b9d6539ab-dd0527119c6d1aa3-gec840948a9850441-18',
        width: 960,
        height: 108
      }

      if('utm_medium' in query)   param['utm_medium']   =  query['utm_medium'];
      if('utm_source' in query)   param['utm_source']   =  query['utm_source'];
      if('utm_campaign' in query) param['utm_campaign'] =  query['utm_campaign'];

      var includes  = require('./includes')('erwinmueller', querystring.stringify(param), options);

      req.addListener('end', function(){

        /*** Формирование заголовков запроса ***/
        var _header = {};
        if( 'accept' in req.headers)            _header['Accept']           = req.headers['accept'];
        if( 'user-agent' in req.headers)        _header['User-Agent']       = req.headers['user-agent'];
        if( 'content-type' in req.headers)      _header['Content-Type']     = req.headers['content-type'];
        if( 'cookie' in req.headers)            _header['Cookie']           = req.headers['cookie'].replace('erwinmueller.catalogi.ru', 'erwinmueller.com');
        if( 'content-length' in req.headers)    _header['Content-Length']   = req.headers['content-length'];
        if( 'origin' in req.headers)            _header['Origin']           = req.headers['origin'].replace('erwinmueller.catalogi.ru', 'de.erwinmueller.com');
        if( 'referer' in req.headers)           _header['Referer']          = req.headers['referer'].replace('erwinmueller.catalogi.ru', 'de.erwinmueller.com');
        if( 'x-requested-with' in req.headers)  _header['X-Requested-With'] = req.headers['x-requested-with'];


        // Интеграция хоста в заголовок
        _header['Host'] = req.headers['host'].replace('erwinmueller.catalogi.ru', 'de.erwinmueller.com');

        var request = http.request({
          // host:     req.headers['host'].replace('erwinmueller.catalogi.ru', 'de.erwinmueller.com'),
          host:     proxy(),
          port:     3129,
          path:     'http://'+req.headers['host'].replace('erwinmueller.catalogi.ru', 'de.erwinmueller.com')+req.url,
          //path:     req.url,
          method:   req.method,
          headers: _header
        }, function(response){

          // Заголовки
          if('content-type' in response.headers) res.setHeader('Content-Type', response.headers['content-type'].replace('ISO-8859-1','UTF-8'));
          
          if('location' in response.headers) res.setHeader('Location', response.headers['location'].replace('de.erwinmueller.com', 'erwinmueller.catalogi.ru'));
          
          if('set-cookie' in response.headers){
            var _cookie = response.headers['set-cookie'].map( function(item){ return item.replace('erwinmueller.com', 'erwinmueller.catalogi.ru'); } );
            console.log(_cookie);
            _cookie.push([
              'googtrans=%2Fde%2Fru; path=/; domain=.catalogi.ru',
              'googtrans=%2Fde%2Fru; path=/; domain=erwinmueller.catalogi.ru'
            ]);
            res.setHeader('Set-cookie', _cookie);
          }else{
            var _cookie = [];
            _cookie.push([
              'googtrans=%2Fde%2Fru; path=/; domain=.catalogi.ru',
              'googtrans=%2Fde%2Fru; path=/; domain=erwinmueller.catalogi.ru'
            ]);

            res.setHeader('Set-cookie', _cookie);
          }

          res.writeHead(response.statusCode);

          response.on('data', function(chunk){
            if(res.headersSent){
              var _out = iconv.convert(chunk).toString();
              var out = _out.replace(/de\.erwinmueller\.com/g, 'erwinmueller.catalogi.ru');
              

              // Замена
              out = out.replace(/charset=iso-8859-1/g, 'charset=UTF-8');
              out = out.replace(/\/shop-system\/(.*)\/images\/head\/reiter_zuhause-a_de.jpg/g, 'http://includes.catalogi.ru/cat/erwinmueller/reiter_zuhause-a.jpg');
              out = out.replace(/\/shop-system\/(.*)\/images\/head\/reiter_zuhause_de.png/g, 'http://includes.catalogi.ru/cat/erwinmueller/reiter_zuhause.png');
              out = out.replace(/\/shop-system\/DE_DEFAULT_NEU\/images\/landingpage\/reiter_em_inaktiv_de.png/g, 'http://includes.catalogi.ru/cat/erwinmueller/reiter_zuhause.png');
              out = out.replace(/\/shop-system\/(.*)\/images\/head\/reiter_tisch_kueche-a_de.jpg/g, 'http://includes.catalogi.ru/cat/erwinmueller/reiter_tisch_kueche-a.jpg');
              out = out.replace(/\/shop-system\/(.*)\/images\/head\/reiter_tisch_kueche_de.png/g, 'http://includes.catalogi.ru/cat/erwinmueller/reiter_tisch_kueche.png');
              out = out.replace(/\/shop-system\/DE_DEFAULT_NEU\/images\/landingpage\/reiter_tk_inaktiv_de.png/g, 'http://includes.catalogi.ru/cat/erwinmueller/reiter_tisch_kueche.png');
              out = out.replace(/\/shop-system\/(.*)\/images\/head\/reiter_kinder-a_de.jpg/g, 'http://includes.catalogi.ru/cat/erwinmueller/reiter_kinder-a.jpg');
              out = out.replace(/\/shop-system\/(.*)\/images\/head\/reiter_kinder_de.png/g, 'http://includes.catalogi.ru/cat/erwinmueller/reiter_kinder.png');
              out = out.replace(/\/shop-system\/DE_DEFAULT_NEU\/images\/landingpage\/reiter_ki_inaktiv_de.png/g, 'http://includes.catalogi.ru/cat/erwinmueller/reiter_kinder.png');
              out = out.replace(/www\.googletagmanager\.com/g, '#');
              out = out.replace(/www\.facebook\.com/g, '#');

              out = out.replace(/<span>Wäsche & Homewear/g, '<span>Нижнее белье');
              out = out.replace(/<span>Kochen & Backen/g, '<span>Кастрюли');
              out = out.replace(/<span>Kochen & Backen/g, '<span>Для ванной');
              out = out.replace(/<span>Wäsche &amp; Homewear/g, '<span>Белье & одежда');
              out = out.replace(/<span>Special/g, '<span>Новинки');
              out = out.replace(/<span>Essen &amp; Trinken/g, '<span>Посуда и бокалы');
              out = out.replace(/<span>Kochen &amp; Backen/g, '<span>Готовим &amp; печем');
              out = out.replace(/<span>Wohnen/g, '<span>Для дома');
              out = out.replace(/<span>Baden &amp; Pflegen/g, '<span>Для ванной');
              out = out.replace(/<span>Baden & Pflegen/g, '<span>Для ванной');

              if(req.method = 'GET' && req.url.search('artikel_tabview') == -1 && req.url.search('zoom-test2') == -1 && req.url.search('mobile') == -1 ){
                out = out.replace('<head>', '<head>'+includes.head);
                out = out.replace('</body>', includes.body.top+includes.body.bottom+'</body>');
              }else if(req.method = 'GET' && req.url.search('mobile') > -1){
                out = out.replace('<head>', '<head>'+includes.mobile);
                out = out.replace('</body>', includes.body.mobile+'</body>');
              }else if(req.method = 'GET' && req.url.search('artikel_tabview') > -1){
                out = out.replace('<head>', '<head>'+includes.frame);
              }
              
              res.write(out);
            }
          });

          response.on('end', function(){
            res.end();
          });
        });

        request.on('error', function(err) {
          throw new Error('Marke request error - '+err.message);
        });

        request.write(_post);
        request.end();
      });    
    });
  
  }).listen(5059);

}

setInterval(function() {
  global.gc(); // --expose-gc
}, 100);