const companyRouter = require('express').Router();
const CompanyController = require('../controllers/companyController');

companyRouter.get('/', CompanyController.viewAllCompanies);

module.exports = companyRouter;