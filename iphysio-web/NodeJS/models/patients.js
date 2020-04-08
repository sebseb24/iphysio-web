const mongoose = require('mongoose');

var Patient = mongoose.model('Patient', {
    _id: { type: String},
    name: { type: String },
    email: { type: String },
    physio_associe: { type: Array},
    notes: { type: String }
}, 'patients');

module.exports = { Patient };