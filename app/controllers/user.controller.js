var UserModel = require('../models/user.model');
var HouseModel = require('../models/house.model');
var MessageModel = require('../models/message.model');
const request = require("request");

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.getDashboardData = (req, res) => {
    var responseData = {};
    res.status(200).send({ status: "success", data: responseData });
    return;
};

exports.getHouseLength = (req, res) => {
    house = new HouseModel();
    house.find('all', function(err, rows) {
        if (err) {
            return res.status(200).send({ status: "Database Error" });
        } else {
            return res.status(200).send({ status: "success", data: rows.length });
        }
    });
};

exports.getHouses = (req, res) => {
    house = new HouseModel();
    house.find('all', { limit: [req.body.page * 12, 12] }, function(err, rows) {
        if (err) {
            return res.status(200).send({ status: "Database Error" });
        } else {
            return res.status(200).send({ status: "success", data: rows });
        }
    });
};

exports.getUsersByMessage = (req, res) => {
    user = new UserModel();
    user.find('all', { where: "id!=" + req.userId }, function(err, rows) {
        if (err) {
            return res.status(200).send({ status: "Database Error" });
        } else {
            return res.status(200).send({ status: "success", data: rows });
        }
    });
};

exports.getMessages = (req, res) => {
    message = new MessageModel();
    message.find('all', { where: "(sender = " + req.userId + " and receiver = " + req.body.userid + ") or (sender = " + req.body.userid + " and receiver = " + req.userId + ")", order: "created_at" }, function(err, rows) {
        if (err) {
            return res.status(200).send({ status: "Database Error" });
        } else {
            return res.status(200).send({ status: "success", data: rows });
        }
    });
};