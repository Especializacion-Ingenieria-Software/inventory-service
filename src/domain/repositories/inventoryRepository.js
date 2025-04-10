const Inventory = require('../../infraestructure/persistence/Inventory');

class InventoryRepository {

    getInventoryByIngredientId(ingredientId) {
        return Inventory.where('ingredientId').in(ingredientId)
            .sort({'ingredientId': 1, 'enterDate': 1}).exec();
    }

    updateInventory(ingredientId, quantity) {
        return Inventory.findByIdAndUpdate(
            ingredientId,
            { $set: {"quantity": quantity}},
            null
        ).exec();
    }
}

module.exports = InventoryRepository;