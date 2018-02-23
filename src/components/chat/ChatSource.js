import Api from '../../sources/api';

class ChatSource {
    static get = () => {
        return Promise.all(
            [
                Api.get('https://www.anapioficeandfire.com/api/houses?pageSize=50&hasWords=true'),
                Api.get('https://www.anapioficeandfire.com/api/houses?pageSize=50&hasWords=true&page=2'),
            ]
        );
    }
 }


module.exports = ChatSource;