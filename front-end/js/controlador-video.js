//---------Leer el valor de una cookie--------------//
function readCookie(name) {

    var nameEQ = name + "="; 
    var ca = document.cookie.split(';');
  
    for(var i=0;i < ca.length;i++) {
  
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) {
        return decodeURIComponent( c.substring(nameEQ.length,c.length) );
      }
  
    }
  
    return null;
  
  }
//--------Cargar los datos del usuario------------//
function cargarCuenta(){
    document.getElementById('cuenta').style.backgroundImage = "url("+readCookie("urlImagenCanal")+")";
    contenedor = document.getElementById('info-canal');
    contenedor.innerHTML = 
    `<label id="usuario-logeado">${readCookie("nombreCanal")}</label>
     <a href="login.html"><label class="dropdown-item"><i class="fas fa-sign-out-alt"></i>Cerrar sesion</label></a>`;
    document.getElementById('btn-apps-youtube').style.color = 'white';
    document.getElementById('btn-notificaciones').style.color = 'white';
}
//----------Cargar el video--------------//
function cargarVideo(){
    urlActual = window.location.search;
    urlAxios = '../../youtube/back-end/api/videos.php'+urlActual;
        axios({
            method:'GET',
            url:urlAxios,
            responseType:'json'
        }).then(res=>{
            vid = res.data;
            player = document.getElementById('loader');
            player.innerHTML = 
            `<div>
            <div id="reproductor">
                <div style="height: 500px; margin-top: 60px;" class="embed-responsive embed-responsive-16by9" style="height:530px">
                    <iframe class="embed-responsive-item" src='${vid.video}' allowfullscreen></iframe>
                </div>
              <div class="container" style="text-align: unset; position: absolute; margin-top: 15px;">  
                <div class="left">  
                  <form>
                    <h4 style="font-weight: 400; color: #030303;">${vid.titulo}</h4>
                    <label>${vid.visualizaciones} Visualizaciones</label> <label> • ${vid.fecha}</label>
                  </form>
                </div>  
                <div class="right">
                  <div style="margin-top: 2.5rem; margin-right: 4rem;">
                    <button class="estilo-iconos"><i class="fas fa-thumbs-up"></i></button>
                    <button class="estilo-iconos"><i class="fas fa-thumbs-down"></i></button>
                  </div>  
                </div>
              </div>  
    
            </div>
          </div>
          <div style="margin-top: 110px; ">
            <hr>
            <form>
              <button style="background-image: url(${vid.imagenCanal})" type="button" class="redondo"></button><label style="margin-left: 2em;">${vid.nombreCanal}</label>
            </form>          
            <p style="margin-left: 5em;">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium quaerat at cum eaque ipsa pariatur. Neque dolor fugit repellendus quibusdam cupiditate reiciendis inventore animi delectus?</p>
          </div>`;
        }).catch(error=>{
            console.error(error);
        });
    }