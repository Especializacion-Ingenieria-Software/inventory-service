const { HTTP_BAD_REQUEST, HTTP_OK, HTTP_CREATED} = require('../utils/constants/http_codes');
const InventoryService = require("../../application/services/inventoryService");

class InventoryController {
    constructor() {
        this.inventoryService = new InventoryService();
    }

     isThereIngredientsAvailable(req, res) {
        if (!req.body || !req.body.name || !req.body.description || !req.body.ingredients) {
            return res.status(HTTP_BAD_REQUEST).send({
                message: 'Su solicitud no es valida',
                error: true
            });
        }

        console.log("Calling inventory repository", req.body.ingredients);
        const result =  this.inventoryService.isThereIngredientsAvailable(req.body.ingredients)
            .then(res => { console.log('res', res); return {
                message: 'Success!!!',
                result: res
            } })
            .catch(err => {
                console.log(err);
                return {
                    message: 'Error!!!' + err.message,
                }
            });

        return res.status(HTTP_CREATED).send(result);
    }

   updateInventory(req, res) {
        if (!req.body || !req.body.name || !req.body.description || !req.body.ingredients) {
            return res.status(HTTP_BAD_REQUEST).send({
                message: 'Su solicitud no es valida',
                error: true
            });
        }
       let response = this.updateInventory(req.body)
            .then(res => {
                console.log('res', res);
                return {
                    message: 'Success!!!',
                    result: res
       } })
           .catch(err => {
               console.log(err);
               return {
                   message: 'Error!!!' + err.message,
               }
           });
       return res.status(HTTP_CREATED).send(response);

    }
}

module.exports = { InventoryController };