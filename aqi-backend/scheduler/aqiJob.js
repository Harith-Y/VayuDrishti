const cron = require("node-cron");
const axios = require("axios");
const supabase = require("../utils/supabaseClient");

const locations = [
  { city: "Hyderabad", lat: 17.385044, lon: 78.486671 },
  { city: "Delhi", lat: 28.6139, lon: 77.2090 },
  { city: "Chennai", lat: 13.0827, lon: 80.2707 }
];

async function fetchAndStore() {
  for (const loc of locations) {
    try {
      // Fetch AQI from OpenAQ
      const aqiRes = await axios.get("https://api.openaq.org/v2/latest", {
        params: {
          coordinates: `${loc.lat},${loc.lon}`,
          radius: 10000,
          limit: 1
        }
      });

      const measurements = aqiRes.data.results?.[0]?.measurements || [];
      const pollutants = {};
      measurements.forEach(m => {
        pollutants[m.parameter] = m.value;
      });

      await supabase.from("aqi_data").insert({
        city: loc.city,
        latitude: loc.lat,
        longitude: loc.lon,
        pm25: pollutants.pm25 || null,
        pm10: pollutants.pm10 || null,
        no2: pollutants.no2 || null,
        time: new Date().toISOString()
      });

      // Fetch weather from OpenWeatherMap
      const weatherRes = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          lat: loc.lat,
          lon: loc.lon,
          units: "metric",
          appid: process.env.OPENWEATHER_API_KEY
        }
      });

      await supabase.from("weather_data").insert({
        city: loc.city,
        temp: weatherRes.data.main.temp,
        humidity: weatherRes.data.main.humidity,
        wind_speed: weatherRes.data.wind.speed,
        time: new Date().toISOString()
      });

      console.log(`[✓] Stored AQI & weather for ${loc.city}`);
    } catch (err) {
      console.error(`[✗] Error for ${loc.city}: ${err.message}`);
    }
  }
}

// Run job every day at 6:00 AM (IST)
cron.schedule("0 0 * * *", fetchAndStore); // UTC 0:00 ≈ IST 5:30 AM

module.exports = { fetchAndStore };
