const router = require('express').Router();
const axios = require('axios');
const supabase = require('../utils/supabaseClient');
const express = require('express');
const fetch = require('node-fetch');

router.get('/current', async (req, res) => {
  const { lat, lon } = req.query;

  try {
    const response = await axios.get('https://api.openaq.org/v2/latest', {
      params: {
        coordinates: `${lat},${lon}`,
        radius: 10000,
        limit: 1,
      },
    });

    const measurements = response.data?.results?.[0]?.measurements || [];

    const pollutants = {};
    measurements.forEach((m) => {
      pollutants[m.parameter] = m.value;
    });

    const data = {
      location: response.data.results[0].location,
      latitude: parseFloat(lat),
      longitude: parseFloat(lon),
      pm25: pollutants.pm25 || null,
      pm10: pollutants.pm10 || null,
      no2: pollutants.no2 || null,
      so2: pollutants.so2 || null,
      o3: pollutants.o3 || null,
    };

    await supabase.from('aqi_data').insert(data);
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch AQI data' });
  }
});

// Example endpoint to fetch user health condition by email
router.post('/user-health', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('health_condition')
      .eq('email', email)
      .single();
    if (error || !user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ health_condition: user.health_condition });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user health condition' });
  }
});

// Secure WAQI proxy route
router.get('/waqi', async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) {
    return res.status(400).json({ error: 'Missing lat or lon' });
  }
  const token = process.env.WAQI_TOKEN;
  if (!token) {
    return res.status(500).json({ error: 'WAQI token not configured' });
  }
  const url = `https://api.waqi.info/feed/geo:${lat};${lon}/?token=${token}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch WAQI data' });
  }
});

module.exports = router;