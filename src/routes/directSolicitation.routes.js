const { Router } = require('express');
const directSolicitationController = require('../app/controllers/DirectSolicitationController');

const directSolicitationRoutes = Router();

directSolicitationRoutes.get('/directsolicitations', directSolicitationController.index);
directSolicitationRoutes.get('/directsolicitations/:id', directSolicitationController.show);
directSolicitationRoutes.post('/directsolicitations', directSolicitationController.store);
directSolicitationRoutes.put('/directsolicitations/:id', directSolicitationController.update);
directSolicitationRoutes.delete('/directsolicitations', directSolicitationController.destroy);

module.exports = directSolicitationRoutes;