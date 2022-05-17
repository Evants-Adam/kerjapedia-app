const publicLoginRouter = require('express').Router();
const LoginController = require('../controllers/loginController');

publicLoginRouter.post('/', LoginController.validateUserLogin);
publicLoginRouter.post('/google-sign-in', LoginController.customerGoogleSignIn);

module.exports = publicLoginRouter;