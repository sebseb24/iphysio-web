const mongoose = require('mongoose');

var Patient = mongoose.model('Patient', {
    name: { type: String },
    email: { type: String },
    physio_associe: { type: Array},
    notes: { type: String },
    telephone : {type : String},
    adresse : { type : String},
    isActive : {type : Boolean}
}, 'patients');

module.exports = { Patient };