<?php
// Файлы phpmailer
require 'static/php/PHPMailer.php';
require 'static/php/SMTP.php';
require 'static/php/Exception.php';

// Переменные, которые отправляет пользователь
$name = $_POST['userName'];
$email = $_POST['userMail'];
$text = $_POST['textMessage'];
$subject = $_POST['subject'];

// Формирование самого письма
$title = "Заголовок письма";
$body = "
<h2>Новое письмо</h2>
<b>Тема:</b> $subject<br>
<b>Имя:</b> $name<br>
<b>Почта:</b> $email<br><br>
<b>Сообщение:</b><br>$text
";

// Валидация почты
if (filter_var($email, FILTER_VALIDATE_EMAIL)) {

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
//    $mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

    // Настройки вашей почты
    $mail->Host       = 'mail.ipipe.ru'; // SMTP сервера вашей почты
    $mail->Username   = 'admin@olegtsyganov.ru'; // Логин на почте
    $mail->Password   = 'StaL1990'; // Пароль на почте
//    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 2525;
    $mail->setFrom('admin@olegtsyganov.ru', 'Имя отправителя'); // Адрес самой почты и имя отправителя

    // Получатель письма
    $mail->addAddress('redsmoke19@yandex.ru');
    $mail->addAddress('tsyganovdev@gmail.com'); // Ещё один, если нужен

// Отправка сообщения
$mail->isHTML(true);
$mail->Subject = $title;
$mail->Body = $body;    

// Проверяем отравленность сообщения
if ($mail->send()) {$result = "success";} 
else {$result = "error";}

} catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}
} else {
	$result = "email";
}
// Отображение результата
echo json_encode(["result" => $result, "resultfile" => $rfile, "status" => $status]);

?>