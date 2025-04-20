// tests/unit/infraestructure/persistence/mongodb.test.js

describe('MongoDB Connection', () => {
    // Guardamos el console.log original
    const originalConsoleLog = console.log;

    beforeEach(() => {
        // Reseteamos los módulos antes de cada prueba
        jest.resetModules();

        // Mockeamos console.log para evitar ruido en las pruebas
        console.log = jest.fn();
    });

    afterEach(() => {
        // Restauramos console.log después de cada prueba
        console.log = originalConsoleLog;
    });

    it('should connect to MongoDB with the correct URL', () => {
        // Mock para mongoose
        const mockConnect = jest.fn().mockReturnValue(Promise.resolve({
            connection: {
                db: {
                    databaseName: 'test-db'
                }
            }
        }));

        jest.doMock('mongoose', () => ({
            connect: mockConnect
        }));

        // Mock para el modelo Inventory
        jest.doMock('../../../../src/infraestructure/persistence/Inventory', () => ({}));

        // Importamos el módulo
        const db = require('../../../../src/infraestructure/persistence/mongodb');

        // Verificamos que connect fue llamado con la URL correcta
        expect(mockConnect).toHaveBeenCalledWith(
            'mongodb+srv://marlondavid0526:AAEbJExRT0Q8inS4@aplicationitm.05edg.mongodb.net/restaurant'
        );
    });

    it('should log connection success message', async () => {
        // Mock para mongoose con promesa resuelta
        const mockConnect = jest.fn().mockReturnValue(Promise.resolve({
            connection: {
                db: {
                    databaseName: 'test-db'
                }
            }
        }));

        jest.doMock('mongoose', () => ({
            connect: mockConnect
        }));

        // Mock para el modelo Inventory
        jest.doMock('../../../../src/infraestructure/persistence/Inventory', () => ({}));

        // Importamos el módulo
        require('../../../../src/infraestructure/persistence/mongodb');

        // Esperamos a que se resuelva la promesa
        await new Promise(process.nextTick);

        // Verificamos que se llamó a console.log con el mensaje correcto
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Connected to test-db'));
    });

    it('should log error message on connection failure', async () => {
        // Mock para mongoose con promesa rechazada
        const mockError = new Error('Connection failed');
        const mockConnect = jest.fn().mockReturnValue(Promise.reject(mockError));

        jest.doMock('mongoose', () => ({
            connect: mockConnect
        }));

        // Mock para el modelo Inventory
        jest.doMock('../../../../src/infraestructure/persistence/Inventory', () => ({}));

        // Importamos el módulo
        require('../../../../src/infraestructure/persistence/mongodb');

        // Esperamos a que se resuelva la promesa
        await new Promise(process.nextTick);

        // Verificamos que se llamó a console.log con el error
        expect(console.log).toHaveBeenCalledWith(mockError);
    });
});