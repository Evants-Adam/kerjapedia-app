const publicUserRouter = require('express').Router();
const PublicController = require('../controllers/publicController');

publicUserRouter.get('/', PublicController.viewCustomer);

module.exports = publicUserRouter;