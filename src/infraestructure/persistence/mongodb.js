const mongoose = require('mongoose');
const Inventory = require('./Inventory');
const db = mongoose.connect('mongodb+srv://marlondavid0526:AAEbJExRT0Q8inS4@aplicationitm.05edg.mongodb.net/restaurant')
    .then(
        result => console.log(`Connected to ${result.connection.db.databaseName}!`),
        err => console.log(err)
    );

module.exports = db;