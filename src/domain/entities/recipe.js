class Recipe {

    name;
    description;
    ingredients;

    constructor (name, description, ingredients) {
        this.name = name;
        this.description = description;
        this.ingredients = ingredients;
    }
}

module.exports = Recipe;