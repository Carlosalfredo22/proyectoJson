# Usar una imagen oficial de Node.js ligera
FROM node:18-alpine

# Crear directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias de producción/desarrollo
RUN npm install

# Copiar el resto del código del proyecto
COPY . .

# Exponer el puerto en el que corre Express
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "app.js"]