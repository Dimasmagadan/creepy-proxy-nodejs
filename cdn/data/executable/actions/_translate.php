<?php

header('Access-Control-Allow-Origin: *');

$showErrors = TRUE;
//error_reporting(E_ALL ^ E_DEPRECATED ^ E_NOTICE);
error_reporting(E_ALL^E_NOTICE);
ini_set('display_errors', $showErrors);
ini_set('html_errors', $showErrors);

header('Content-Type: text/json; charset=UTF-8', false);
// адрес
$url = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20151228T140520Z.6e6fc06b18707d4f.08accdf1a558f7b61d94e96bc50b66824f339438&text=".urlencode($_GET['text'])."&lang=de";

// браузеры
$browser = array(
    "user_agent" => "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.1.6) Gecko/20091201 Firefox/3.5.6 (.NET CLR 3.5.30729)",
    "language" => "en-us,en;q=0.5"
);

// фомрируем курл запрос
$ch = curl_init();
// указываем url
curl_setopt($ch, CURLOPT_URL, $url);
// указываем заголовки для браузера
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    "User-Agent: {$browser['user_agent']}",
    "Accept-Language: {$browser['language']}"
));
// нам необходимо получить HTTP заголовки
curl_setopt($ch, CURLOPT_HEADER, 0);
// возвращаем результаты вместо вывода
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
// записываем результат в переменную
$output = curl_exec($ch);
// закрываем соединение
curl_close($ch);

echo $output;
