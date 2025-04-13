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
    }

    async updateInventory(recipeIngredients) {
        let success = false;
        for (let ingredient of recipeIngredients) {
            let ingredient = await this.inventoryRepository.getInventoryByIngredientId(ingredient[ingredient])
                .then(inventory => this.mapResponseToSchema(inventory));
            let quantityUpdated = ingredient.quantity - ingredient[ingredient].quantity;
            await this.inventoryRepository.updateInventory(ingredient[ingredient].id, quantityUpdated)
                .then(inventory => {
                    success = true;
                    console.log('updated', inventory);
                });
        }
        return success;
    }

    mapResponseToSchema(item) {
        return new Inventory(item.ingredientId, item.quantity, item.enterDate, item.measureUnit);
    }

}

module.exports = InventoryService;