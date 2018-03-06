import Api from '../../sources/api';

class GenderStatsSource {
    static get = () => {
        return Api.get('https://dashboard-of-ice-and-fire.firebaseio.com/genderStats.json');
    }
}

module.exports = GenderStatsSource;
