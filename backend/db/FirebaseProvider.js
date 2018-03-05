const firebase = require('firebase-admin');
const serviceAccount = require('./key.json');

FirebaseProvider = function (done) {

    firebase.initializeApp({
        credential: firebase.credential.cert(serviceAccount),
        databaseURL: 'https://dashboard-of-ice-and-fire.firebaseio.com/'
    });
}

FirebaseProvider.prototype.set = (url, data) => firebase.database().ref(url).set(data)


exports.FirebaseProvider = FirebaseProvider;