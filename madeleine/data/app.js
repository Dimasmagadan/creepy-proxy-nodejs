/**
 * Created by mihailstepancenko on 22.04.16.
 */


/**
 * @return {boolean}
 */
function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

/**
 * Load config
 */
var config = require('config');
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
var translates, fsize = 0;

/**
 * Start server
 */
var cluster = require('cluster');
if (cluster.isMaster) {
    // start master instarnce
    console.log('Start master');

    var fs = require('fs');
    var clusersConf = JSON.parse(fs.readFileSync("/var/www/global-config.json", 'utf8'));

    if(clusersConf.server.cpuBased) {
        var os = require('os');
        var procNum = os.cpus();
        var forkNum = procNum.length;
    } else {
        var forkNum = clusersConf.server.clusersNum;
    }

    for (var i = 0; i < forkNum; i++) {
        cluster.fork();
    }

    cluster.on('disconnect', function (worker) {
        console.error('Worker disconnect!');
        cluster.fork();
    });
} else {
    // start cluster instarnce
    console.log("+ worker");

    var http = require("http"),
        request = require("request"),
        replacestream = require("replacestream"),
        querystring = require("querystring"),
        proxy = require("./proxy"),
        includes = require("./includes")(SITENAME, querystring.stringify(HEADERPARAMS.param), HEADERPARAMS.options);

    request.defaults({followAllRedirects:true});

    var j = request.jar();
    var proxiedReq = request.defaults({
        jar: j
    });

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
        };
        onResponse = function (response) {
            if ('location' in response.headers)
                response.setHeader('Location', response.headers['location']
                    .replace(SITENAME + '.scoopcatalogue.de', 'c.' + SITENAME + '.catalogi.ru')
                    .replace(SITE, SITENAME + '.catalogi.ru'));

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
        };

        // load translates
        request.get('http://translates.catalogi.ru/temp/' + SITENAME + '.json', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                tmp = response.headers['content-length'];
                if (IsJsonString(body)) {
                    if (fsize != tmp) {
                        fsize = tmp;
                        translates = JSON.parse(body, 'utf8');
                    }
                }
            }
        });

        // set headers
        var _header = {};
        if ('user-agent' in req.headers)
            _header['User-Agent'] = req.headers['user-agent'];
        if ('content-type' in req.headers)
            _header['Content-Type'] = req.headers['content-type'];
        if ('cookie' in req.headers)
            _header['Cookie'] = req.headers['cookie'];

        var host = req.headers.host
            .replace('c.' + SITENAME + '.catalogi.ru', SITENAME + '.scoopcatalogue.de')
            .replace(SITENAME + '.catalogi.ru', SITE);
            _header['Host'] = host;

        // set cookies
        if ('cookie' in req.headers) {
            var cookies = req.headers.cookie.split(' ');
            for (var i = 0; i < cookies.length; i++) {
                j.setCookie(request.cookie(cookies[i].replace(';', '')), "http://" + host);
            }
        }

        // proxyng trafic
        var piper;
        var url = "http://" + host + req.url;
        proxyfull = "http://" + proxy() + ":3129";
        if (req.method === "GET") {
            piper = proxiedReq.get({
                url: url,
                proxy: proxyfull
            }).on('error', onError).on('response', onResponse).pipe(replacestream(SITE, SITENAME + '.catalogi.ru'));
        }
        else if (req.method === "POST") {
            piper = proxiedReq.post({
                url: url,
                proxy: proxyfull
            }).on('error', onError).on('response', onResponse).pipe(replacestream(SITE, SITENAME + '.catalogi.ru'));
        }

        // replaces from config
        replaces.forEach(function (item, i, arr) {
            if (item.type === "usual") {
                piper = piper.pipe(replacestream(item.from, item.to));
            }
            else if (item.type === "regex") {
                piper = piper.pipe(replacestream(new RegExp(item.from, item.args), item.to));
            }
        });

        // replaces from translates
        if (translates && translates.length) {
            translates.forEach(function (item, i, arr) {
                if (item.type === "usual") {
                    piper = piper.pipe(replacestream(item.from, item.to));
                }
                else if (item.type === "regex") {
                    var from = "(^|[^\\/?$])\\b(" + item.from + ")\\b";
                    var to = "$1" + item.to;
                    piper = piper.pipe(replacestream(new RegExp(from, item.args), to));
                }
            });
        }

        // manual replaces
        if (req.headers.host !== 'c.madeleine.catalogi.ru') {
            piper.pipe(replacestream('https', 'http'))
                .pipe(replacestream(new RegExp('<head>', 'i'), '<head>' + includes.head))
                .pipe(replacestream(new RegExp('</head>', 'i'), includes.headbottom + '</head>'))
                .pipe(replacestream(new RegExp('</body>', 'i'), includes.body.bottom + '</body>'))
                .pipe(replacestream('adition.com', '127.0.0.1'))
                .pipe(replacestream('criteo.net', '127.0.0.1'))
                .pipe(replacestream('googleadservices.com', '127.0.0.1'))
                .pipe(replacestream('madeleine.122.2o7.net', '127.0.0.1'))
                .pipe(replacestream('madeleine.scoopcatalogue.de', 'c.madeleine.catalogi.ru'))
                .pipe(res);
        } else {
            piper.pipe(replacestream('https', 'http'))
                .pipe(replacestream('blaetterkatalog/script/bk_script.js', 'http://www.madeleine.catalogi.ru/static/bk_script.js'))
                .pipe(res);
        }
    }).listen(config.get('site.port'));
}

setInterval(function() {
    global.gc(); // --e
}, 1000);