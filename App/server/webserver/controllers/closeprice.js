var polo = require('./../services/polo');

module.exports = {
    getPrices: function (req, res) {
        polo.getChartData(function(er, re){
            if(er){
                res.send(er);
                return;
            }
            res.send(re);
        })
    }
};