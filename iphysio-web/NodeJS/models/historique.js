const mongoose = require('mongoose');

var Historique = mongoose.model('Historique', {
    patient_id: { type: String },
    date: { type: String },
    duree: { type: String },
    programme_id: { type: String }
}, 'historique');

module.exports = { Historique };