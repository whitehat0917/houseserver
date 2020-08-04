const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/test/all", controller.allAccess);
    app.get(
        "/api/test/getDashboardData", [authJwt.verifyToken],
        controller.getDashboardData
    );
    app.get(
        "/api/test/getHouseLength", [authJwt.verifyToken],
        controller.getHouseLength
    );
    app.post(
        "/api/test/getHouses", [authJwt.verifyToken],
        controller.getHouses
    );
    app.get(
        "/api/test/getUsersByMessage", [authJwt.verifyToken],
        controller.getUsersByMessage
    );
    app.post(
        "/api/test/getMessages", [authJwt.verifyToken],
        controller.getMessages
    );
};