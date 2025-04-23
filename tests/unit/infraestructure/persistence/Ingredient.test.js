// tests/unit/infraestructure/persistence/Ingredient.test.js

describe('Ingredient Model', () => {
    let mongoose;
    let Ingredient;

    beforeEach(() => {
        // Mockear mongoose antes de cada prueba
        jest.resetModules();

        // Crear el mock de mongoose
        mongoose = {
            Schema: jest.fn(),
            model: jest.fn().mockReturnValue('mocked model')
        };

        // Establecer el mock para que sea utilizado por el módulo
        jest.doMock('mongoose', () => mongoose);

        // Importar el módulo después de mockear
        Ingredient = require('../../../../src/infraestructure/persistence/Ingredient');
    });

    it('should define schema with correct fields', () => {
        // Verificar que Schema fue llamado (podría estar llamándose con argumentos diferentes)
        expect(mongoose.Schema).toHaveBeenCalled();

        // Obtener los argumentos de la llamada
        const schemaArgs = mongoose.Schema.mock.calls[0][0];

        // Verificar que el esquema tiene los campos correctos
        expect(schemaArgs).toHaveProperty('description');
        expect(schemaArgs).toHaveProperty('name');
        expect(schemaArgs).toHaveProperty('type');
    });

    it('should export the model created by mongoose', () => {
        // Verificar que el módulo exporta el valor devuelto por mongoose.model
        expect(Ingredient).toBe('mocked model');
    });
});