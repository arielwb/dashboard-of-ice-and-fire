import Api from '../../sources/api';

class WidgetsSource {
    static get = (books, data) => {
        return Api.get('https://dashboard-of-ice-and-fire.firebaseio.com/booksStats.json');
    }
}

module.exports = WidgetsSource;