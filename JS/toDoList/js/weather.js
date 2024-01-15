const API_KEY = '9db3df24142bedc5f9b5549a0f72ab86';
const weather = document.getElementById('weather');
const locationSpan = weather.querySelector('span:first-child');
const weatherSpan = weather.querySelector('span:last-child');

const onGeoOk = async (pos) => {
    try {
        const lat = await pos.coords.latitude;
        const lon = await pos.coords.longitude;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
        const result = await (await fetch(url)).json();

        const location = result.name;
        const locationWeather = result.weather[0].main;
        locationSpan.innerText = location;
        weatherSpan.innerText = `/ ${locationWeather} / ${result.main.temp}`;
        console.log(location, locationWeather);
    } catch (e) {
        console.log(e.message);
    }
};

const onGeoError = (err) => {
    alert(`Can't find you`);
    console.log(err);
};

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
