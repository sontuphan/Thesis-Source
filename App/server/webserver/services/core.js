var request = require('request');
var mongo = require('./mongo');

/**
 * @Constructor
 */
var core = function () { };


/**
 * Prediction
 */
core.predict = function (data, callback) {
    var url = 'http://localhost:8000/predict';
    request({ url: url, method: 'POST', json: data }, function (e, r, b) {
        if (e) {
            callback(e, null);
            return;
        }
        callback(null, b);
    })
}

/**
 * Update accuracy table in mongo
 */
core.sub = function (predict, real, x, y, z) {
    if (predict == x && real == y) {
        mongo.connect(function (db) {
            mongo.find('accuracy', db, function (re) {
                db.close();
                for (var i = 0; i < re.length; i++) {
                    var item = re[i];
                    if (item.para == z) {
                        var count = item.count + 1;
                        mongo.connect(function (db) {
                            mongo.update('accuracy', { para: z }, { para: z, count: count }, db, function () {
                                db.close();
                            });
                        })
                    }
                }
            });
        });
    }
}
core.updateAccuracy = function (predict, real) {
    core.sub(predict, real, 1, 1, 'TP');
    core.sub(predict, real, 0, 0, 'TN');
    core.sub(predict, real, 0, 1, 'FN');
    core.sub(predict, real, 1, 0, 'FP');
}


module.exports = core;