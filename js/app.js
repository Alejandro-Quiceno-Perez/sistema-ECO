// Variables 
let pisosInicial = [
    {
        piso: "3",
        no_aprovechables: 0,
        aprovechables: 0,
        organicos: 0
    },
    {
        piso: "4",
        no_aprovechables: 0,
        aprovechables: 0,
        organicos: 0
    },
    {
        piso: "5",
        no_aprovechables: 0,
        aprovechables: 0,
        organicos: 0
    }
];

const piso = document.querySelector("#select_floor");
const btnOpenModal = document.querySelector("#btnOpenModal");
const canecas = document.querySelectorAll(".bowl");
const btnSubmit = document.getElementById("btnSubmit");

document.addEventListener("DOMContentLoaded", function () {
    const puntosEcoCache = localStorage.getItem("puntosEcologicos");
    if (puntosEcoCache) {
        pisosInicial = JSON.parse(puntosEcoCache);
    }

    pintarPuntoEcologico();
});

piso.addEventListener("input", function () {
    pintarPuntoEcologico();
});

canecas.forEach(caneca => {
    caneca.addEventListener("click", function () {
        btnOpenModal.click();
        tipoCanecaAgregar = caneca.getAttribute("type-bowl");
    });
});

btnSubmit.addEventListener("click", function () {
    const cantidadAgregar = document.getElementById("cantidad").value;
    const pisoAgregar = piso.value;

    pisosInicial.forEach(puntoEco => {
        if (puntoEco.piso == pisoAgregar) {
            puntoEco[tipoCanecaAgregar] += parseInt(cantidadAgregar);
            document.querySelector("#btnCloseModal").click();
            document.getElementById("cantidad").value = "";
        }
    })

    pintarPuntoEcologico();
    console.log(pisosInicial);
});


function pintarPuntoEcologico() {


    pisosInicial.forEach(puntoEco => {
        if (puntoEco.piso == piso.value) {
            const contadorOrganicos = document.querySelector("#organicos .body_top span")
            const contadorNoAprovechables = document.querySelector("#no_aprovechables .body_top span")
            const contadorAprovechables = document.querySelector("#aprovechables .body_top span")

            contadorOrganicos.textContent = `${puntoEco.organicos}/500`;
            contadorNoAprovechables.textContent = `${puntoEco.no_aprovechables}/500`;
            contadorAprovechables.textContent = `${puntoEco.aprovechables}/500`;

            const suma = puntoEco.organicos + puntoEco.no_aprovechables + puntoEco.aprovechables;

            const porcentaje = ((suma) / 1500) * 100;
            const estadoPiso = document.querySelector("#estado_piso")


            if (porcentaje < 20) {
                estadoPiso.textContent = `Estado del piso ${piso.value}: No amigo del ambiente.`
                document.body.style.background = "#950101";
            }

            if (porcentaje >= 20 && porcentaje < 50) {
                estadoPiso.textContent = `Estado del piso ${piso.value}: Normal.`;
                document.body.style.background = "#fc4b08"
            }

            if (porcentaje >= 50) {
                estadoPiso.textContent = `Estado del piso ${piso.value}: Amigable con el medio ambiente.`;
                document.body.style.background = "#6fd513"
            }
        }
    })

    localStorage.setItem("puntosEcologicos", JSON.stringify(pisosInicial))
} 