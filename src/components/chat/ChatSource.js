import Api from '../../sources/api';

class ChatSource {
    static get = () => {
        return Api.get('https://dashboard-of-ice-and-fire.firebaseio.com/booksData.json')
    }
}


module.exports = ChatSource;