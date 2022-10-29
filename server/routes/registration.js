const express = require('express');
const Account = require('../models/Account.js');
const router = express.Router();

router.post('/', (req, res) => {
    const { email, password, phone, college } = req.body;
    const account = new Account({ email, password, phone, college });
    account.save((err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send('Registration Success!');
        }
    });
});

module.exports = router;