const { Company } = require('../models/index');

class CompanyController {
    static viewAllCompanies (req, res, next) {
        Company.findAll()
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((err) => {
            next(err)
        })
    }
}

module.exports = CompanyController;