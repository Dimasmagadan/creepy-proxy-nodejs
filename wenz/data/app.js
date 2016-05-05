var config = require('config'),
    cluster = require('cluster'),
    fs = require('fs');

var SITENAME = config.get('site.name'),
    SITEDOMAIN = config.get('site.domain'),
    SITE = SITENAME + SITEDOMAIN,
    HEADERPARAMS = {
        param: {
            catalog: config.get('header.catalog'),
            alias: config.get('header.alias'),
            info: config.get('header.info')
        },
        options: {
            height: config.get('options.height'),
            width: config.get('options.width')
        }
    };
var replaces = config.get('replaces');

if (cluster.isMaster) {
    console.log('Start master');
    cluster.fork();
    cluster.fork();
    cluster.fork();
    cluster.fork();
    cluster.fork();
    cluster.fork();
    cluster.on('disconnect', function (worker) {
        console.error('Worker disconnect!');
        cluster.fork();
    });

} else {
    console.log("Start worker");
    var http = require("http"),
        request = require("request"),
        replacestream = require("replacestream"),
        querystring = require("querystring"),
        proxy = require("./proxy"),
        includes = require("./includes")(SITENAME, querystring.stringify(HEADERPARAMS.param), HEADERPARAMS.options);

    var j = request.jar();
    var proxiedReq = request.defaults({
        jar: j
    });

    var translates, fsize = 0, fname = "/var/www/translates.json";


    var server = http.createServer(function (req, res) {

        onError = function (err) {
            console.error(err);

            try {
                var killtimer = setTimeout(function () {
                    process.exit(1);
                }, 10);

                killtimer.unref();

                server.close();

                cluster.worker.disconnect();

                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/html; charset=UTF-8');
                res.end('Сервис временно недоступен!');
            } catch (er) {
                console.error('Error sending HTTP response', er, req.url);
            }
        }
        onResponse = function (response) {
            if ('location' in response.headers) response.setHeader('Location', response.headers['location'].replace(SITE, SITENAME + '.catalogi.ru'));

            var _cookie = [];

            if ('set-cookie' in response.headers) {
                _cookie = response.headers['set-cookie'];
                _cookie.push([
                    'googtrans=%2Fde%2Fru; path=/; domain=.catalogi.ru',
                    'googtrans=%2Fde%2Fru; path=/; domain=' + SITENAME + '.catalogi.ru'
                ]);
                res.setHeader('Set-cookie', _cookie);
            } else {
                _cookie.push([
                    'googtrans=%2Fde%2Fru; path=/; domain=.catalogi.ru',
                    'googtrans=%2Fde%2Fru; path=/; domain=' + SITENAME + '.catalogi.ru'
                ]);
                res.setHeader('Set-cookie', _cookie);
            }
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With');
        }
        //was error "no such file"
        //tmp = fs.statSync(fname)["size"];
        //console.log(tmp);
        //if (fsize != tmp) {
        //    fsize = tmp;
        //    translates = JSON.parse(fs.readFileSync(fname, 'utf8'));
        //}


        //console.log('Trying to access: ' + req.headers.host + req.url);

        var _header = {};
        if ('user-agent' in req.headers) _header['User-Agent'] = req.headers['user-agent'];
        if ('content-type' in req.headers) _header['Content-Type'] = req.headers['content-type'];
        if ('cookie' in req.headers) _header['Cookie'] = req.headers['cookie'];
        var host = req.headers.host.replace(SITENAME + '.catalogi.ru', SITE);

        _header['Host'] = host;

        proxyfull = "http://" + proxy() + ":3129";
        //console.log("Accessing via: " + proxyfull);



        var start = new Date();
        //console.log("Method: " + req.method);
        var url = "http://" + host + req.url;
        var piper;


        if ('cookie' in req.headers) {
            var cookies = req.headers.cookie.split(' ');
            for (var i = 0; i < cookies.length; i++) {
                if(cookies[i].split('=')[0] != 'user') {
                    j.setCookie(request.cookie(cookies[i].replace(';', '')), "http://" + host);
                }
            }
        }
        if (req.method === "GET") {
            piper = proxiedReq.get({
                url: url,
                proxy: proxyfull,
            }).on('error', onError).on('response', onResponse).pipe(replacestream(SITE, SITENAME + '.catalogi.ru'));
        }
        else if (req.method === "POST") {
            piper = proxiedReq.post({
                url: "http://" + host + req.url,
                proxy: proxyfull,
            }).on('error', onError).on('response', onResponse).pipe(replacestream(SITE, SITENAME + '.catalogi.ru'));
        }


        replaces.forEach(function (item, i, arr) {
            if (item.type === "usual") {
                piper = piper.pipe(replacestream(item.from, item.to));
            }
            else if (item.type === "regex") {
                piper = piper.pipe(replacestream(new RegExp(item.from, item.args), item.to));
            }
        });
        //translates.forEach(function (item, i, arr) {
        //    if (item.type === "usual") {
        //        piper = piper.pipe(replacestream(item.from, item.to));
        //    }
        //    else if (item.type === "regex") {
        //        piper = piper.pipe(replacestream(new RegExp(item.from, item.args), item.to));
        //    }
        //});

        piper.pipe(replacestream('</body>', includes.body.top + includes.body.bottom + '</body>'))
            .pipe(replacestream('<head>', '<head>' + includes.head))
            .pipe(res);

    }).listen(5050);
}

setInterval(function() {
    global.gc(); // --expose-gc
}, 1000);