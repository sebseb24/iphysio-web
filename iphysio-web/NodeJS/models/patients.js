const mongoose = require('mongoose');

var Patient = mongoose.model('Patient', {
    name: { type: String },
    email: { type: String }
}, 'patients');

module.exports = { Patient };