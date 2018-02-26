const MongoClient = require('mongodb').MongoClient;

DatabaseProvider = function (done) {
    let url = 'mongodb://localhost:27017';
    let dbName = 'dash';
    let self = this;

    MongoClient.connect(url, function (err, client) {
        console.log("Connected successfully to server");

        self.client = client;
        self.db = client.db(dbName);

        done();
    });
}


DatabaseProvider.prototype.insertMany = function (collectionName, data, callback) {
    // Get the documents collection
    this.db
        .collection(collectionName)
        .insertMany(data, (err, result) => { if (callback) callback(result) });
}


DatabaseProvider.prototype.find = function (collectionName, query, callback) {
    this.db
        .collection(collectionName)
        .find(query)
        .toArray((err, docs) => {if (callback)callback(docs)});
}

exports.DatabaseProvider = DatabaseProvider;