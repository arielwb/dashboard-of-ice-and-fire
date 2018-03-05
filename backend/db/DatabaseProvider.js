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

DatabaseProvider.prototype.getWidgetsData = function (callback) {
    this.db.collection('books')
        .aggregate([
            {
                $facet: {
                    data: [
                        { $group: { _id: 0, books: { $sum: 1 }, totalPages: { $sum: "$numberOfPages" } } },
                    ],
                    povChars: [
                        { $unwind: "$povCharacters" },
                        { $group: { _id: 0, uniqueChar: { $addToSet: "$povCharacters" } } },
                        { $project: { count: { $size: "$uniqueChar" } } }
                    ],
                    chars: [
                        { $unwind: "$characters" },
                        { $group: { _id: 0, uniqueChar: { $addToSet: "$characters" } } },
                        { $project: { count: { $size: "$uniqueChar" } } }
                    ],
                }
            },
            {
                $group: {
                    _id: 0,
                    booksData: { $first: { "$arrayElemAt": ["$data", 0] } },
                    povData: { $first: { "$arrayElemAt": ["$povChars", 0] } },
                    charData: { $first: { "$arrayElemAt": ["$chars", 0] } }
                }
            },
            { $project: { _id: 0, books: "$booksData.books", totalPages: "$booksData.totalPages", povCount: "$povData.count", charCount: "$charData.count" } }
        ])
        .toArray((err, docs) => { if (callback) callback(docs) });
}

DatabaseProvider.prototype.getBooksData = function (callback) {
    this.db.collection('books')
        .aggregate([
            { $project: { _id: 0, name: 1, numberOfPages: 1, totalChars: { $size: "$characters" }, totalPovChars: { $size: "$povCharacters" } } }
        ])
        .toArray((err, docs) => { if (callback) callback(docs) });
}

DatabaseProvider.prototype.getWeapons = function (callback) {
    this.db.collection('houses')
        .aggregate([
            { $match: { ancestralWeapons: { $ne: "" } } },
            { $project: { _id: 0, name: 1, founded: 1, ancestralWeapons: 1 } }
        ])
        .toArray((err, docs) => { if (callback) callback(docs) });
}

DatabaseProvider.prototype.getWords = function (callback) {
    this.db.collection('houses')
        .aggregate([
            { $match: { words: { $ne: "" } } },
            { $project: { _id: 0, name: 1, region: 1, words: 1 } }
        ])
        .toArray((err, docs) => { if (callback) callback(docs) });
}

