require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/aqi', require('./routes/aqi'));
app.use('/api/forecast', require('./routes/forecast'));
app.use('/api/alerts', require('./routes/alerts'));

app.listen(5000, () => console.log('Server running on port 5000'));
