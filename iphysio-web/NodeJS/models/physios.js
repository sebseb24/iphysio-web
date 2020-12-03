const mongoose = require('mongoose');

var Physio = mongoose.model('Physio', {
   // _id: { type: String },
    name: { type: String },
    email: { type: String },
    hash: { type: String }
}, 'physios');

module.exports = { Physio };