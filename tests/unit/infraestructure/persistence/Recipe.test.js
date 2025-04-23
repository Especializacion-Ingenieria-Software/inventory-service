// tests/unit/infraestructure/persistence/recipe.test.js

describe('Recipe Model', () => {
    it('should export a module', () => {
        const Recipe = require('../../../../src/infraestructure/persistence/Recipe');
        expect(Recipe).toBeDefined();
    });

    it('should define a Mongoose model with expected schema structure', () => {
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
        require('../../../../src/infraestructure/persistence/Recipe');

        // Verificar que Schema fue llamado
        expect(schemaSpy).toHaveBeenCalled();

        // Obtener el primer argumento de la llamada a Schema
        const schemaDefinition = schemaSpy.mock.calls[0][0];

        // Verificar que el esquema tiene los campos básicos esperados
        expect(schemaDefinition).toHaveProperty('name');
        expect(schemaDefinition).toHaveProperty('description');
        expect(schemaDefinition).toHaveProperty('ingredients');

        // Verificar que ingredients es un array
        expect(Array.isArray(schemaDefinition.ingredients)).toBe(true);

        // Verificar la estructura de un ingrediente en el array
        const ingredientSchema = schemaDefinition.ingredients[0];
        expect(ingredientSchema).toHaveProperty('idIngredient');
        expect(ingredientSchema).toHaveProperty('measure');

        // Verificar la estructura anidada de measure
        expect(ingredientSchema.measure).toHaveProperty('quantity');
        expect(ingredientSchema.measure).toHaveProperty('measureUnit');
    });
});