<?php
     class Canal{
        private $nombre;
        private $correo;
        private $password;
        private $imagenCanal;
        private $portadaCanal;
        private $suscriptores;
        private $suscripciones = [];

        public function __construct($nombre,$correo,$password,$imagenCanal,$portadaCanal,$suscriptores,$suscripciones){
            $this->nombre = $nombre;
            $this->correo = $correo;
            $this->password = $password;
            $this->imagenCanal = $imagenCanal;
            $this->portadaCanal = $portadaCanal;
            $this->suscriptores = $suscriptores;
            $this->suscripciones = $suscripciones;
        }

        /**
         * Get the value of nombre
         */ 
        public function getNombre()
        {
                return $this->nombre;
        }

        /**
         * Set the value of nombre
         *
         * @return  self
         */ 
        public function setNombre($nombre)
        {
                $this->nombre = $nombre;

                return $this;
        }

        /**
         * Get the value of correo
         */ 
        public function getCorreo()
        {
                return $this->correo;
        }

        /**
         * Set the value of correo
         *
         * @return  self
         */ 
        public function setCorreo($correo)
        {
                $this->correo = $correo;

                return $this;
        }

        /**
         * Get the value of password
         */ 
        public function getPassword()
        {
                return $this->password;
        }

        /**
         * Set the value of password
         *
         * @return  self
         */ 
        public function setPassword($password)
        {
                $this->password = $password;

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
         * Get the value of portadaCanal
         */ 
        public function getPortadaCanal()
        {
                return $this->portadaCanal;
        }

        /**
         * Set the value of portadaCanal
         *
         * @return  self
         */ 
        public function setPortadaCanal($portadaCanal)
        {
                $this->portadaCanal = $portadaCanal;

                return $this;
        }

        /**
         * Get the value of suscriptores
         */ 
        public function getSuscriptores()
        {
                return $this->suscriptores;
        }

        /**
         * Set the value of suscriptores
         *
         * @return  self
         */ 
        public function setSuscriptores($suscriptores)
        {
                $this->suscriptores = $suscriptores;

                return $this;
        }

        
        /**
         * Get the value of suscripciones
         */ 
        public function getSuscripciones()
        {
                return $this->suscripciones;
        }

        /**
         * Set the value of suscripciones
         *
         * @return  self
         */ 
        public function setSuscripciones($suscripciones)
        {
                $this->suscripciones = $suscripciones;

                return $this;
        }
        public function __toString(){
            return  $this->nombre." ".
                    $this->correo." ".
                    $this->password." ".
                    $this->imagenCanal." ".
                    $this->portadaCanal." ".
                    $this->suscriptores." ".
                    $this->suscripciones;
    }

        public function guardarCanal(){
                $contenidoArchivo = file_get_contents("../data/canales.json");
                $canales = json_decode($contenidoArchivo,true);
                $canales[] = array(
                        "nombre"=> $this->nombre,
                        "correo"=> $this->correo,
                        "password"=> $this->password,
                        "imagenCanal"=> $this->imagenCanal,
                        "portadaCanal"=> $this->portadaCanal,
                        "suscriptores"=> $this->suscriptores,
                        "suscripciones"=> $this->suscripciones 
                );
                $archivo = fopen("../data/canales.json","w");
                fwrite($archivo, json_encode($canales));
                fclose($archivo);
}
        public static function verificarCanal($correo, $password){
                $contenidoArchivoCanales = file_get_contents('../data/canales.json');
                $canales = json_decode($contenidoArchivoCanales, true);
                for($i=0; $i<sizeof($canales); $i++){
                        if($canales[$i]["correo"] == $correo && $canales[$i]["password"] == $password){
                                return $canales[$i];
                        }
                }
                return null;
        }
        public static function obtenerCanalPorNombre($indice){
                $contenidoArchivo = file_get_contents("../data/canales.json");
                $canales = json_decode($contenidoArchivo,true);
                for($i=0; $i<sizeof($canales);$i++){
                        if($canales[$i]['nombre']==$indice){
                                $log = json_encode($canales[$i]);
                        }
                }
                echo $log;
        }

       public function agregarSuscripcion($indice){
                $contenidoArchivo = file_get_contents("../data/canales.json");
                $canales = json_decode($contenidoArchivo,true);
                $suscripcionNueva = array(
                        "nombre"=> $this->nombre,
                        "correo"=> $this->correo,
                        "password"=> $this->password,
                        "imagenCanal"=> $this->imagenCanal,
                        "portadaCanal"=> $this->portadaCanal,
                        "suscriptores"=> $this->suscriptores,
                        "suscripciones"=> $this->suscripciones 
                );
                $canales[$indice] = $suscripcionNueva;


                $archivo = fopen('../data/canales.json','w');
                fwrite($archivo,json_encode($canales));
                fclose($archivo);
                 

        }
    }


?>