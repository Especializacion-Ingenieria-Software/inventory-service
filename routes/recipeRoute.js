const express = require('express');
const RecipeController = require("../src/application/controllers/recipeController");

const router = express.Router();

router.post('/', (req, res) => {
    const recipeController = new RecipeController();
    recipeController.saveRecipe(req, res);
});

router.get('/:name', (req, res) => {
    const recipeController = new RecipeController();
    recipeController.findRecipe(req, res);
});

module.exports = router;