const admin = require("firebase-admin"); 
const config = require("./firebaseAdmin");



admin.initializeApp(config);

const db = admin.firestore(); 

module.exports = { admin, db}
