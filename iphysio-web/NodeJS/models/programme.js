const mongoose = require('mongoose');

var Programme = mongoose.model('Programme', {
    nom: { type: String },
    patientId: { type: String },
    exercices : [],
}, 'programmes');

module.exports = { Programme };