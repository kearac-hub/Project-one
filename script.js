var searchForm = document.querySelector('form');
var searchResultDiv = document.querySelector('.search-result');
var container = document.querySelector('.container');
var searchQuery = '';
var APP_key = '34036d850cf614fc76cbd901754bc647'
var APP_ID = '6fb8b5e5'


searchForm.addEventListener("submit",(e) => { e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    fetchAPI();

});
async function fetchAPI () {
    var baseUrl = 'https://api.edamam.com/search?q=pizza&app_id=${APP_ID}&app_key${APP_key}';
    var response = await fetch(baseUrl);
    var data = await response.json();
    console.log(data)
}





// fetch(
//     "https://api.openweathermap.org/data/2.5/forecast?q=appid=67acfa9c6a751f5582cec85ff5a040b7")
  
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {

//            console.log(data)
    

