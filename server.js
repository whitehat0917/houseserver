const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const ngrok = require('ngrok');

const app = express();

var corsOptions = {
    origin: "*"
};

app.use(cors());

app.use(express.static(__dirname + '/build'));

// For all GET requests, send back index.html
// so that PathLocationStrategy can be used

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.use('/images', express.static(__dirname + '/app/images'));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to application." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});