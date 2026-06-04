/* CONSUMIENDO API */
async function traerDatos() {
  try {
    let response = await fetch("./data.json");
    let data = await response.json();
    return data;
  } catch (error) {
    console.error("Algo salio mal", error);
  }
}

let cardbandera = await traerDatos();
console.log(cardbandera);

/* CARD BANDERA */
let contenedorBandera = document.querySelector("#banderaCont");

let bandera = cardbandera
  .map((pais) => {
    return ` 
     <div class="dark:border-white/5 dark:bg-[#2b3743] border border-white/50 rounded-md pb-10 w-full max-w-max shadow"> 
        <img src="${pais.flags.png}" alt="Flag of ${pais.name}" class="rounded-t-md aspect-3/2 object-fill">
        <h1 class="dark:text-white font-bold text-left mt-3 ml-6">${pais.name} </h1>
        <div class="p-6 text-left">
        <p class="dark:text-white font-medium text-gray-900">Population:<span class="text-gray-600"> ${pais.population} </span></p>
        <p class="dark:text-white font-medium text-gray-900">Region:<span class="text-gray-600"> ${pais.region}</span></p>
        <p class="dark:text-white font-medium text-gray-800">Capital:<span class="text-gray-600"> ${pais.capital}</span></p>
        </div>
     </div>  
     
`;
  })
  .join("");

contenedorBandera.innerHTML = bandera;

/* FILTRADO DE DATOS */
const selectPais = document.querySelector("#region-filter"); // Capturamos el select del HTML

cardbandera.forEach((pais) => { // Llenamos el select dinámicamente con las opciones de los países
  selectPais.innerHTML += `
    <option value="${pais.name.toLowerCase()}">${pais.name}</option>`;
});

/* EL INTERRUPTOR DE RESETEO DE LOS DATOS */
selectPais.addEventListener("change", (evento) => { // Escuchamos cuando el usuario seleccione un país diferente
  const paisSeleccionado = evento.target.value; // Guardamos el valor de la opción seleccionada

  if (paisSeleccionado === "all") { //si selecciona la primera opcion regresamos al estado actuaL
    contenedorBandera.innerHTML = bandera; // Borra lo que haya en la pantalla y vuelve a estampar la variable bandera
    return; // Detiene el código aquí para que no intente filtrar
  }

  const paisFiltrado = cardbandera.filter((pais) => { //Revisa los 250 países originales uno por uno buscando cuál cumple la condición.
    return pais.name.toLowerCase() === paisSeleccionado; //Si coincide se guarda dentro del arreglo ya creado
  });

  /*PINTAMOS LA TARJETA SELECCIONADA */
  contenedorBandera.innerHTML = paisFiltrado
    .map((pais) => { //Borra absolutamente todas las tarjetas de la pantalla y pon esto nuevo que te voy a dar
      return ` 
       <div class="dark:border-white/5 dark:bg-[#2b3743] border border-white/50 rounded-md pb-10 w-full max-w-max shadow"> 
          <img src="${pais.flags.png}" alt="Flag of ${pais.name}" class="rounded-t-md aspect-3/2 object-cover">
          <h1 class="dark:text-white font-bold text-left mt-3 ml-6">${pais.name} </h1>
          <div class="p-6 text-left">
             <p class="dark:text-white font-medium text-gray-900">Population:<span class="text-gray-600"> ${pais.population} </span></p>
             <p class="dark:text-white font-medium text-gray-900">Region:<span class="text-gray-600"> ${pais.region}</span></p>
             <p class="dark:text-white font-medium text-gray-800">Capital:<span class="text-gray-600"> ${pais.capital}</span></p>
          </div>
       </div>`;
    })
    .join("");
});
