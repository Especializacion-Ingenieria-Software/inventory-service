const Ingredient = require('../../infraestructure/persistence/Ingredient');

class IngredientRepository {

    getIngredientByName(name) {
        return Ingredient.where("name").equals(name);
    }

    getIngredientById(ingredientId) {
        return Ingredient.where("ingredientId").in(ingredientId);
    }

}

module.exports = IngredientRepository;