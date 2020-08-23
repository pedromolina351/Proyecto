<?php
    header("Content-Type: application/json");
    include_once("../clases/class-canales.php");
    $_POST = json_decode(file_get_contents('php://input'),true);
    switch($_SERVER['REQUEST_METHOD']){
        case 'POST':
            $Canal =  Canal::verificarCanal($_POST['correo'], $_POST['password']);
            if($Canal){
            setcookie("urlImagenCanal",$Canal['imagenCanal'], time()+(60*60*24*15),"/");
            setcookie("nombreCanal",$Canal['nombre'], time()+(60*60*24*15),"/");
            echo json_encode($Canal);
            }else{
                setcookie("urlImagenCanal",$Canal['imagenCanal'], time()-1,"/");
                setcookie("nombreCanal",$Canal['nombre'], time()-1,"/");
                echo '{"codigoResultado":0,"mensaje":"usuario/password incorrectos"}';
            }
        break;
    }
?>