/**
 * Created by mihailstepancenko on 13.04.16.
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

// Load config
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

// Start server
var cluster = require('cluster');
if (cluster.isMaster) {
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

    var translates, fsize = 0;

    var server = http.createServer(function (req, res) {
        //console.log('Trying to access: ' + req.headers.host + req.url);
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
            //console.log(new Date()+" "+ JSON.stringify(response.headers));
         //  if(response.statusCode == 200){
            if ('location' in response.headers)
                response.setHeader('Location', response.headers['location'].replace(SITE, SITENAME + '.catalogi.ru'));

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
       // }
        };

        request.get('http://translates.catalogi.ru/temp/' + SITENAME + '.json', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                tmp = response.headers['content-length'];
                //console.log(response.headers['content-length']);
                if (IsJsonString(body)) {
                    //console.log("JOSN detected");
                    if (fsize != tmp) {
                        fsize = tmp;
                        translates = JSON.parse(body, 'utf8');
                    }
                } else {
                    //console.log("JOSN NOT detected!");
                }
            } else {
                //console.log("JOSN NOT 200!");
            }
        });

        var _header = {};
        if ('user-agent' in req.headers) _header['User-Agent'] = req.headers['user-agent'];
        if ('content-type' in req.headers) _header['Content-Type'] = req.headers['content-type'];
        if ('cookie' in req.headers) _header['Cookie'] = req.headers['cookie'];

        var host = req.headers.host.replace(SITENAME + '.catalogi.ru', SITE);
        _header['Host'] = host;

        var url = "http://" + host + req.url;
        var piper;


        if ('cookie' in req.headers) {
            var cookies = req.headers.cookie.split(' ');
            for (var i = 0; i < cookies.length; i++) {
                j.setCookie(request.cookie(cookies[i].replace(';', '')), "http://" + host);
            }
        }

        // Proxyng trafic
        proxyfull = "http://" + proxy() + ":3129";
        //console.log("Accessing via: " + proxyfull);

        //console.log("Method: " + req.method);
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

        // Replaces from config
        replaces.forEach(function (item, i, arr) {
            if (item.type === "usual") {
                piper = piper.pipe(replacestream(item.from, item.to));
            }
            else if (item.type === "regex") {
                piper = piper.pipe(replacestream(new RegExp(item.from, item.args), item.to));
            }
        });

        // Replaces from translates.catalogi.ru
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

        piper.pipe(replacestream('</body>', includes.body.top + includes.body.bottom + '</body>'))
            .pipe(replacestream(new RegExp('<head>', 'i'), '<head>'+includes.head))
            .pipe(replacestream(new RegExp('</head>', 'i'), includes.headbottom + '</head>'))
            .pipe(replacestream('https', 'http'))
            .pipe(res);

    }).listen(config.get('site.port'));
}

setInterval(function() {
    global.gc(); // --e
}, 1000);