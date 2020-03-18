const mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var Physio = mongoose.model('Physio', {
    name: { type: String },
    email: { type: String },
    hash: { type: String },
    saltSecret: String
}, 'physios');

/*var physioSchema = new mongoose.Schema({
    email: { 
        type: String,
        unique: true,
        required: true,
    },
    name: { 
        type: String,
        required: true 
    },
    hash: String ,
    salt: String
});

physioSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

physioSchema.methods.validPassword = function(password){
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

physioSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt(expiry.getTime() / 1000),
    }, "MY_SECRET"); // NEED TO HIDE THIS SECRET
};*/

module.exports = { Physio };