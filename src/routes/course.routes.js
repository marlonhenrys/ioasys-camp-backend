const { Router } = require('express');
const courseController = require('../app/controllers/CourseController');

const courseRoutes = Router();

courseRoutes.get('/courses', courseController.index);
courseRoutes.get('/courses/:id', courseController.show);

module.exports = courseRoutes;