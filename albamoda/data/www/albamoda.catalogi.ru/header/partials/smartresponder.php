<?php
$url =  'http://api.smartresponder.ru/subscribers.html?api_key=VFI8VS5ElMNKKDEf2QDBIf7POMf7EY0a&delivery_id=209975&group_id=41980'.
        '&action=create&email='.$_POST['mail'].'&first_name='.$_POST['name'].'&last_name=';

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);

$out = curl_exec($ch);
curl_close($ch);

echo $out;