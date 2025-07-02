require('dotenv').config();
require("./scheduler/aqiJob"); // ⏱️ Starts cron job
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/aqi', require('./routes/aqi'));
app.use('/api/forecast', require('./routes/forecast'));
app.use('/api/alerts', require('./routes/alerts'));

app.listen(PORT, () => console.log('Server running on port ${PORT}'));
