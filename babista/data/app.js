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

  var domain        = require('domain'),
      http          = require('http'),
      url           = require('url'),
      querystring   = require('querystring'),
      proxy         = require('./proxy');


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
        catalog:  'babista',
        alias:    'BB',
        info:     'Интернет-магазин BABISTA. Каталоги.ру - заказ и доставка одежды из европейских интернет-магазинов.'
      };

      if('utm_medium' in query)   param['utm_medium']   =  query['utm_medium'];
      if('utm_source' in query)   param['utm_source']   =  query['utm_source'];
      if('utm_campaign' in query) param['utm_campaign'] =  query['utm_campaign'];

      var includes  = require('./includes')('babista', querystring.stringify(param), '956');

      req.addListener('end', function(){

        /*** Формирование заголовков запроса ***/
        var _header = {};
        if( 'user-agent' in req.headers)    _header['User-Agent']   = req.headers['user-agent'];
        if( 'content-type' in req.headers)  _header['Content-Type'] = req.headers['content-type'];
        if( 'cookie' in req.headers)        _header['Cookie']       = req.headers['cookie'];
        
        // Интеграция хоста в заголовок
        _header['Host'] = 'www.babista.de';

        var request = http.request({
          host:     proxy(),
          port:     3129,
          path:     'http://www.babista.de'+req.url,
          method:   req.method,
          headers: _header
        }, function(response){

          // Заголовки
          if('content-type' in response.headers) res.setHeader('Content-Type', response.headers['content-type']);
          
          if('location' in response.headers) res.setHeader('Location', response.headers['location'].replace('babista.de', 'babista.catalogi.ru'));
          
          if('set-cookie' in response.headers){
            var _cookie = response.headers['set-cookie'];
            _cookie.push([
              'googtrans=%2Fde%2Fru; path=/; domain=.catalogi.ru',
              'googtrans=%2Fde%2Fru; path=/; domain=babista.catalogi.ru'
            ]);
            res.setHeader('Set-cookie', _cookie);
          }else{
            var _cookie = [];
            _cookie.push([
              'googtrans=%2Fde%2Fru; path=/; domain=.catalogi.ru',
              'googtrans=%2Fde%2Fru; path=/; domain=babista.catalogi.ru'
            ]);
            res.setHeader('Set-cookie', _cookie);
          }

          res.writeHead(response.statusCode);

          response.on('data', function(chunk){
            if(res.headersSent){
              var _out = chunk.toString();
              var out = _out.replace(/babista.de/g, 'babista.catalogi.ru');

              out = out.replace('<head>', '<head>'+includes.head);
              out = out.replace('<body>', '<body>'+includes.body.top);
              out = out.replace('</body>', includes.body.bottom+'</body>');

              /*** Замена ***/
              out = out.replace(/\/typo3conf\/ext\/dmc_mb3_product\/images\/601\/de\/btn_into_cart.jpg/g, 'http://includes.catalogi.ru/cat/babista/btn_into_cart.png');


              /*** Переводы ***/
              out = out.replace(/Mode für Männer/g, 'Одежда для мужчин');
              out = out.replace(/Herrenmode reduziert/g, 'Распродажа');
              out = out.replace(/2 für 1/g, '2 по цене 1');
              out = out.replace(/Preisspanne setzen/g, 'Ценовой диапазон');
              out = out.replace(/Art.-Nr./g, 'Артикул:');
              out = out.replace(/Wäsche/g, 'Белье');

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
  
  }).listen(5051);

}

setInterval(function() {
  global.gc(); // --expose-gc
}, 100);