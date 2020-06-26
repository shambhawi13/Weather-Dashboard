/*
eg: apis
- http://api.openweathermap.org/data/2.5/weather?q=santa+clara&appid=80e91e7834cea9b00e1d1d34b02e2b23&units=metric
- http://api.openweathermap.org/data/2.5/uvi?lat=22.4&lon=-79.97&appid=80e91e7834cea9b00e1d1d34b02e2b23
- http://api.openweathermap.org/data/2.5/forecast?q=santa+clara&appid=80e91e7834cea9b00e1d1d34b02e2b23

*/

var date;
var appId = '80e91e7834cea9b00e1d1d34b02e2b23';
$('.search-form').on('submit', function(event){
    event.preventDefault();
    var inputCity = $('#input-city').val();
    var formattedInputCity = inputCity.split(' ').join('+');
    var queryURL = 'http://api.openweathermap.org/data/2.5/weather?q='+ formattedInputCity + '&units=metric'  + '&appid=' + appId
    
    console.log(inputCity , queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        $('.selected-city').text(response.name);
        $('.current-temp').append(response.main.temp);
        $('.current-humidity').append(response.main.humidity);
        $('.current-wind-speed').append(response.wind.speed);
        let list = $('<button type="button" class="list-group-item list-group-item-action">');
        $(list).text(inputCity);
        $(list).addClass('active');
        $('.list-group').prepend(list);
        //localStorage.setItem('city-list',);
    });
});

moment().format('LLLL');