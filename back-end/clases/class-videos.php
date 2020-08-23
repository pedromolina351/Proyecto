<?php
    class Video{
        private $video;
        private $miniatura;
        private $imagenCanal;
        private $titulo;
        private $nombreCanal;
        private $visualizaciones;
        private $fecha;

        public function __construct($video,$miniatura,$imagenCanal,$titulo,$nombreCanal,$visualizaciones,$fecha){
            $this->video = $video;
            $this->miniatura  = $miniatura;
            $this->imagenCanal = $imagenCanal;
            $this->titulo  = $titulo;
            $this->nombreCanal = $nombreCanal;
            $this->visualizaciones  = $visualizaciones;
            $this->fecha  = $fecha;
        }       
        
        /**
         * Get the value of video
         */ 
        public function getVideo()
        {
                return $this->video;
        }

        /**
         * Set the value of video
         *
         * @return  self
         */ 
        public function setVideo($video)
        {
                $this->video = $video;

                return $this;
        }

        /**
         * Get the value of miniatura
         */ 
        public function getMiniatura()
        {
                return $this->miniatura;
        }

        /**
         * Set the value of miniatura
         *
         * @return  self
         */ 
        public function setMiniatura($miniatura)
        {
                $this->miniatura = $miniatura;

                return $this;
        }
                /**
         * Get the value of imagenCanal
         */ 
        public function getImagenCanal()
        {
                return $this->imagenCanal;
        }

        /**
         * Set the value of imagenCanal
         *
         * @return  self
         */ 
        public function setImagenCanal($imagenCanal)
        {
                $this->imagenCanal = $imagenCanal;

                return $this;
        }

        /**
         * Get the value of titulo
         */ 
        public function getTitulo()
        {
                return $this->titulo;
        }

        /**
         * Set the value of titulo
         *
         * @return  self
         */ 
        public function setTitulo($titulo)
        {
                $this->titulo = $titulo;

                return $this;
        }
        
        /**
         * Get the value of nombreCanal
         */ 
        public function getnombreCanal()
        {
                return $this->nombreCanal;
        }

        /**
         * Set the value of nombreCanal
         *
         * @return  self
         */ 
        public function setnombreCanal($nombreCanal)
        {
                $this->nombreCanal = $nombreCanal;

                return $this;
        }

        /**
         * Get the value of visualizaciones
         */ 
        public function getVisualizaciones()
        {
                return $this->visualizaciones;
        }

        /**
         * Set the value of visualizaciones
         *
         * @return  self
         */ 
        public function setVisualizaciones($visualizaciones)
        {
                $this->visualizaciones = $visualizaciones;

                return $this;
        }

        /**
         * Get the value of fecha
         */ 
        public function getFecha()
        {
                return $this->fecha;
        }

        /**
         * Set the value of fecha
         *
         * @return  self
         */ 
        public function setFecha($fecha)
        {
                $this->fecha = $fecha;

                return $this;
        }

        public function __toString(){
            return  $this->video." ".
                    $this->miniatura." ".
                    $this->imagenCanal." ".
                    $this->titulo." ".
                    $this->nombreCanal." ".
                    $this->visualizaciones." ".
                    $this->fecha;
    }
    public function guardarVideo(){
        $contenidoArchivo = file_get_contents("../data/videos.json");
        $videos = json_decode($contenidoArchivo,true);
        $videos[] = array(
                "video"=>$this->video,
                "miniatura"=>$this->miniatura,
                "imagenCanal"=> $this->imagenCanal,
                "titulo"=> $this->titulo,
                "nombreCanal"=> $this->nombreCanal,
                "visualizaciones"=> $this->visualizaciones,
                "fecha"=> $this->fecha
        );
        $archivo = fopen("../data/videos.json","w");
        fwrite($archivo, json_encode($videos));
        fclose($archivo);
    }
    public static function obtenerVideos(){
        $contenidoArchivo = file_get_contents("../data/videos.json");
        echo $contenidoArchivo;
    }
    public static function obtenerVideoPorNombreCanal($indice){
        $contenidoArchivo = file_get_contents("../data/videos.json");
        $vid = json_decode($contenidoArchivo,true);
        for($i=0; $i<sizeof($vid);$i++){
                if($vid[$i]['nombreCanal']==$indice){
                        echo json_encode($vid[$i]);
                }
        }
}
        public static function obtenerVideoPorTitulo($indice){
                $contenidoArchivo = file_get_contents("../data/videos.json");
                $vid = json_decode($contenidoArchivo,true);
                $resul = [];
                $contador = 0;
                for($i=0; $i<sizeof($vid);$i++){
                        if($vid[$i]['titulo']==$indice){
                                $resul[$contador] = $vid[$i];
                                $contador ++;
                        }
                }
                echo json_encode($resul);
        }
        public static function obtenerVideoPorMiniatura($indice){
                $contenidoArchivo = file_get_contents("../data/videos.json");
                $vid = json_decode($contenidoArchivo,true);
                for($i=0; $i<sizeof($vid);$i++){
                        if($vid[$i]['miniatura']==$indice){
                                $res = json_encode($vid[$i]);
                        }
                }
                echo $res;
        }


    }



?>