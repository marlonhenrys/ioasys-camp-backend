const { Router } = require('express');
const directController = require('../app/controllers/DirectController');

const directRoutes = Router();

directRoutes.get('/directs/:id', directController.index);
directRoutes.get('/directs/:id', directController.show);
directRoutes.post('/directs', directController.store);
directRoutes.put('/directs/:id', directController.update);
directRoutes.delete('/directs', directController.destroy);

module.exports = directRoutes;