const { Schema, model } = require('mongoose');

const inventorySchema = new Schema({
    enterDate: Date,
    ingredientId: String,
    measureUnit: String,
    quantity: Number,
});

const inventory = model('Inventory', inventorySchema);
module.exports = inventory;
