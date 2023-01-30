const express = require('express');
const router = express.Router();
const { apiCtrl } = require('../controllers/api.controller');
const slowDown = require('express-slow-down');

const defaultEndpoints = slowDown({
    windowMs: 15 * 60 * 1000,
    delayAfter: 100,
    delayMs: 100
});

router.get('/test', apiCtrl.test);

module.exports = router;