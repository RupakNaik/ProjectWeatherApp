// Selection DOM elements
const temperatureField = document.querySelector('.temp');
const cityField = document.querySelector('.temp_location p');
const dateField = document.querySelector('.temp_location span');
const iconField = document.querySelector('.weather_condition img');
const weatherConditionField = document.querySelector('.weather_condition span');
const searchField = document.querySelector('#searchField');
const form = document.querySelector('form');

// handle form inputs
form.addEventListener('submit', event => {
    event.preventDefault(); //IMP
    const enteredCityName = searchField.value;
    getWeatherInfo(enteredCityName);
});

// API Call
const getWeatherInfo = async city => {
    const url =`https://api.weatherapi.com/v1/current.json?key=<API-Key>&q=${city}&aqi=no`;
    try{
        const response = await fetch(url);
        const weatherData = await response.json();
        // parameters we wish to disply on FE
        const temp = weatherData.current.temp_c;
        const cityName = weatherData.location.name;
        const date = weatherData.location.localtime;
        const weatherIconUrl = weatherData.current.condition.icon;
        const condition = weatherData.current.condition.text;

        // set data to DOM elements
        temperatureField.innerText = temp;
        cityField.innerText = cityName;
        dateField.innerText = date;
        iconField.src = weatherIconUrl;
        weatherConditionField.innerText = condition;
    }catch(e){
        console.log('Error:', e);
        // fall back to defalt city
        console.log('Displaying default city as we faced error');
        getWeatherInfo('Mumbai');
    }
}
// To display default one city on page load
getWeatherInfo('Mumbai');