const { Router } = require('express');

const routes = Router();

// Public Routes
routes.use(require('./public.routes'));

// Route Protection (JWT)
routes.use(require('../app/middlewares/auth'));

// Private Routes
routes.use(require('./course.routes'));
routes.use(require('./subject.routes'));
routes.use(require('./student.routes'));
routes.use(require('./helper-list.routes'));

module.exports = routes;