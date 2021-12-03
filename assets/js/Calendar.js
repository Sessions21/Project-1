//global variables called by ID
var cities = [];
//weather/city variables
var cityFormEl=document.querySelector("#city-search");
var cityInputEl=document.querySelector("#city")
var citySearchInputEl = document.querySelector("#searched-city")
var weatherContainerEl=document.querySelector("#current-weather");
var forecastTitle = document.querySelector("#forecast");
var forecastContainerEl = document.querySelector("#five-days");


var weatherLink = document.querySelector("#weather")

weatherLink.onClick = () => {
  document.querySelector('[data-target="#weatherModal"]').click();
};

// Variable targeting the event
var formSumbitHandler = function(event){
  event.preventDefault();
  var city = cityInputEl.value.trim();
  //if statement calling the functions
  if(city){
      getCityWeather(city);
      getFiveDay(city);
      cityInputEl.value = "";
  } else{
      alert("Please enter a valid City");
  }
};

// fetch for server side API within function getCityWeather
var getCityWeather = function(city){
  //api key gathered from https://home.openweathermap.org/api_keys
  var apiKey = "53cc19866aee7a5602f390746fd6f2e7"
  var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
  //fetch for apiURL
  fetch(apiURL)
  .then(function(response){
    //display data with call of displayWeather
    response.json().then(function(data){
      displayWeather(data,city);
    });
  });
};
