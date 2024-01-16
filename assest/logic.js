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


// //Display the current day at the top of the calender when a user opens the planner---->Use Day.js library to work with date and time
// //It gives you the time when the page is loaded
// function displayTime (){
//     const today = dayjs();
//     const now= dayjs().format("dddd, MMM DD YYYY  [at] HH:mm:ss");
//     $("#currentDay").text(now);
// }
// //Call the display time function-->it will calling it once each second--->it'll keep running the clock.
// setInterval(displayTime,1000);

function searchCityWeather(city){
  
 // This is our API key
    const APIKey="b932f77c6ae6439148050eb1af45904f";
    const queryUrlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;


    console.log(queryUrlWeather);

    fetch(queryUrlWeather)
        .then(function(response){
             return response.json();
        }).then(function(data){
             console.log(data);
         

        temperature.text(`Current Temperature: ${data.main.temp} Cº`);
         wind.text(`Wind: ${data.wind.speed} MPH`);
         humidity.text(`Humidity: ${data.main.humidity}%`);
 

    

    // Empty the contents of the currentDay div, append the new city content
      $("#current").empty();
      $("#current").append(temperature,wind,humidity);
  })
};



// Event handler for user clicking the search city button
$("#searchBtn").on("click", function (event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    // Storing the city name
    const inputCity = $("#userInput").val().trim();
    
    city.text("City: " +inputCity);
    // Running the searchCity function(passing in the city as an argument)
    searchCityWeather(inputCity);
  });