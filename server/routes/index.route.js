const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const alertRoutes = require('./alert.route');
const marketRoutes = require('./market.route');

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/alerts', alertRoutes);
router.use('/market', marketRoutes);

module.exports = router;
