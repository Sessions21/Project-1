// global variables called by ID
var cities = [];
// weather/city variables
var cityFormEl = document.querySelector("#city-search");
var cityInputEl = document.querySelector("#city");
var citySearchInputEl = document.querySelector("#city-search-input");
var weatherContainerEl = document.querySelector("#current-weather");
var forecastTitle = document.querySelector("#forecast");
var forecastContainerEl = document.querySelector("#five-days");
var weatherLink = document.querySelector("#get-forecast-nav-button");
var getForecast = document.querySelector("#getForecastBtn");
var getForecast2 = document.querySelector('#getForecastBtn2');
var closeModal = document.querySelector('#close-modal')

// Weather click in nav bar will show modal
$(weatherLink).click(function () {
  $("#weatherModal").modal("show");
});

$(getForecast).on("click", function () {
  var city = $(citySearchInputEl).val();
  getFiveDay(city);
  getCityWeather(city);
  $("#weatherModal").modal("hide");
  var weatherSection = $("#weather-section");
  $("html, body").animate({ scrollTop: weatherSection.offset().top }, 1000);
});

$(closeModal).click(function () {
  $("#weatherModal").modal("hide");
});

// Get Forecast Btn in Weather section
$(getForecast2).click(function () {
  $("#weatherModal").modal("show");
});

// Variable targeting the event
var formSumbitHandler = function (event) {
  event.preventDefault();
  var city = cityInputEl.value.trim();
  // if statement calling the functions
  if (city) {
    getCityWeather(city);
    getFiveDay(city);
    cityInputEl.value = "";
  } else {
    alert("Please enter a valid City");
  }
};

// fetch for server side API within function getCityWeather
var getCityWeather = function (city) {
  // api key gathered from https://home.openweathermap.org/api_keys
  var apiKey = "53cc19866aee7a5602f390746fd6f2e7";
  var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  // fetch for apiURL
  fetch(apiURL).then(function (response) {
    // display data with call of displayWeather
    response.json().then(function (data) {
      displayWeather(data, city);
    });
  });
};

//display variable for weather and each div element within
var displayWeather = function (weather, searchedCity) {
  //clear old content from remaining on page
  weatherContainerEl.textContent = "";
  citySearchInputEl.textContent = searchedCity;

  //created date element, utilizing moment.js file to create the date format reference https://momentjs.com/ to set the date
  var currentDate = document.createElement("span");
  currentDate.textContent = " (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
  citySearchInputEl.appendChild(currentDate);

  //created a image element for weather ICONS
  var weatherIcon = document.createElement("img");
  weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
  citySearchInputEl.appendChild(weatherIcon);

  //created a div element to hold the temperature data
  var temperatureEl = document.createElement("div");
  temperatureEl.textContent = "Temperature: " + weather.main.temp + " °f";
  temperatureEl.classList = "list-group-item";

  // created a div element to hold the humidity data
  var humidityEl = document.createElement("div");
  humidityEl.textContent = "Humidity: " + weather.main.humidity + " %";
  humidityEl.classList = "list-group-item";

  // created a div element to hold the wind data
  var windSpeedEl = document.createElement("div");
  windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
  windSpeedEl.classList = "list-group-item";

  //appending each div element to the main container
  weatherContainerEl.appendChild(temperatureEl);
  weatherContainerEl.appendChild(humidityEl);
  weatherContainerEl.appendChild(windSpeedEl);

  //referenced https://openweathermap.org/api/one-call-api to help with setting lat and lon
  var lat = weather.coord.lat;
  var lon = weather.coord.lon;
  //call for UV Index variable
  getUvIndex(lat, lon);
};

