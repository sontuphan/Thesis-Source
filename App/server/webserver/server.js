var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var routers = require('./routers');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var predict = require('./services/predict');


/**
 * Global variables
 */
global.hold = {
    data: null,
    recent: null,
    future: null,
    predict: null,
    proba: null,
    real: null
}


/**
 * API Server
 */
var app = express();
// Add middleware set up
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(routers);
app.listen(3003, function () {
    console.log('Web server is listening on port 3003.');
    predict.realtimePrediction()
})


/**
 * Socket Server
 */
var http = require('http').Server(app);
global.ios = require('socket.io')(http);
global.ios.sockets.on('connection', function (socket) {
    console.log("Client is connected ...");
    // Disconnect handler
    socket.on('disconnect', function () {
        console.log("Client is disconnected ...");
    });
});
http.listen(3004, function () {
    console.log('Start socket server on port 3004');
});


/**
 * Mongo
 */
var url = 'mongodb://localhost:27017/mydb';
MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log("Mongo connection is correct.");
    db.close();
});