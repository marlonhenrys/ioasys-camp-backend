const { Router } = require('express');
const solicitationController = require('../app/controllers/SolicitationController');

const solicitationRoutes = Router();

solicitationRoutes.get('/solicitations', solicitationController.index);
solicitationRoutes.get('/solicitations/:id', solicitationController.show);
solicitationRoutes.post('/solicitations', solicitationController.store);
solicitationRoutes.put('/solicitations/:id', solicitationController.update);
solicitationRoutes.delete('/solicitations', solicitationController.destroy);

module.exports = solicitationRoutes;