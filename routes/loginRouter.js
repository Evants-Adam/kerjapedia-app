const loginRouter = require('express').Router();
const LoginController = require('../controllers/loginController');

loginRouter.post('/', LoginController.validateLogin);
loginRouter.post('/google-sign-in', LoginController.googleSignIn);

module.exports = loginRouter;