const mongoose = require('mongoose');

var Patient = mongoose.model('Patient', {
    name: { type: String },
    email: { type: String },
    physio_associe: { type: Array}
}, 'patients');

module.exports = { Patient };