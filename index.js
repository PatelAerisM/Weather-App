// const container = document.querySelector('.container');
// const search = document.querySelector('.search-box button');
// const weatherBox = document.querySelector('.weather-box');
// const weatherDetails = document.querySelector('.weather-details');
// const error404 = document.querySelector('.not-found');

// search.addEventListener('click', () => {

//     const APIKey = '7a69482301d7101defda3e2483567bae';
//     const city = document.querySelector('.search-box input').value;

//     if (city === '')
//         return;

//     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
//         .then(response => response.json())
//         .then(json => {

//             if (json.cod === '404') {
//                 container.style.height = '400px';
//                 weatherBox.style.display = 'none';
//                 weatherDetails.style.display = 'none';
//                 error404.style.display = 'block';
//                 error404.classList.add('fadeIn');
//                 return;
//             }

//             error404.style.display = 'none';
//             error404.classList.remove('fadeIn');

//             const image = document.querySelector('.weather-box img');
//             const temperature = document.querySelector('.weather-box .temperature');
//             const description = document.querySelector('.weather-box .description');
//             const humidity = document.querySelector('.weather-details .humidity span');
//             const wind = document.querySelector('.weather-details .wind span');

//             switch (json.weather[0].main) {
//                 case 'Clear':
//                     image.src = 'image/clear.png';
//                     break;

//                 case 'Rain':
//                     image.src = 'image/rain.png';
//                     break;

//                 case 'Snow':
//                     image.src = 'image/snow.png';
//                     break;

//                 case 'Clouds':
//                     image.src = 'image/cloud.png';
//                     break;

//                 case 'Haze':
//                     image.src = 'image/mist.png';
//                     break;

//                 default:
//                     image.src = '';
//             }

//             temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
//             description.innerHTML = `${json.weather[0].description}`;
//             humidity.innerHTML = `${json.main.humidity}%`;
//             wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

//             weatherBox.style.display = '';
//             weatherDetails.style.display = '';
//             weatherBox.classList.add('fadeIn');
//             weatherDetails.classList.add('fadeIn');
//             container.style.height = '590px';


//         });


// });





const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const searchInput = document.querySelector('.search-box input');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

// Function to handle API call and response processing
function fetchWeather() {
    const APIKey = '7a69482301d7101defda3e2483567bae';
    const city = searchInput.value.trim(); // Trim leading and trailing spaces

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
            } else {
                error404.style.display = 'none';
                error404.classList.remove('fadeIn');

                const image = document.querySelector('.weather-box img');
                const temperature = document.querySelector('.weather-box .temperature');
                const description = document.querySelector('.weather-box .description');
                const humidity = document.querySelector('.weather-details .humidity span');
                const wind = document.querySelector('.weather-details .wind span');

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
        fetchWeather();
    }
});
