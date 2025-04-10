class Inventory {

    ingredientId;
    quantity;
    enterDate;
    measureUnit;

    constructor(ingredientId, quantity, enterDate, measureUnit) {
        this.ingredientId = ingredientId;
        this.quantity = quantity;
        this.measureUnit = measureUnit;
        this.enterDate = enterDate;
    }

}

module.exports = Inventory;