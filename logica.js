function encriptar(){

  var texto = document.getElementById("texto").value.toLowerCase();
  var texto_encriptado = texto.replace(/e/igm, "enter");
  var texto_encriptado = texto_encriptado.replace(/o/igm, "ober");
  var texto_encriptado = texto_encriptado.replace(/i/igm, "imes");
  var texto_encriptado = texto_encriptado.replace(/a/igm, "ai");
  var texto_encriptado = texto_encriptado.replace(/u/igm, "ufat");
  
  document.getElementById("dibujo").style.display = "none";
  document.getElementById("texto").style.display = "none";
  document.getElementById("texto2").innerHTML = texto_encriptado;
  document.getElementById("copiar").style.display = "show";
  document.getElementById("copiar").style.display="inherit";

}

function desencriptar(){
  var texto = document.getElementById("texto").value.toLowerCase();
  var texto_encriptado = texto.replace(/enter/igm, "e");
  var texto_encriptado = texto_encriptado.replace(/ober/igm, "o");
  var texto_encriptado = texto_encriptado.replace(/imes/igm, "i");
  var texto_encriptado = texto_encriptado.replace(/ai/igm, "a");
  var texto_encriptado = texto_encriptado.replace(/ufat/igm, "u");
  
  document.getElementById("texto").style.display = "none";
  document.getElementById("dibujo").style.display = "none";
  document.getElementById("texto2").innerHTML = texto_encriptado;
  document.getElementById("copiar").style.display = "show";
  document.getElementById("copiar").style.display="inherit";
}

function copiar(){
  var contenido = document.querySelector("#texto2");
  contenido.select();
  document.execCommand("copy");
}