const { HTTP_BAD_REQUEST, HTTP_OK, HTTP_CREATED} = require('../utils/constants/http_codes');
const InventoryService = require("../../application/services/inventoryService");

class InventoryController {
    constructor() {
        this.inventoryService = new InventoryService();
    }

    async  isThereIngredientsAvailable(req, res) {
        if (!req.body || !req.body.name || !req.body.description || !req.body.ingredients) {
            return res.status(HTTP_BAD_REQUEST).send({
                message: 'Su solicitud no es valida',
                error: true
            });
        }

        console.log("Calling inventory repository", req.body.ingredients);
        const result =  await this.inventoryService.isThereIngredientsAvailable(req.body.ingredients)
            .then(res => { console.log('res', res); return res })
            .catch(err => console.log(err));

        return res.status(HTTP_CREATED).send({
            message: 'Success!!!',
            result: result
        });
    }
}

module.exports = { InventoryController };