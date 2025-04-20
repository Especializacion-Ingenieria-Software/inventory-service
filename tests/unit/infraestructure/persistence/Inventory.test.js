// tests/unit/infraestructure/persistence/inventory.test.js

describe('Inventory Model', () => {
    it('should export a module', () => {
        const Inventory = require('../../../../src/infraestructure/persistence/Inventory');
        expect(Inventory).toBeDefined();
    });

    // Opcional: verificar que el módulo tiene la estructura correcta
    it('should define a Mongoose model with expected schema fields', () => {
        // Mock mongoose
        jest.resetModules();

        // Crear una función spy para Schema
        const schemaSpy = jest.fn();

        // Mock del módulo mongoose
        jest.doMock('mongoose', () => ({
            Schema: schemaSpy,
            model: jest.fn().mockReturnValue({})
        }));

        // Importar el módulo para que se ejecute con nuestro mock
        require('../../../../src/infraestructure/persistence/Inventory');

        // Verificar que Schema fue llamado con un objeto
        expect(schemaSpy).toHaveBeenCalled();

        // Obtener el primer argumento de la llamada a Schema
        const schemaDefinition = schemaSpy.mock.calls[0][0];

        // Verificar que el esquema tiene los campos esperados
        expect(schemaDefinition).toHaveProperty('enterDate');
        expect(schemaDefinition).toHaveProperty('ingredientId');
        expect(schemaDefinition).toHaveProperty('measureUnit');
        expect(schemaDefinition).toHaveProperty('quantity');
    });
});