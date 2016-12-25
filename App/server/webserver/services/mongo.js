var request = require('request')
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/mydb';

/**
 * @Constructor
 */
var mongo = function () {};

/**
 * Connect MongoDB
 */
mongo.connect = function (callback) {
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        callback(db);
    });
};

/**
 * Find documents
 */
mongo.find = function (collection, db, callback) {
    var cursor = db.collection(collection).find();
    var re = [];
    cursor.each(function (err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            re.push(doc);
        }
        else {
            callback(re);
        }
    });
};

/**
 * Insert documents
 */
mongo.insert = function (collection, row, db, callback) {
    db.collection(collection).insertOne(row, function (err, re) {
        assert.equal(err, null);
        console.log("Inserted a document into the collection.");
        callback();
    });
};

/**
 * Update documents
 */
mongo.update = function (collection, key, value, db, callback) {
    db.collection(collection).updateOne(key, value, function (err, re) {
        assert.equal(err, null);
        console.log("Update successful!");
        callback();
    });
};

module.exports = mongo;