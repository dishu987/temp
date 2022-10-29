const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config.js');
const router = express.Router();

router.get('/', (req, res) => {
    const jwtToken = req.cookies.token;
    if (!jwtToken) {
        res.status(401).send('Unauthorized');
    } else {
        jwt.verify(jwtToken, config.jwtSecret, function(err, decoded) {
            if (err) {
                res.status(401).send('Unauthorized');
            } else {
                req.email = decoded.email;
                res.status(200).send(req.email);
            }
        });
    }
});

module.exports = router;