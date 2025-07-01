const router = require('express').Router();
const supabase = require('../utils/supabaseClient');

// GET forecast for a location (next 3 days)
router.get('/', async (req, res) => {
  const { location } = req.query;

  if (!location) {
    return res.status(400).json({ error: 'Location is required' });
  }

  const { data, error } = await supabase
    .from('forecast_data')
    .select('*')
    .eq('location', location)
    .order('day', { ascending: true });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// POST forecast data (used by ML pipeline or admin tool)
router.post('/add', async (req, res) => {
  const forecasts = req.body; // expect array of forecast entries

  
//   Example of `forecasts` payload:
  [
    {
      location: "Hyderabad",
      day: "2025-07-03",
      predicted_aqi: 135,
      pm25: 95,
      pm10: 120,
      no2: 40
    },
  ]
  

  const { data, error } = await supabase
    .from('forecast_data')
    .insert(forecasts);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json({ message: 'Forecast inserted', data });
});

module.exports = router;
