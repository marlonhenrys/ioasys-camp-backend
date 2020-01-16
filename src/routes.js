const { Router } = require('express');
const StudentController = require('./controllers/StudentController');

const routes = Router();

// Student
routes.get('/students', StudentController.index);
routes.get('/student/:id', StudentController.show);
routes.post('/students', StudentController.store);
routes.put('/students', StudentController.update);
routes.delete('/student/:id', StudentController.destroy);

// Course


// Subject 

module.exports = routes;