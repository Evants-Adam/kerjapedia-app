const { Job, Company } = require('../models/index');

class LandingPageController {
    static getNewestJobs (req, res, next) {
        Job.findAll({
            include: [{
                model: Company
            }],
            order: [
                ['createdAt', 'DESC']
            ],
            where: {
                status: 'Active'
            },
            limit: 5
        })
        .then((response) => {
            res.status(200).json(response)
        })
        .catch((err) => {
            next(err)
        })
    }
}

module.exports = LandingPageController;