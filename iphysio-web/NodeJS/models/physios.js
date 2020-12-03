const mongoose = require('mongoose');

var Physio = mongoose.model('Physio', {
    name: { type: String },
    email: { type: String },
    hash: { type: String }
}, 'physios');

module.exports = { Physio };