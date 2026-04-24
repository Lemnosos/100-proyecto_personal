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
function renderCharacterCard() {
    if (!data || !data.length) return;

    const contenedor = document.getElementById('jsonData');
    const fragment = document.createDocumentFragment();

    data.forEach(hero => {

        let tarjeta = document.createElement("DIV");
        tarjeta.className = "character-card";

        let imagenContainer = document.createElement("DIV");
        imagenContainer.className = "imageContainer";

        let imagenCard = document.createElement("IMG");
        imagenCard.src = hero.enlace_icono;
        imagenCard.alt = hero.nombre_heroe;

        let cardInfo = document.createElement("DIV");
        cardInfo.className = "character-card-info";

        let nombre = document.createElement("H2");
        nombre.textContent = hero.nombre_heroe;

        let nombreCivil = document.createElement("P");
        nombreCivil.textContent = `Nombre civil: ${hero.nombre_civil}`;

        let lugarNacimiento = document.createElement("P");
        lugarNacimiento.textContent = `Lugar de nacimiento: ${hero.lugar_nacimiento}`;

        let textoSuperPoderes = document.createElement("P");
        textoSuperPoderes.textContent = "Superpoderes";

        let poderes = document.createElement("UL");
        hero.superpoderes.forEach(poder => {
            let li = document.createElement("LI");
            li.textContent = poder;
            poderes.append(li);
        });

        cardInfo.append(nombre, nombreCivil, lugarNacimiento, textoSuperPoderes, poderes);
        imagenContainer.append(imagenCard);
        tarjeta.append(imagenContainer, cardInfo);

        fragment.append(tarjeta);
    });

    contenedor.append(fragment);
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

