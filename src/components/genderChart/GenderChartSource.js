import Api from '../../sources/api';

class GenderChartSource {
    static get = () => {
        return Api.get('https://dashboard-of-ice-and-fire.firebaseio.com/genderCultureData.json');
    }
}

module.exports = GenderChartSource;
