#Versión de node a usar
FROM node:20-alpine

#Directorio donde vamos a tener nuestro proyecto
WORKDIR /usr/src/app

#Se copian los package en el directorio
COPY package*.json ./

#Se actualiza npm y se instalan los paquetes
RUN npm install -g npm@latest && npm install

#Se copia el resto de los archivos
COPY . .

#Se copia el .env
COPY .env .env

#Se hace un build de la aplicación
RUN npm run build

#Este es el puerto que se va a exponer
EXPOSE 3000

#Se ejecuta el comando que levanta la aplicación
CMD ["npm", "run", "start:prod"]