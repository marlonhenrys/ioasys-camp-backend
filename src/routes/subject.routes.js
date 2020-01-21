const { Router } = require('express');
const subjectController = require('../app/controllers/SubjectController');

const subjectRoutes = Router();

subjectRoutes.get('/subjects', subjectController.index);

module.exports = subjectRoutes;