const { HTTP_BAD_REQUEST, HTTP_OK, HTTP_CREATED} = require('../utils/constants/http_codes');
const RecipeService = require("../../application/services/recipeService");
const {log} = require("debug");

class RecipeController {

    constructor() {
        this.recipeService = new RecipeService();
    }

    saveRecipe(req, res) {
        if(!req.body || !req.body.name || !req.body.description || !req.body.ingredients) {
            return res.status(HTTP_BAD_REQUEST).send({
                message: 'Su solicitud no es valida',
                error: true
            });
        }

        console.log("Calling inventory repository");

        let response = {};
        const result = this.recipeService.saveRecipe({
            name: req.body.name,
            description: req.body.description,
            ingredients: req.body.ingredients
        }).then(
            res => response = { success: true, data: res },
            err => response = { success: false, error: err }
        ).catch(err => response = {success: false, error: err });
        return res.status(HTTP_CREATED).send(response, result);
    }

    findRecipe(req, res) {
        const recipeName = req.params.name;
        console.log(recipeName)
        let response = {};
        const result =  this.recipeService.findRecipe(recipeName)
            .then(
                res => {
                    console.log('promesa resuelta');
                    //response = {success: true, data: res};
                    console.log(response);
                    return {success: true, data: res};
                    //return response;
                }).catch(err => response = {success: false, error: err });
            ;
        return res.status(200).send(result);
    }
}

module.exports = RecipeController;