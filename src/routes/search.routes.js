const { Router } = require('express');
const searchController = require('../app/controllers/SearchController');

const searchRoutes = Router();

searchRoutes.get('/search/helpers', searchController.findHelpers);
searchRoutes.get('/search/requests', searchController.findRequests);

module.exports = searchRoutes;