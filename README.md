# ServicioInventario

## Visión General

El **ServicioInventario** es un microservicio responsable de gestionar el inventario de ingredientes en la cocina de un restaurante. Asegura que el stock disponible de ingredientes sea suficiente para cumplir con los pedidos y actualiza los niveles de inventario cuando se utilizan o reponen los artículos.

Este servicio sigue un patrón de arquitectura hexagonal (puertos y adaptadores), separando claramente la lógica de dominio de las preocupaciones de infraestructura, haciéndolo más mantenible y testeable.

## Características

- **Validación de Inventario**: Verifica si los ingredientes requeridos están disponibles para las recetas
- **Actualizaciones de Stock**: Actualiza los niveles de inventario cuando se utilizan ingredientes
- **Gestión de Recetas**: Permite crear y recuperar recetas con sus ingredientes
- **API RESTful**: Proporciona endpoints para operaciones de inventario y recetas

## Arquitectura

El servicio sigue una **Arquitectura Hexagonal** (también conocida como Puertos y Adaptadores) con una clara separación de responsabilidades:

### Capas

#### Capa de Dominio

Contiene entidades de negocio e interfaces de repositorio:

- **Entidades**: `Ingredient`, `Inventory`, `Recipe`
- **Repositorios**: `InventoryRepository`, `RecipeRepository`, `IngredientRepository`

#### Capa de Aplicación

Contiene implementaciones de casos de uso:

- **Servicios**: `InventoryService`, `RecipeService`, `IngredientService`
- **Controladores**: `InventoryController`, `RecipeController`

#### Capa de Infraestructura

Contiene detalles de implementación:

- **Persistencia**: Integración con MongoDB, esquemas de Mongoose

## Endpoints de la API

### Endpoints de Recetas

#### Obtener Receta por Nombre

- **GET /recipe/:name**
- **Descripción**: Recupera una receta por su nombre  
- **Respuesta**: Detalles de la receta (nombre, descripción, ingredientes)

**Ejemplo**:

```bash
curl http://localhost:3000/recipe/Arroz%20con%20Huevo
```
```json
{
  "success": true,
  "data": [
    {
      "name": "Arroz con Huevo",
      "description": "El desembale",
      "ingredients": [
        {
          "idIngredient": "No existe aún",
          "measure": {
            "quantity": 55,
            "measureUnit": "Galon"
          }
        }
      ]
    }
  ]
}
```

#### Crear Receta

- **POST /recipe**
- **Descripción**:  Crea una nueva receta
- **Cuerpo de la Solicitud**:JSON que contiene detalles de la receta
- **Respuesta**: Mensaje de éxito con la receta creada
```bash
curl -X POST http://localhost:3000/recipe \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pasta Carbonara",
    "description": "Clásico italiano con huevos y tocino",
    "ingredients": [
      {
        "idIngredient": "pasta-001",
        "measure": {
          "quantity": 200,
          "measureUnit": "g"
        }
      }
    ]
  }'
```

### Endpoints de Inventarios

#### Verificar Disponibilidad de Ingredientes

- **POST /inventory/availability**
- **Descripción**:Verifica si los ingredientes están disponibles para una receta
- **Cuerpo de la Solicitud**: JSON que contiene receta con ingredientes
- **Respuesta**: Estado de disponibilidad de los ingredientes
```bash
curl -X POST http://localhost:3000/inventory/availability \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pasta Carbonara",
    "description": "Plato italiano",
    "ingredients": ["pasta-001", "egg-001"]
  }'

```


#### Actualizar inventario

- **PUT /inventory**
- **Descripción**:Actualiza los niveles de inventario para los ingredientes
- **Cuerpo de la Solicitud**:JSON que contiene ingredientes con cantidades actualizadas
- **Respuesta**:Mensaje de éxito

```bash
curl -X PUT http://localhost:3000/inventory \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Actualización de Stock",
    "description": "Reposición semanal",
    "ingredients": [
      {
        "id": "pasta-001",
        "pasta-001": {
          "quantity": 500,
          "measureUnit": "g"
        }
      }
    ]
  }'
```



### Tecnologías

   - **Entorno de ejecución: Node.js**
   
   - **Framework: Express**
   
   - **Base de datos: MongoDB Atlas**
   
   - **ODM: Mongoose**
   
   - **Pruebas: Jest**
   
   - **Contenedorización: Docker**