//variable function for UV index to get data for lat,lon
var getUvIndex = function (lat, lon) {
  var apiKey = "53cc19866aee7a5602f390746fd6f2e7";
  var apiURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`;
  //fetch for the open weather map API with lat and lon parameters
  fetch(apiURL).then(function (response) {
    response.json().then(function (data) {
      displayUvIndex(data);
    });
  });
};

// display of the UV index
var displayUvIndex = function (index) {
  var uvIndexEl = document.createElement("div");
  uvIndexEl.textContent = "UV Index: ";
  uvIndexEl.classList = "list-group-item";

  //span element for UV Value
  uvIndexValue = document.createElement("span");
  uvIndexEl.textContent = index.value;

  // if and else if statements for value on index for weather conditions, numeric amount taken from Open Weather API
  if (index.value <= 2) {
    uvIndexValue.classList = "favorable";
  } else if (index.value > 2 && index.value <= 8) {
    uvIndexValue.classList = "moderate ";
  } else if (index.value > 8) {
    uvIndexValue.classList = "severe";
  }
  //append index value to index element
  uvIndexEl.appendChild(uvIndexValue);
  //append index element to current weather element
  weatherContainerEl.appendChild(uvIndexEl);
};

var getFiveDay = function (city) {
  //parameters for city forecast
  var apiKey = "53cc19866aee7a5602f390746fd6f2e7";
  var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

  //fetch of API
  fetch(apiURL).then(function (response) {
    response.json().then(function (data) {
      displayFiveDay(data);
    });
  });
};

var displayFiveDay = function (weather) {
  forecastContainerEl.textContent = "";
  forecastTitle.textContent = "Five-Day Forecast:";

  //variable created with i declared to give 5 day forecast
  var forecast = weather.list;
  for (var i = 5; i < forecast.length; i = i + 8) {
    var dailyForecast = forecast[i];

    // div element created for the forecast containter
    var forecastEl = document.createElement("div");
    forecastEl.classList = "card bg-primary text-light m-2";

    //create a date element to display the current dates and future forecast dates
    var forecastDate = document.createElement("h3");
    forecastDate.textContent = moment.unix(dailyForecast.dt).format("MMM D, YYYY");
    forecastDate.classList = "card-header text-center";
    forecastEl.appendChild(forecastDate);

    //Image Element created with attribute set for icons
    var weatherIcon = document.createElement("img");
    weatherIcon.classList = "card-body text-center";
    weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`);

    //append images to the forecast card- pulled from openweathermap
    forecastEl.appendChild(weatherIcon);

    //create temperature span
    var forecastTempEl = document.createElement("span");
    forecastTempEl.classList = "card-body text-center";
    forecastTempEl.textContent = dailyForecast.main.temp + " °f";

    //append to forecast card
    forecastEl.appendChild(forecastTempEl);

    var forecastHumEl = document.createElement("span");
    forecastHumEl.classList = "card-body text-center";
    forecastHumEl.textContent = dailyForecast.main.humidity + "  %";

    //appended Humidity to forecast card
    forecastEl.appendChild(forecastHumEl);

    //appended forecast element to five day container
    forecastContainerEl.appendChild(forecastEl);
  }
};

// start of calendar js file
function generateTimeblock (hour) {
  var timeBlockRow = $("<div>");
  timeBlockRow.addClass("row justify-content-center mb-1");

  var timeBlockHour = $("<div>");
  timeBlockHour.addClass("col-2 mr-2 bg-secondary p-2 text-center font-weight-bold");
  timeBlockHour.text(hour);

  var timeBlockDetail = $("<div>");
  timeBlockDetail.addClass("col-6 border-right border-left border-light p-2");

  var momentHour = moment(hour, 'hh:mm A').hour();
  var currentHour = moment().hour();

  if(momentHour < currentHour) {
    timeBlockDetail.addClass("past");
  }
    else if (momentHour > currentHour) {
    timeBlockDetail.addClass("future");
  }
  else if (momentHour === currentHour) {
    timeBlockDetail.addClass("present");
  }
  
  var timeBlockInput = $("<textarea>");
  timeBlockInput.attr("type", "text");
  timeBlockInput.css('color', 'white');
  timeBlockInput.css('width', "100%");
  timeBlockInput.attr("placeholder", "Enter task detail here");
  timeBlockDetail.append(timeBlockInput);
  if (localStorage.getItem(hour)) {
    timeBlockInput.val(localStorage.getItem(hour))
  }


  var timeBlockSave = $("<div>");
  timeBlockSave.addClass("col-2 ml-2 bg-info text-light text-center p-2");
  var saveIcon = $("<i>");
  saveIcon.addClass("fas fa-save fa-4x button");
  timeBlockSave.append(saveIcon);
  timeBlockSave.click(function () {
    localStorage.setItem(hour, timeBlockInput.val() )
  });


  timeBlockRow.append(timeBlockHour, timeBlockDetail, timeBlockSave)
  return timeBlockRow
}

 //button to clear text from calendar
 $("#clearPlannerBtn").click(function (event) {
  $("textarea").val("");
  localStorage.clear();
});

//Hour Increments for tasks
var timeIncrementArray = ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM","01:00 PM",
 "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"] 
for (var i = 0; i < timeIncrementArray.length; i++) {
  $("#timeDisplay").append(generateTimeblock(timeIncrementArray[i])
  )};


//Current time display at page top on load
var timeDisplay = moment();
var timeContainer = $("#currentDay");
timeContainer.css("fontWeight", "bold")
timeContainer.append(timeDisplay.format("dddd, MMMM Do YYYY, h:mm:ss a"));
