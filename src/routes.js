const { Router } = require('express');
const StudentController = require('./controllers/StudentController');
const AuthenticateController = require('./controllers/AuthenticateController');
const CourseController = require('./controllers/CourseController');
const SubjectController = require('./controllers/SubjectController');

const routes = Router();

// Authenticate
routes.post('/auth', AuthenticateController.index);

// Student
routes.get('/students', StudentController.index);
routes.get('/students/:id', StudentController.show);
routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);
routes.delete('/students/:id', StudentController.destroy);

// Course

// Subject 

module.exports = routes;