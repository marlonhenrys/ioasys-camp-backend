const { Router } = require('express');
const summary = require('./app/controllers/utils/Summary');
const authMiddleware = require('./app/middlewares/auth');
const studentController = require('./app/controllers/StudentController');
const authController = require('./app/controllers/AuthController');
const courseController = require('./app/controllers/CourseController');
const subjectController = require('./app/controllers/SubjectController');

const routes = Router();

// --------------- PUBLIC ROUTES ---------------

// Summary (Index)
routes.get('/', summary);

// Register (Student and User)
routes.post('/register', authController.register);

// Authenticate (User)
routes.post('/login', authController.login);


// --------------- PRIVATE ROUTES ---------------

// Route Protection (JWT)
// routes.use(authMiddleware);

// Student CRUD
routes.get('/students', studentController.index);
routes.get('/students/:id', studentController.show);
routes.put('/students', studentController.update);
routes.delete('/students', studentController.destroy);

// Course CRUD
routes.get('/courses', courseController.index);

// Subject CRUD
routes.get('/subjects', subjectController.index);

module.exports = routes;