DatabaseProvider.prototype.getGenderStats = function (callback) {
    this.db.collection('characters')
        .aggregate([
            {
                $facet: {
                    totalCountF: [
                        { $match: { gender: "Female" } },
                        { $group: { _id: 1, totalCount: { $sum: 1 } } }
                    ],
                    aliveCountF: [
                        { $match: { gender: "Female", died: { $ne: "" } } },
                        { $group: { _id: 1, totalCount: { $sum: 1 } } }
                    ],
                    deadCountF: [
                        { $match: { gender: "Female", died: "" } },
                        { $group: { _id: 1, totalCount: { $sum: 1 } } }
                    ],
                    hasAliasCountF: [
                        { $match: { gender: "Female", $and: [{ "aliases": { $ne: [] } }, { "aliases": { $ne: [""] } }] } },
                        { $group: { _id: 1, totalCount: { $sum: 1 } } }
                    ],
                    hasTitlesCountF: [
                        { $match: { gender: "Female", $and: [{ "titles": { $ne: [] } }, { "titles": { $ne: [""] } }] } },
                        { $group: { _id: 1, totalCount: { $sum: 1 } } }
                    ],
                    hasSpouseCountF: [
                        { $match: { gender: "Female", $and: [{ "spouse": { $ne: "" } }] } },
                        { $group: { _id: 1, totalCount: { $sum: 1 } } }
                    ],
                    totalCountM: [
                        { $match: { gender: "Male" } },
                        { $group: { _id: 1, totalCount: { $sum: 1 } } }
                    ],
                    aliveCountM: [
                        { $match: { gender: "Male", died: { $ne: "" } } },
                        { $group: { _id: 1, totalCount: { $sum: 1 } } }
                    ],
                    deadCountM: [
                        { $match: { gender: "Male", died: "" } },
                        { $group: { _id: 1, totalCount: { $sum: 1 } } }
                    ],
                    hasAliasCountM: [
                        { $match: { gender: "Male", $and: [{ "aliases": { $ne: [] } }, { "aliases": { $ne: [""] } }] } },
                        { $group: { _id: 1, totalCount: { $sum: 1 } } }
                    ],
                    hasTitlesCountM: [
                        { $match: { gender: "Male", $and: [{ "titles": { $ne: [] } }, { "titles": { $ne: [""] } }] } },
                        { $group: { _id: 1, totalCount: { $sum: 1 } } }
                    ],
                    hasSpouseCountM: [
                        { $match: { gender: "Male", $and: [{ "spouse": { $ne: "" } }] } },
                        { $group: { _id: 1, totalCount: { $sum: 1 } } }
                    ]
        
                }
            },
            {
                $group: {
                    _id: 0,
                    totalDataF: { $first: { "$arrayElemAt": ["$totalCountF", 0] } },
                    aliveDataF: { $first: { "$arrayElemAt": ["$aliveCountF", 0] } },
                    deadDataF: { $first: { "$arrayElemAt": ["$deadCountF", 0] } },
                    aliasDataF: { $first: { "$arrayElemAt": ["$hasAliasCountF", 0] } },
                    titlesDataF: { $first: { "$arrayElemAt": ["$hasTitlesCountF", 0] } },
                    spouseDataF: { $first: { "$arrayElemAt": ["$hasSpouseCountF", 0] } },
                    totalDataM: { $first: { "$arrayElemAt": ["$totalCountM", 0] } },
                    aliveDataM: { $first: { "$arrayElemAt": ["$aliveCountM", 0] } },
                    deadDataM: { $first: { "$arrayElemAt": ["$deadCountM", 0] } },
                    aliasDataM: { $first: { "$arrayElemAt": ["$hasAliasCountM", 0] } },
                    titlesDataM: { $first: { "$arrayElemAt": ["$hasTitlesCountM", 0] } },
                    spouseDataM: { $first: { "$arrayElemAt": ["$hasSpouseCountM", 0] } },
        
                }
            },
            {
                $project: {
                    _id: 0,
                    female: {
                        totalCount: "$totalDataF.totalCount",
                        isAlive: "$aliveDataF.totalCount",
                        isdead: "$deadDataF.totalCount",
                        hasAlias: "$aliasDataF.totalCount",
                        hasTitles: "$titlesDataF.totalCount",
                        hasSpouse: "$spouseDataF.totalCount",
                    },
                    male: {
                        totalCount: "$totalDataM.totalCount",
                        isAlive: "$aliveDataM.totalCount",
                        isdead: "$deadDataM.totalCount",
                        hasAlias: "$aliasDataM.totalCount",
                        hasTitles: "$titlesDataM.totalCount",
                        hasSpouse: "$spouseDataM.totalCount",
                    }
                }
            }
        ])
        .toArray((err, docs) => { if (callback) callback(docs) });
}

DatabaseProvider.prototype.getCultureStats = function (callback) {
    this.db.collection('characters')
        .aggregate([
            {
                $facet: {
                    female: [
                        { $match: { $and: [{ gender: "Female" }, { culture: { $ne: "" } }] } },
                        { $project: { culture: 1 } },
                        { $unwind: "$culture" },
                        { $group: { _id: "$culture", count: { $sum: 1 } } }
                    ],
                    male: [
                        { $match: { $and: [{ gender: "Male" }, { culture: { $ne: "" } }] } },
                        { $project: { culture: 1 } },
                        { $unwind: "$culture" },
                        { $group: { _id: "$culture", count: { $sum: 1 } } }
                    ],
                }
            }
        
        ])
        .toArray((err, docs) => { if (callback) callback(docs) });
}

exports.DatabaseProvider = DatabaseProvider;