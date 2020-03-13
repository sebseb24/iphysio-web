const mongoose = require('mongoose');

var Patient = mongoose.model('Patient', {
    name: { type: String },
    position: { type: String },
    office: { type: String },
    salary: { type: Number }
}, 'pat');

module.exports = { Patient };