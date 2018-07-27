# d8restapi
Drupal 8 REST API Test

## Requisitos

- Tener instalado Docker `https://docs.docker.com/install/#server`
- Tener instalado Docker Compose `https://docs.docker.com/compose/install/`
- Tener instalado Node `https://nodejs.org/en/`

## Instalación Drupal

- Ejecutar `docker-compose up -d`
- Cargar base de datos `cat database.sql | docker exec -i MYSQL_CONTAINER mysql -ucontainer -pcontainer d8`
- La instalación de Drupal 8 está disponible en *http://localhost:8080*

*MYSQL_CONTAINER* se tiene que sustituir por el nombre del contenedor del servicio mysql. Éste se puede obtener ejecutando `docker ps`.

## Intalación Cliente

- Entrar en el directorio `vue-cli`
- Ejecutar `npm install`
- Ejecutar `npm run dev`
- El cliente está disponible en *http://localhost:8081"

## Datos Drupal

Para acceder al sitio Drupal:
    Usuario: admin
    Clave: admin
    
Para acceder al servidor web `docker exec -it WEB_CONTAINER /bin/bash` y obtener una sesión interactiva.

*WEB_CONTAINER* se tiene que sustituir por el nombre del contenedor del servicio mysql. Éste se puede obtener ejecutando `docker ps`.

## Terminar

Para terminar ejecutamos
    docker-compose kill
    docker rm WEB_CONTAINER
    docker rm MYSQL_CONTAINER
    docker volume prune
    
