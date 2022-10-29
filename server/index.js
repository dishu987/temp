const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config.js');
const registration = require('./routes/registration.js');
const authentication = require('./routes/authentication.js');
const verification = require('./routes/verification.js');


const app = express();

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
    jwt.verify(req.cookies.token, config.jwtSecret, (err, decodedToken) => {
        if (!err) {
            req.email = decodedToken.email;
        }
    });
    next();
});

mongoose.connect(config.mongoUri, { useNewUrlParser: true }, (err) => {
    if (err) {
        throw err;
    } else {
        console.log(`Successfully connected to ${config.mongoUri}`);
    }
});

app.use('/api/registration', registration);
app.use('/api/authentication', authentication);
app.use('/api/verification', verification);
app.post('/api/logout', (req, res) => {
    res.clearCookie('token').sendStatus(200);
});

app.listen(config.port, () => console.log(`Listening on port ${config.port}`));