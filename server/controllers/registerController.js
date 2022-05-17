const { User } = require('../models');

class RegisterController {
    static createAdmin (req, res, next) {
        const { username, email, password, phoneNumber, address } = req.body;

        User.create({
            username, email, password, phoneNumber, address
        })
        .then((result) => {
            let tempMessage = {
                id: result.id,
                email: result.email
            }
            res.status(201).json({ messages: tempMessage });
        })
        .catch((err) => {
            next(err);
        })
    }

    static createUser (req, res, next) {
        const { username, email, password, phoneNumber, address } = req.body;

        User.create({
            username, email, password, phoneNumber, address, role: "Customer"
        })
        .then((result) => {
            let tempMessage = {
                id: result.id,
                email: result.email
            }

            res.status(201).json({ messages: tempMessage });
        })
        .catch((err) => {
            next(err);
        })
    }
}

module.exports = RegisterController;