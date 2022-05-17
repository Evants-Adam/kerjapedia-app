const usersRouter = require('express').Router();
const UserController = require('../controllers/userController');

usersRouter.get('/', UserController.viewUser);

module.exports = usersRouter;