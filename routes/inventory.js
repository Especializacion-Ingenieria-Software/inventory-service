const express = require('express');
const router = express.Router();

const Recipe = require('../src/domain/entities/recipe');
const { InventoryController } = require('../src/application/controllers/inventoryController');

router.post('/availability',  (req, res) => {
    const  inventoryController = new InventoryController();
    inventoryController.isThereIngredientsAvailable(req, res);
} );

router.put('/', (req, res) => {
    const  inventoryController = new InventoryController();
    inventoryController.updateInventory(req, res);
});

module.exports = router;