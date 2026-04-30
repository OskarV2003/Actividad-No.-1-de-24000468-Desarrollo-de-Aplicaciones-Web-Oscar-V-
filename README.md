# Backend To-Do con Node.js y Express

## Descripción

Este proyecto consiste en un backend que permite gestionar tareas y metas,
utilizando Node.js y Express.

## Características

- Agregar tareas y metas
- Eliminar tareas y metas
- Consultar tareas y metas
- Uso de middleware con API Key para autorización
- Datos almacenados en memoria (no persistentes)

## Endpoints

### GET
- /getTasks
- /getGoals

### POST
- /addTask
- /addGoal

### DELETE
- /removeTask
- /removeGoal

## Seguridad

Se implementa un middleware que verifica el header:

Authorization: mi_api_key_123

## Notas

- Los datos se almacenan en arreglos.
- Al reiniciar el servidor, los datos se pierden.

## Posibles mejoras

- Implementar base de datos
- Autenticación con JWT
- Validaciones más robustas
- Interfaz frontend
