 let palabraObtenida=''; // variable global para utilizarla en todas las funciones
 let cant_errores= 0;
 let cant_aciertos=0;
const palabras=[
    'albaca',
    'agostina',
    'javascript',
    'alura',
    'gisela',
    'capitan',
    'augusto',
    'murcielago',
    'avion',
    'automovil'
];
const btn =id('btn_jugar');
const imagen=id('imagen');
btn.addEventListener('click',iniciar); // al hacer click
const btn_letras = document.querySelectorAll('#btn_letras button');
const btn_limpiar=id('btn_limpiar');
btn_limpiar.addEventListener('click',limpiar);
const btn_agregarPalabra=id('btn_agregarPalabra');
btn_agregarPalabra.addEventListener('click',agregarPalabra);

    function iniciar(event){
        imagen.src='img/img0.png';
        btn.disabled=true;// deshabiliita el boton para que no se vuelva a presionar 
        cant_aciertos=0;
        cant_errores=0;
        const parrafo = id('palabra');
        parrafo.innerHTML="";// limpia despues despues de jugar 
        const cant_palabras= palabras.length;
        const valorAlazar=valorAleatorio(0,cant_palabras)// llama a la funcion y pasa los valores por parámetro
        palabraObtenida= palabras[valorAlazar]; // obtengo una palabra aleatoria del array  de palabras
        
        console.log(palabraObtenida);
        const cant_letras= palabraObtenida.length;
        
    for(let i=0;  i<btn_letras.length; i ++){
        btn_letras[i].disabled=false;// habilito las teclas de las letras
    }
        
   
    for( let i=0; i< cant_letras; i++){
        const span= document.createElement('span'); // cro una span por cada letra de la palabra  a adivinar
        parrafo.appendChild(span);
    }

}
    for ( let i =0; i< btn_letras.length; i ++){
        btn_letras[i].addEventListener('click',click_letras);// presiono cualquier letra y llama a la funcion 
    }

function click_letras(event){
    const spans = document.querySelectorAll('#palabra span');// obtengo los span de la palabra
    const button= event.target; // identifica cual letra toque
    button.disabled=true; // se deshabilita la letra despues de tocarla
    const letra=button.innerHTML.toUpperCase();
    const palabra= palabraObtenida.toUpperCase();// pasa todo a mayúscula

    
    let acerto=false; 
    for ( let i = 0 ; i< palabra.length; i++){
        if(letra == palabra[i] ){ // compara si la letra que recibi es igual a la dela palabra
            spans[i].innerHTML= letra;// cambio el contenido con la letra 
            acerto=true;
            cant_aciertos++;// sumo un acierto
        }
    }
    if(acerto==false){
        cant_errores++;// sumo un error 
        const source = `img/img${cant_errores}.png`;// busca las imagenes de la carpeta img para ir cambiando de acuerdo a los errores
        const imagen= id('imagen');// obtengo las imagenes
        imagen.src=source;// cambio en sources
    }

    if (cant_errores == 7){
         id('resultado').innerHTML= ("Perdiste, la palabra era: " + palabraObtenida);
         gameOver( );
    
    }else if( cant_aciertos== palabraObtenida.length){
        id('resultado').innerHTML=" Ganaste!!!!!!   FIN DEL JUEGO";
        gameOver();
    }

}
   
 let seAgrego= false;
   function agregarPalabra(){
     const palabraAgregada=document.querySelector('#agregar-palabra');
     const nuevaPalabra=palabraAgregada.value;
     palabras.push=nuevaPalabra; 
     seAgrego=true;
     console.log(palabras);
     console.log(nuevaPalabra);
   }

 function limpiar() {
    id("resultado").innerHTML = "";
    id("agregar-palabra").value = "";
        }
 function gameOver(){
    for (let i=0; i<btn_letras.length;i ++){// deshabilito los botones de las letras
        btn_letras[i].disabled=true;
    }
    btn.disabled=false;// vuelvo a habilitar el boton para jugar 
}

 gameOver();