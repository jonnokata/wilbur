const firebase = require("firebase");
const admin = require("firebase-admin");
const config = require("./config");
const serviceAccount = require("./wilbur-8fec7-45ec5512f68e.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = db;
