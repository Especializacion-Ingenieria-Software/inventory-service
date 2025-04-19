const RecipeRepository = require('../../../../src/domain/repositories/recipeRepository');
const Recipe = require('../../../../src/infraestructure/persistence/Recipe');

// Mock console.log to avoid noise in tests
jest.spyOn(console, 'log').mockImplementation(() => {});

// Mock the Mongoose model
jest.mock('../../../../src/infraestructure/persistence/Recipe', () => {
    // Mock for save method
    const mockSave = jest.fn().mockResolvedValue({ _id: 'mockId', saved: true });

    // Mock for the Recipe constructor
    function MockRecipe(data) {
        this.name = data.name;
        this.description = data.description;
        this.ingredients = data.ingredients;
        this.save = mockSave;
        return this;
    }

    // Add static methods
    MockRecipe.where = jest.fn().mockReturnValue({
        equals: jest.fn().mockResolvedValue([{ name: 'Mock Recipe' }])
    });

    return MockRecipe;
});

describe('RecipeRepository', () => {
    let recipeRepository;

    beforeEach(() => {
        jest.clearAllMocks();
        recipeRepository = new RecipeRepository();
    });

    describe('saveRecipe', () => {
        it('should create a new Recipe model with correct data and save it', async () => {
            // Arrange
            const recipeData = {
                name: 'Test Recipe',
                description: 'Test Description',
                ingredients: [
                    { idIngredient: 'ing123', measure: { quantity: 100, measureUnit: 'g' } }
                ]
            };

            // Act
            const result = await recipeRepository.saveRecipe(recipeData);

            // Assert
            expect(result).toEqual({ _id: 'mockId', saved: true });
        });

        it('should handle errors when saving fails', async () => {
            // Arrange
            const recipeData = {
                name: 'Failed Recipe',
                description: 'Fails to save',
                ingredients: []
            };

            // Sobreescribir la implementación del mock para este test específico
            // No usamos spyOn en el prototipo ya que fallaba
            const originalSave = Recipe.prototype.save;
            Recipe.prototype.save = jest.fn().mockRejectedValueOnce(new Error('Save error'));

            // Act
            await recipeRepository.saveRecipe(recipeData);

            // Assert
            expect(console.log).toHaveBeenCalled();

            // Restaurar la implementación original
            Recipe.prototype.save = originalSave;
        });
    });

    describe('findRecipeByName', () => {
        it('should call the correct Mongoose methods with proper parameters', async () => {
            // Arrange
            const recipeName = 'Pizza';
            const whereSpy = jest.spyOn(Recipe, 'where');

            // Act
            const result = await recipeRepository.findRecipeByName(recipeName);

            // Assert
            expect(whereSpy).toHaveBeenCalledWith('name');
            expect(result).toEqual([{ name: 'Mock Recipe' }]);
        });
    });
});