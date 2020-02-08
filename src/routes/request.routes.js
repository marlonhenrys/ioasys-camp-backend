const { Router } = require('express');
const requestController = require('../app/controllers/RequestController');

const requestRoutes = Router();

requestRoutes.get('/requests', requestController.index);
requestRoutes.get('/requests/:id', requestController.show);
requestRoutes.post('/requests', requestController.store);
requestRoutes.put('/requests', requestController.update);
requestRoutes.delete('/requests', requestController.destroy);

module.exports = requestRoutes;