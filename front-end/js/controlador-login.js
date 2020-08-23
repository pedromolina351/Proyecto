//---------------Login-kun----------------//
function login(){
    axios({
        method: "post",
        url: "../back-end/api/login.php",
        responseType: "json",
        data:{
            correo: document.getElementById('correo').value,
            password: document.getElementById('password').value
        }
    }).then(res=>{
        if(res.data != null){
        window.location.href = "index.html";
        console.log(res);
        }else{
        document.getElementById('error').innerHTML = `correo o password incorrectos`;
        console.log(res.data);}
    }).catch(err=>{
        console.error(err);
    });
}
//--------------Limpiar galletitas----------------//
function limpiarCookies(){
    document.cookie = "urlImagenCanal=F; max-age=-1; path=/";
    document.cookie = "nombreCanal=F; max-age=-1; path=/";
}
//----------Cargar listas de la ventana modal--------------//
function cargarListas(){
    for (let i=1; i<=26; i++){ 
        document.getElementById('img-canal').innerHTML +=
        `<option id="imagen-nuevo-canal" value="img/canales/canal${i}.jpg">Imagen ${i}</option>`;
    }
    for (let i=1; i<=3; i++){ 
        document.getElementById('portada-canal').innerHTML +=
        `<option id="portada-nuevo-canal" value="img/portadas/${i}.jfif">Portada ${i}</option>`;
    }
}
//--------------------Guardar nuevo canal---------------//
function guardarCanal(){
    let nuevoCanal = {
        nombre : document.getElementById('nombre-nuevo-canal').value,
        correo : document.getElementById('correo-nuevo-canal').value,
        password : document.getElementById('password-nuevo-canal').value,
        imagenCanal : document.getElementById('img-canal').value,
        portadaCanal : document.getElementById('portada-canal').value,
        suscriptores : 0,
        suscripciones: []
    }
    axios({
        method:'POST',
        url: '../../youtube/back-end/api/canales.php',
        responseType:'json',
        data: nuevoCanal       
    }).then(res=>{
        limpiarTXT();
    }).catch(error=>{
        console.error(error);
    });
}
//--------Limpiar cajas de texto-----------//
function limpiarTXT(){
    document.getElementById('nombre-nuevo-canal').value = null;
    document.getElementById('correo-nuevo-canal').value = null;
    document.getElementById('password-nuevo-canal').value = null;
}






