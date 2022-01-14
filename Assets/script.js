//https://api.nal.usda.gov/fdc/v1/foods/search?query=apple&pageSize=2&api_key=0EHCMX3IdKdBAQSS7YUhWhRb5nVMGcakbgl7Pzfa//
// this is our api from usda food industry

// api key 4417fffcd6216db061ff874b73d3ffadde2f340a for yummly
// 4417fffcd6216db061ff874b73d3ffadde2f340a


// url:`https://api.nal.usda.gov/fdc/v1/foods/search?query=apple&pageSize=2&api_key=0EHCMX3IdKdBAQSS7YUhWhRb5nVMGcakbgl7Pzfa`
// url:`https://api.spoonacular.com/recipes/complexSearch`

// Spoonacular API Key: 7226009885d74cf5ba75e4d9352df82a
// ?api_Key=7226009885d74cf5ba75e4d9352df82a
// url:`https://api.spoonacular.com/recipes/complexSearch?api_Key=7226009885d74cf5ba75e4d9352df82a`
// https://api.spoonacular.com/recipes/extract?api_Key=7226009885d74cf5ba75e4d9352df82a

// https://api.spoonacular.com/recipes/random?apiKey=7226009885d74cf5ba75e4d9352df82a&number=1

const searchForm = document.querySelector('form');
const searchResults = document.querySelector('.search-result');
const container = document.querySelector('.container');
var searchQuery = ``;
const APP_ID = `d3e5c6fd`
const API_KEY = `c628a4d256c9e32f0138ceafb1591933`


searchForm.addEventListener(`submit`, (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector(`input`).value;
    fetchAPI();
});
async function fetchAPI (){
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${API_KEY}&to=1`;
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits);
    console.log(data);
}
function generateHTML(results){
    let generatedHTML = ``;
    results.map(result => {
        generatedHTML +=
        `
        <div class="item column is-one-half ">
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">
                    ${result.recipe.label}
                    </p>
                </header>
                <div class="card image">
                    <figure class="image is-4by3">
                        <img src="${result.recipe.image}" alt="Image of the Recipe">
                    </figure>
                </div>
                <div class="card-content">
                    <div class="content">
                        <p class="item-data">Calories:${result.recipe.calories.toFixed(0)} Servings:${result.recipe.yield}</p>
                    </div>
                </div>
                <div class="card-footer">
                    <a class="button is-dark" target="_blank" href="${result.recipe.url}">
                        <span>Get Recipe</span>
                    </a>
                    <div class="dropdown">
                        <div class="dropdown-trigger">
                            <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                                <span>Add this Recipe</span>
                                <span class="icon is-small">
                                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                                </span>
                            </button>
                        </div>
                        <div class="dropdown-menu" id="dropdown-menu" role="menu">
                            <div class="dropdown-content">
                                <div class="dropdown-item">
                                    <input class="button is-white is-fullwidth" type="button" value="Monday">
                                </div>
                                <div class="dropdown-item">
                                    <input class="button is-white is-fullwidth" type="button" value="Tuesday">
                                </div>
                                <div class="dropdown-item">
                                    <input class="button is-white is-fullwidth" type="button" value="Wednesday">
                                </div>
                                <div class="dropdown-item">
                                    <input class="button is-white is-fullwidth" type="button" value="Thursday">
                                </div>
                                <div class="dropdown-item">
                                    <input class="button is-white is-fullwidth" type="button" value="Friday">
                                </div>
                                <div class="dropdown-item">
                                    <input class="button is-white is-fullwidth" type="button" value="Saturday">
                                </div>
                                <div class="dropdown-item">
                                    <input class="button is-white is-fullwidth" type="button" value="Sunday">
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>          
        </div>
        `
    })
    searchResults.innerHTML = generatedHTML;

    var dropdowns = document.querySelectorAll('.dropdown');

    if (dropdowns.length > 0) {
        dropdowns.forEach(function (el) {
        el.addEventListener('click', function (event) {
            event.stopPropagation();
            el.classList.toggle('is-active');
        });
        });

        document.addEventListener('click', function (event) {
        closeDropdowns();
        });
    }

    function closeDropdowns() {
        dropdowns.forEach(function (el) {
        el.classList.remove('is-active');
        });
    }
};


// joke button
// fetch(`https://api.humorapi.com/jokes/random?api-key=0d50a753058142d38f0460a1d4ef5de2&include-tags=food&exclude-tags=NSFW,dark`)

const jokeText = document.querySelector(`#joke`);
const jokeBTN = document.querySelector(`#jokeButton`);

jokeBTN.addEventListener("click", GetJoke)

async function GetJoke(){
var jokeData = await fetch(`https://icanhazdadjoke.com/search?term=food`, {
    headers: {
        Accept: `application/json`
    }
});

var jokeObj = await jokeData.json();
var item = jokeObj.results[Math.floor(Math.random()*jokeObj.results.length)];
console.log(item.joke)
jokeText.innerHTML = item.joke;
}