 const BASE_URL = 'https://pokeapi.co/api/v2/';

//solo manda a traer la información del la api 
const fetchPokemon = async (pokemon) => {
    try {
        const response = await fetch(`${BASE_URL}pokemon/${pokemon}`);
        const parsedResponse = await response.json();
        return parsedResponse;
    } catch (err) {
        console.error(err);
    }
}
 
// Obtener pokemon
document.getElementById('get-btn')
    .addEventListener('click', async () => {
        const text = document.getElementById('poke-name').value.toLowerCase();
        const pokemon = await fetchPokemon(text);
        localStorage.setItem('currentPokeId', pokemon.id);
        console.log(pokemon.name);
 
        renderPokemonCard(pokemon);
    })
 
document.addEventListener('DOMContentLoaded', async () => {
    const storedId = localStorage.getItem('currentPokeId');
    const initialId = storedId ? parseInt(storedId) : 1;
    const pokemon = await fetchPokemon(initialId);
    console.log(pokemon.name);
    //renderPokemonCard(pokemon);
})
 
 //
 document.getElementById('previous-btn')
 .addEventListener('click', async () => {
     let currentPokeId = parseInt(localStorage.getItem('currentPokeId'));
     const newId = Math.max(1, currentPokeId - 1); // Calcula el nuevo ID
     if (newId !== currentPokeId) { // Verifica si el nuevo ID es diferente al actual
         currentPokeId = newId; // Actualiza el ID actual
         localStorage.setItem('currentPokeId', currentPokeId); // Guarda el nuevo ID en el almacenamiento local
         const pokemon = await fetchPokemon(currentPokeId);
         console.log(pokemon.name);
         renderPokemonCard(pokemon);
     }
 });

 
document.getElementById('next-btn')
.addEventListener('click', async () => {
    let currentPokeId = parseInt(localStorage.getItem('currentPokeId'));
    const newId = Math.max(1, currentPokeId + 1); // Calcula el nuevo ID
    if (newId !== currentPokeId) { // Verifica si el nuevo ID es diferente al actual
        currentPokeId = newId; // Actualiza el ID actual
        localStorage.setItem('currentPokeId', currentPokeId); // Guarda el nuevo ID en el almacenamiento local
        const pokemon = await fetchPokemon(currentPokeId);
        console.log(pokemon.name);
        renderPokemonCard(pokemon);
    }
    })
 
 
 
////////////////// POST
//
 
fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
        title: 'title1',
        body: 'Lorem ipsum dolor sit amet',
        userId: 1,
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    }
}).then(res => res.json())
    .then(json => console.log(json))

 

// Función para renderizar la tarjeta del Pokémon en el DOM
const renderPokemonCard = (pokemon) => {
    let card = document.getElementById('pokemon-card');
    // Si la tarjeta no existe, crearla
    if (!card) {
        const cardContainer = document.getElementById('pokemon-card-container');
        card = document.createElement('div');
        card.id = 'pokemon-card';
        card.classList.add('pokemon-card');
        cardContainer.appendChild(card);
    }
    // Actualizar contenido de la tarjeta
    card.innerHTML = ''; // Limpiar contenido previo
 
    const nameElement = document.createElement('h3');
    nameElement.textContent = `Nombre: ${pokemon.name}`;
 
    const idElement = document.createElement('p');
    idElement.textContent = `ID: ${pokemon.id}`;
 
    const weightElement = document.createElement('p');
    weightElement.textContent = `Peso: ${pokemon.weight} kg`;

    const typeElement = document.createElement('p');
    typeElement.textContent = `Tipo: ${pokemon.types[0].type.name} `;
 
    const imageElement = document.createElement('img');
    imageElement.src = pokemon.sprites.front_default;
    imageElement.alt = pokemon.name;
    imageElement.alt = pokemon.type;

 
    // Agregar elementos a la tarjeta
    card.appendChild(nameElement);
    card.appendChild(idElement);
    card.appendChild(weightElement);
    card.appendChild(typeElement);
    card.appendChild(imageElement);
 
    // Agregar tarjeta al contenedor en el DOM
    cardContainer.appendChild(card);
}
 
 
/////////////////// EJERCICIOS
//- Arreglar el pokemon en localStorage
// - Manipular el DOM y agregar una tarjeta del pokemon.
// - El tamaño e info de la tarjeta es a consideración personal.
// - La tarjeta debe mantenerse en la pantalla.
// - La info -> LocalStorage -> Fetch