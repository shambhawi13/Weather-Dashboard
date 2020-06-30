## Weather Dashboard

As a user, I can visit this application to view wheather report of selected cities. I can get the following details:
- Retrieve priviously saved weather details of the cities I have searched. It uses localStorage behind the scene to keep record of cities.
- Used [OpenWeather API](http://api.openweathermap.org/data/2.5/weather?q=santa+clara&appid=80e91e7834cea9b00e1d1d34b02e2b23&units=metric) to retrieve weather data.
- I can get forecast of next 5 days. Sample API used http://api.openweathermap.org/data/2.5/forecast?q=santa+clara&appid=80e91e7834cea9b00e1d1d34b02e2b23
- I can see the UV index of the city selected. It shows red if UV index is greater than 6 else it shows green. The color coding is done to understand the quality of air. 
- Sample Api used to retrieve UV index is http://api.openweathermap.org/data/2.5/uvi?lat=22.4&lon=-79.97&appid=80e91e7834cea9b00e1d1d34b02e2b23
- Multiple cities can be searched.
- When there is no city selected the forecast section is hidden.

```
Here is screenshot of how it looks.
```

![weather](/Assets/final.png)


## Prerequisites

```
git clone https://github.com/shambhawi13/Weather-Dashboard.git 
```

## Technologies Used
- JQuery - used for DOM manupulation
- Moment.js - used for utility on date objects
- HTML - used to create elements on the DOM
- CSS - styles html elements on page
- Git - version control system to track changes to source code
- GitHub - hosts repository that can be deployed to GitHub Pages
- Third party API - OpenWeather API

## Installing

- Clone the repository : git clone https://github.com/shambhawi13/Weather-Dashboard.git 


## Deployed Link

[Live Hosted on](https://shambhawi13.github.io/Weather-Dashboard/)

## Authors

* **Shambhawi Kumari**
 [GitHub](https://github.com/shambhawi13/) | 
 [LinkedIn](https://www.linkedin.com/in/shambhawi-kumari/)


## Review URL

[GitHub](https://github.com/shambhawi13/Weather-Dashboard)
[Live](https://shambhawi13.github.io/Weather-Dashboard/)


