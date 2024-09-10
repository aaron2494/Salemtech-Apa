### Dockerfile
  
    # Paso 1: Utiliza una imagen base con Node
    FROM node:21-bookworm as builder
    
    # Paso 2: Establece el directorio de trabajo en /app
    WORKDIR /app
    
    # Paso 3: Copia package.json y package-lock.json (si existe)
    COPY package*.json ./
    
    # Paso 4: Instala las dependencias del proyecto
    RUN npm install
    
    # Paso 5: Copia los archivos del proyecto en el directorio /app
    COPY . .
    
    # Paso 6: Ejecuta la construcción del proyecto
    RUN npm run build --prod
    
    # Paso 7: Cambia la propiedad de los archivos del directorio donde se hizo el build
    RUN chown -R node:node /app/dist
    
    # Paso 8: Usa una imagen de Nginx para servir la aplicación
    FROM nginxinc/nginx-unprivileged:bookworm-perl
    
    # Paso 9: Copia el archivo de configuración personalizado de Nginx
    COPY nginx.conf /etc/nginx/conf.d/default.conf
    
   # Paso 10: Copia los archivos del build a la carpeta HTML de Nginx
   COPY --from=builder /app/dist/salemtech/browser /usr/share/nginx/html 
    
    # Paso 11: Expone el puerto 8080
    EXPOSE 8080
    
    # Paso 12: Cambia el usuario a 'nginx' antes de iniciar el servidor
    USER nginx
    
    # Paso 13: Inicia Nginx y sirve la aplicación
    CMD ["nginx", "-g", "daemon off;"]