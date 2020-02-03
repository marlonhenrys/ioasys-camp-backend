const { Router } = require('express');
const requestController = require('../app/controllers/HelpRequestController');

const requestRoutes = Router();

requestRoutes.get('/requests', requestController.index);
requestRoutes.get('/requests/:id', requestController.show);
requestRoutes.put('/requests', requestController.update);
requestRoutes.delete('/requests', requestController.destroy);

module.exports = requestRoutes;