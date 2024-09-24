// bura.js

const apiKey = "828ab6747aa2b2acc48fd64fa05ba22a";
const submit = document.getElementById("but");
const cityDisplay = document.querySelector(".cityDisplay");
const tempDisplay = document.querySelector(".tempDisplay");
const humidityDisplay = document.querySelector(".humidityDisplay");
const eeror = document.querySelector(".errorDisplay");
const imoji = document.querySelector(".weatherEmoji");

async function dontknow(event) {
    const city = document.getElementById("city").value;
    if (city) {
        try {
            const wheatherData = await getWeatherData(city);
            displayWeatherInfo(wheatherData);
        } catch (error) {
            eeror.textContent = "Please enter city correctly";
        }
    } else {
        console.error("City input is empty.");
    }
}

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    console.log(response);
    if (!response.ok) {
        eeror.textContent = "Something is Wrong! Please enter a correct city";
    }
    return await response.json();
}

function displayWeatherInfo(data) {
    console.log(data);
    const { name: city, main: { temp, humidity }, weather: [{ description, id }] } = data;
    cityDisplay.textContent = `${city}`;
    const tempCelsius = (temp - 273.15).toFixed(1);
    tempDisplay.textContent = `Temperature: ${tempCelsius}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    imoji.textContent = getWeatherEmoji(id);
}

function getWeatherEmoji(id) {
    if (id >= 200 && id < 300) {
        return "⛈️"; // Thunderstorm
    } else if (id >= 300 && id < 500) {
        return "🌧️"; // Drizzle
    } else if (id >= 500 && id < 600) {
        return "🌦️"; // Rain
    } else if (id >= 600 && id < 700) {
        return "❄️"; // Snow
    } else if (id >= 700 && id < 800) {
        return "🌫️"; // Atmosphere (fog, mist, etc.)
    } else if (id === 800) {
        return "☀️"; // Clear sky
    } else if (id > 800 && id < 900) {
        return "☁️"; // Clouds
    } else {
        return "🌈"; // Default emoji for any other condition
    }
}

submit.addEventListener("click", dontknow);


