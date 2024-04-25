// Selecting DOM elements

const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const searchInput = document.querySelector('.search-box input');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

// Function to handle API call and response processing
function fetchWeather() {
    // API key for OpenWeatherMap API
    const APIKey = '7a69482301d7101defda3e2483567bae';
    // Get the value from the search input and trim leading and trailing spaces
    const city = searchInput.value.trim();

    // Check if the city input is empty
    if (city === '')
        return;

    // Fetch weather data from OpenWeatherMap API
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            // Handle response from the API
            if (json.cod === '404') {
                // Display error message if city is not found
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
            } else {
                // Update weather information if city is found
                error404.style.display = 'none';
                error404.classList.remove('fadeIn');

                const image = document.querySelector('.weather-box img');
                const temperature = document.querySelector('.weather-box .temperature');
                const description = document.querySelector('.weather-box .description');
                const humidity = document.querySelector('.weather-details .humidity span');
                const wind = document.querySelector('.weather-details .wind span');

                // Set weather icon based on weather condition
                switch (json.weather[0].main) {
                    case 'Clear':
                        image.src = 'image/clear.png';
                        break;
                    case 'Rain':
                        image.src = 'image/rain.png';
                        break;
                    case 'Snow':
                        image.src = 'image/snow.png';
                        break;
                    case 'Clouds':
                        image.src = 'image/cloud.png';
                        break;
                    case 'Haze':
                        image.src = 'image/mist.png';
                        break;
                    default:
                        image.src = '';
                }

                // Display weather information
                temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
                description.innerHTML = `${json.weather[0].description}`;
                humidity.innerHTML = `${json.main.humidity}%`;
                wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

                weatherBox.style.display = '';
                weatherDetails.style.display = '';
                weatherBox.classList.add('fadeIn');
                weatherDetails.classList.add('fadeIn');
                container.style.height = '590px';
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            // Handle error, such as displaying an error message to the user
        });
}

// Event listener for search button click
search.addEventListener('click', fetchWeather);

// Event listener for Enter key press on input field
searchInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        // Call fetchWeather function when Enter key is pressed
        fetchWeather();
    }
});
