const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config');

const AccountSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    // gender: { type: String, required: true },
    college: { type: String, required: true },
});

AccountSchema.pre('save', function(next) {
    if (this.isNew || this.isModified('password')) {
        bcrypt.hash(this.password, config.saltRound, (err, hashedPassword) => {
            if (err) {
                next(err);
            } else {
                this.password = hashedPassword;
                next();
            }
        });
    } else {
        next();
    }
});

AccountSchema.methods.checkPassword = (passwordToCheck, password, callback) => {
    bcrypt.compare(passwordToCheck, password, (err, correct) => {
        if (err) {
            callback(err);
        } else {
            callback(err, correct);
        }
    });
};

module.exports = mongoose.model('accounts', AccountSchema);