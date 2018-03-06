import Api from '../../sources/api';

class BooksChartSource {
    static get = () => {
        return Api.get('https://dashboard-of-ice-and-fire.firebaseio.com/booksData.json');
    }
}

module.exports = BooksChartSource;
