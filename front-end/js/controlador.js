var videos = []
var tend = []
var objetivo = []
var busqueda = []
var idCanalActual = []
function obtenerVideos(){
    axios({
        method: 'GET',
        url: '../back-end/api/videos.php',
        responseType: 'json'
    }).then(res=>{
        this.videos = res.data;
        this.tend = res.data;
        inicio();
    }).catch(error=>{
        console.error(error);
    });
}
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
//--------Cargar los datos del usuario al iniciar sesion------------//
  function cargarCuenta(){
    document.getElementById('cuenta').style.backgroundImage = "url("+readCookie("urlImagenCanal")+")";
    contenedor = document.getElementById('info-canal');
    contenedor.innerHTML = `<label id="usuario-logeado" >${readCookie("nombreCanal")}</label>
                            <a href="login.html"><label class="dropdown-item"><i class="fas fa-sign-out-alt"></i>Cerrar sesion</label></a>`;
}
//--------Llenar los listbox de la ventana modal para nuevos videos-----------//
function llenarListas(){
    for (let i=3; i<=20; i++){ 
        document.getElementById('lista-imagenes').innerHTML +=
            `<option id="miniatura-lista" value="img/miniaturas/${i}.webp">Imagen ${i}</option>`;
        }
    for (let i=1; i<=20; i++){ 
        document.getElementById('lista-videos').innerHTML +=
        `<option id="video-lista" value="img/videos/${i}.mp4">video ${i}</option>`;
        }
}
//-------------Cargar todos los videos a el menu inicio---------------//
function home(){
    obtenerVideos();
}
//---------------Aqui se cargan todos los videos del apartado inicio----------------//
function inicio(){
    let contenedor = document.getElementById('contenedor-videos');
    contenedor.innerHTML = '';
    for (let i = 0; i < videos.length; i++){
        contenedor.innerHTML +=
        `<div class="col-xl-3 col-md-4 col-sm-6 col-12" >
         <div class="card">
            <a href="../front-end/video.html?miniatura=${videos[i].miniatura}"><img src="${videos[i].miniatura}" class="card-img-top" alt="nah"></a>
            <div class="card-body">
                <h6 class="card-title" name="titulo-video">${videos[i].titulo}</h6>
                <button id="cuenta"  onclick="canalSeleccionado(${i})" class="redondo" style="background-image: url(${videos[i].imagenCanal}); margin-left: inherit;" onclick=""></button>
                <div style="font-size: .8rem; float: right; width: 9rem">
                    <p class="card-text" style="margin-bottom: 0px;">${videos[i].nombreCanal}</p>
                    <p class="card-text" style="margin-bottom: 0px;">${videos[i].visualizaciones} visualizaciones</p>
                    <p class="card-text">${videos[i].fecha}</p>
                </div>
             </div>
           </div>
         </div>`
    }
}
//------------Ordenar el arreglo de JSON de manera descendente segun la cantidad de visualizaciones----------------//
function sortJSON(data, key, orden) {
    return data.sort(function (a, b) {
        var x = a[key],
        y = b[key];

        if (orden === 'asc') {
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        }

        if (orden === 'desc') {
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        }
    });
}
//------------------Cargar tendencias en el index----------------------------------//
function tendencias(){
    let contenedor = document.getElementById('contenedor-videos');
    contenedor.innerHTML = '';
    var x = sortJSON(tend,"visualizaciones",'desc');
    for (let i = 0; i < x.length; i++){
        contenedor.innerHTML +=
        `<div class="col-xl-3 col-md-4 col-sm-6 col-12" >
         <div class="card">
            <a href="../front-end/video.html?miniatura=${x[i].miniatura}"><img src="${x[i].miniatura}" class="card-img-top" alt="nah"></a>
            <div class="card-body">
                <h6 class="card-title" name="titulo-video">${x[i].titulo}</h6>
                <button id="cuenta"  onclick="canalSeleccionado(${i})" class="redondo" style="background-image: url(${x[i].imagenCanal}); margin-left: inherit;"></button>
                <div style="font-size: .8rem; float: right; width: 9rem">
                    <p class="card-text" style="margin-bottom: 0px;">${x[i].nombreCanal}</p>
                    <p class="card-text" style="margin-bottom: 0px;">${x[i].visualizaciones} visualizaciones</p>
                    <p class="card-text">${x[i].fecha}</p>
                </div>
             </div>
           </div>
         </div>`;
    }
}
//--------------Cargar el canal seleccionado y sus datos-------------//
function canalSeleccionado(numero){
    nombre = tend[numero]['nombreCanal'];
    axios({
        method:'GET',
        url:'../../youtube/back-end/api/canales.php' + `?nombre=${nombre}`,
        responseType:'json',
    }).then(res=>{
        let resultado = res.data;
        let contenedor = document.getElementById('contenedor-videos');
        contenedor.innerHTML = '';
        contenedor.innerHTML =
        `<div>
        <div id="cont-portada"><img src="${resultado.portadaCanal}" ></div>
        <div>
          <button class="redondo-canal" style="background-image: url(${resultado.imagenCanal});"></button>
          <label style="">${resultado.nombre}</label>
          <label style="    margin-left: 4rem;">${resultado.suscriptores} Suscriptores</label>
          <button class="btn btn-primary" style="float: right; margin-top: 40px;">Suscribirse</button>
        </div>`;
        for (let i = 0; i < videos.length; i++) {
            if(videos[i]['nombreCanal'] == resultado['nombre']){
                contenedor.innerHTML +=
        `<div class="card mb-3" style="max-width: 540px;">
              <div class="row no-gutters">
                <div class="col-md-4">
                  <a href="../front-end/video.html?miniatura=${videos[i].miniatura}"><img src="${videos[i].miniatura}" class="card-img" alt="miniatura"></a>
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">${videos[i].titulo}</h5>
                    <p class="card-text"><small class="text-muted">${videos[i].fecha}</small></p>
                  </div>
                </div>
              </div>
            </div>
        </div>`  ;   
            }
        }
    }).catch(error=>{
        console.error(error);
    });
    
}
//------------------------Buscar videos ---------------------------//
function buscarVideos(){
titulo = document.getElementById('src-buscar').value;
    axios({
        method:'GET',
        url:'../../youtube/back-end/api/videos.php?'+`titulo=${titulo}`,
        responseType:'json'
    }).then(res=>{
        console.log(res.data);
        this.busqueda = res.data;
        console.log(busqueda.length);
        let contenedor = document.getElementById('contenedor-videos');
        contenedor.innerHTML = '';
        for (let i = 0; i < busqueda.length; i++) {
            contenedor.innerHTML +=
            `<div class="col-xl-3 col-md-4 col-sm-6 col-12" >
                <div class="card">
                    <a href="../front-end/video.html"><img src="${busqueda[i].miniatura}" class="card-img-top" alt="nah"></a>
                    <div class="card-body">
                        <h6 class="card-title" name="titulo-video">${busqueda[i].titulo}</h6>
                        <button id="cuenta"  onclick="canalSeleccionado(${i})" class="redondo" style="background-image: url(${busqueda[i].imagenCanal}); margin-left: inherit;" onclick=""></button>
                        <div style="font-size: .8rem; float: right; width: 9rem">
                            <p class="card-text" style="margin-bottom: 0px;">${busqueda[i].nombreCanal}</p>
                            <p class="card-text" style="margin-bottom: 0px;">${busqueda[i].visualizaciones} visualizaciones</p>
                            <p class="card-text">${busqueda[i].fecha}</p>
                        </div>
                        </div>
                    </div>
                </div>`;
            
        }
    }).catch(error=>{
        console.error(error);
    });
}
//-----------------ocultar y mostrar la barra lateral a modo responsive------------------//
function ajustar(){
    let barraLateral = document.getElementById('barra-lateral');
    let barraLateralMenor = document.getElementById('barra-oculta');
    let contenido = document.getElementById('contenido');
    if (barraLateralMenor.style.display == 'none'){
        barraLateralMenor.style.display = 'block';
        barraLateral.style.display = 'none';
        contenido.style.marginLeft = '90px';
    }
    else{
        barraLateralMenor.style.display = 'none';
        barraLateral.style.display = 'block';
        contenido.style.marginLeft = '240px';
    }
}
//---------------------Subir un nuevo video--------------------------//
function nuevoVideo(){
    let nuevoVideo = {
        video : document.getElementById('lista-videos').value,
        miniatura : document.getElementById('lista-imagenes').value,
        imagenCanal : readCookie("urlImagenCanal"),
        titulo : document.getElementById('nombre-nuevo-video').value,
        nombreCanal : readCookie("nombreCanal"),
        visualizaciones : 0,
        fecha : document.getElementById('fecha-nuevo-video').value
    };
    axios({
        method:'POST',
        url: '../../youtube/back-end/api/videos.php',
        responseType:'json',
        data: nuevoVideo       
    }).then(res=>{
        obtenerVideos();
    }).catch(error=>{
        console.error(error);
    });
    
}
//---------------------Cargar Suscripciones en la barra lateral--------------------------//
function cargarSuscripciones(){
    val = readCookie("nombreCanal");
    console.log(val);
    axios({
        method:'GET',
        url:'../../youtube/back-end/api/canales.php' + `?nombre=${val}`,
        responseType:'json',
    }).then(res=>{
        let resultado = res.data;
        divSuscripciones = document.getElementById('suscripciones');
        divSuscripciones.innerHTML = '';
        for (let i = 0; i < resultado.suscripciones.length; i++) {
            divSuscripciones.innerHTML += 
            `<button class="laterales btn form-control botones-laterales">${resultado.suscripciones[i]} </button><br>`;
        }
    }).catch(error=>{
        console.log(error);
    });
}
//----------------Modo visitante----------------//
function modoVisitante(){
    drop = document.getElementById('info-canal');
    obj = readCookie("urlImagenCanal");
    if(obj == null){
        drop.innerHTML = `<a href="login.html"><label class="dropdown-item"><i class="fas fa-sign-out-alt"></i>Iniciar sesion</label></a>`
        document.getElementById('cuenta').innerHTML = `<i class="far fa-user"></i>`;
        document.getElementById('btn-m-suscripciones').style.display = 'none';
        document.getElementById('btn-m-biblioteca').style.display = 'none';
        document.getElementById('lblsus').style.display = 'none';
        document.getElementById('lblbib').style.display = 'none';
        document.getElementById('btn-sus1').disabled = true;
        document.getElementById('btn-bib').disabled = true;
        document.getElementById('btn-his').disabled = true;
        document.getElementById('btn-mis').disabled = true;
        document.getElementById('btn-ver').disabled = true;
        document.getElementById('btn-vid2').disabled = true;
        document.getElementById('btn-lis').disabled = true;
        document.getElementById('btn-nuevo-video').style.display = 'none';     
    }
}
//-----------------Ventana Suscripciones---------------//
function ventanaSuscripciones(){
    val = readCookie("nombreCanal");
    axios({
        method:'GET',
        url:'../../youtube/back-end/api/canales.php' + `?nombre=${val}`,
        responseType:'json',
    }).then(res=>{
        contenedor = document.getElementById('contenedor-videos');
        let resultado = res.data.suscripciones;
        console.log(resultado);
        contenedor.innerHTML = '';
        for(let i = 0; i<resultado.length; i++){
            for(let j=0; j<videos.length; j++){
                if(videos[j]['nombreCanal'] == resultado[i]){
                    contenedor.innerHTML +=
                    `<div class="col-xl-3 col-md-4 col-sm-6 col-12" >
                     <div class="card">
                        <a href="../front-end/video.html?miniatura=${videos[j].miniatura}"><img src="${videos[j].miniatura}" class="card-img-top" alt="nah"></a>
                        <div class="card-body">
                            <h6 class="card-title" name="titulo-video">${videos[j].titulo}</h6>
                            <button id="cuenta"  onclick="canalSeleccionado(${j})" class="redondo" style="background-image: url(${videos[j].imagenCanal}); margin-left: inherit;" onclick=""></button>
                            <div style="font-size: .8rem; float: right; width: 9rem">
                                <p class="card-text" style="margin-bottom: 0px;">${videos[j].nombreCanal}</p>
                                <p class="card-text" style="margin-bottom: 0px;">${videos[j].visualizaciones} visualizaciones</p>
                                <p class="card-text">${videos[j].fecha}</p>
                            </div>
                         </div>
                       </div>
                     </div>`
                }
            }
        }
        
    }).catch(error=>{
        console.log(error);
    });
}
