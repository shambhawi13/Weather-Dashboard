/*
eg: apis
- http://api.openweathermap.org/data/2.5/weather?q=santa+clara&appid=80e91e7834cea9b00e1d1d34b02e2b23&units=metric
- http://api.openweathermap.org/data/2.5/uvi?lat=22.4&lon=-79.97&appid=80e91e7834cea9b00e1d1d34b02e2b23
- http://api.openweathermap.org/data/2.5/forecast?q=santa+clara&appid=80e91e7834cea9b00e1d1d34b02e2b23

*/

var date;
var appId = '80e91e7834cea9b00e1d1d34b02e2b23';
var cityList = [];
var latitude;
var longitude;
var formattedInputCity;

$('.search-form').on('submit', function (event) {
    event.preventDefault();
    var inputCity = $('#input-city').val();
    formattedInputCity = inputCity.split(' ').join('+');
    var queryURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + formattedInputCity + '&units=metric' + '&appid=' + appId

    console.log(inputCity, queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        $('.selected-city').text(response.name);
        $('.current-temp span').removeClass('hide');
        $('.current-temp span').prepend(response.main.temp);
        $('.current-humidity span').removeClass('hide');
        $('.current-humidity span').prepend(response.main.humidity);
        $('.current-wind-speed span').removeClass('hide');
        $('.current-wind-speed span').prepend(response.wind.speed);
        let list = $('<button type="button" class="list-group-item list-group-item-action city">');
        $(list).text(inputCity);
        $('city').removeClass('active');
        $(list).addClass('active');
        $('.list-group').prepend(list);
        cityList.push(inputCity);
        localStorage.setItem('city-list', cityList);

        //request server to get UV index
        latitude = response.coord.lat;
        longitude = response.coord.lon;
        getUVIndex(latitude, longitude);
        getForecast();
    });
});

function getUVIndex(lat, lon) {
    let queryURLUV = 'http://api.openweathermap.org/data/2.5/uvi?lat=' + lat + '&lon=' + lon + '&appid=' + appId;

    $.ajax({
        url: queryURLUV,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        $('.uv span').append(response.value);
        if(response.value > 6){
            $('.uv span').addClass('harmful')
        }
        else{
            $('.uv span').addClass('not-harmful')
        }
    })

}

function getIcon(icon, elem) {
    let iconURL = 'http://openweathermap.org/img/wn/'+icon+'@2x.png'
    elem.attr('src', iconURL);
}

function getForecast() {
    var forecastArr = [];
    let queryURLFore = 'http://api.openweathermap.org/data/2.5/forecast?q=' + formattedInputCity + '&appid=' + appId + '&units=metric';
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
            cardTempElement.text('Temp: ' + foreResults[i].main.temp + 'F');

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