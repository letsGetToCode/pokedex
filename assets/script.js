const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonSprite = document.querySelector('.pokemon__image');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
const form = document.querySelector('.form');
const inputField = document.querySelector('.input__search');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {

  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if(APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'Loading ...';
  pokemonNumber.innerHTML = '[WAIT]';

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonSprite.style.display = 'block';  
    pokemonName.innerHTML = data.name;  
    pokemonNumber.innerHTML = data.id;  
    pokemonSprite.setAttribute('src', data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']);  
    searchPokemon = data.id;
    inputField.value = '';
  } else {
    pokemonSprite.style.display = 'none';
    pokemonNumber.innerHTML = '[ERROR]';
    pokemonName.innerHTML = 'Not Found';
  }
}

form.addEventListener('submit', (event)=>{
  event.preventDefault();
  
  renderPokemon(inputField.value.toLowerCase());  
});

btnNext.addEventListener('click', ()=>{
  searchPokemon ++;
  renderPokemon(searchPokemon);
  
});

btnPrev.addEventListener('click', ()=>{
  if(searchPokemon > 1){
    searchPokemon --;
    renderPokemon(searchPokemon);
  }
});


renderPokemon(searchPokemon);