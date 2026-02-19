// ================= BASE DE DATOS =================

const universidades = [

{
id:"unal",
nombre:"Universidad Nacional de Colombia",
ciudad:"Bogotá",
departamento:"Cundinamarca",
descripcion:"Universidad pública líder en investigación en Colombia.",
puntajeMinimo:350,
ranking:1,
contacto:"admisiones@unal.edu.co",
programas:["Ingeniería Civil","Ingeniería de Sistemas","Medicina","Derecho","Arquitectura","Economía","Psicología","Administración de Empresas"],
imagen:"img/nacional.jpg"
},

{
id:"udea",
nombre:"Universidad de Antioquia",
ciudad:"Medellín",
departamento:"Antioquia",
descripcion:"Institución pública con gran trayectoria académica.",
puntajeMinimo:300,
ranking:2,
contacto:"info@udea.edu.co",
programas:["Ingeniería Industrial","Psicología","Biología","Contaduría Pública","Derecho","Enfermería"],
imagen:"img/antioquia.jpg"
},

{
id:"univalle",
nombre:"Universidad del Valle",
ciudad:"Cali",
departamento:"Valle del Cauca",
descripcion:"Universidad pública reconocida por su calidad académica.",
puntajeMinimo:290,
ranking:3,
contacto:"contacto@univalle.edu.co",
programas:["Ingeniería Electrónica","Medicina","Comunicación Social","Trabajo Social","Física","Matemáticas"],
imagen:"img/univalle.jpg"
},

{
id:"uis",
nombre:"Universidad Industrial de Santander",
ciudad:"Bucaramanga",
departamento:"Santander",
descripcion:"Universidad fuerte en ingeniería y ciencias.",
puntajeMinimo:310,
ranking:4,
contacto:"admisiones@uis.edu.co",
programas:["Ingeniería Mecánica","Ingeniería de Petróleos","Geología","Química","Medicina"],
imagen:"img/uis.jpg"
},

{
id:"uptc",
nombre:"Universidad Pedagógica y Tecnológica de Colombia",
ciudad:"Tunja",
departamento:"Boyacá",
descripcion:"Universidad pública enfocada en educación e ingeniería.",
puntajeMinimo:270,
ranking:5,
contacto:"contacto@uptc.edu.co",
programas:["Licenciatura en Matemáticas","Ingeniería de Sistemas","Derecho","Administración de Empresas"],
imagen:"img/uptc.jpg"
},

{
id:"utp",
nombre:"Universidad Tecnológica de Pereira",
ciudad:"Pereira",
departamento:"Risaralda",
descripcion:"Institución tecnológica pública destacada.",
puntajeMinimo:280,
ranking:6,
contacto:"info@utp.edu.co",
programas:["Ingeniería de Sistemas","Ingeniería Mecánica","Ingeniería Eléctrica","Ciencias del Deporte"],
imagen:"img/utp.jpg"
}

];




// ================= INDEX =================

function cargarUniversidades(filtroCiudad="", filtroDepartamento="", filtroCarrera="", orden="") {

const lista = document.getElementById("listaUniversidades");
if(!lista) return;

lista.innerHTML="";

let filtradas = universidades.filter(u =>
u.ciudad.toLowerCase().includes(filtroCiudad.toLowerCase()) &&
u.departamento.toLowerCase().includes(filtroDepartamento.toLowerCase()) &&
u.programas.some(p=>p.toLowerCase().includes(filtroCarrera.toLowerCase()))
);

if(orden==="asc"){
filtradas.sort((a,b)=>a.ranking-b.ranking);
}

if(orden==="desc"){
filtradas.sort((a,b)=>b.ranking-a.ranking);
}

filtradas.forEach(uni=>{
lista.innerHTML+=`
<div class="card">
<img src="${uni.imagen}">
<div class="card-info">
<h2>${uni.nombre}</h2>
<p>${uni.ciudad} - ${uni.departamento}</p>
<p>Ranking Nacional: #${uni.ranking}</p>
<a class="btn-gob" href="universidad.html?uni=${uni.id}" target="_blank">
Ver información
</a>
</div>
</div>
`;
});
}

function aplicarFiltros(){
const ciudad=document.getElementById("buscarCiudad").value;
const departamento=document.getElementById("filtroDepartamento").value;
const carrera=document.getElementById("buscarCarrera").value;
const orden=document.getElementById("ordenRanking").value;

cargarUniversidades(ciudad,departamento,carrera,orden);
}



function cargarUniversidad() {

    const params = new URLSearchParams(window.location.search);
    const id = params.get("uni");

    const universidad = universidades.find(u => u.id === id);
    if (!universidad) return;

    window.universidadActual = universidad;

    document.getElementById("nombreUni").innerText = universidad.nombre;

    mostrarTab("info");
}




