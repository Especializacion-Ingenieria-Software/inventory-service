const IngredientRepository = require("../../domain/repositories/ingredientRepository");

class IngredientService {

    ingredientRepository;

    constructor() {
        this.ingredientRepository = new IngredientRepository();
    }

    async getIngredientById(ingredientId) {
        const ingredient = await this.ingredientRepository.getIngredientById(ingredientId)
            .then(ingredient => {
                return ingredient;
            })
            .catch(err => {
                return err;
            });
        return ingredient;
    }

    async getIngredientByName(ingredientName) {
        const ingredient = await this.ingredientRepository.getIngredientByName(ingredientName)
            .then(ingredient => {
                return ingredient;
            })
            .catch(err => {
                return err;
            });
        return ingredient
    }
}

module.exports = IngredientService;