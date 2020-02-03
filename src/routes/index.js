const { Router } = require('express');

const routes = Router();

// Public Routes
routes.use(require('./public.routes'));
routes.use(require('./course.routes'));
routes.use(require('./subject.routes'));

// Route Protection (JWT)
routes.use(require('../app/middlewares/auth'));

// Private Routes
routes.use(require('./student.routes'));
routes.use(require('./helper.routes'));
routes.use(require('./solicitation.routes'));
routes.use(require('./helprequest.routes'));

module.exports = routes;