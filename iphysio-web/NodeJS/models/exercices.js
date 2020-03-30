const mongoose = require('mongoose');

var Exercice = mongoose.model('Exercice', {
    name: { type: String },
    options: { type: String }
}, 'exercices');

module.exports = { Exercice };