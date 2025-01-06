const firebaseAdmin = require('firebase-admin');
const config = require('../config');

const initializeFirebase = () => {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.applicationDefault(),
    storageBucket: config.firebaseBucket,
  });
};

module.exports = { initializeFirebase };