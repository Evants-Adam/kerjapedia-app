const { verify } = require('../helpers/jwt-helper');
const { User } = require('../models');

function authenticationMiddleware (req, res, next) {
    if (!req.headers.access_token) {
        throw ({ name: 'MissingAccessToken' });
    } else {
        const payload = verify(req.headers.access_token);
        const { email } = payload;

        User.findOne({ where: { email } })
        .then((result) => {
            if (!result) {
                throw ({ name: "NotAuthorized" })
            } else if (result.role === "Customer") {
                throw ({ name: "Forbidden" })
            } else {
                req.user = {
                    id: result.id,
                    username: result.username,
                    email: result.email,
                    role: result.role
                };
                next()
            }
        })
        .catch((err) => {
            next(err)
        })
    }
}

module.exports = authenticationMiddleware;