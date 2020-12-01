const mongoose = require('mongoose');

var Exercice = mongoose.model('Exercice', {
    name: { type: String }
}, 'exercicesPhysiotec');

module.exports = { Exercice };