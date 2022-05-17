const { User } = require('../models');
const { comparePassword } = require('../helpers/hash-helper');
const { sign } = require('../helpers/jwt-helper');
const { OAuth2Client } = require('google-auth-library');
const { Op } = require('sequelize');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class LoginController {
    static validateLogin (req, res, next) {
        const { email, password } = req.body;

        if (!email || !password) {
            throw ({ name: "LoginBadRequest" })
        } else {
            User.findOne({
                attributes: ["email", "password"],
                where: {
                    [Op.and]: [
                        { email: email },{
                            [Op.or]: [
                                { role: "Staff" },
                                { role: "Admin" }
                            ]
                        }
                    ]
                }
            })
            .then((result) => {
                if (!result || !comparePassword(password, result.password)) {
                    throw ({ name: "InvalidPasswordOrEmail" })
                } else {
                    let tempJwt = sign({
                        id: result.id,
                        email
                    })
                    
                    res.status(200).json({ access_token: tempJwt })
                }
            })
            .catch((err) => {
                next(err);
            })
        }
    }

    static googleSignIn (req, res, next) {
        let ticket = "";
        let payload = "";
        
        client.verifyIdToken({
            idToken: req.body.id_token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        .then((response) => {
            ticket = response;
            payload = ticket.getPayload();
            return User.max('id')
        })
        .then(max => {
            const { email } = payload;
            return User.findOrCreate({
                where: { email },
                defaults: {
                    email: email,
                    username: `User${max + 1000}`,
                    password: `Itisreallyasecret@${Math.random()}`,
                    role: 'Staff',
                    phoneNumber: "+6221-xxxxx",
                    address: "Indonesia"
                }
            })
        })
        .then((response) => {
            const [ user, isCreated ] = response;

            let code = 200;
            if (isCreated) {
                code = 201;
            }
            const access_token = sign({ id: user.id, email: user.email });
            res.status(code).json({ access_token });
        })
        .catch((error) => {
            next(error);
        })
    }

    static validateUserLogin (req, res, next) {
        const { email, password } = req.body;

        if (!email || !password) {
            throw ({  name: "LoginBadRequest" })
        } else {
            User.findOne({
                attributes: ["email", "password"],
                where: {
                    [Op.and]: [
                        { email: email },
                        { role: "Customer" }
                    ]
                }
            })
            .then((result) => {
                if (!result || !comparePassword(password, result.password)) {
                    throw ({ name: "InvalidPasswordOrEmail" })
                } else {
                    let tempJwt = sign({
                        id: result.id,
                        email
                    })
                    
                    res.status(200).json({ access_token: tempJwt })
                }
            })
            .catch((err) => {
                next(err)
            })
        }
    }

    static customerGoogleSignIn (req, res, next) {
        let ticket = "";
        let payload = "";
        
        client.verifyIdToken({
            idToken: req.body.id_token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        .then((response) => {
            ticket = response;
            payload = ticket.getPayload();
            return User.max('id')
        })
        .then(max => {
            const { email } = payload;
            return User.findOrCreate({
                where: {
                    [Op.and]: [
                        { email: email },
                        { role: "Customer" }
                    ]
                },
                defaults: {
                    email: email,
                    username: `User${max + 1000}`,
                    password: `Itisreallyasecret@${Math.random()}`,
                    role: 'Customer',
                    phoneNumber: "+6221-xxxxx",
                    address: "Indonesia"
                }
            })
        })
        .then((response) => {
            const [ user, isCreated ] = response;

            let code = 200;
            if (isCreated) {
                code = 201;
            }
            const access_token = sign({ id: user.id, email: user.email });
            res.status(code).json({ access_token });
        })
        .catch((error) => {
            next(error);
        })
    }
}

module.exports = LoginController;