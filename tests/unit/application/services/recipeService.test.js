// tests/unit/application/services/recipeService.test.js

const RecipeService = require('../../../../src/application/services/recipeService');
const RecipeRepository = require('../../../../src/domain/repositories/recipeRepository');
const Recipe = require('../../../../src/domain/entities/recipe');

// Mock de dependencias
jest.mock('../../../../src/domain/repositories/recipeRepository');
jest.mock('../../../../src/domain/entities/recipe');

describe('RecipeService', () => {
    let recipeService;
    let mockRepository;

    beforeEach(() => {
        jest.clearAllMocks();

        // Mock para Recipe constructor
        Recipe.mockImplementation((name, description, ingredients) => ({
            name,
            description,
            ingredients
        }));

        // Mock para el repositorio
        mockRepository = {
            saveRecipe: jest.fn(),
            findRecipeByName: jest.fn()
        };

        // Hacer que el constructor del repositorio devuelva nuestro mock
        RecipeRepository.mockImplementation(() => mockRepository);

        // Crear el servicio con el repositorio mockeado
        recipeService = new RecipeService();

        // Mock para console.log para evitar ruido
        jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    describe('saveRecipe', () => {
        it('should call repository.saveRecipe with the provided recipe', async () => {
            // Arrange
            const mockRecipe = {
                name: 'Test Recipe',
                description: 'Test Description',
                ingredients: [{ idIngredient: 'ing1', measure: { quantity: 100, measureUnit: 'g' }}]
            };

            mockRepository.saveRecipe.mockResolvedValue({ ...mockRecipe, _id: 'recipe123' });

            // Act
            const result = await recipeService.saveRecipe(mockRecipe);

            // Assert
            expect(mockRepository.saveRecipe).toHaveBeenCalledWith(mockRecipe);
            expect(result).toEqual({ ...mockRecipe, _id: 'recipe123' });
        });
    });

    describe('findRecipe', () => {
        it('should return mapped recipes when repository call succeeds', async () => {
            // Arrange
            const recipeName = 'Pizza';
            const mockRepositoryResults = [
                {
                    name: 'Pizza',
                    description: 'Delicious pizza',
                    ingredients: [{ idIngredient: 'cheese', measure: { quantity: 200, measureUnit: 'g' }}]
                }
            ];

            mockRepository.findRecipeByName.mockResolvedValue(mockRepositoryResults);

            // Act
            const result = await recipeService.findRecipe(recipeName);

            // Assert
            expect(mockRepository.findRecipeByName).toHaveBeenCalledWith(recipeName);
            expect(Recipe).toHaveBeenCalledWith(
                mockRepositoryResults[0].name,
                mockRepositoryResults[0].description,
                mockRepositoryResults[0].ingredients
            );
            expect(result.length).toBe(1);
            expect(result[0].name).toBe('Pizza');
        });

        it('should handle errors when repository call fails', async () => {
            // Arrange
            const recipeName = 'NonExistentRecipe';
            const mockError = new Error('Recipe not found');

            mockRepository.findRecipeByName.mockRejectedValue(mockError);

            // Act
            const result = await recipeService.findRecipe(recipeName);

            // Assert
            expect(mockRepository.findRecipeByName).toHaveBeenCalledWith(recipeName);
            expect(console.log).toHaveBeenCalled();
            expect(result).toEqual({ error: true, message: mockError.message });
        });

        it('should handle empty results array', async () => {
            // Arrange
            const recipeName = 'EmptyResult';
            mockRepository.findRecipeByName.mockResolvedValue([]);

            // Act
            const result = await recipeService.findRecipe(recipeName);

            // Assert
            expect(result).toEqual([]);
            expect(result.length).toBe(0);
        });
    });
});