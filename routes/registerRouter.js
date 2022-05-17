const registerRouter = require('express').Router();
const RegisterController = require('../controllers/registerController');

registerRouter.post('/', RegisterController.createAdmin);

module.exports = registerRouter;