// Función para cargar y leer el JSON
let data = []; // Variable global para almacenar los datos
// Variable para el índice actual del carrusel
let currentIndex = 0;
async function loadJSON() {
    try {
        //compruebo si exite el fichero al q qiero "conectarme"
        const response = await fetch('../assets/marvel_heroes.json');

        //si el archivo al que me quiero "conectar" da algun tipo de problema
        if (!response.ok) {
            throw new Error('Error al cargar el JSON');
        }

        //guarda en data el resultado de la lectura del JSON;
        //uso await para asegurarme de q lea el documento entero
        data = await response.json();
        console.log(data); // Imprime en consola

        // Establecer la imagen inicial en Iron Man (primer héroe)
        const img = document.getElementById('current-image');
        img.src = data[0].enlace_icono;
        img.alt = data[0].nombre_heroe;

        // Mostrar tarjeta del personaje actual
        renderCharacterCard(currentIndex);

    } catch (error) {
        console.error('Error:', error);
    }
}

// Renderiza la tarjeta del personaje en el contenedor jsonData
function renderCharacterCard(index) {
    if (!data.length) return;
    const hero = data[index];
    const card = document.getElementById('jsonData');
    let html = '';
    data.forEach(hero => {
        html += `
        <div class="character-card">
            <div class="character-card-image">
                <img src="${hero.enlace_icono}" alt="${hero.nombre_heroe}">
            </div>
            <div class="character-card-info">
                <h2>${hero.nombre_heroe}</h2>
                <p><strong>Nombre civil:</strong> ${hero.nombre_civil}</p>
                <p><strong>Lugar de nacimiento:</strong> ${hero.lugar_nacimiento}</p>
                <p><strong>Superpoderes:</strong></p>
                <ul>
                    ${hero.superpoderes.map(power => `<li>${power}</li>`).join('')}
                </ul>
            </div>
        </div>
   `;
    });
    card.innerHTML = html;
}

// Llama a la función cuando sea necesario, por ejemplo, al cargar la página
window.addEventListener('load', loadJSON);


// Función para ir a la imagen anterior
function anterior() {
    currentIndex = (currentIndex - 1 + data.length) % data.length;
    const img = document.getElementById('current-image');
    img.src = data[currentIndex].enlace_icono;
    img.alt = data[currentIndex].nombre_heroe;
    renderCharacterCard(currentIndex);
}

// Función para ir a la imagen siguiente
function siguiente() {
    currentIndex = (currentIndex + 1) % data.length;
    const img = document.getElementById('current-image');
    img.src = data[currentIndex].enlace_icono;
    img.alt = data[currentIndex].nombre_heroe;
    renderCharacterCard(currentIndex);
}

