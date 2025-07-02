const router = require('express').Router();
const supabase = require('../utils/supabaseClient');
const admin = require('../utils/firebase');

router.post('/send', async (req, res) => {
  const { location, current_aqi } = req.body;

  const { data: users } = await supabase
    .from('users')
    .select('*')
    .eq('location', location);

  users.forEach((user) => {
    if (current_aqi > user.alert_threshold && user.fcm_token) {
      admin.messaging().send({
        token: user.fcm_token,
        notification: {
          title: 'Air Quality Alert',
          body: `AQI has reached ${current_aqi} in ${location}. Stay safe!`,
        },
      });
    }
  });

  res.json({ status: 'Alerts Sent' });
});

module.exports = router;
