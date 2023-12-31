<?php

declare(strict_types=1);

function test_input($data): string
{
    $data = trim($data);
    $data = stripslashes($data);
    return $data;
}

$recaptchaSecretKey = file_get_contents('../.key', true);
$recaptchaResponse = $_POST['g-recaptcha-response'];

$url = 'https://www.google.com/recaptcha/api/siteverify';
$data = array(
    'secret' => $recaptchaSecretKey,
    'response' => $recaptchaResponse
);

$options = array(
    'http' => array(
        'header' => "Content-type: application/x-www-form-urlencoded\r\n",
        'method' => 'POST',
        'content' => http_build_query($data)
    )
);

$context = stream_context_create($options);
$result = file_get_contents($url, false, $context);
$json = json_decode($result);

if ($json->success) {
    try {
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            if (!isset($_POST["name"]) or empty($_POST["name"])) {
                throw new Exception("Nom invalide");
            } else {
                $name = test_input($_POST["name"]);
                if (!preg_match("/^[a-zA-Z-'àâïîëéèêôùûçÀÂÉÈÔÙÛÇ ]*$/", $name)) {
                    throw new Exception("Nom invalide");
                }
            }
    
            if (!isset($_POST["surname"]) or empty($_POST["surname"])) {
                throw new Exception("Prenom invalide");
            } else {
                $surname = test_input($_POST["surname"]);
                if (!preg_match("/^[a-zA-Z-'àâïîëéèêôùûçÀÂÉÈÔÙÛÇ ]*$/", $name)) {
                    throw new Exception("Prenom invalide");
                }
            }
    
            if (!isset($_POST["email"]) or empty($_POST["email"])) {
                throw new Exception("Email invalide");
            } else {
                $email = test_input($_POST["email"]);
                if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                    throw new Exception("Email invalide");
                }
            }
    
            if (!isset($_POST["message"]) or empty($_POST["message"])) {
                throw new Exception("Message invalide");
            } else {
                $message = test_input($_POST["message"]);
            }
        }
    } catch (Exception) {
        header("HTTP/1.1 302 Found");
        header("Location: contact_error/error_incorrect_value.html");
        exit();
    }
    
    $message = "Nouveau message de ".$surname." ".$name." avec l'adresse suivante : ".$email."\n".$message;
    
    #$message = wordwrap($message,70);
    
    $subject = "Website Contact : Nouveau message de ".$surname." ".$name;
    
    $from = "contact@raphael-durand.fr";
    
    $to = file_get_contents('../.destination', true);
    
    $headers = "From:" . $from;
    
    if (!mail($to, $subject, $message, $headers)) {
        echo "<script type='text/javascript'>document.location.replace('contact_error/error_not_send.html');</script>";
    }
    echo "<script type='text/javascript'>document.location.replace('contact.html');</script>";
    exit();
} else {
    echo "<script type='text/javascript'>document.location.replace('contact.html');</script>";
    exit();
}
