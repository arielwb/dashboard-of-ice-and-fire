import Api from '../../sources/api';

class WidgetsSource {
    static get = () => {
        return Api.get('../mock/widgets.json');
    }
 }


module.exports = WidgetsSource;