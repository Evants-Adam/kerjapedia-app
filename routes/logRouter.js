const logRouter = require('express').Router();
const LogController = require('../controllers/logController');

logRouter.get('/', LogController.getAllLogs);

module.exports = logRouter;