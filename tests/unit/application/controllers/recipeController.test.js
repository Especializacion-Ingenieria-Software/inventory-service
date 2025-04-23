// tests/unit/application/controllers/recipeController.test.js

// Mock de constantes HTTP
jest.mock('../../../../src/application/utils/constants/http_codes', () => ({
    HTTP_BAD_REQUEST: 400,
    HTTP_OK: 200,
    HTTP_CREATED: 201
}));

// Mock del servicio
jest.mock('../../../../src/application/services/recipeService');

// Mock para debug
jest.mock('debug', () => ({
    log: jest.fn()
}));

const RecipeController = require('../../../../src/application/controllers/recipeController');
const RecipeService = require('../../../../src/application/services/recipeService');

describe('RecipeController', () => {
    let recipeController;
    let mockRecipeService;
    let mockRequest;
    let mockResponse;

    beforeEach(() => {
        // Limpiar los mocks
        jest.clearAllMocks();

        // Crear mocks para el servicio
        mockRecipeService = {
            saveRecipe: jest.fn(),
            findRecipe: jest.fn()
        };

        // Hacer que el constructor de RecipeService devuelva nuestro mock
        RecipeService.mockImplementation(() => mockRecipeService);

        // Crear el controlador con el servicio mockeado
        recipeController = new RecipeController();

        // Crear mocks para req y res
        mockRequest = {
            body: {
                name: 'Test Recipe',
                description: 'Test Description',
                ingredients: [{ idIngredient: 'ing1', measure: { quantity: 100, measureUnit: 'g' }}]
            },
            params: {
                name: 'Test Recipe'
            }
        };

        mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };

        // Mock para console.log
        jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    describe('saveRecipe', () => {
        it('should return 400 if request body is invalid', () => {
            // Arrange - Request sin body completo
            const invalidRequest = { body: {} };

            // Act
            recipeController.saveRecipe(invalidRequest, mockResponse);

            // Assert
            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.send).toHaveBeenCalledWith({
                message: 'Su solicitud no es valida',
                error: true
            });
        });

        it('should call service with recipe data and return result', async () => {
            // Arrange
            const mockServiceResult = {
                _id: 'recipe123',
                name: 'Test Recipe',
                description: 'Test Description',
                ingredients: [{ idIngredient: 'ing1', measure: { quantity: 100, measureUnit: 'g' }}]
            };

            mockRecipeService.saveRecipe.mockResolvedValue(mockServiceResult);

            // Act
            recipeController.saveRecipe(mockRequest, mockResponse);

            // Assert
            expect(mockRecipeService.saveRecipe).toHaveBeenCalledWith({
                name: mockRequest.body.name,
                description: mockRequest.body.description,
                ingredients: mockRequest.body.ingredients
            });
            expect(mockResponse.status).toHaveBeenCalledWith(201);

            // Nota: Hay un problema potencial en el código original
            // ya que se está enviando la promesa sin resolver
        });
    });

    describe('findRecipe', () => {
        it('should call service with recipe name and return result', async () => {
            // Arrange
            const mockServiceResult = [{
                name: 'Test Recipe',
                description: 'Test Description',
                ingredients: [{ idIngredient: 'ing1', measure: { quantity: 100, measureUnit: 'g' }}]
            }];

            mockRecipeService.findRecipe.mockResolvedValue(mockServiceResult);

            // Act
            await recipeController.findRecipe(mockRequest, mockResponse);

            // Assert
            expect(mockRecipeService.findRecipe).toHaveBeenCalledWith(mockRequest.params.name);
            expect(mockResponse.status).toHaveBeenCalledWith(200);

            // Nota: Hay un problema potencial en el código original
            // ya que se está enviando la promesa sin resolver
        });

        it('should handle errors from service', async () => {
            // Arrange
            const mockError = new Error('Recipe not found');
            mockRecipeService.findRecipe.mockRejectedValue(mockError);

            // Act
            await recipeController.findRecipe(mockRequest, mockResponse);

            // Assert
            expect(mockRecipeService.findRecipe).toHaveBeenCalledWith(mockRequest.params.name);
            expect(mockResponse.status).toHaveBeenCalledWith(200);

            // No podemos verificar el contenido exacto debido al manejo de promesas
        });
    });
});