## Descripción

Este es un proyecto hecho con [Nest](https://github.com/nestjs/nest) framework. Es una API que consume la información de DynamoDB y le devuelve por medio de sus endpoints.

### Configuración previa de la ejecución

Se debe reemplazar el nombre del archivo `.env.example` por `.env`.

Luego se debe agregar los valores correspondientes a las variables dentro este archivo para su correcto funcionamiento.

### Ejecución con Docker

Una vez hecho todo lo anterior ejecutamos el siguiente comando en una terminal que esté ubicada en la raíz del proyecto para construir la Image del proyecto:

```bash
$ docker build -t spacex-api .
```

Una vez finalizado este proceso, se debe correr el siguiente comando para crear un contenedor que corra la Image de Docker:

```bash
$ docker run -d -p 3000:3000 spacex-api
```

### Ejecución manual sin Docker

Primero debe asegurarse de tener instalado en su máquina **Node en su versión 20** para que no haya problema en los siguientes pasos.

Se hace el siguiente comando para instalar todas las dependencias que necesitamos para su funcionamiento:

```bash
$ npm install
```

Luego se debe ejecutar el siguiente comando para ejecutar en desarrollo:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

Para ejecutar el ambiente de production se ejecutan los siguientes comandos:

```bash
# Para compilar la aplicación
$ npm run build

# Para ejecutar ya la aplicación compilada
$ npm run start:prod
```

### Verificar su Ejecución

Para verificar si está funcionando de manera correcta debe ir a http://localhost:3000/api y se abrirá una vista de Swagger para probrar los endpoints.