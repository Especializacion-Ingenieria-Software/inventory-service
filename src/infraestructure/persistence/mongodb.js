const mongoose = require('mongoose');
const Inventory = require('./Inventory');

//Usar variable de entorno o la URL de MongoDB Atlas directamente
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://marlondavid0526:AAEbJExRT0Q8inS4@aplicationitm.05edg.mongodb.net/restaurant';

const db = mongoose.connect(MONGODB_URI)
    .then(
        result => console.log(`Connected to ${result.connection.db.databaseName}!`),
        err => console.log(err)
    );

module.exports = db;