const { Router } = require('express');
const helperListController = require('../app/controllers/HelperListController');

const helperListRoutes = Router();

helperListRoutes.get('/helper-list', helperListController.index);
helperListRoutes.get('/helper-list/:helper', helperListController.show);
helperListRoutes.post('/helper-list', helperListController.store);
helperListRoutes.delete('/helper-list/:id', helperListController.destroy);

module.exports = helperListRoutes;