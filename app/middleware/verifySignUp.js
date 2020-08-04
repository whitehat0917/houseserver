var AdminModel = require('../models/user.model');
var config = require('../config/auth.config');

checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
    admin = new AdminModel();
    admin.find('first', { where: "username = '" + req.body.username + "'" }, function(err, row) {
        if (row.length != 0) {
            res.status(400).send({
                message: "Failed! Username is already in use!"
            });
            return;
        } else {
            admin.find('first', { where: "email = '" + req.body.email + "'" }, function(err, row) {
                if (row.length != 0) {
                    res.status(400).send({
                        message: "Failed! Email is already in use!"
                    });
                    return;
                } else {
                    next();
                }
            });
        }
    });
};

checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!config.roles.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: "Failed! Role does not exist = " + req.body.roles[i]
                });
                return;
            }
        }
    }
    next();
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;