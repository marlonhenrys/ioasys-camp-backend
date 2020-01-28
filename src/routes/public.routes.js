const { Router } = require('express');
const authController = require('../app/controllers/AuthController');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const publicRoutes = Router();

//Swagger
publicRoutes.use('/', swaggerUi.serve);
publicRoutes.get('/', swaggerUi.setup(swaggerDocument));

// Register (Student and User)
publicRoutes.post('/register', authController.register);
// Authenticate (User)
publicRoutes.post('/login', authController.login);

module.exports = publicRoutes;