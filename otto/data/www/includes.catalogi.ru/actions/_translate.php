<?php
	header('Content-Type: text/json; charset=UTF-8', false);
	// адрес
	$url = "http://translate.google.ru/translate_a/t?client=x&text=".urlencode($_GET['text'])."&sl=".$_GET['sl']."&tl=".$_GET['tl'];
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
