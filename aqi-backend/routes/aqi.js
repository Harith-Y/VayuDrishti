const router = require('express').Router();
const axios = require('axios');
const supabase = require('../utils/supabaseClient');

// Example API pulling from OpenAQ or CPCB (if access)
router.get('/current', async (req, res) => {
  const { lat, lon } = req.query;
  // Replace this with actual API integration
  const exampleAQI = {
    pm25: 72,
    pm10: 90,
    no2: 30,
    so2: 12,
    location: "Hyderabad",
    latitude: lat,
    longitude: lon
  };

  await supabase.from('aqi_data').insert(exampleAQI);
  res.json(exampleAQI);
});

module.exports = router;
