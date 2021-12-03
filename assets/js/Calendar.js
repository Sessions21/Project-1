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





