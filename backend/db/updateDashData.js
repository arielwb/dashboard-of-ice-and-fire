
DatabaseProvider = require('./DatabaseProvider').DatabaseProvider;
const axios = require('axios');


let db = new DatabaseProvider(() => {
    initQuery();
});

const initQuery = () => {
    //buildWidgetData();
    buildGraphData();
}

const buildWidgetData = () => {
    // count books
    db.count('books', {}, (data) => console.log(data))
    //count pov chars
    db.distinct('books', 'povCharacters', (data) => console.log(data.length))
    //count chars
    db.count('characters', {}, (data) => console.log(data))
    // pages chars
    db.sum('books', '$numberOfPages', (data) => console.log(data))
}

const buildGraphData = () => {
    // count books
    db.simplePipeline('books',  (data) => console.log(data))
    
}