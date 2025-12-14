# Dockerfile para Frontend - Angular

# Etapa 1: Build
FROM node:20-alpine AS build

WORKDIR /app

# Instalar dependencias necesarias para compilar módulos nativos
RUN apk add --no-cache python3 make g++

# Copiar package files
COPY package*.json ./

# Limpiar caché de npm e instalar dependencias
RUN npm cache clean --force && npm install --legacy-peer-deps

# Copiar código fuente
COPY . .

# Build de la aplicación
RUN npm run build

# Etapa 2: Servir con nginx
FROM nginx:alpine

# Copiar build de Angular
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

# Copiar configuración de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
