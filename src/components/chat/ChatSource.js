import Api from '../../sources/api';

class ChatSource {
    static get = () => {
        return Api.get('../mock/messages.json');
    }
 }


module.exports = ChatSource;