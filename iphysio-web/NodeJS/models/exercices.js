const mongoose = require('mongoose');

var Exercice = mongoose.model('Exercice', {
    nom: { type: String },
    options: { type: String }
}, 'exercices');

module.exports = { Exercice };