const Inventory = require('../../../../src/domain/entities/inventory');

describe('Inventory Entity', () => {
    it('should create an inventory item with the provided properties', () => {
        // Arrange
        const ingredientId = '123456';
        const quantity = 100;
        const enterDate = new Date('2025-04-15');
        const measureUnit = 'kg';

        // Act
        const inventory = new Inventory(ingredientId, quantity, enterDate, measureUnit);

        // Assert
        expect(inventory).toBeInstanceOf(Inventory);
        expect(inventory.ingredientId).toBe(ingredientId);
        expect(inventory.quantity).toBe(quantity);
        expect(inventory.enterDate).toBe(enterDate);
        expect(inventory.measureUnit).toBe(measureUnit);
    });

    it('should respect the parameter order in constructor', () => {
        // Arrange
        const ingredientId = 'tomato-123';
        const quantity = 50;
        const enterDate = new Date('2025-03-10');
        const measureUnit = 'units';

        // Act
        const inventory = new Inventory(ingredientId, quantity, enterDate, measureUnit);

        // Assert
        expect(inventory.ingredientId).toBe(ingredientId);
        expect(inventory.quantity).toBe(quantity);
        expect(inventory.enterDate).toBe(enterDate);
        expect(inventory.measureUnit).toBe(measureUnit);
    });

    it('should have undefined properties if not provided', () => {
        // Act
        const inventory = new Inventory();

        // Assert
        expect(inventory).toBeInstanceOf(Inventory);
        expect(inventory.ingredientId).toBeUndefined();
        expect(inventory.quantity).toBeUndefined();
        expect(inventory.enterDate).toBeUndefined();
        expect(inventory.measureUnit).toBeUndefined();
    });
});