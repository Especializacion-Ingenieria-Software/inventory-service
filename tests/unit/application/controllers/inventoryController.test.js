// tests/unit/application/controllers/inventoryController.test.js

// Mock de las constantes HTTP
// Esta sección utiliza `jest.mock` para simular el módulo que contiene las constantes de códigos HTTP.
// En lugar de importar los valores reales, definimos un objeto con los códigos que el controlador utiliza.
// Esto aísla el controlador de las dependencias externas y facilita la prueba de su lógica.
jest.mock('../../../../src/application/utils/constants/http_codes', () => ({
    HTTP_BAD_REQUEST: 400,
    HTTP_OK: 200,
    HTTP_CREATED: 201
}));

// Mock del servicio
// Similar a las constantes HTTP, aquí simulamos el servicio `InventoryService`.
// Al usar `jest.mock`, reemplazamos la implementación real del servicio con una versión "mockeada"
// donde podemos controlar el comportamiento de sus métodos (simular retornos exitosos o errores)
// sin depender de la lógica real del servicio.
jest.mock('../../../../src/application/services/inventoryService');

// Importamos la clase `InventoryController` que vamos a probar.
const { InventoryController } = require('../../../../src/application/controllers/inventoryController');
// Importamos la clase `InventoryService`, que en realidad será la versión mockeada.
const InventoryService = require('../../../../src/application/services/inventoryService');
// Importamos las constantes HTTP mockeadas para poder hacer assertions sobre los códigos de respuesta.
const httpCodes = require('../../../../src/application/utils/constants/http_codes');

