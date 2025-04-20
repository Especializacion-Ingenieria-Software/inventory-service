const InventoryRepository = require('../../../../src/domain/repositories/inventoryRepository');
const Inventory = require('../../../../src/infraestructure/persistence/Inventory');

// Mock the Mongoose model
jest.mock('../../../../src/infraestructure/persistence/Inventory', () => {
    const mockWhere = jest.fn();
    const mockIn = jest.fn();
    const mockSort = jest.fn();
    const mockExec = jest.fn();
    const mockFindByIdAndUpdate = jest.fn();

    return {
        where: mockWhere.mockReturnThis(),
        in: mockIn.mockReturnThis(),
        sort: mockSort.mockReturnThis(),
        exec: mockExec.mockResolvedValue(['mockedInventoryItem']),
        findByIdAndUpdate: mockFindByIdAndUpdate.mockReturnValue({
            exec: jest.fn().mockResolvedValue({ updated: true })
        })
    };
});

describe('InventoryRepository', () => {
    let inventoryRepository;

    beforeEach(() => {
        // Clear all mock implementations before each test
        jest.clearAllMocks();
        inventoryRepository = new InventoryRepository();
    });

    describe('getInventoryByIngredientId', () => {
        it('should call the correct Mongoose methods with proper parameters', async () => {
            // Arrange
            const ingredientId = ['ing123', 'ing456'];

            // Act
            const result = await inventoryRepository.getInventoryByIngredientId(ingredientId);

            // Assert
            expect(Inventory.where).toHaveBeenCalledWith('ingredientId');
            expect(Inventory.in).toHaveBeenCalledWith(ingredientId);
            expect(Inventory.sort).toHaveBeenCalledWith({'ingredientId': 1, 'enterDate': 1});
            expect(Inventory.exec).toHaveBeenCalled();
            expect(result).toEqual(['mockedInventoryItem']);
        });
    });

    describe('updateInventory', () => {
        it('should call findByIdAndUpdate with correct parameters', async () => {
            // Arrange
            const ingredientId = 'ing123';
            const quantity = 50;

            // Act
            const result = await inventoryRepository.updateInventory(ingredientId, quantity);

            // Assert
            expect(Inventory.findByIdAndUpdate).toHaveBeenCalledWith(
                ingredientId,
                { $set: {"quantity": quantity}},
                null
            );
            expect(result).toEqual({ updated: true });
        });
    });
});