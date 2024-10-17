const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');
const input = document.querySelector('.search-box input');

// Handling Enter, Escape, and Backspace keys
input.addEventListener('keydown', function(event) {
    switch (event.key) {
        case 'Enter':
            search.click();  // Trigger search when Enter is pressed
            break;
        case 'Escape':
            input.value = '';  // Clear input when Escape is pressed
            error404.classList.remove('active');  // Hide error if present
            break;
        case 'Backspace':
            if (input.value === '') {
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.remove('active');
            }
            break;
        default:
            // Handle other keys if needed
            break;
    }
});

// Search button click event
search.addEventListener('click', () => {
    const APIKey = '9ecbf77d827b37bf7328b8f19f02f1df';
    const city = input.value.trim();

    if (city === '') return;

// Clear existing content before adding new data
const image = document.querySelector('.weather-box img');
const temperature = document.querySelector('.weather-box .temperature');
const description = document.querySelector('.weather-box .description');
const humidity = document.querySelector('.weather-details .humidity span');
const wind = document.querySelector('.weather-details .wind span');

// Reset the content to avoid duplication
image.src = ''; 
temperature.innerHTML = '';
description.innerHTML = '';
humidity.innerHTML = '';
wind.innerHTML = '';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod == '404') {
                cityHide.textContent = city;
                container.style.height = '400px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                return;
            }

                 cityHide.textContent = city;
                    
                container.style.height = '555px';
                container.classList.add('active');
                weatherBox.classList.add('active');
                weatherDetails.classList.add('active');
                error404.classList.remove('active');  // Correct class removal

                setTimeout(() => {
                    container.classList.add('active');
                }, 2500);

                switch (json.weather[0].main) {
                    case 'Clear':
                        image.src = './images/clear.png';
                        break;
                    case 'Rain':
                        image.src = './images/rain.png';
                        break;
                    case 'Snow':
                        image.src = 'http://example.com/path/to/your/snow.png';
                        break;
                    case 'Clouds':
                        image.src = './images/clouds.png';
                        break;
                    case 'Mist':
                    case 'Haze':
                        image.src = './images/mist.png';
                        break;
                    default:
                        image.src = './images/cloud.png';
                        break;
                }

                temperature.innerHTML = `${Math.round(json.main.temp)}<span>°C</span>`;
                description.innerHTML = `${json.weather[0].description}`;
                humidity.innerHTML = `${json.main.humidity}%`;
                wind.innerHTML = `${Math.round(json.wind.speed)}Km/h`;

            })
            .catch(err => {
                console.error("Error fetching weather data:", err);
                alert("Something went wrong! Please try again later.");
            });
    });