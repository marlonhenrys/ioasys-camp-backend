const { Router } = require('express');
const helperController = require('../app/controllers/HelperController');

const helperRoutes = Router();

helperRoutes.get('/helpers', helperController.index);
helperRoutes.get('/helpers/:id', helperController.show);
helperRoutes.post('/helpers', helperController.store);
helperRoutes.put('/helpers', helperController.update);
helperRoutes.delete('/helpers/:id', helperController.destroy);

module.exports = helperRoutes;