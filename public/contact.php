<?php

declare(strict_types=1);

try {
    if (!(isset($_POST['name']) and ctype_alpha($_POST['name'] and $_POST['name'] === ""))) {
        throw new Exception("Nom invalide");
    } else {
        $name = strip_tags(trim($_POST['name']));
    }

    if (!(isset($_POST['surname']) and ctype_alpha($_POST['surname'] and $_POST['surname'] === ""))) {
        throw new Exception("Prénom invalide");
    } else {
        $surname = strip_tags(trim($_POST['surname']));
    }

    if (!(isset($_POST['email']) and filter_var($_POST['email'], FILTER_VALIDATE_EMAIL) and $_POST['email'] === "")) {
        throw new Exception("Email invalide");
    } else {
        $email = strip_tags(trim($_POST['email']));
    }

    if (!(isset($_POST['message']) and ctype_alnum($_POST['message'] and $_POST['message'] === ""))) {
        throw new Exception("Message invalide");
    } else {
        $message = strip_tags(trim($_POST['message']));
    }
} catch (Exception $e) {
    header("HTTP/1.1 302 Found");
    header("Location: /contact.html");
    exit();
}

$message = "Nouveau message de".$surname.$name."avec l'adresse suivante :".$email."\n".$message;

$message = wordwrap($message,70);

$subject = "Website : Contact ";

mail("durandraphael.courriel@gmail.com", $subject, $message);

exit();