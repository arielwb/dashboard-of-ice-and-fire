import 'whatwg-fetch';

class Api {
    static get = path => {
        return fetch(path).then((response) => response.json());
    }
 }


module.exports = Api;