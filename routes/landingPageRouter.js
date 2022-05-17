const LandingPageController = require('../controllers/landingPageController');
const landingPageRouter = require('express').Router();

landingPageRouter.get('/', LandingPageController.getNewestJobs);

module.exports = landingPageRouter;