const { Router } = require('express');
const authController = require('../app/controllers/AuthController');
const summary = require('../app/controllers/utils/Summary');

const publicRoutes = Router();

// Summary (Index)
publicRoutes.get('/', summary);
// Register (Student and User)
publicRoutes.post('/register', authController.register);
// Authenticate (User)
publicRoutes.post('/login', authController.login);

module.exports = publicRoutes;