import Api from '../../sources/api';

class ChartSource {
    static get = () => {
        return Api.get('../mock/pageViews.json');
    }
 }


module.exports = ChartSource;