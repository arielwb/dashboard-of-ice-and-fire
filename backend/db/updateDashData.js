
DatabaseProvider = require('./DatabaseProvider').DatabaseProvider;
const FirebaseProvider = require('./FirebaseProvider').FirebaseProvider;
const axios = require('axios');


const fb = new FirebaseProvider();
const db = new DatabaseProvider(() => {
    initQuery();
});

const initQuery = () => {
    buildWidgetData();
    buildGraphData();
    buildHouseWords();
    buildAncestralWeapons();
    buildCultureStats();
    buildGenderStats();
}

const buildWidgetData = () => {
    db.getWidgetsData((data) => fb.set('booksStats/', data[0]))
}

const buildGraphData = () => {
    db.getBooksData((data) => fb.set('booksData/', data))
}

const buildHouseWords = () => {
    db.getWords((data) => fb.set('houseWords/', data))
}

const buildAncestralWeapons = () => {
    db.getWeapons((data) => fb.set('houseWeapons/', data))
}

const buildGenderStats = () => {
    db.getGenderStats((data) => fb.set('genderStats/', data[0]))
}

const buildCultureStats = () => {
    db.getCultureStats((data) => fb.set('genderCultureData/', data[0]))
}