const { Router } = require('express');
const subjectController = require('../app/controllers/SubjectController');

const subjectRoutes = Router();

subjectRoutes.get('/subjects', subjectController.index);
subjectRoutes.get('/subjects/:id', subjectController.show);

module.exports = subjectRoutes;