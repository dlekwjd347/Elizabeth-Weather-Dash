

var userChoice = '';
var currentWeather = "";
var fiveDay = "";





//get weather function for both current weather and future weather by button at once 

function getWeather() {
    //view current weather conditions for that city
    var apiKey = 'f4984700ddd88edc79d0eb1beb636dff'
    userChoice = $("#city-input").val().trim();
    currentWeather = "http://api.openweathermap.org/data/2.5/weather?q=" + userChoice + "&appid=" + apiKey;
    $.ajax({
        url: currentWeather,
        method: "GET"
    }).then(function (response1) {
        console.log(response1);
        console.log(currentWeather);
        // city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
        var currentdata = $("#current-weather").append("<div>");
        console.log(response1.name)

        //display city name and weather icon
        var cityName = response1.name;
        //    var currentDate = moment.js? 

        currentdata.append($("<p>").text("City: " + cityName));
        // currentdata.append($("<img>").attr("src", "https://lh3.googleusercontent.com/proxy/RIfxpWrBWMhJVp6WxWdKOQ7W5jhUFAdnQZWb39evsSKNVwehswi93b6ywk8Jdjol1Jgzf2yemwioGtnYLBhy-qs6ZBsQKrtVKaDqQ8jkx0qB1MvwcNGMhU5Yf_wGODAzrdSBa2U_3UP2n-84MCcmeZTzgMBYQu6BrnDpOUt1ucuMoYofmlUmTR7hkiTBsv0NAoaNzTjIatXjEjc797C3"));
        //display current temperature, humidity, wind speed and UV index
        var cTemp = response1.main.temp;
        cTemp = Math.floor((cTemp - 273.15) * 1.8 + 32);
        currentdata.append($("<p>").text("Current temp: " + cTemp + "\u00B0 Fahrenheit"));

        var cHumidity = response1.main.humidity;
        currentdata.append($("<p>").text("Humidity: " + cHumidity + "%"));

        var cWind = response1.wind.speed;
        currentdata.append($("<p>").text("Wind Speed: " + cWind + "mph"));

        var qUVindex = "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + response1.coord.lat + "&lon=" + response1.coord.lon;

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
            if (UVIndex < 2) {
                $(".index").css("background-color", "#82E0AA");
                UVcond = $("<p>").text("Favorable")
                currentdata.append(UVcond);


            }
            else if (UVIndex < 6){
                $(".index").css("background-color", "#FFF176");
                UVcond = $("<p>").text("Moderate")
                currentdata.append(UVcond);
            }
            else if (UVIndex < 8) {
                $(".index").css("background-color", "#FFB74D");
                UVcond = $("<p>").text("Moderate")
                currentdata.append(UVcond);
            }
            else if (UVIndex < 11) {
                $(".index").css("background-color", "red");
                UVcond = $("<p>").text("Severe")
                currentdata.append(UVcond);
            }
            else {
                $(".index").css("background-color", "firebrick");
                UVcond = $("<p>").text("SEVERE")
                currentdata.append(UVcond);
            }


        })


       



       
        //UV index will have specific parameters, if/if else/else statements to color-code conditions 



        //view future weather conditions for that city
        // $.ajax({
        //     url: fiveDay,
        //     method: "GET"
        // }).then(function(response2) {
        //     console.log(response2);

        fiveDay = "api.openweathermap.org/data/2.5/forecast?q=" + userChoice + "&appid=" + apiKey

        //displays the date, an icon representation of weather conditions, the temperature, and the humidity



        //object values display on future conditions element



    })


    //search history


}

$("#searchBtn").on("click", function (event) {
    getWeather();

})





