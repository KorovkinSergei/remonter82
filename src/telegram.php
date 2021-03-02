<?php

/* https://api.telegram.org/bot1432528485:AAEj_YN1q5dBZv8FCx5tSWlqEWFhyZ013tw/getUpdates,
где, XXXXXXXXXXXXXXXXXXXXXXX - токен вашего бота, полученный ранее */

//Переменная $name,$phone, $mail получает данные при помощи метода POST из формы
$name = $_POST['user_name'];
$phone = $_POST['user_phone'];
$select =($_POST["select"]);

//в переменную $token нужно вставить токен, который нам прислал @botFather
$token = "1432528485:AAEj_YN1q5dBZv8FCx5tSWlqEWFhyZ013tw";

//нужна вставить chat_id (Как получить chad id, читайте ниже)
$chat_id = "-431508503";

//Далее создаем переменную, в которую помещаем PHP массив
$arr = array(
    'Имя пользователя: ' => $name,
    'Телефон: ' => $phone,
    'Вид неисправности' => $select
);

//При помощи цикла перебираем массив и помещаем переменную $txt текст из массива $arr
foreach($arr as $key => $value) {
    $txt .= "<b>".$key."</b> ".$value."%0A";
};

//Осуществляется отправка данных в переменной $sendToTelegram
$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

//Если сообщение отправлено, напишет "Thank you", если нет - "Error"
if ($sendToTelegram) {
    echo "Thank you";
} else {
    echo "Error";
}
?>
