/**
 * Created by mihailstepancenko on 27.04.16.
 */

function IsJsonString(str) {
    try {JSON.parse(str);}
    catch (e) {return false;}
    return true;
}

var config = require('config');
var SITENAME = config.get('site.name'),
    SITEDOMAIN = config.get('site.domain'),
    SITE = SITENAME + SITEDOMAIN;

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
        proxy = require("./proxy");
        request.defaults({followAllRedirects:true});

    var j = request.jar();
    var proxiedReq = request.defaults({
        jar: j
    });

    var server = http.createServer(function (req, res) {
        onError = function (err) {
            console.error(err);
            try {
                var killtimer = setTimeout(function () {process.exit(1);}, 10);
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
                response.setHeader('Location', response.headers['location'].replace(SITE, SITENAME + '.catalogi.ru'));

            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With');
        };

        var host = req.headers.host.replace(SITENAME + '.catalogi.ru', SITE);
        var proxyfull = "http://" + proxy() + ":3129";
        var url = "http://" + host + req.url;
        var piper;

        if ('cookie' in req.headers) {
            var cookies = req.headers.cookie.split(' ');
            for (var i = 0; i < cookies.length; i++) {
                j.setCookie(request.cookie(cookies[i].replace(';', '')), "http://" + host);
            }
        }
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

        piper.pipe(replacestream('issuu.com', 'issuu.catalogi.ru'))
            .pipe(replacestream('https', 'http'))
            .pipe(res);

    }).listen(config.get('site.port'));
}

setInterval(function() {
    global.gc(); // --e
}, 1000);