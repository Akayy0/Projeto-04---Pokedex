const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const pokedex = document.querySelector('.pokedex');


const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;



// Função principal, puxa os dados dos pokemons e nos retorna eles para serem usados
const fetchPokemon = async (pokemon) =>{

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if(APIResponse.status == 200){
        const data = await APIResponse.json();
        return data;  
    }
    
}

// função para renderizar os dados na tela

const renderPokemon = async (pokemon) =>{

    pokemonName.innerHTML = 'loading....'
    pokemonNumber.innerHTML = ''

    const data = await fetchPokemon(pokemon);


    if (data) {
        pokemonName.innerHTML = data.name
        pokemonNumber.innerHTML = data.id


        pokemonImage.style.top = '26%'
        pokemonImage.style.height = "18%";
        
        if(data.id < 650){
            pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']
            ['animated']['front_default'];

            pokedex.src = './images/pokedex1.png'


        }else if(data.id > 649){
            
            
            pokemonImage.src = data['sprites']['other']['official-artwork']['front_default'];
            pokedex.src = './images/pokedex.png'

            pokemonImage.style.top = '21%'
            pokemonImage.style.height = "28%";
            
            

        }
        
        
        input.value = '';

        searchPokemon = data.id;

    }else{
        pokemonName.innerHTML = 'ERROR'
        pokemonNumber.innerHTML = 'XXX'
        pokemonImage.src = './images/missingno.png'
    }

    
}

// buscar passando o nome ou numero no input do formulario

form.addEventListener('submit', (event)=>{
    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', ()=>{
    if(searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon)
    }
    
    
});

buttonNext.addEventListener('click', ()=>{
    searchPokemon += 1;
    renderPokemon(searchPokemon)
    
});

renderPokemon(searchPokemon);









