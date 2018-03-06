import Api from '../../sources/api';

class WordsSource {
    static get = () => {
        return Api.get('https://dashboard-of-ice-and-fire.firebaseio.com/houseWords.json')
    }
}


module.exports = WordsSource;