### Estructura del proyecto

```bash
inventory-service/
├── bin/
│   └── www                  # Punto de entrada de la aplicación
├── routes/                  # Rutas de Express
│   ├── index.js
│   ├── users.js
│   ├── inventory.js
│   └── recipeRoute.js
├── src/
│   ├── application/         # Capa de aplicación
│   │   ├── controllers/
│   │   ├── services/
│   │   └── utils/
│   ├── domain/              # Capa de dominio
│   │   ├── entities/
│   │   └── repositories/
│   └── infraestructure/
│       └── persistence/
├── public/
├── tests/
│   ├── unit/
│   └── integration/
├── app.js
├── package.json
└── Dockerfile

```                      
### Configuración e Instalación
#### Prerrequisitos
- **Node.js 16.x o superior**
- **npm 7.x o superior**
- **Cuenta de MongoDB Atlas (o instancia local de MongoDB)**


#### Instalación


1. Clonar el repositorio:
   ```bash
   git clone https://github.com/yourusername/inventory-service.git
   cd inventory-service
   ```
2. Instalar dependencias
```bash
   npm install
   ```
3. Iniciar Aplicación: El servidor se ejecutará en http://localhost:3000 por defecto.
```bash
  npm start
   ```

### Configuración de Docker
Construir y ejecutar el contenedor Docker:
```bash
   docker-compose up -d
   ```

Detener el contenedor:
```bash
   docker-compose down
   ```
#### Archivos de Configuración
El proyecto incluye un *Dockerfile* y *docker-compose.yml* para contenedorización:

```Dockerfile
#Imagen de base
FROM node:22.14-alpine3.20

#Directorio de la app
WORKDIR /usr/src/app

# Dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el codigo fuente de la aplicacion
COPY . .

# Exponer puerto

EXPOSE 3000

# Comando para ejecutar Node
CMD ["npm", "start"]


LABEL authors="PPMAR"

```
**yaml**
```Dockerfile
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: inventory-service
    restart: always
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
      # Usa la URL de conexión a tu MongoDB Atlas existente
      - MONGODB_URI=mongodb+srv://marlondavid0526:AAEbJExRT0Q8inS4@aplicationitm.05edg.mongodb.net/restaurant

```

## Pruebas
El proyecto incluye pruebas unitarias completas para todos los componentes:

### Ejecutando Pruebas
```bash
npm install --save-dev jest supertest mongoose-mock mongodb-memory-server
npx jest tests\\unit\\domain\\entities\\ingredient.test.js

# Ejecutar todas las pruebas
npm test

# Ejecutar pruebas con informe de cobertura
npm test -- --coverage o
npm test -- --verbose


# Ejecutar un archivo de prueba específico
npx jest tests\\unit\\domain\\entities\\ingredient.test.js

``` 

### Estructura de Pruebas
Las pruebas están organizadas para reflejar la estructura de la aplicación:

```bash
tests/
├── unit/
│   ├── application/
│   │   ├── controllers/    # Pruebas de controladores
│   │   └── services/       # Pruebas de servicios
│   ├── domain/
│   │   ├── entities/       # Pruebas de entidades
│   │   └── repositories/   # Pruebas de repositorios
│   └── infraestructure/
│       └── persistence/    # Pruebas de base de datos
└── integration/            # Pruebas de extremo a extremo
```

## Problemas Conocidos y Mejoras Futuras
1. El método updateInventory en el InventoryController tiene un problema de llamada recursiva que debería solucionarse:
```bash
// Actual (problemático)
   let response = this.updateInventory(req.body)

// Debería ser
let response = this.inventoryService.updateInventory(req.body)
```
2. El manejo de promesas en los controladores podría mejorarse para esperar correctamente las respuestas:

```bash
// Actual
return res.status(HTTP_CREATED).send(result);

// Mejor enfoque
this.service.method()
  .then(data => res.status(HTTP_CREATED).send(data))
  .catch(err => res.status(HTTP_BAD_REQUEST).send(err));
```

## Contribuyentes
- Desarrollado como parte del curso de Construcción de Software

## Licencia
Este proyecto está licenciado bajo la Licencia MIT - consulte el archivo LICENSE para más detalles.