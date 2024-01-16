// Set variables for 5-Day Forecast cards

var current = $('#current');
var city = $('#City');
var icon =$('#icon');
var temperature = $('#temp');
var wind = $('#wind');
var humidity = $('#humidity');
var fiveDay =$('#fiveDay');

var search = $('#searchBtn');
var inputEl = $('#userInput');
// var longitude ='';
// var latitude =''

// Initial array of cities
const cities = [];

//get today day with dayjs library
function getDay (){
    const today = dayjs();
    const now= dayjs().format("DD/MM/YYYY ");
    console.log(now);
   return now;
}


function searchCityWeather(city){
  
 // This is our API key
    const APIKey="b932f77c6ae6439148050eb1af45904f";
    const queryUrlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;


    console.log(queryUrlWeather);

    fetch(queryUrlWeather)
        .then(function(response){
             return response.json();
        }).then(function(data){

             temperature.text(`Current Temperature: ${data.main.temp} Cº`);
             wind.text(`Wind: ${data.wind.speed} MPH`);
             humidity.text(`Humidity: ${data.main.humidity}%`);

             var iconCode=data.weather[0].icon;
             var iconurl = "https://openweathermap.org/img/wn/" + iconCode + ".png";   
         
             fetch(iconurl)
                .then(function(data){
                icon.attr('src', data.url);
             });

    
            // Empty the contents of the currentDay div, append the new city content
             $("#current").empty();
             $("#current").append(icon,temperature,wind,humidity);
  })
};


// Function for displaying city data
function renderCities() {

    // Deleting the cities prior to adding new cities
    // (this is necessary otherwise you will have repeat buttons)
    $("#recent-searches-list").empty();
  
    // Looping through the array of cities
    $.each(cities, function (i, city) {
  
      // Then dynamically generating buttons for each city in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      const a = $("<button>");
      // Adding a class of city-btn to our button
      a.addClass("cityBtn");
      // Adding a data-attribute
      a.attr("data-name", city);
      // Providing the initial button text
      a.text(city);
      // Adding the button to the recent-searches-list div
      $("#recent-searches-list").append(a);
    })
  }



// Event handler for user clicking the search city button
$("#searchBtn").on("click", function (event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    // Storing the city name
    const inputCity = $("#userInput").val().trim();
    //now= setInterval(getDay,1000);
    city.text("City: " +inputCity + " (" +getDay()+") ");

     // Adding city from the textbox to our array of cities
    cities.push(inputCity);

    // Calling renderButtons which handles the processing of our cities array
    renderCities();
    // Running the searchCity function(passing in the city as an argument)
    searchCityWeather(inputCity);
  });

  // Adding a click event listener to all elements with a class of "cityBtn"

// Onclick listener to search list items
// $("#recent-searches-list").on("click", "cityBtn", function() {
//     var history = $(this).text();
//     console.log(history);
//     searchCityWeather(history);

// });

$("#cityBtn").on("click", function (event) {
     // Preventing the button from trying to submit the form
     event.preventDefault();
     // Storing the city name
     const input = $("#cityBtn").val().trim();
     var history = $(this).text();
    console.log(input);
     //const inputCity = $("#userInput").val().trim();
     console.log(inputCity);
     searchCityWeather(input);
});
//$(inputCity).on("click", "cityBtn", searchCityWeather);

// Calling the renderCities function to display the initial cities
//renderCities();

