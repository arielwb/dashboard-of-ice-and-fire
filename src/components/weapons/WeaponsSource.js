import Api from '../../sources/api';

class WeaponsSource {
    static get = (books, data) => {
        return Api.get('https://dashboard-of-ice-and-fire.firebaseio.com/houseWeapons.json');
    }
}

module.exports = WeaponsSource;