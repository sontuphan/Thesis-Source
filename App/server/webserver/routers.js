var express = require('express');
var router = express.Router();

var _closeprice = require('./controllers/closeprice');
var _tracking= require('./controllers/tracking');
var _predicting= require('./controllers/predicting');



/**
 * GET API
 */
router.get('/api/closeprices', _closeprice.getPrices);
router.get('/api/tracking', _tracking.getParameters);
router.get('/api/getprediction', _predicting.getPrediction)


/**
 * POST API
 */
// router.post('/api/test', test.test);

module.exports = router;