var predict = require('./../services/predict.js')

module.exports = {
    getPrediction: function (req, res) {
        predict.getPrediction(function(er, re){
            if(er){
                res.send(er);
                return;
            }
            res.send(re);
        });
    }
};