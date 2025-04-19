const Recipe = require('../../../../src/domain/entities/recipe');

describe('Recipe Entity', () => {
    it('should create a recipe with the provided properties', () => {
        // Arrange
        const name = 'Pasta Carbonara';
        const description = 'Clásica pasta italiana con huevo y panceta';
        const ingredients = [
            {
                idIngredient: 'pasta-001',
                measure: { quantity: 200, measureUnit: 'g' }
            },
            {
                idIngredient: 'egg-001',
                measure: { quantity: 2, measureUnit: 'units' }
            }
        ];

        // Act
        const recipe = new Recipe(name, description, ingredients);

        // Assert
        expect(recipe).toBeInstanceOf(Recipe);
        expect(recipe.name).toBe(name);
        expect(recipe.description).toBe(description);
        expect(recipe.ingredients).toBe(ingredients);
        expect(recipe.ingredients.length).toBe(2);
        expect(recipe.ingredients[0].idIngredient).toBe('pasta-001');
        expect(recipe.ingredients[1].measure.quantity).toBe(2);
    });

    it('should have undefined properties if not provided', () => {
        // Act
        const recipe = new Recipe();

        // Assert
        expect(recipe).toBeInstanceOf(Recipe);
        expect(recipe.name).toBeUndefined();
        expect(recipe.description).toBeUndefined();
        expect(recipe.ingredients).toBeUndefined();
    });

    it('should handle empty ingredients array', () => {
        // Arrange
        const name = 'Test Recipe';
        const description = 'Test Description';
        const ingredients = [];

        // Act
        const recipe = new Recipe(name, description, ingredients);

        // Assert
        expect(recipe.ingredients).toEqual([]);
        expect(recipe.ingredients.length).toBe(0);
    });
});