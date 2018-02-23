import 'whatwg-fetch';

class Api {
    static get = path => {
        return fetch(path).then((response) => response.json());
    }
    
    static getFullResponse = path => {
        return fetch(path);
    }

    static getBooks = () => {
        return Api.get('https://www.anapioficeandfire.com/api/books?pageSize=50');
    }
    
    static getWepons = () => {
        return Api.get('https://www.anapioficeandfire.com/api/houses?pageSize=50&hasAncestralWeapons=true');
    }
    
    static getChars = (pageNumber) => {
        return Api.getFullResponse(`https://www.anapioficeandfire.com/api/characters?pageSize=50?page=${pageNumber}`);
    }
    
    
}


module.exports = Api;