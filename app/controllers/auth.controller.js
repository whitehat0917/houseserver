var UserModel = require('../models/user.model');
const config = require("../config/auth.config");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    // Save User to Database
    user = new UserModel({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        role: 3
    });
    user.save();
    res.send({ message: "User was registered successfully!" });
};

exports.signin = (req, res) => {
    user = new UserModel();
    user.find('first', { where: "username = '" + req.body.username + "'" }, function(err, row) {
        if (row.length == 0) {
            return res.status(404).send({ message: "User Not found." });
        } else {
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                row.password
            );
            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }
            var token = jwt.sign({ id: row.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });
            res.status(200).send({
                id: row.id,
                username: row.username,
                email: row.email,
                role: row.role,
                accessToken: token
            });
        }
    });
};