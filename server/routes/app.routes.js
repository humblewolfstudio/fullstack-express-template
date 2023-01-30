const express = require('express');
const router = express.Router();
const { appCtrl } = require('../controllers/app.controller');
const slowDown = require('express-slow-down');

const pagesEndpoints = slowDown({
    windowMs: 10 * 60 * 1000, // 10 minutes
    delayAfter: 100, //allow 100 requests at max speed
    delayMs: 100 //delay every time by +100ms
});

router.get('/', pagesEndpoints, appCtrl.home);

module.exports = router;