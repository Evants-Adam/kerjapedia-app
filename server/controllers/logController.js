const { User, Job, Log, Company } = require('../models/index');

class LogController {
    static getAllLogs (req, res, next) {
        Log.findAll({
            include: [{
                model: User,
                attributes: ["username", "email"]
            }, {
                model: Job,
                include: {
                    model: Company,
                    attributes: ["name"]
                },
                attributes: ["title", "description", "status"]
            }]
        })
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((err) => {
            next(err)
        })
    }
}

module.exports = LogController;