var fs = require('fs');

/**
 * @Constructor
 */
var mining = function () { };

/**
 * Check profit with special fee
 */
mining.isProfit = function (fee, currentPrice, futurePrice) {
    var profit = (futurePrice / currentPrice > 1 / ((1 - fee) * (1 - fee)))
    if (profit) {
        return 1;
    }
    return 0;
}

/**
 * Assign JSON to Array of closing price
 */
mining.assignData = function (datafile) {
    var result = [];
    for (var i = 0; i < datafile.length; i++) {
        result.push(datafile[i]['close']);
    }
    return result;
}

/**
 * Assign Array to form of matrix
 */
mining.createRawMatrix = function (data, amountOfSession) {
    var result = [];
    for (var i = 0; i <= data.length - amountOfSession; i++) {
        var item = [];
        for (var j = 0; j < amountOfSession; j++) {
            item.push(data[i + j])
        }
        result.push(item);
    }
    return result;
}

/**
 * Calculate Stochastic Oscillator
 */
mining.SO = function (row) {

    Array.prototype.max = function () {
        return Math.max.apply(null, this);
    };

    Array.prototype.min = function () {
        return Math.min.apply(null, this);
    };

    var SO = 0;
    var highest = row.max();
    var lowest = row.min();
    var current = row[row.length - 1];
    var last = row[0];

    if (highest - lowest == 0) {
        SO = 0.5;
    }
    else {
        SO = (current - lowest) / (highest - lowest);
    }

    return SO;
}

/**
 * Calculate Rate of Change
 */
mining.ROC = function (row) {
    var ROC = 0;
    var current = row[row.length - 1];
    var last = row[0];

    ROC = (current - last) / last;

    return ROC;
}

/**
 * Scale feature
 */
mining.scaleData = function (init, row) {
    var RDP = [];
    for (var i = 0; i < row.length; i++) {
        if (i == 0) {
            RDP.push((row[i] - init) / init);
        }
        else {
            RDP.push((row[i] - row[i - 1]) / row[i - 1]);
        }
    }
    return RDP;
}

/**
 * Scale matrix (or not)
 */
mining.normalizeData = function (data, binding) {
    var result = [];
    if (binding == 'rdp') {
        for (var i = 0; i < data.length; i++) {
            if (i > 0) {
                result.push(mining.scaleData(data[i - 1][0], data[i]));
            }
        }
    }
    else {
        for (var i = 0; i < data.length; i++) {
            var row = [];
            for (var j = 0; j < data[i].length; j++) {
                row.push(data[i][j]);
            }
            result.push(row);
        }
    }
    return result;
}

/**
 * Remove redundant data
 */
mining.removeRedudantData = function (data) {
    var result = [];
    for (var i = 0; i < data.length; i++) {
        var flag = true;
        for (var j = 0; j < result.length; j++) {
            if (JSON.stringify(data[i]) == JSON.stringify(result[j])) {
                flag = false;
                break;
            }
        }
        if (flag) {
            result.push(data[i]);
        }
    }
    return result;
}

/**
 * Count labels
 */
mining.countLabel = function (data) {
    var profit = 0;
    var down = 0;
    for (var i = 0; i < data.length; i++) {
        if (data[i][data[i].length - 1] == 1) {
            profit = profit + 1;
        }
        else {
            down = down + 1;
        }
    }
    return { "Profit": profit, "Down": down }
}

/**
 * Write data to file
 */
mining.writeToFile = function (data, path) {
    var file = fs.createWriteStream(path);
    file.on('error', function (err) {
        console.log(err);
    })
    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].length; j++) {
            if (j != data[i].length - 1) {
                file.write(data[i][j] + " ");
            }
            else {
                file.write(data[i][j] + "\n");
            }
        }
    }
    file.end();
}


module.exports = mining;