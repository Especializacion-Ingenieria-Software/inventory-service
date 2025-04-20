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

