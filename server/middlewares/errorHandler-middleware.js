function errorHandlerMiddleware (err, req, res, next) {
    let code;
    let messages;
    
    switch (err.name) {
        case "SequelizeValidationError":
            code = 400;
            messages = err.errors.map((er) => {
                return er.message;
            })
            break;
        case "LoginBadRequest":
            code = 400;
            messages = ["Email/Password is required"];
            break;
        case "MissingAccessToken":
            code = 400;
            messages = ["Missing Access Token"];
            break;
        case "InvalidPasswordOrEmail":
            code = 401;
            messages = ["Email doesn't exists/Invalid Password"];
            break;
        case "NotAuthorized":
            code = 401;
            messages = ["Not Authorized"];
            break;
        case "Forbidden":
            code = 403;
            messages = ["Forbidden"];
            break;
        case "JobNotFound":
            code = 404;
            messages =  ["Error Job Not Found"];
            break;
        case "EmailNotFound":
            code = 404;
            messages = ["Email doesn't exists"];
            break;
        case "DeleteJobNotFound":
            code = 404;
            messages = [`Cannot Delete - Job with ID ${err.jobIdToDelete} is not found`];
            break;
        case "SequelizeUniqueConstraintError":
            if (err.original.constraint === "Users_username_key") {
                code = 409;
                messages = ["Username is already taken by other users"];
                break;
            } else if (err.original.constraint === "Users_email_key") {
                code = 409;
                messages = ["Email is already used by other users"];
                break;
            } else {
                code = 409;
                messages = ["Username/email is already used"];
                break;
            }
        case "JobAlreadyBookmarked":
            code = 409;
            messages = ["Job already bookmarked"];
            break;
        default:
            code = 500;
            messages = ["Internal Server Error"];
            break;
    }
    console.log(err)

    res.status(code).json({ messages });
}

module.exports = errorHandlerMiddleware;