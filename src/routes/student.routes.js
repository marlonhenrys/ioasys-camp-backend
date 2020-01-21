const { Router } = require('express');
const studentController = require('../app/controllers/StudentController');

const userRoutes = Router();

userRoutes.get('/students', studentController.index);
userRoutes.get('/students/:id', studentController.show);
userRoutes.put('/students', studentController.update);
userRoutes.delete('/students', studentController.destroy);

module.exports = userRoutes;