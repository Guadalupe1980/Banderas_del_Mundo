
/* VARIABLE GLOBAL */
let contenedorBandera = document.querySelector("#banderaCont");

/* CONSUMIENDO API */
async function traerDatos() {
  try {
    let response = await fetch("/data.json");
    let data = await response.json();
    return data;
  } catch (error) {
    console.error("Algo salio mal", error);
  }
}

let cardbandera = await traerDatos();
console.log(cardbandera);


/* CARD BANDERA */

function mostrarPaises(gruposPaises){
  for(let i = 0; i < gruposPaises.length; i++){ 
    contenedorBandera.innerHTML +=  ` 
       <div class="dark:border-white/5 dark:bg-[#2b3743] border border-white/50 rounded-md pb-10 w-full max-w-max shadow"> 
          <img src="${gruposPaises[i].flags.png}" alt="Flag of ${gruposPaises[i].name}" class="rounded-t-md aspect-3/2 object-fill">
          <h1 class="dark:text-white font-bold text-left mt-3 ml-6">${gruposPaises[i].name} </h1>
          <div class="p-6 text-left">
          <p class="dark:text-white font-medium text-gray-900">Population:<span class="text-gray-600"> ${gruposPaises[i].population} </span></p>
          <p class="dark:text-white font-medium text-gray-900">Region:<span class="text-gray-600"> ${gruposPaises[i].region}</span></p>
          <p class="dark:text-white font-medium text-gray-800">Capital:<span class="text-gray-600"> ${gruposPaises[i].capital}</span></p>
          </div>
       </div>   
  `
  }
} 

/* crea un array para la region de un pais exacto */
let paisesAfrica = cardbandera.filter(pais => pais.region === "Africa")


// mostrarPaises(cardbandera);

/* EXPORTAMOS LAS VARIABLES A OTRO MODULO */
export { cardbandera, contenedorBandera, mostrarPaises};
