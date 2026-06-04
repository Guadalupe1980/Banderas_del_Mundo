
/* boton modo Oscuro */
let btnModoOscuro = document.querySelector("#btn-dark");
let docPrincipal = document.querySelector("html");

function cambioModo(){
    docPrincipal.classList.toggle("dark")
}

btnModoOscuro.addEventListener("click", cambioModo)

