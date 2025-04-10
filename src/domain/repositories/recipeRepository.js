const Recipe = require("../../infraestructure/persistence/Recipe");

class RecipeRepository {

    saveRecipe(recipe) {
        console.log('reopository', recipe);
        const recipeModel = new Recipe({
            name: recipe.name,
            description: recipe.description,
            ingredients: recipe.ingredients,
        });
        return recipeModel.save().catch(err => console.log(err));
    }

    findRecipeByName(recipeName) {
        return Recipe.where("name").equals(recipeName);
    }
}

module.exports = RecipeRepository;