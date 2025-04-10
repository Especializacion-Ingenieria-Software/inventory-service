const Ingredient = require('../../infraestructure/persistence/Ingredient');

class IngredientRepository {

    getIngredientByName(ingredientId) {
        return Ingredient.where("ingredientId").equals(ingredientId);
    }

}

module.exports = IngredientRepository;