// routes/forecast.js
const router = require('express').Router();
const axios = require('axios');
const supabase = require('../utils/supabaseClient');

router.get('/weather', async (req, res) => {
  const { lat, lon } = req.query;

  try {
    const weatherRes = await axios.get(
      'https://api.openweathermap.org/data/2.5/forecast',
      {
        params: {
          lat,
          lon,
          units: 'metric',
          appid: process.env.OPENWEATHER_API_KEY,
        },
      }
    );

    const data = weatherRes.data.list.map((entry) => ({
      datetime: entry.dt_txt,
      temp: entry.main.temp,
      humidity: entry.main.humidity,
      wind_speed: entry.wind.speed,
    }));

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

module.exports = router;
