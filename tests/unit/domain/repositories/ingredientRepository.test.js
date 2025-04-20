const IngredientRepository = require('../../../../src/domain/repositories/ingredientRepository');
const Ingredient = require('../../../../src/infraestructure/persistence/Ingredient');

// Mock the Mongoose model
jest.mock('../../../../src/infraestructure/persistence/Ingredient', () => {
    const mockWhere = jest.fn();
    const mockEquals = jest.fn();
    const mockIn = jest.fn();

    return {
        where: mockWhere.mockReturnThis(),
        equals: mockEquals.mockReturnValue(Promise.resolve(['mockedIngredient'])),
        in: mockIn.mockReturnValue(Promise.resolve(['mockedIngredient']))
    };
});

describe('IngredientRepository', () => {
    let ingredientRepository;

    beforeEach(() => {
        // Clear all mock implementations before each test
        jest.clearAllMocks();
        ingredientRepository = new IngredientRepository();
    });

    describe('getIngredientByName', () => {
        it('should call the correct Mongoose methods with proper parameters', async () => {
            // Arrange
            const name = 'Tomato';

            // Act
            const result = await ingredientRepository.getIngredientByName(name);

            // Assert
            expect(Ingredient.where).toHaveBeenCalledWith('name');
            expect(Ingredient.equals).toHaveBeenCalledWith(name);
            expect(result).toEqual(['mockedIngredient']);
        });
    });

    describe('getIngredientById', () => {
        it('should call the correct Mongoose methods with proper parameters', async () => {
            // Arrange
            const ingredientId = 'ing123';

            // Act
            const result = await ingredientRepository.getIngredientById(ingredientId);

            // Assert
            expect(Ingredient.where).toHaveBeenCalledWith('ingredientId');
            expect(Ingredient.in).toHaveBeenCalledWith(ingredientId);
            expect(result).toEqual(['mockedIngredient']);
        });
    });
});