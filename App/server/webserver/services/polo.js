var request = require('request');

/**
 * @Constructor
 */
var polo = function () { };

/**
 * validate JSON string
 */
polo.isJSON = function (str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

/**
 * Filter return data
 */
polo.filter = function (data) {
    var result = [];
    for (var i = 0; i < data.length; i++) {
        var temp = [];
        temp.push(data[i].date * 1000);
        temp.push(data[i].close);
        result.push(temp);
    }
    return result;
}

/**
 * Get polo price
 */
polo.getPrices = function (callback) {

    // We should subtract 1800 (30') to except the last session because it is not closed

    var pair = 'USDT_BTC';
    var start = Math.floor(Number(new Date()) / 1000) - 1800 - 86400;
    var end = Math.floor(Number(new Date()) / 1000) - 1800;
    var period = 1800;

    var url = 'https://poloniex.com/public?command=returnChartData&currencyPair=' + pair + '&start=' + start + '&end=' + end + '&period=' + period;

    request(url, function (e, r, b) {
        if (e || !polo.isJSON(b)) {
            callback({ 'status': 'error' }, null)
            return;
        }
        callback(null, b);
    })
}

/**
 * Get chart data
 */
polo.getChartData = function (callback) {
    polo.getPrices(function (er, re) {
        if (er) {
            callback(er, null);
            return;
        }
        result = polo.filter(JSON.parse(re));
        callback(null, result);
    });
}

module.exports = polo;