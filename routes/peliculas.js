var express = require('express');
var router = express.Router();
let peliculasController = require('../controllers/peliculasController');

// Create
router.get('/crear', peliculasController.crear);
router.post('/crear', peliculasController.crearMovie);

// Lectura
router.get('/', peliculasController.listado);

// Detalle
router.get('/:id', peliculasController.detalle);

// Actualización
router.get('/editar/:id', peliculasController.editar);
router.post('/editar/:id', peliculasController.actualizar);

// Borrado
router.post('/borrar/:id', peliculasController.borrar);

module.exports = router;