const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//Configuring the database
const config = require('./config.js');
const mongoose = require('mongoose');
require('./product.routes.js')(app);

mongoose.Promise = global.Promise;
//Connecting to the database
mongoose.connect(config.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected... to the database");
}).catch(err => {
    console.log('Could not connected to the database. Terminating the connection...', err);
    process.exit();
});

//Enable CORS for all HTTP methods
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Origin","GET, PUT, POST, DELETE, OPTION");
    res.header("Access-Control-Allow-Origin","Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//parse requests
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//default route
app.get('/', ( req, res) => {
    res.json(({"message ": "Welcome to RestAPI"}));
});

//listen on port 3000
app.listen(config.serverport, () => {
    console.log("Server is listening on port 3000");
});