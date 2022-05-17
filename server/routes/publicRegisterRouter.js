const publicRegisterRouter = require('express').Router();
const RegisterController = require('../controllers/registerController');

publicRegisterRouter.post('/', RegisterController.createUser);

module.exports = publicRegisterRouter;