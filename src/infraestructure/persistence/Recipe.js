const { Schema, model } = require('mongoose');

const recipeSchema = new Schema({
    name: String,
    description: String,
    ingredients: [{
        idIngredient: String,
        measure: {
            quantity: Number,
            measureUnit: String,
        }
    }]
});

const recipe = model('Recipe', recipeSchema);
module.exports = recipe;
