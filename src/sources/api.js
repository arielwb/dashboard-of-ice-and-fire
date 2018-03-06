import 'whatwg-fetch';

class Api {


    // static get = path => {
    //     return firebase.database().ref(path);
    // }
    static get = path => {
        return fetch(path).then((response) => response.json());
    }


    static getChars = (pageNumber) => {
        return Api.getFullResponse(`https://www.anapioficeandfire.com/api/characters?pageSize=50?page=${pageNumber}`);
    }
}

module.exports = Api;