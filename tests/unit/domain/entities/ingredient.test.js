const Ingredient = require('../../../../src/domain/entities/ingredient');

describe('Ingredient Entity', () => {
    it('should create an ingredient with the provided properties', () => {
        // Arrange
        const name = 'Tomate';
        const description = 'Tomate rojo fresco';
        const type = 'Vegetal';

        // Act
        const ingredient = new Ingredient(name, description, type);

        // Assert
        expect(ingredient).toBeInstanceOf(Ingredient);
        expect(ingredient.name).toBe(name);
        expect(ingredient.description).toBe(description);
        expect(ingredient.type).toBe(type);
    });

    it('should have undefined properties if not provided', () => {
        // Act
        const ingredient = new Ingredient();

        // Assert
        expect(ingredient).toBeInstanceOf(Ingredient);
        expect(ingredient.name).toBeUndefined();
        expect(ingredient.description).toBeUndefined();
        expect(ingredient.type).toBeUndefined();
    });
});