function mostrarTab(tab) {

    const u = window.universidadActual;
    const contenido = document.getElementById("contenidoTab");

    if (tab === "info") {
        contenido.innerHTML = `
            <p>${u.descripcion}</p>
            <p><strong>Ciudad:</strong> ${u.ciudad}</p>
            <p><strong>Departamento:</strong> ${u.departamento}</p>
        `;
    }

    if (tab === "programas") {
        contenido.innerHTML = "<ul>" + 
            u.programas.map(p => `<li>${p}</li>`).join("") +
            "</ul>";
    }

    if (tab === "puntaje") {
        contenido.innerHTML = `
            <p>Puntaje mínimo requerido: ${u.puntajeMinimo}</p>

            <input type="number" id="puntajeUsuario" placeholder="Ingresa tu puntaje">
            <button onclick="simularIngreso()">Simular</button>

            <div class="barra-container">
                <div id="barraProbabilidad" class="barra"></div>
            </div>

            <p id="resultado"></p>
        `;
    }

    if (tab === "contacto") {
        contenido.innerHTML = `
            <p><strong>Email:</strong> ${u.contacto}</p>
        `;
    }
}




function simularIngreso() {

    const puntaje = document.getElementById("puntajeUsuario").value;
    const resultado = document.getElementById("resultado");
    const barra = document.getElementById("barraProbabilidad");

    const minimo = window.universidadActual.puntajeMinimo;

    let porcentaje = (puntaje / minimo) * 100;

    if (porcentaje > 100) porcentaje = 100;

    barra.style.width = porcentaje + "%";

    if (puntaje >= minimo) {
        resultado.innerText = "Alta probabilidad de ingreso";
        barra.style.background = "#00ff88";
    } else {
        resultado.innerText = "Probabilidad baja de ingreso";
        barra.style.background = "#ff4d4d";
    }
}




function agregarFavorito() {

    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    if (!favoritos.includes(window.universidadActual.id)) {
        favoritos.push(window.universidadActual.id);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        alert("Agregado a favoritos ❤️");
    }
}

function verificarSesion() {

    const usuario = localStorage.getItem("usuarioActivo");

    if (!usuario) {
        window.location.href = "login.html";
    }
}

function login() {

    const usuario = document.getElementById("usuario").value;
    const password = document.getElementById("password").value;
    const mensaje = document.getElementById("mensajeLogin");

    // Usuario de prueba
    if (usuario === "admin" && password === "1234") {

        localStorage.setItem("usuarioActivo", usuario);
        window.location.href = "index.html";

    } else {
        mensaje.innerText = "Usuario o contraseña incorrectos";
        mensaje.style.color = "red";
    }
}

function verificarSesion() {

    const usuario = localStorage.getItem("usuarioActivo");

    if (!usuario) {
        window.location.href = "login.html";
    }
}

function cerrarSesion() {
    localStorage.removeItem("usuarioActivo");
    window.location.href = "login.html";
}

function compararUniversidades(id1,id2){

const u1=universidades.find(u=>u.id===id1);
const u2=universidades.find(u=>u.id===id2);

alert(`
Comparación:

${u1.nombre} (Ranking #${u1.ranking})
Puntaje mínimo: ${u1.puntajeMinimo}

VS

${u2.nombre} (Ranking #${u2.ranking})
Puntaje mínimo: ${u2.puntajeMinimo}
`);
}

function mostrarEstadisticas(){

const total=universidades.length;
const promedio=Math.round(
universidades.reduce((acc,u)=>acc+u.puntajeMinimo,0)/total
);

document.getElementById("estadisticas").innerHTML=`
<p>Total universidades: ${total}</p>
<p>Puntaje promedio requerido: ${promedio}</p>
`;
}
mostrarEstadisticas();

function cargarMapa() {

const mapa = L.map('mapa').setView([4.5709, -74.2973], 6);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(mapa);

universidades.forEach(u => {

    let coords;

    if (u.ciudad === "Bogotá") coords = [4.7110, -74.0721];
    if (u.ciudad === "Medellín") coords = [6.2442, -75.5812];
    if (u.ciudad === "Cali") coords = [3.4516, -76.5320];
    if (u.ciudad === "Bucaramanga") coords = [7.1193, -73.1227];
    if (u.ciudad === "Tunja") coords = [5.5353, -73.3678];
    if (u.ciudad === "Pereira") coords = [4.8143, -75.6946];

    if (coords) {
        L.marker(coords)
        .addTo(mapa)
        .bindPopup(`<b>${u.nombre}</b><br>${u.ciudad}`);
    }

});
}
cargarMapa();

async function cargarFavoritos(){

const usuario = localStorage.getItem("usuarioActivo");

if(!usuario){
    window.location.href="login.html";
    return;
}

const response = await fetch(`http://localhost:3000/favoritos/${usuario}`);
const favoritos = await response.json();

const contenedor = document.getElementById("listaFavoritos");
contenedor.innerHTML="";

favoritos.forEach(u=>{
    const card = document.createElement("div");
    card.className="card";

    card.innerHTML=`
        <h3>${u.nombre}</h3>
        <p>${u.ciudad}</p>
        <button onclick="verUniversidad(${u.id})">Ver más</button>
    `;

    contenedor.appendChild(card);
});
}
