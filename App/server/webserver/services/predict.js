var request = require('request');
var polo = require('./polo');
var mongo = require('./mongo');
var core = require('./core');
var mining = require('./mining');

var url = 'http://localhost:8000/predict';
var fee = 0;
var amountOfSession = 10;

/**
 * @Constructor
 */
var predict = function () { };

/**
 * Data mining
 */
predict.mineData = function (data, amountOfSession) {
    var raw = mining.createRawMatrix(mining.assignData(data), amountOfSession);
    var re = mining.normalizeData(raw, 'rdp');

    for (var i = 0; i < re.length; i++) {
        j = i + 1;
        re[i].push(mining.ROC(raw[j]));
        re[i].push(mining.SO(raw[j]));
    }
    return re[0];
}

/**
 * Filter Polo data
 */
predict.scale = function (data) {
    var len = data.length;
    var temp = [];

    for (var i = len - amountOfSession - 1; i < len; i++) {
        temp.push(data[i]);
    }

    return predict.mineData(temp, amountOfSession);
}

/**
 * Filter Polo data
 */
predict.filter = function (data) {
    var len = data.length;
    var temp = [];

    for (var i = len - amountOfSession; i < len; i++) {
        temp.push(data[i]['close']);
    }

    return temp;
}

/**
 * Get prediction
 */
predict.getPrediction = function (callback) {
    if (global.hold.predict == null || global.hold.proba == null) {
        callback({ status: 'error' }, null);
        return;
    }
    callback(null, { time: global.hold.future, value: global.hold.predict, proba: global.hold.proba });
}

/**
 * Real time prediction
 */
predict.realtimePrediction = function () {
    setInterval(function () {
        polo.getPrices(function (er, re) {

            if (er) {
                console.log(er);
                return;
            }

            /**
             * (1) Assign new global.hold.data ... etc
             * (2) Predict new data and assign to global.hold.predict
             * ... waiting 30'
             * (3) Compare to new price and write to global.hold.real - Update Accuracy collection
             * (4) Record to mongo all global.hold
             * (5) null all global.hold
             * (1) Assign new global.hold.data ... etc
             * (2) Predict new data and assign to global.hold.predict
             * ... go on
             */

            result = JSON.parse(re); // Parse string to JSON


            time = result[result.length - 1].date * 1000;
            row = predict.scale(result);
            data = predict.filter(result);

            if (global.hold.data == null) {

                /**
                 * (1)
                 */
                global.hold.data = data;
                global.hold.recent = time;
                global.hold.future = time + 1800000;

                /**
                 * (2)
                 */

                core.predict({ "data": row }, function (er, re) {
                    if (er) {
                        console.log(er);
                        return;
                    }
                    if (re.status == 'error') {
                        console.log(re.error);
                        return;
                    }

                    global.hold.predict = re.data.label;
                    global.hold.proba = re.data.probability;

                    global.ios.sockets.emit('restart', { status: 'error', action: 'reload' });
                    console.log('restart')
                });

            }
            else if (JSON.stringify(global.hold.data) != JSON.stringify(data)) {
                // This case is normal
                if (time == global.hold.future) {
                    // Emit data to chart
                    global.ios.sockets.emit('closeprices', { time: time, data: data[9] });

                    /**
                     * (3)
                     */
                    if (mining.isProfit(fee, global.hold.data[9], data[9])) {
                        global.hold.real = 1;
                        core.updateAccuracy(global.hold.predict, global.hold.real);
                    }
                    else {
                        global.hold.real = 0;
                        core.updateAccuracy(global.hold.predict, global.hold.real);
                    }

                    /**
                     * (4)
                     */
                    mongo.connect(function (db) {
                        var temp = JSON.parse(JSON.stringify(global.hold)); // a trick to fix bug mongo
                        mongo.insert('history', temp, db, function () {
                            db.close();

                            /**
                             * (5)
                             */
                            global.hold.data = null;
                            global.hold.recent = null;
                            global.hold.future = null;
                            global.hold.predict = null;
                            global.hold.proba = null;
                            global.hold.real = null;

                            /**
                            * (1)
                            */
                            global.hold.data = data;
                            global.hold.recent = time;
                            global.hold.future = time + 1800000;

                            /**
                             * (2)
                             */
                            core.predict({ "data": row }, function (er, re) {
                                if (er) {
                                    console.log(er);
                                    return;
                                }
                                if (re.status == 'error') {
                                    console.log(re.error);
                                    return;
                                }
                                global.hold.predict = re.data.label;
                                global.hold.proba = re.data.probability;
                                // Emit prediction result of new session
                                global.ios.sockets.emit('prediction', { time: global.hold.future, value: global.hold.predict, proba: global.hold.proba });
                            });

                        });
                    });
                }
                // This case is executed when lose connect to polo and we have lack of data
                else {
                    console.log('Time:', time, "Futrue:", global.hold.future);
                    global.hold.data = null;
                    global.hold.recent = null;
                    global.hold.future = null;
                    global.hold.predict = null;
                    global.hold.proba = null;
                    global.hold.real = null;
                }

            }

        });
    }, 20000);
}

module.exports = predict;