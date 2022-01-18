const searchForm = document.querySelector('form');
const searchResults = document.querySelector('.search-result');
const container = document.querySelector('.container');
var searchQuery = ``;
const APP_ID = `d3e5c6fd`
const API_KEY = `c628a4d256c9e32f0138ceafb1591933`
var currentHits;


searchForm.addEventListener(`submit`, (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector(`input`).value;
    fetchAPI();
});
async function fetchAPI (){
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${API_KEY}&to=20`;
    const response = await fetch(baseURL);
    const data = await response.json();
    currentHits =  data.hits;
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
                    <p class="card-header-title recipe-label">
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
                        <p class="item-data">Cook Time: ${result.recipe.totalTime} min Servings:${result.recipe.yield}</p>
                    </div>
                </div>
                <div class="card-footer">
                    <a class="button is-dark" target="_blank" href="${result.recipe.url}">
                        <span>View Recipe</span>
                    </a>
                    <div class="dropdown">
                        <div class="dropdown-trigger">
                            <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                                <span>Pick this Recipe</span>
                                <span class="icon is-small">
                                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                                </span>
                            </button>
                        </div>
                        <div class="dropdown-menu" id="dropdown-menu" role="menu">
                            <div class="dropdown-content">
                                <div class="hidden">${result.recipe.uri}</div>
                                <div class="dropdown-item">
                                    <input class="button is-white is-fullwidth dd-btn" type="button" value="Monday">                                    
                                </div>
                                <div class="dropdown-item">
                                    <input class="button is-white is-fullwidth dd-btn" type="button" value="Tuesday">                                    
                                </div>
                                <div class="dropdown-item">
                                    <input class="button is-white is-fullwidth dd-btn" type="button" value="Wednesday">                                    
                                </div>
                                <div class="dropdown-item">
                                    <input class="button is-white is-fullwidth dd-btn" type="button" value="Thursday">                                    
                                </div>
                                <div class="dropdown-item">
                                    <input class="button is-white is-fullwidth dd-btn" type="button" value="Friday">                                    
                                </div>
                                <div class="dropdown-item">
                                    <input class="button is-white is-fullwidth dd-btn" type="button" value="Saturday">
                                </div>
                                <div class="dropdown-item">
                                    <input class="button is-white is-fullwidth dd-btn" type="button" value="Sunday">
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
    // function to activate dropdown 
    var dropdowns = document.querySelectorAll('.dropdown');

    if (dropdowns.length > 0) {
        dropdowns.forEach(function (el) {
        el.addEventListener('click', function (event) {            
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
}

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

// navbar hide and unhide functions
var rfNaviBtn = document.getElementById("rf-nav");
var mpNaviBtn = document.getElementById("mp-nav");
var glNaviBtn = document.getElementById("gl-nav");
var homeNaviBtn = document.getElementById("home-nav");
var rfSection = document.getElementById("recipe-finder");
var mpSection = document.getElementById("meal-planner");
var glSection = document.getElementById("grocery-list");
var homeSection = document.getElementById("home-page")

homeNaviBtn.addEventListener('click', function(e) {
    homeSection.classList.remove('hidden');
    rfSection.classList.add('hidden');
    mpSection.classList.add('hidden');
    glSection.classList.add('hidden');
})

mpNaviBtn.addEventListener('click', function(e) {
    rfSection.classList.add('hidden');
    mpSection.classList.remove('hidden');
    glSection.classList.add('hidden');
    homeSection.classList.add('hidden');
})

rfNaviBtn.addEventListener('click', function(e) {
    rfSection.classList.remove('hidden');
    mpSection.classList.add('hidden');
    glSection.classList.add('hidden');
    homeSection.classList.add('hidden');
})

glNaviBtn.addEventListener('click', function(e) {
    rfSection.classList.add('hidden');
    mpSection.classList.add('hidden');
    glSection.classList.remove('hidden');
    homeSection.classList.add('hidden');
})

// meal planner local storage injection
const recResultsField = document.getElementById("recipe-results")

recResultsField.addEventListener('click', function(event) {
    let target = event.target;
    event.stopPropagation();
    if (target.parentElement.className != 'dropdown-item') return;
    var day = target.value;
    let recipeUri = $(target.parentElement).siblings(".hidden")[0].innerHTML
    var daysRecipe = currentHits.find(hit => recipeUri === hit.recipe.uri).recipe
    localStorage.setItem(day, JSON.stringify(daysRecipe));
    updateDay(day);
})

var daysArray = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
daysArray.forEach(updateDay)

function updateDay(day) {
    if (localStorage.getItem(day) !== null) {
        var daysRecipe = JSON.parse(localStorage.getItem(day))
        var sideSlot = document.getElementById("se-"+day)
        var weekSlot = document.getElementById("mp-"+day)
        sideSlot.innerHTML = `<p class="subtitle"> ${daysRecipe.label} </p>`
        weekSlot.innerHTML =         
        `
        <div class="box">
            <article class="media">
                <div class="media-left">
                    <figure class="image is-128x128">
                        <img src="${daysRecipe.image}" alt="Image of the Recipe"}>
                    </figure>
                </div>
                <div class="media-content">
                    <div class="content">
                        <p class="subtitle">${daysRecipe.label}</p>
                        <p>Dish Type: ${daysRecipe.dishType}
                        <p>Cooktime: ${daysRecipe.totalTime}</p>
                        <p>Calories: ${daysRecipe.calories.toFixed(0)} Servings:${daysRecipe.yield}</p>
                    </div>
                </div>
                <nav class="level">
                    <a class="button is-dark" target="_blank" href="${daysRecipe.url}">
                        <span>View Recipe</span>
                    </a>
                </nav>
            </article>          
        </div>
        `
        var glSlot = document.getElementById("list-data")
        var ingredientsArray = daysRecipe.ingredients
        ingredientsArray.forEach(function(ingredient) {
            if (ingredient.quantity !== 0)
            glSlot.innerHTML += 
            `
            <tr>
            <th>${day}</th>
            <td>${ingredient.food}</td>
            <td>${ingredient.quantity}</td>
            <td>${ingredient.measure}</td>
            <td><input type="checkbox"></td>
            </tr>
            `            
            else if (ingredient.quantity === 0)
            glSlot.innerHTML += 
            `
            <tr>
            <th>${day}</th>
            <td>${ingredient.food}</td>
            <td>To Taste</td>
            <td>N/A</td>
            <td><input type="checkbox"></td>
            </tr>
            ` 
            })
        }
    else if (localStorage.getItem(day) === null) return;
}

