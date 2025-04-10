const { Schema, model } = require('mongoose');

const ingredientSchema = new Schema({
    description: String,
    name: String,
    type: String
});

const ingredient = model('Ingredient', ingredientSchema);
module.exports = ingredient;
