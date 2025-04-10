const RecipeRepository = require('../../domain/repositories/recipeRepository');
const Recipe = require("../../domain/entities/recipe");

class RecipeService {

    constructor() {
        this.recipeRepository = new RecipeRepository();
    }

    saveRecipe(recipe) {
        return this.recipeRepository.saveRecipe(recipe);
    }

    findRecipe(recipeName) {
        return this.recipeRepository.findRecipeByName(recipeName)
            .then(
                res => res.map(object => new Recipe(object.name, object.description, object.ingredients)))
            .catch(err => {
                console.log(err);
                return { error: true, message: err.message }

            });
    }
}

module.exports = RecipeService;