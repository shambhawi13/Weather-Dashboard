/*
eg: apis
- https://api.openweathermap.org/data/2.5/weather?q=santa+clara&appid=80e91e7834cea9b00e1d1d34b02e2b23&units=metric
- https://api.openweathermap.org/data/2.5/uvi?lat=22.4&lon=-79.97&appid=80e91e7834cea9b00e1d1d34b02e2b23
- https://api.openweathermap.org/data/2.5/forecast?q=santa+clara&appid=80e91e7834cea9b00e1d1d34b02e2b23

*/

var date;
var appId = '80e91e7834cea9b00e1d1d34b02e2b23';
var cityList = [];
var latitude;
var longitude;
var formattedInputCity;

// if there is no item in local storage initialize empty array
if(!JSON.parse(localStorage.getItem('city-list'))){
    localStorage.setItem('city-list',JSON.stringify([]));
}
else{
    cityList = JSON.parse(localStorage.getItem('city-list'));
}

populateList();

$('.search-form').on('submit', function (event) {
    event.preventDefault();
    let inputCity = $('#input-city').val();
    displayWeatherCondition(inputCity);
    $('#input-city').val('');
});

$(document).on('click', '.city', function (event) {
    //console.log(event.target.getAttribute('data-city') , $(event));
    let inputCity = event.target.getAttribute('data-city');
    displayWeatherCondition(inputCity);
    $(event.target).addClass('active');
})

function clearContent() {
    $('#input-city').empty();
    $('.selected-city').empty();
    $('.current-temp').text('').empty()
    $('.current-humidity').empty();
    $('.current-wind-speed').empty();
    $('.uv').empty();
    $('.forecast-section').empty();
    $('.city').removeClass('active');
}

function populateList() {
    $('.list-group').empty();
    let cities = JSON.parse(localStorage.getItem('city-list'));
    for (let city = 0; city < cities.length; city++) {
        let list = $('<button type="button" class="list-group-item list-group-item-action city">');
        $(list).text(cities[city]);
        $(list).attr('data-city', cities[city]);
        $('.list-group').prepend(list);
    }

}

function displayWeatherCondition(inputCity) {
    clearContent();
    formattedInputCity = inputCity.split(' ').join('+');
    var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + formattedInputCity + '&units=metric' + '&appid=' + appId
    $('.forecast-display-section').attr('style','visibility: visible')
    console.log(inputCity, queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        $('.selected-city').text(response.name);
        $('.current-temp').append('<span">Temperature: &nbsp;</span>');
        $('.current-temp').append(response.main.temp);
        $('.current-temp').append('<span>&deg; F</span>');

        $('.current-humidity').append('<span>Humidity: &nbsp;</span>')
        $('.current-humidity').append(response.main.humidity);
        $('.current-humidity').append('<span>&#37;</span>');

        $('.current-wind-speed').append('<span>Wind Speed: &nbsp;</span>');
        $('.current-wind-speed').append(response.wind.speed);
        $('.current-wind-speed').append('<span>MPH</span>');

        console.log('yess!!! ' + JSON.parse(localStorage.getItem('city-list')).includes(inputCity));
        if (JSON.parse(localStorage.getItem('city-list')).includes(inputCity)) {
            console.log('already there');
        }
        else {
            cityList.push(inputCity);
            localStorage.setItem('city-list', JSON.stringify(cityList));
            populateList();
            setTimeout(function(){
                $('button[data-city =' + inputCity + ']').addClass('active');
            },100);
            
        }
        //request server to get UV index
        latitude = response.coord.lat;
        longitude = response.coord.lon;
        getUVIndex(latitude, longitude);
        getForecast();
    });
}

function getUVIndex(lat, lon) {
    let queryURLUV = 'https://api.openweathermap.org/data/2.5/uvi?lat=' + lat + '&lon=' + lon + '&appid=' + appId;

    $.ajax({
        url: queryURLUV,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        $('.uv').append('<span>UV Index: &nbsp;</span>');
        $('.uv').append('<span class="uv-value"></span>');
        var uvValue = $('.uv-value');
        uvValue.text(response.value)

        if (response.value > 6) {
            $(uvValue).addClass('harmful')
        }
        else {
            $(uvValue).addClass('not-harmful')
        }
    })

}

function getIcon(icon, elem) {
    let iconURL = 'https://openweathermap.org/img/wn/' + icon + '@2x.png'
    elem.attr('src', iconURL);
}

function getForecast() {
    var forecastArr = [];
    let queryURLFore = 'https://api.openweathermap.org/data/2.5/forecast?q=' + formattedInputCity + '&appid=' + appId + '&units=metric';
    $.ajax({
        url: queryURLFore,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        let foreResults = response.list;

        for (let i = 4; i < foreResults.length; i = i + 8) {
            $(`temp-day-${i}`).append(foreResults[i].main.temp);
            forecastArr.push({
                title: foreResults[i].dt_txt,
                temp: foreResults[i].main.temp,
                humidity: foreResults[i].main.humidity
            });

            let forecastDiv = $('<div class="card spacing-left-card bg-primary text-white">');
            $('.forecast-section').append(forecastDiv);

            let cardBodyEl = $('<div class="card-body">');
            forecastDiv.append(cardBodyEl);

            let cardTitleEl = $('<h5 class="card-title">');
            cardBodyEl.append(cardTitleEl);
            cardTitleEl.text(moment(foreResults[i].dt_txt).format('L'));

            let faEl = $('<img>')
            getIcon(foreResults[i].weather[0].icon, faEl);
            cardBodyEl.append(faEl);

            let cardTempElement = $('<p class="card-text temp">')
            cardBodyEl.append(cardTempElement);
            cardTempElement.html('Temp: ' + foreResults[i].main.temp + '&deg;F');

            let cardHumidEl = $('<p class="card-text humidity">');
            cardBodyEl.append(cardHumidEl);
            cardHumidEl.text('Humidity: ' + foreResults[i].main.humidity + '%');
        }

        for (let i = 0; i < forecastArr.length; forecastArr++) {
            var test = document.getElementsByClassName('forecast-section')[0].children;
            console.log(test);
            //console.log($('.forecast-section').eq(0).children);
        }
    })

}

moment().format('LLLL');