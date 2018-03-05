// =========CHARACTERS



db.characters.aggregate([
    { $match: { gender: "Female", "died": { $ne: "" } } },
    { $group: { _id: 1, totalCount: { $sum: 1 } } },
    { $project: { _id: 0, count: "$totalCount", } }
])
db.characters.aggregate([
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

{ $project: { _id: 0, books: "$booksData.books", totalPages: "$booksData.totalPages", povCount: "$povData.count", charCount: "$charData.count" } }


db.characters.aggregate([
    { $match: { gender: "Female" } },
    { $project: { spouseC: { $eq: ["$spouse", ""] } } },
    { $group: { _id: 1, spouse: { $eq: ["$spouseC", true] } } }
])

db.characters.aggregate([
    {
        "$project": {
            "type": { "$const": ["Male", "Female"] },
            "Male": 1,
            "Female": 1
        }
    },
    { "$unwind": "$type" },
    {
        "$group": {
            "_id": "_id",
            "gender": {
                "$push": {
                    "type": "$type",
                    "number": {
                        "$cond": [
                            { "$eq": ["$type", "Male"] },
                            "$Male",
                            "$Female"
                        ]
                    }
                }
            }
        }
    }
])

db.characters.aggregate([
    {
        $project: {
            female: {
                $filter: {
                    input: "$$ROOT",
                    as: "item",
                    cond: { $eq: ["$$item.gender", "Female"] }
                }
            }
        }
    }
])

db.characters.aggregate([
    {
        $project: {
            test: "$$ROOT"
        }
    }
])

db.characters.aggregate([
    { $project: { female: { $eq: ["$gender", "Female"] }, male: { $eq: ["$gender", "Male"] }, doc: "$$ROOT" } }
]).pretty()


db.characters.find({ $and: [{ gender: "Female", "spouse": { $ne: "" } }] })

//====GENDER=====

//find all female chars = 469
db.characters.find(
    { "gender": "Female" }
).count()

//find all alive female chars = 82
db.characters.find(
    {
        $and:
            [
                { "gender": "Female" },
                {
                    "died":
                        {
                            $ne: ""
                        }
                }
            ]
    }
).count();

// female characters grouped by culture
db.characters.aggregate([
    { $match: { $and: [{ gender: "Female" }, { culture: { $ne: "" } }] } },
    { $project: { culture: 1 } },
    { $unwind: "$culture" },
    { $group: { _id: "$culture", count: { $sum: 1 } } }
])

//find all Male chars = 1665
db.characters.find(
    { "gender": "Male" }
).count()

//find all alive Male chars = 471
db.characters.find(
    {
        $and:
            [
                { "gender": "Male" },
                {
                    "died":
                        {
                            $ne: ""
                        }
                }
            ]
    }
).count()

//character has alias 
db.characters.find(
    {
        $and: [
            { "aliases": { $ne: [] } },
            { "aliases": { $ne: [""] } },
            { "gender": "Female" }
        ]
    }
).count()

//female characters with titles = 142 -> 944
db.characters.find(
    {
        $and: [
            { "titles": { $ne: [] } },
            { "titles": { $ne: [""] } },
            { "gender": "Male" }
        ]
    }
).count()


//=====GENERAL

//find all dead chars = 1581
db.characters.find(
    { "died": "" }
).count()

//find all alive = 553
db.characters.find(
    { "died": { $ne: "" } }
).count()

//characters grouped by culture
db.characters.aggregate([
    { $project: { culture: 1 } },
    { $unwind: "$culture" },
    { $group: { _id: "$culture", count: { $sum: 1 } } }
])

//female characters with titles = 142 -> 944
db.characters.find(
    {
        $and: [
            { "titles": { $ne: [] } },
            { "titles": { $ne: [""] } },
            { "gender": "Male" }
        ]
    }
).count()




//===============HOUSES================
db.houses.findOne({})

//house words
db.houses.aggregate([
    { $match: { words: { $ne: "" } } },
    { $project: { words: 1, name: 1, region: 1 } },
]).pretty()

//houses grouped by region
db.houses.aggregate([
    { $project: { region: 1 } },
    { $unwind: "$region" },
    { $group: { _id: "$region", count: { $sum: 1 } } }
])


db.houses.aggregate([
    { $match: { currentLord: { $ne: "" } } },
    {
        $lookup:
            {
                from: "characters",
                localField: "currentLord",
                foreignField: "url",
                as: "lord_char"
            }
    }
])


db.houses.aggregate([
    {
        $lookup:
            {
                from: "characters",
                localField: "currentLord",
                foreignField: "url",
                as: "lord_char"
            }
    },
    { $match: { "lord_char.gender": "Female" } },
    { $project: { _id: 0, house: "$name", region: 1, char: { $arrayElemAt: ["$lord_char.name", 0] } } }
])

db.books.aggregate([

    { $match: { words: { $ne: "" } } },
    { $group: { _id: { $sum: 1 }, books: { $sum: 1 } } }
])

db.books.distinct(characters)

db.books.aggregate([
    { $group: { _id: "$name", uniqueChar: { $addToSet: "$characters" } } },
    { $project: { "name": 1, uniqueCharCount: { $sum: 1 } } }
])
{ $project: { "name": 1, uniqueCustomerCount: { $size: "$uniqueChar" } } }

db.TransactionDetails.aggregate([
    { $group: { _id: { "CITY": "$cityName" }, uniqueCount: { $addToSet: "$emailId" } } },
    { $project: { "CITY": 1, uniqueCustomerCount: { $size: "$uniqueCount" } } }
]);


db.books.aggregate(
    { $group: { _id: '$characters' } },
    { $group: { _id: 1, count: { $sum: 1 } } }
)



db.books.find({ $gte: ["$numberOfPages", 0] })
db.books.find({ numberOfPages: { $gt: 0 } })


//======================//
db.books.aggregate([
    { $group: { _id: null, books: { $sum: 1 }, totalPages: { $sum: "$numberOfPages" } } },
    { $unwind: "$povCharacters" },
    { $group: { _id: null, uniqueChar: { $addToSet: "$povCharacters" } } },
    { $project: { books: 1, totalPages: 1, total: { $size: "$uniqueChar" } } }
]).pretty()
//======================//


db.books.aggregate([
    { $project: { _id: null, books: { $sum: 1 }, totalPages: { $sum: "$numberOfPages" } } },
    { $unwind: "$povCharacters" },
    { $group: { _id: null, uniqueChar: { $addToSet: "$povCharacters" } } },
    { $project: { books: 1, totalPages: 1, total: { $size: "$uniqueChar" } } }
]).pretty()





db.books.aggregate([
    { $unwind: "$povCharacters" },
    { $group: { _id: null, uniqueChar: { $addToSet: "$povCharacters" } } },
    { $unwind: "$uniqueChar" },
    { $count: "total" }
]).pretty()

db.books.aggregate([
    { $unwind: "$povCharacters" },
    { $group: { _id: null, uniqueChar: { $addToSet: "$povCharacters" } } },
    { $project: { total: { $size: "$uniqueChar" } } }
]).pretty()


db.books.aggregate([
    {
        $project: {
            povChars: {
                $reduce: {
                    input: "$povCharacters",
                    initialValue: [],
                    in: { $push: ["$$this"] }
                }
            }
        }
    }
]).pretty();

db.books.aggregate([
    { $project: { _id: 1, uniqueChar: { $concatArrays: "$povCharacters" } } },
]).pretty()
db.books.aggregate([
    { $group: { _id: 1, uniqueChar: { $addToSet: "$characters" } } },
    { $project: { uniqueChar: { $sum: 1 } } }
])
db.books.aggregate([
    { $group: { _id: 1, uniqueChar: { $addToSet: "$characters" } } },
    { $unwind: "$uniqueChar" },
    { $project: { _id: 1, uniqueCharCount: { $sum: 1 } } },

])












// Create house Ancestral Weapons object
db.houses.aggregate([
    { $match: { words: { $ne: "" } } },
    { $project: { _id: 0, name: 1, region: 1, words: 1 } }
]).pretty()


// Create house words object
db.houses.aggregate([
    { $match: { ancestralWeapons: { $ne: "" } } },
    { $project: { _id: 0, name: 1, founded: 1, ancestralWeapons: 1 } }
]).pretty()

// Create Books data comparison object

db.books.aggregate([
    { $project: { _id: 0, name: 1, numberOfPages: 1, totalChars: { $size: "$characters" }, totalPovChars: { $size: "$povCharacters" } } }
]).pretty()


// Create Widgets object
db.books.aggregate([
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
]).pretty()


//get gender stats

// output
// {
//     "female" : {
//             "totalCount" : 469,
//             "isAlive" : 82,
//             "isdead" : 387,
//             "hasAlias" : 102,
//             "hasTitles" : 142,
//             "hasSpouse" : 185
//     },
//     "male" : {
//             "totalCount" : 1665,
//             "isAlive" : 471,
//             "isdead" : 1194,
//             "hasAlias" : 508,
//             "hasTitles" : 944,
//             "hasSpouse" : 176
//     }
// }

db.characters.aggregate([
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


//get culture gender stats
db.characters.aggregate([
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
