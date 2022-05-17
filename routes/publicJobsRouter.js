const publicJobsRouter = require('express').Router();
const PublicController = require('../controllers/publicController');

publicJobsRouter.get('/', PublicController.viewAllJob);
publicJobsRouter.get('/:id', PublicController.viewJob);

module.exports = publicJobsRouter;