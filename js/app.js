

const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');


window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
});

function buscarClima(e) {
    e.preventDefault();

    // Validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    // console.log(ciudad);
    // console.log(pais);

    if (ciudad === '' || pais === '') {
        // Hubo un error
        mostrarError('Ambos campos son obligatorios');
        return;
    }


    // Consultariamos la API
    consultarAPI(ciudad, pais);

}


function mostrarError(mensaje) {

    const alerta = document.querySelector('.error');

    if (!alerta) {
        // Crear una alerta
        const alerta = document.createElement('div');
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center', 'error');

        alerta.innerHTML = `
        <strong class="font-bold">Error!</strong>
        <span class="block">${mensaje}</span>
    `;

        container.appendChild(alerta);


        // Se elimine despues de 3 segundos

        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }

}


function consultarAPI(ciudad, pais) {
    
    const appID = '9ce37f789f157f0ea9bbc1dc9f536e53';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}, ${pais}&appid=${appID}`;


    // Muestra un Spinner de carga
    Spinner();

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(dato => {
            // Limpiar el HTML previo
            limpiarHTML();
            
            if(dato.cod === "404") {
                mostrarError('Ciudad no encontrada');
                return;
            }

            // Imprime la respuesta en el HTML
            mostrarClima(dato);

        })
}


function mostrarClima(dato) {
    const { name, main: { temp, temp_max, temp_min } } = dato;

    const centigrados = kelvinACentrigrados(temp);
    const max = kelvinACentrigrados(temp_max);
    const min = kelvinACentrigrados(temp_min);

    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = `Clima en ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2xl');

    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl');

    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTML = `Max: ${temp_max} &#8451;`;
    tempMaxima.classList.add('text-xl');


    const tempMinima = document.createElement('p');
    tempMinima.innerHTML = `Min: ${temp_min} &#8451;`;
    tempMinima.classList.add('text-xl');

    const resultadodiv = document.createElement('div');
    resultadodiv.classList.add('text-center', 'text-white');
    resultadodiv.appendChild(nombreCiudad);
    resultadodiv.appendChild(actual);
    resultadodiv.appendChild(tempMaxima);
    resultadodiv.appendChild(tempMinima);

    resultado.appendChild(resultadodiv);

}


const kelvinACentrigrados = grados => parseInt(grados-273.15);


function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function Spinner() {

    limpiarHTML();

    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');

    divSpinner.innerHTML = `
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>
    `;

    resultado.appendChild(divSpinner);

}













