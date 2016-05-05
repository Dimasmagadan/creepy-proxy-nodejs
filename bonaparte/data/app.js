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
      includes          = require('./includes'),
      proxy             = require('./proxy');


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
        catalog:  'bonaparte',
        alias:    'BP',
        info:     'Интернет-магазин BON`A PARTE. Каталоги.ру - заказ и доставка одежды из европейских интернет-магазинов.'
      };

      var options = {
        translate_hash: 'e24cb3ce8f2ab570-6f3923fdb6ea9d3f-g248c68c312ddd786-15',
        width: 960,
        height: 120
      }

      if('utm_medium' in query)   param['utm_medium']   =  query['utm_medium'];
      if('utm_source' in query)   param['utm_source']   =  query['utm_source'];
      if('utm_campaign' in query) param['utm_campaign'] =  query['utm_campaign'];

      var includes  = require('./includes')('bonaparte', querystring.stringify(param), options);

      req.addListener('end', function(){

        /*** Формирование заголовков запроса ***/
        var _header = {};
        if( 'user-agent' in req.headers)    _header['User-Agent']   = req.headers['user-agent'];
        if( 'content-type' in req.headers)  _header['Content-Type'] = req.headers['content-type'];
        if( 'cookie' in req.headers)        _header['Cookie']       = req.headers['cookie'];


        // Интеграция хоста в заголовок
        _header['Host'] = req.headers['host'].replace('bonaparte.catalogi.ru', 'de.bonaparteshop.com');

        var request = http.request({
          host:     proxy(),
          port:     3129,
          path:     'http://'+req.headers['host'].replace('bonaparte.catalogi.ru', 'de.bonaparteshop.com')+req.url,
          method:   req.method,
          headers: _header
        }, function(response){

          // Заголовки
          if('content-type' in response.headers) res.setHeader('Content-Type', response.headers['content-type']);
          
          if('location' in response.headers) res.setHeader('Location', response.headers['location'].replace('de.bonaparteshop.com', 'bonaparte.catalogi.ru'));
          
          if('set-cookie' in response.headers){
            var _cookie = response.headers['set-cookie'];
            _cookie.push([
              'googtrans=%2Fde%2Fru; path=/; domain=.catalogi.ru',
              'googtrans=%2Fde%2Fru; path=/; domain=bonaparte.catalogi.ru'
            ]);
            res.setHeader('Set-cookie', _cookie);
          }else{
            var _cookie = [];
            _cookie.push([
              'googtrans=%2Fde%2Fru; path=/; domain=.catalogi.ru',
              'googtrans=%2Fde%2Fru; path=/; domain=bonaparte.catalogi.ru'
            ]);
            res.setHeader('Set-cookie', _cookie);
          }

          res.writeHead(response.statusCode);

          response.on('data', function(chunk){
            if(res.headersSent){
              var out = chunk.toString().replace(/de\.bonaparteshop\.com/g, 'bonaparte.catalogi.ru');
              

              // Замена
              out = out.replace(/http:\/\/bonaparte\.catalogi\.ru\/js\/magecoders\/jquery\.colorbox-min\.js/g, '#');
              out = out.replace(/http:\/\/bonaparte\.catalogi\.ru\/skin\/frontend\/default\/bonapartenew\/css\/colorbox\.css/g, '#');
              out = out.replace(/www\.googletagmanager\.com/g, '#');
              out = out.replace(/www\.facebook\.com/g, '#');
              out = out.replace(/jQuery/g, 'catalogi');

              out = out.replace('<head>', '<head>'+includes.head);
              out = out.replace('</body>', includes.body.top+includes.body.bottom+'</body>');

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
  
  }).listen(5053);

}

setInterval(function() {
  global.gc(); // --expose-gc
}, 100);