function id(str){
    return document.getElementById(str);
}
function valorAleatorio(min,max) {
    const amplitudValores= (max -min);
    valorAlazar=Math.floor(Math.random()*amplitudValores+min);// utilizo la funcion random y redondeo hacia abajo
        return valorAlazar;
    }