const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
var UserModel = require('../models/user.model');

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

isAdmin = (req, res, next) => {
    user = new UserModel();
    user.find('first', { where: "id = '" + req.userId + "'" }, function(err, row) {
        if (row.length == 0) {
            return res.status(403).send({ message: "User Not found." });
        } else {
            if (row.role === 1) {
                next();
                return;
            }
            res.status(403).send({
                message: "Require Admin Role!"
            });
            return;
        }
    });
};

isAgent = (req, res, next) => {
    user = new UserModel();
    user.find('first', { where: "id = '" + req.userId + "'" }, function(err, row) {
        if (row.length == 0) {
            return res.status(403).send({ message: "User Not found." });
        } else {
            if (row.role === 2) {
                next();
                return;
            }
            res.status(403).send({
                message: "Require Agent Role!"
            });
            return;
        }
    });
};

isAgentOrAdmin = (req, res, next) => {
    user = new UserModel();
    user.find('first', { where: "id = '" + req.userId + "'" }, function(err, row) {
        if (row.length == 0) {
            return res.status(403).send({ message: "User Not found." });
        } else {
            if (row.role === 1 || row.role === 2) {
                next();
                return;
            }
            res.status(403).send({
                message: "Require Agent or Admin Role!"
            });
            return;
        }
    });
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isAgent: isAgent,
    isAgentOrAdmin: isAgentOrAdmin
};
module.exports = authJwt;