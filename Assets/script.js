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

const searchForm = document.querySelector(`form`);
const searchResults = document.querySelector(`.search-result`);
const container = document.querySelector(`.container`);
var searchQuery = ``;
const APP_ID = `d3e5c6fd`
const API_KEY = `c628a4d256c9e32f0138ceafb1591933`


searchForm.addEventListener(`submit`, (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector(`input`).value;
    fetchAPI();
});
async function fetchAPI (){
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${API_KEY}&to=20`;
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
         <div class="item">
            <img src="${result.recipe.image}" alt="Image of the Recipe">
             <div class="flex-container">
                <h1 class="title">${result.recipe.label}</h1>
                <a class="view button" target="_blank" href="${result.recipe.url}">
                <button>View Recipe</button>
                </a>
             </div>
            <p class="item-data">Calories:${result.recipe.calories.toFixed(0)} Servings:${result.recipe.yield}</p>
        </div>
        `
    })
    searchResults.innerHTML = generatedHTML;
}
