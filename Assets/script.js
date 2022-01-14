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
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${API_KEY}&to=20`;
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits);
    console.log(data);
}

function generateHTML(results){
    container.classList.remove('recipe-tile-custom');
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
                                <span>Pick this Recipe</span>
                                <span class="icon is-small">
                                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                                </span>
                            </button>
                        </div><br><br>
                        <div class="dropdown-menu" id="dropdown-menu" role="menu">
                            <div class="dropdown-content">
                                <a class="dropdown-item monday-dd">
                                    Monday
                                </a>
                                <a class="dropdown-item tuesday-dd">
                                    Tuesday
                                </a>
                                <a class="dropdown-item wednesday-dd">
                                    Wednesday
                                </a>
                                <a href="#" class="dropdown-item thursday-dd">
                                    Thursday
                                </a>
                                <a class="dropdown-item friday-dd">
                                    Friday
                                </a>
                                <a class="dropdown-item saturday-dd">
                                    Saturday
                                </a>
                                <a class="dropdown-item sunday-dd">
                                    Sunday
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>          
        </div>
        `  
    });
  
}
//get item from local storag 7x (donre on page load),  an darray for each day of the week 
//run next fun sets item into array add to local stor for day 
// llocalstorag.setitem(dayofweek,json.strigiffy(monarray))
//if, else state 
//event lis with event del correct 
//placeholder in local store
//list 

//grt valu from title to obj



//local storage
// const recipes = JSON.parse(localStorage.getItem("data")) || [];

//        const addRecipe = (label, image, calories,url) => {
//          recipes.push({
//            label,
//            image,
//            calories,
//            url,
//          });
       
//          localStorage.setItem("recipes", JSON.stringify(recipes));
       
//          return { label,image, calories, url };
//        }; 
// define variables
//listen to the menu to see what user picks(what day is picked)
//which recipe is clicked
//what is the key and string "key=day", string=recipe name

//obj - array - 