<?php
    header("Content-Type: application/json");
    include_once("../clases/class-canales.php");
    $_POST = json_decode(file_get_contents('php://input'),true);
    switch($_SERVER['REQUEST_METHOD']){
        case 'POST':
            $_POST = json_decode(file_get_contents('php://input'),true);
            $canal = new Canal(
                $_POST["nombre"],
                $_POST["correo"],
                $_POST["password"],
                $_POST["imagenCanal"],
                $_POST["portadaCanal"],
                $_POST["suscriptores"],
                $_POST["suscripciones"]);
            $canal->guardarCanal();
            echo json_encode($_POST);
        break;
        case 'GET':
            Canal::obtenerCanalPorNombre($_GET["nombre"]);
        break;
        case 'PUT':
            $_PUT = json_decode(file_get_contents('php://input'),true);
            $canal = new Canal(
                $_PUT["nombre"],
                $_PUT["correo"],
                $_PUT["password"],
                $_PUT["imagenCanal"],
                $_PUT["portadaCanal"],
                $_PUT["suscriptores"],
                $_PUT["suscripciones"]
            );
            $canal->agregarSuscripcion($_GET['id']);
            echo json_encode($_PUT);
        break;
    }

?>