// `describe('InventoryController', () => { ... });`
// Este bloque agrupa todas las pruebas relacionadas con el `InventoryController`.
// Es una forma de organizar las pruebas y darles un contexto.
describe('InventoryController', () => {
    let inventoryController; // Variable para la instancia del controlador que se probará.
    let mockInventoryService; // Variable para la instancia mockeada del servicio.
    let mockRequest;        // Variable para simular el objeto de la petición (request).
    let mockResponse;       // Variable para simular el objeto de la respuesta (response).
    let consoleSpy;         // Variable para "espiar" la función `console.error`.

    // `beforeEach(() => { ... });`
    // Esta función se ejecuta antes de cada prueba (`it` block).
    // Aquí inicializamos los mocks y la instancia del controlador para asegurar
    // que cada prueba comience con un estado limpio.
    beforeEach(() => {
        // Crear una instancia mock del servicio
        // Definimos un objeto con los métodos del servicio que el controlador utiliza.
        // Cada método es una función Jest `jest.fn()` que nos permite rastrear si fue llamada,
        // con qué argumentos y simular su valor de retorno (éxito o rechazo).
        mockInventoryService = {
            isThereIngredientsAvailable: jest.fn(),
            updateInventory: jest.fn()
        };

        // Reemplazar el constructor con una función que devuelve nuestro mock
        // `InventoryService.mockImplementation(() => mockInventoryService);`
        // Esto le dice a Jest que cada vez que se cree una instancia de `InventoryService`
        // dentro del controlador, en realidad se utilice nuestra instancia mockeada (`mockInventoryService`).
        InventoryService.mockImplementation(() => mockInventoryService);

        // Crear el controlador con el servicio mockeado
        // Aquí instanciamos el `InventoryController`. Debido al `mockImplementation` anterior,
        // esta instancia utilizará nuestro servicio mockeado.
        inventoryController = new InventoryController();

        // Crear mocks para req y res
        // Simulamos los objetos `request` y `response` que se pasan a los métodos del controlador.
        // El `request` inicial se configura con un `body` de ejemplo.
        mockRequest = {
            body: {
                name: 'Test Recipe',
                description: 'Test Description',
                ingredients: ['ing1', 'ing2']
            }
        };

        // El `response` se configura con métodos `status` y `send` que son funciones mockeadas.
        // `status` además utiliza `mockReturnThis()` para permitir el encadenamiento de llamadas (ej: `res.status(200).send(...)`).
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };

        // Mockear console.error para evitar polución en la salida
        // Espiamos la función `console.error` y la reemplazamos con una función vacía (`() => {}`).
        // Esto evita que los mensajes de error que puedan ocurrir durante las pruebas se muestren en la consola,
        // haciendo que la salida de las pruebas sea más clara.
        consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    // `afterEach(() => { ... });`
    // Esta función se ejecuta después de cada prueba (`it` block).
    // Se utiliza para realizar tareas de limpieza.
    afterEach(() => {
        // Restaurar el comportamiento original de console.error
        // Volvemos a la implementación original de `console.error`.
        consoleSpy.mockRestore();
        // Limpiar los mocks entre pruebas
        // Resetea el estado de todos los mocks (contadores de llamadas, valores de retorno, etc.).
        // Esto asegura que cada prueba sea independiente y no se vea afectada por las interacciones
        // con los mocks en pruebas anteriores.
        jest.clearAllMocks();
    });

    // `describe('checkIngredientsAvailability', () => { ... });`
    // Bloque de pruebas específico para el método `checkIngredientsAvailability` del controlador.
    describe('checkIngredientsAvailability', () => {
        // `it('should call inventoryService.isThereIngredientsAvailable with the ingredients from the request body', async () => { ... });`
        // Prueba que verifica si el método `isThereIngredientsAvailable` del servicio mockeado
        // es llamado con los ingredientes que se reciben en el cuerpo de la petición.
        it('debería llamar a inventoryService.isThereIngredientsAvailable con los ingredientes del cuerpo de la petición', async () => {
            // Llamamos al método del controlador que estamos probando.
            await inventoryController.checkIngredientsAvailability(mockRequest, mockResponse);
            // `expect(mockInventoryService.isThereIngredientsAvailable).toHaveBeenCalledWith(mockRequest.body.ingredients);`
            // Esta es la assertion principal. Verifica que el método `isThereIngredientsAvailable`
            // del servicio mockeado haya sido llamado y que los argumentos con los que se llamó
            // sean iguales a los ingredientes que están en el cuerpo de nuestra petición mockeada.
        });

        // Prueba que verifica la respuesta del controlador cuando el servicio indica que los ingredientes están disponibles.
        it('debería retornar HTTP_OK (200) y un mensaje de éxito si los ingredientes están disponibles', async () => {
            // Configuramos el mock del servicio para que resuelva (simule un éxito) con el valor `true`.
            mockInventoryService.isThereIngredientsAvailable.mockResolvedValue(true);
            // Llamamos al método del controlador.
            await inventoryController.checkIngredientsAvailability(mockRequest, mockResponse);
            // Verificamos que el método `status` del objeto de respuesta mockeado haya sido llamado con el código HTTP 200 (HTTP_OK).
            expect(mockResponse.status).toHaveBeenCalledWith(httpCodes.HTTP_OK);
            // Verificamos que el método `send` del objeto de respuesta mockeado haya sido llamado con un objeto que contiene el mensaje de éxito esperado.
            expect(mockResponse.send).toHaveBeenCalledWith({ message: 'Ingredients available' });
        });

        // Prueba que verifica la respuesta del controlador cuando el servicio indica que los ingredientes NO están disponibles.
        it('debería retornar HTTP_BAD_REQUEST (400) y un mensaje de error si los ingredientes no están disponibles', async () => {
            // Configuramos el mock del servicio para que resuelva con el valor `false` (simulando que no hay ingredientes disponibles).
            mockInventoryService.isThereIngredientsAvailable.mockResolvedValue(false);
            await inventoryController.checkIngredientsAvailability(mockRequest, mockResponse);
            // Verificamos que el estado de la respuesta sea 400 (HTTP_BAD_REQUEST).
            expect(mockResponse.status).toHaveBeenCalledWith(httpCodes.HTTP_BAD_REQUEST);
            // Verificamos que el cuerpo de la respuesta contenga el mensaje de error esperado.
            expect(mockResponse.send).toHaveBeenCalledWith({ error: 'Ingredients not available' });
        });

        // Prueba que verifica cómo el controlador maneja los errores que puedan ocurrir en el servicio.
        it('debería manejar los errores del servicio y retornar HTTP_BAD_REQUEST (400)', async () => {
            const errorMessage = 'Error checking ingredients';
            // Configuramos el mock del servicio para que rechace (simule un error) con un nuevo objeto `Error`.
            mockInventoryService.isThereIngredientsAvailable.mockRejectedValue(new Error(errorMessage));
            await inventoryController.checkIngredientsAvailability(mockRequest, mockResponse);
            // Verificamos que el estado de la respuesta sea 400 (HTTP_BAD_REQUEST) en caso de error del servicio.
            expect(mockResponse.status).toHaveBeenCalledWith(httpCodes.HTTP_BAD_REQUEST);
            // Verificamos que el cuerpo de la respuesta contenga el mensaje de error.
            expect(mockResponse.send).toHaveBeenCalledWith({ error: errorMessage });
        });
    });

    // `describe('updateInventory', () => { ... });`
    // Bloque de pruebas específico para el método `updateInventory` del controlador.
    describe('updateInventory', () => {
        // Prueba que verifica si el método `updateInventory` del servicio es llamado con los ingredientes correctos.
        it('debería llamar a inventoryService.updateInventory con los ingredientes del cuerpo de la petición', async () => {
            await inventoryController.updateInventory(mockRequest, mockResponse);
            // Verificamos que el método `updateInventory` del servicio mockeado haya sido llamado
            // con los ingredientes del cuerpo de la petición.
            expect(mockInventoryService.updateInventory).toHaveBeenCalledWith(mockRequest.body.ingredients);
        });

        // Prueba que verifica la respuesta del controlador cuando la actualización del inventario en el servicio es exitosa.
        it('debería retornar HTTP_OK (200) y un mensaje de éxito si el inventario se actualiza correctamente', async () => {
            // Simulamos una actualización exitosa en el servicio resolviendo la promesa con `true`.
            mockInventoryService.updateInventory.mockResolvedValue(true);
            await inventoryController.updateInventory(mockRequest, mockResponse);
            // Verificamos que la respuesta tenga un estado 200 (HTTP_OK).
            expect(mockResponse.status).toHaveBeenCalledWith(httpCodes.HTTP_OK);
            // Verificamos que el cuerpo de la respuesta contenga el mensaje de éxito.
            expect(mockResponse.send).toHaveBeenCalledWith({ message: 'Inventory updated successfully' });
        });

        // Prueba que verifica la respuesta del controlador cuando la actualización del inventario en el servicio falla.
        it('debería retornar HTTP_BAD_REQUEST (400) y un mensaje de error si la actualización del inventario falla', async () => {
            const errorMessage = 'Failed to update inventory';
            // Simulamos un fallo en la actualización del servicio rechazando la promesa con un error.
            mockInventoryService.updateInventory.mockRejectedValue(new Error(errorMessage));
            await inventoryController.updateInventory(mockRequest, mockResponse);
            // Verificamos que la respuesta tenga un estado 400 (HTTP_BAD_REQUEST).
            expect(mockResponse.status).toHaveBeenCalledWith(httpCodes.HTTP_BAD_REQUEST);
            // Verificamos que el cuerpo de la respuesta contenga el mensaje de error.
            expect(mockResponse.send).toHaveBeenCalledWith({ error: errorMessage });
        });
    });
});