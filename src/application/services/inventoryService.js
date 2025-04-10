const InventoryRepository = require('../../domain/repositories/inventoryRepository');
const Inventory = require('../../domain/entities/inventory');


class InventoryService {

    inventoryRepository;

    constructor() {
        this.inventoryRepository = new InventoryRepository();
    }

    async isThereIngredientsAvailable(ingredients) {
        const availableInventory = await this.inventoryRepository.getInventoryByIngredientId(ingredients)
            .then(items => {
                let data = [];
                items.forEach(item => {
                    data.push(this.mapResponseToSchema(item));
                });
                return data;
            },
                error => {console.log(error); return 0});

        return availableInventory;
    /*return  this.inventoryRepository.getInventoryByIngredientId(ingredients);
            .then(data => {
                console.log('data', data);
                return data;
            })
            .catch(err => console.log('error', err));
*/
        //}
    }

    mapResponseToSchema(item) {
        return new Inventory(item.ingredientId, item.quantity, item.enterDate, item.measureUnit);
    }

}

module.exports = InventoryService;