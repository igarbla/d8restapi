# d8restapi
Drupal 8 REST API Test

## Instalación Drupal

- Ejecutar `docker-compose up -d`
- Cargar base de datos `cat database.sql | docker exec -i MYSQL_CONTAINER mysql -ucontainer -pcontainer d8`
- La instalación de Drupal 8 está disponible en *http://localhost:8080*

## Intalación Cliente

- Entrar en el directorio `vue-cli`
- Ejecutar `npm install`
- Ejecutar `npm run dev`
- El cliente está disponible en *http://localhost:8081"
