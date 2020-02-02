const { Router } = require('express');
const helperListController = require('../app/controllers/HelperListController');

const helperListRoutes = Router();

helperListRoutes.get('/helpers', helperListController.index);
helperListRoutes.get('/helpers/:id', helperListController.show);
helperListRoutes.post('/helpers', helperListController.store);
helperListRoutes.delete('/helpers/:id', helperListController.destroy);

module.exports = helperListRoutes;