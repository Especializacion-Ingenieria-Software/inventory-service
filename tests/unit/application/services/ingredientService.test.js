const IngredientService = require('../../../../src/application/services/ingredientService');
const IngredientRepository = require('../../../src/domain/repositories/ingredientRepository');

jest.mock('../../../src/domain/repositories/ingredientRepository');

describe('IngredientService', () => {
    let ingredientService;
    let mockIngredientRepository;

    beforeEach(() => {
        // Crea una nueva instancia del servicio y del mock del repositorio antes de cada prueba
        mockIngredientRepository = new IngredientRepository();
        ingredientService = new IngredientService();
        ingredientService.ingredientRepository = mockIngredientRepository; // Inyecta el mock en el servicio
    });

    it('should call getIngredientById on the repository with the correct id', async () => {
        // Define un ID de ingrediente de prueba
        const ingredientId = 'someId';

        // Configura el mock para que resuelva con un valor (simulando una búsqueda exitosa)
        mockIngredientRepository.getIngredientById.mockResolvedValue({ id: ingredientId, name: 'Test Ingredient' });

        // Llama al método del servicio
        await ingredientService.getIngredientById(ingredientId);

        // Asegura que el método del repositorio fue llamado con el ID correcto
        expect(mockIngredientRepository.getIngredientById).toHaveBeenCalledWith(ingredientId);
    });

    it('should return the ingredient when getIngredientById on the repository resolves successfully', async () => {
        // Define un ingrediente de prueba
        const expectedIngredient = { id: 'someId', name: 'Test Ingredient' };

        // Configura el mock para que resuelva con el ingrediente de prueba
        mockIngredientRepository.getIngredientById.mockResolvedValue(expectedIngredient);

        // Llama al método del servicio
        const result = await ingredientService.getIngredientById('someId');

        // Asegura que el servicio devuelve el ingrediente esperado
        expect(result).toEqual(expectedIngredient);
    });

    it('should return the error when getIngredientById on the repository rejects', async () => {
        // Define un error de prueba
        const expectedError = new Error('Ingredient not found');

        // Configura el mock para que rechace con el error de prueba
        mockIngredientRepository.getIngredientById.mockRejectedValue(expectedError);

        // Llama al método del servicio
        const result = await ingredientService.getIngredientById('someId');

        // Asegura que el servicio devuelve el error esperado
        expect(result).toEqual(expectedError);
    });

    it('should call getIngredientByName on the repository with the correct name', async () => {
        // Define un nombre de ingrediente de prueba
        const ingredientName = 'Test Ingredient';

        // Configura el mock para que resuelva con un valor
        mockIngredientRepository.getIngredientByName.mockResolvedValue({ name: ingredientName, id: 'someId' });

        // Llama al método del servicio
        await ingredientService.getIngredientByName(ingredientName);

        // Asegura que el método del repositorio fue llamado con el nombre correcto
        expect(mockIngredientRepository.getIngredientByName).toHaveBeenCalledWith(ingredientName);
    });

    it('should return the ingredient when getIngredientByName on the repository resolves successfully', async () => {
        // Define un ingrediente de prueba
        const expectedIngredient = { name: 'Test Ingredient', id: 'someId' };

        // Configura el mock para que resuelva con el ingrediente de prueba
        mockIngredientRepository.getIngredientByName.mockResolvedValue(expectedIngredient);

        // Llama al método del servicio
        const result = await ingredientService.getIngredientByName('Test Ingredient');

        // Asegura que el servicio devuelve el ingrediente esperado
        expect(result).toEqual(expectedIngredient);
    });

    it('should return the error when getIngredientByName on the repository rejects', async () => {
        // Define un error de prueba
        const expectedError = new Error('Ingredient with that name not found');

        // Configura el mock para que rechace con el error de prueba
        mockIngredientRepository.getIngredientByName.mockRejectedValue(expectedError);

        // Llama al método del servicio
        const result = await ingredientService.getIngredientByName('Test Ingredient');

        // Asegura que el servicio devuelve el error esperado
        expect(result).toEqual(expectedError);
    });
});