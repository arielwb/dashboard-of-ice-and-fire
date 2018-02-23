import 'whatwg-fetch';

class Api {
    static get = path => {
        return fetch(path).then((response) => response.json());
    }

    static getBooks = () => {
        return Api.get('https://www.anapioficeandfire.com/api/books');
    }
}


module.exports = Api;