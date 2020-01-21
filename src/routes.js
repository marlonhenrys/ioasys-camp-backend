const { Router } = require('express');
const authMiddleware = require('./middlewares/auth');
const StudentController = require('./controllers/StudentController');
const AuthController = require('./controllers/AuthController');
const CourseController = require('./controllers/CourseController');
const SubjectController = require('./controllers/SubjectController');

const routes = Router();

const indexApp = async (request, response) => {
    return response.send('ioasys CAMP 2020 | API education app is running...')
};

// PUBLIC ROUTES

// Index
routes.get('/', indexApp);

// Student Register
routes.post('/students', StudentController.store);

// User Authenticate
routes.post('/authenticate', AuthController.index);

// PRIVATE ROUTES 
// routes.use(authMiddleware);

// Student 
routes.get('/students', StudentController.index);
routes.get('/students/:id', StudentController.show);
routes.put('/students/:id', StudentController.update);
routes.delete('/students/:id', StudentController.destroy);

// Course
routes.get('/courses', CourseController.index);

// Subject 
routes.get('/subjects', SubjectController.index);

module.exports = routes;