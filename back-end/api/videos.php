<?php
    header('Content-Type: application/json');
    include_once("../clases/class-videos.php");
    switch($_SERVER['REQUEST_METHOD']){
        case 'POST';
            $_POST = json_decode(file_get_contents('php://input'),true);
            $video = new Video($_POST["video"],$_POST["miniatura"],$_POST["imagenCanal"],$_POST["titulo"],$_POST["nombreCanal"],$_POST["visualizaciones"],$_POST["fecha"]);
            $video->guardarVideo();
            $resultado["mensaje"] = "Guardar video: ".json_encode($_POST);
            echo json_encode($resultado);
    break;
        case 'GET';
        if(isset($_GET['nombreCanal'])){
            Video::obtenerVideoPorNombreCanal($_GET['nombreCanal']);}
        elseif(isset($_GET['titulo']))
            Video::obtenerVideoPorTitulo($_GET['titulo']);
        elseif(isset($_GET['miniatura']))
            Video::obtenerVideoPorMiniatura($_GET['miniatura']);
        else
            Video::obtenerVideos();
        
    break;

    }
?>