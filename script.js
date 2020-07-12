var userChoice = '';
var currentWeather = ``;
var fiveDay = ``;
var dailyData = [];

//get weather function for both current weather and future weather by button at once 
function getWeather(userChoice) {

    //view current weather conditions for that city
    var apiKey = 'f4984700ddd88edc79d0eb1beb636dff'
    userChoice = $("#city-input").val().trim();
    currentWeather = `http://api.openweathermap.org/data/2.5/weather?q=${userChoice}&appid=${apiKey}`;
    $.ajax({
        url: currentWeather,
        method: "GET"
    }).then(function (response1) {
        console.log(response1);
        console.log(currentWeather);
        // if userChoice is not in savedCities then  store it to the local storage
      
        // city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
        var currentdata = $("#current-weather").append("<div>");
        var cTemp = response1.main.temp;
        var icon = response1.weather[0].icon;
        cTemp = Math.floor((cTemp - 273.15) * 1.8 + 32);
        var cHumidity = response1.main.humidity;
        var cWind = response1.wind.speed;
        var cityName = response1.name;
        console.log(response1);
        var qUVindex = `http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${response1.coord.lat}&lon=${response1.coord.lon}`;
        const html = `<div class="card" style="width: 25rem;">
                        <ul class="list-group list-group-flush">
                        <li class="list-group-item">${cityName} ${moment(response1.dt_txt).format('LL')}<img src=http://openweathermap.org/img/wn/${icon}@2x.png alt="icon" width="60" height="60" /></li>
                        <li class="list-group-item">Current temp: ${cTemp}\u00B0 F</li>
                        <li class="list-group-item">Humidity: ${cHumidity}%</li>
                        <li class="list-group-item">Wind Speed: ${cWind} mph</li>
                        </div>`
                        $(currentdata).append(html);

        $.ajax({
            url: qUVindex,
            method: "GET"
        }).then(function (UVresponse) {
            var UVIndex = UVresponse.value;
            var pTag = $("<p>").text("UV Index: " + UVIndex)
            currentdata.append(pTag);
            pTag.addClass("index");
            var UVcond
            //UV Index color that indicates whether the conditions are favorable, moderate, or severe
            if (UVIndex > 2) {
                $(".index").css("background-color", "#82E0AA");
                UVcond = $("<p>").text("Favorable");
                currentdata.append(UVcond);
            }
            else if (UVIndex < 6) {
                $(".index").css("background-color", "#FFF176");
                UVcond = $("<p>").text("Moderate");
                currentdata.append(UVcond);
            }
            else if (UVIndex < 8) {
                $(".index").css("background-color", "#FFB74D");
                UVcond = $("<p>").text("Moderate");
                currentdata.append(UVcond);
            }
            else if (UVIndex < 11) {
                $(".index").css("background-color", "red");
                UVcond = $("<p>").text("Severe");
                currentdata.append(UVcond);
            }
            else {
                $(".index").css("background-color", "firebrick");
                UVcond = $("<p>").text("SEVERE");
                currentdata.append(UVcond);
            }
    
           
        })
    })
    // view future weather conditions for that city
    fiveDay = `http://api.openweathermap.org/data/2.5/forecast?q=${userChoice}&appid=${apiKey}`;
    $.ajax({
        url: fiveDay,
        method: "GET"
    }).then(function (response2) {
        console.log(response2);
        console.log(fiveDay);
        //array for days 
        dailyData = response2.list.filter((timeObj, i) => i % 8 === 0)
        $(".forecastDeck").empty();
        dailyData.forEach(day => {
            showFiveDay(day);
        });

    })
   
}

    //all the logic to add html to screen for 5 day
function showFiveDay(day) {
    var fiveTemp = day.main.temp
    fiveTemp = Math.floor((fiveTemp - 273.15) * 1.8 + 32);
    var fiveHumid = day.main.humidity
    var icon = day.weather[0].icon;

    const html = `<div class="card">
                <div class="card-body">
                        <h5 class="card-title">${moment(day.dt_txt).format('dddd')}</h5>
                        <h5 class="card-text">${moment(day.dt_txt).format('LL')}</h5>
                        <img src=http://openweathermap.org/img/wn/${icon}@2x.png alt="icon" width="50" height="50" />
                        <p class="card-text"><small class="text-muted">${fiveTemp + "\u00B0 F"}</small></p>
                        <p class="card-text"><small class="text-muted">Humidity: ${fiveHumid}%</small></p>
        </div>
</div>`
    $(".forecastDeck").append(html);
}

// save search history


function saveCity() {
    userChoice = $("#city-input").val().trim();
       if (userChoice !== "") {
        window.localStorage.setItem('city', JSON.stringify(userChoice));
       var savedCities = window.localStorage.getItem('city') || [];
       if(savedCities.length > 0){
           getWeather(savedCities);
       }
   
 
   }
   displayCities()
}

console.log(localStorage)

var clearbtn = document.getElementById("clearbtn");

var newCities = [];

function displayCities() {
    //parse object of arrays in local storage or else if empty will just be empty
    var getCities = JSON.parse(window.localStorage.getItem('city')) || [];
    console.log(getCities)
    newCities.push(getCities);
    $("#city-input").val("");
    var saveSearch = $("<p>").text(getCities);
    $("#searches").append(saveSearch);

}
function clearSearches() {
    window.localStorage.removeItem("city");
    window.location.reload();
}
$("#searchBtn").on("click", function (event) {
    event.preventDefault();
    saveCity();
    $("#current-weather").empty();
       
 })

$("#clear").on("click", function (event) {
    console.log(event.target);
    clearSearches();
});

