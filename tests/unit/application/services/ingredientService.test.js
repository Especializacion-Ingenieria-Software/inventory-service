// tests/unit/application/services/ingredientService.test.js

const IngredientService = require('../../../../src/application/services/ingredientService');
const IngredientRepository = require('../../../../src/domain/repositories/ingredientRepository');

// Mock del repositorio
jest.mock('../../../../src/domain/repositories/ingredientRepository');

describe('IngredientService', () => {
    let ingredientService;
    let mockRepository;

    beforeEach(() => {
        // Limpiar mocks entre pruebas
        jest.clearAllMocks();

        // Crear un mock con métodos simulados
        mockRepository = {
            getIngredientById: jest.fn(),
            getIngredientByName: jest.fn()
        };

        // Hacer que el constructor del repositorio devuelva nuestro mock
        IngredientRepository.mockImplementation(() => mockRepository);

        // Crear el servicio con el repositorio mockeado
        ingredientService = new IngredientService();
    });

    describe('getIngredientById', () => {
        it('should call repository.getIngredientById with correct parameters', async () => {
            // Arrange
            const ingredientId = 'ing123';
            const mockIngredient = { id: ingredientId, name: 'Test Ingredient' };
            mockRepository.getIngredientById.mockResolvedValue(mockIngredient);

            // Act
            await ingredientService.getIngredientById(ingredientId);

            // Assert
            expect(mockRepository.getIngredientById).toHaveBeenCalledWith(ingredientId);
        });

        it('should handle promise resolution correctly', async () => {
            // Arrange
            const ingredientId = 'ing123';
            const mockIngredient = { id: ingredientId, name: 'Test Ingredient' };

            // Configuración correcta del mock para simular una promesa con then y catch
            const mockPromise = {
                then: jest.fn().mockImplementation(callback => {
                    callback(mockIngredient);
                    return {
                        catch: jest.fn().mockReturnValue(mockIngredient)
                    };
                })
            };
            mockRepository.getIngredientById.mockReturnValue(mockPromise);

            // Act
            const result = await ingredientService.getIngredientById(ingredientId);

            // Assert
            expect(result).toEqual(mockIngredient);
        });
    });

    describe('getIngredientByName', () => {
        it('should call repository.getIngredientByName with correct parameters', async () => {
            // Arrange
            const ingredientName = 'Tomato';
            const mockIngredient = { name: ingredientName };
            mockRepository.getIngredientByName.mockResolvedValue(mockIngredient);

            // Act
            await ingredientService.getIngredientByName(ingredientName);

            // Assert
            expect(mockRepository.getIngredientByName).toHaveBeenCalledWith(ingredientName);
        });

        it('should handle promise resolution correctly', async () => {
            // Arrange
            const ingredientName = 'Tomato';
            const mockIngredient = { name: ingredientName };

            // Configuración correcta del mock para simular una promesa con then y catch
            const mockPromise = {
                then: jest.fn().mockImplementation(callback => {
                    callback(mockIngredient);
                    return {
                        catch: jest.fn().mockReturnValue(mockIngredient)
                    };
                })
            };
            mockRepository.getIngredientByName.mockReturnValue(mockPromise);

            // Act
            const result = await ingredientService.getIngredientByName(ingredientName);

            // Assert
            expect(result).toEqual(mockIngredient);
        });
    });
});