// Import necessary modules and libraries
const express = require('express');
const axios = require('axios');

// Create an Express application
const app = express();
const port = 3000;

// Middleware to log request information
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

// Middleware to handle JSON parsing
app.use(express.json());

// Middleware to handle URL encoded data
app.use(express.urlencoded({ extended: true }));

// Middleware for CORS handling
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Set up route handlers
app.get('/weather/:location', async (req, res) => {
  try {
    const location = req.params.location;

    // Send a request to the weather API to fetch weather data
    const weatherData = await fetchWeatherData(location);

    // Process and format weather data
    const formattedData = formatWeatherData(weatherData);

    // Return the formatted weather data
    res.json(formattedData);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('An error occurred while fetching weather data.');
  }
});

// POST route handler for submitting feedback
app.post('/feedback', async (req, res) => {
  try {
    const { name, email, feedback } = req.body;

    // Save feedback to database or send it to an external service
    // Example: saveFeedbackToDatabase(name, email, feedback);

    res.status(200).send('Feedback submitted successfully.');
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('An error occurred while submitting feedback.');
  }
});

// Function to fetch weather data
async function fetchWeatherData(location) {
  // Simulate a delay in API response
  await simulateDelay(2000);

  // Pretend to fetch weather data from an external API
  return {
    location: location,
    current: {
      temperature: getRandomNumber(20, 35),
      humidity: getRandomNumber(40, 80)
    },
    forecast: generateWeatherForecast()
  };
}

// Function to simulate a delay
function simulateDelay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to generate a random number within a range
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate a weather forecast
function generateWeatherForecast() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const forecast = [];

  for (let i = 0; i < 7; i++) {
    forecast.push({
      day: days[i],
      temperature: getRandomNumber(15, 30),
      conditions: getRandomWeatherConditions()
    });
  }

  return forecast;
}

// Function to generate random weather conditions
function getRandomWeatherConditions() {
  const conditions = ['Clear', 'Cloudy', 'Rainy', 'Stormy'];
  const randomIndex = getRandomNumber(0, conditions.length - 1);
  return conditions[randomIndex];
}

// Function to format weather data
function formatWeatherData(weatherData) {
  // Process and format weather data based on the API response structure
  // This is just an example, you can customize it based on the actual weather API response

  const formattedData = {
    location: weatherData.location,
    currentTemperature: weatherData.current.temperature,
    currentHumidity: weatherData.current.humidity,
    forecast: weatherData.forecast.map(day => ({
      day: day.day,
      temperature: day.temperature,
      conditions: day.conditions
    }))
  };

  return formattedData;
}

// Start the application
app.listen(port, () => {
  console.log(`Weather app listening at http://localhost:${port}`);
});

// Additional functionality and logic can be added below this line to further increase complexity
