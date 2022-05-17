const { User } = require('../models/index');

class UserController {
    static viewUser (req, res, next) {
        if (req.user) {
            const { id, username, email, role } = req.user;
            res.status(200).json({ id, username, email, role })
        } else {
            next()
        }
    }
}

module.exports = UserController;