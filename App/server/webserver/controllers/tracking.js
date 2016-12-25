var mongo = require('./../services/mongo.js')

module.exports = {
    getParameters: function (req, res) {
        mongo.connect(function (db) {
            mongo.find('accuracy', db, function (re) {
                db.close();
                res.send(re);
            });
        });
    }
};