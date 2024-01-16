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
   return now;
}
getRecentSearches();

function searchCityWeather(city){
  
 // This is our API key
    const APIKey="b932f77c6ae6439148050eb1af45904f";
    const queryUrlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;


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


            //  fiveDay.empty();

            //  console.log(data);
            //  var dailyArray =data;
            //  console.log(dailyArray);
            //  for (var i =0; i<5;i++){
            //     var iconCode=dailyArray[i].weather[0].icon;
            //      var iconurl = "https://openweathermap.org/img/wn/" + iconCode + ".png";
            //      fetch(iconurl)
            //      .then(data => {
            //          $('#fiveDayIcon').attr('src', data.url);
     
            //      });
    
            //      cards(getDay(), data[i].main.temp,
            //            data[i].wind.speed, data[i].main.humidity);
            //  }
            // });
  })
};




// Create cards

function cards (date,icon,temp,windSpeed,humidity){
    
    fiveDay.append(`
    <div class="card d-inline-flex mx-3" style="width: 13rem;border-radius: 20px;background-color:black;">
        <div class="card-body text-center" id='fiverCards'>
             <h5 class="card-title" id='card-title'>${date}</h5>
            <img id ='fiveDayIcon'src=${icon}>
            <h6 class="card-subtitle mb-2 text-muted" id ='temps'>High: ${temp}</h6>
            <h6 class="card-subtitle mb-2 text-muted" id ='cardinfo'>Wind: ${windSpeed}</h6>
            <h6 class="card-subtitle mb-2 text-muted" id ='cardinfo'>Humidity: ${humidity}</h6>
         </div>
    </div>`);
};

// Function for displaying city data
function renderCities(input) {
    $("#recent-searches").show();
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
      // Save to localStorage
        localStorage.setItem("searches", JSON.stringify(cities));
    })
  }

  // Get Recent Searches from localStorage
	function getRecentSearches() {
        var searches = JSON.parse(localStorage.getItem("searches"));
        if (searches != null) {
          for (var i = 0; i < searches.length; i++) {
            //Create Button Element with data in localStorage
             const b = $("<button>");
            // Adding a class of city-btn to our button
            b.addClass("cityBtn");
            // Adding a data-attribute
            b.attr("data-name", city);
             // Providing the initial button text
            b.text(searches[i]);
            // Append to List
            $("#recent-searches-list").prepend(b);
          }
         $("#recent-searches").show();
        } else {
          $("#recent-searches").hide();
        }
      }
      //Clear localStorage when click Button Clear and empty recent-search-list 
      $("#clearBtn").on("click", function() {
          localStorage.clear();
          $("#recent-searches-list").empty();
      });

// Event handler for user clicking the search city button
$("#searchBtn").on("click", function (event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    // Storing the city name
    const inputCity = $("#userInput").val().trim();
    
    //user input is empty nothing happend
    if (inputCity == "" ){
        return;
    }else {
        //Repeat cities no added to the search
        for (var i = 0; i < cities.length; i++){
            if (cities[i]===inputCity)
                return;
            }
      } 

        city.text("City: " +inputCity + " (" +getDay()+") ");

        // Adding city from the textbox to our array of cities
        cities.push(inputCity);

    // Calling renderButtons which handles the processing of our cities array
        renderCities(inputCity);
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


