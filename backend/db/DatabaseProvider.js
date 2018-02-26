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
        .toArray((err, docs) => { if (callback) callback(docs) });
}

DatabaseProvider.prototype.simplePipeline = function (collectionName, callback) {
    this.db
        .collection(collectionName)
        .aggregate(
        [
            {
                '$group':
                    {
                        '_id': "$name",
                        'pageCount':
                            {
                                '$sum': '$numberOfPages'
                            }
                    }
            }
        ],
        function (err, cursor) {
            // assert.equal(err, null);

            cursor.toArray(function (err, documents) {
                console.log(documents)
                callback(documents);
            });
        }
        );
}
DatabaseProvider.prototype.count = function (collectionName, query, callback) {
    this.db
        .collection(collectionName)
        .aggregate(
        [
            { $match: query },
            { $group: { _id: null, count: { $sum: 1 } } }
        ],
        function (err, cursor) {

            cursor.toArray(function (err, documents) {

                if (callback)
                    callback(documents);
            });
        })


}
DatabaseProvider.prototype.sum = function (collectionName, query, callback) {
    this.db
        .collection(collectionName)
        .aggregate(
        [
            {
                $group:
                    {
                        _id: null,
                        total: { $sum: query },
                    }
            }
        ],
        function (err, cursor) {

            cursor.toArray(function (err, documents) {

                if (callback)
                    callback(documents);
            });
        })


}

DatabaseProvider.prototype.test = function (collectionName, query, callback) {
    this.db
        .collection(collectionName)
        .aggregate(
        [
            {
                $group:
                    {
                        _id: null,
                        total: { $sum: query },
                    }
            }
        ],
        function (err, cursor) {

            cursor.toArray(function (err, documents) {

                if (callback)
                    callback(documents);
            });
        })


}

DatabaseProvider.prototype.distinct = function (collectionName, query, callback) {
    this.db
        .collection(collectionName)
        .distinct(query,
        function (err, result) {
            callback(result);
        })


}

exports.DatabaseProvider = DatabaseProvider;