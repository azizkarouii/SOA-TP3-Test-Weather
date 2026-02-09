const axios = require('axios');

const API_KEY = "1aa3b3a2a30479c44d2b14e77bed9a07";
const BASE_URL ="http://api.openweathermap.org/data/2.5/weather?appid=" + API_KEY + "&q=";

// rraduction ang -> fr
function translateWeatherDescription(description) {
    const translations = {
        'clear sky': 'ciel dégagé',
        'few clouds': 'quelques nuages',
        'scattered clouds': 'nuages épars',
        'broken clouds': 'nuages fragmentés',
        'shower rain': 'averses',
        'rain': 'pluie',
        'thunderstorm': 'orage',
        'snow': 'neige',
        'mist': 'brume',
        'fog': 'brouillard',
        'haze': 'brume de chaleur',
        'dust': 'poussière',
        'sand': 'sable',
        'ash': 'cendres',
        'squall': 'grain',
        'tornado': 'tornade',
        'light rain': 'pluie légère',
        'moderate rain': 'pluie modérée',
        'heavy rain': 'pluie forte',
        'overcast clouds': 'ciel couvert'
    };
    
    return translations[description.toLowerCase()] || description;
}

async function getWeatherData(city) {
    const url = BASE_URL + city;
    
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw new Error(`Erreur API: ${error.response?.status} - ${error.response?.statusText || error.message}`);
    }
}

async function printWeather(city) {
    try {
        const weatherData = await getWeatherData(city);
        
        // Conversion de Kelvin vers Celsius
        const tempCelsius = (weatherData.main.temp - 273.15).toFixed(1);
        
        // Traduction de la description
        const descriptionFr = translateWeatherDescription(weatherData.weather[0].description);
        
        console.log(`\n🌤️  Météo pour ${city.charAt(0).toUpperCase() + city.slice(1)} 🌤️`);
        console.log(`🌡️  Température: ${tempCelsius}°C`);
        console.log(`☁️  Description: ${descriptionFr}\n`);
        
    } catch (error) {
        console.error(`❌ Erreur lors de la récupération des données météo: ${error.message}`);
    }
}
printWeather("Sousse");
