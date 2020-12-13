const mongoose = require('mongoose');



/*var exercice = new mongoose.Schema({
    nom: {type : String},
    repetition: {type : Number},
    compteur : {type : Number},
    dateDebut : {type : Date},
    dateFin : {type : Date},
    refExercice : { type: mongoose.Schema.Types.ObjectId, ref: 'exercices' }
});*/

var Programme = mongoose.model('Programme', {
    nom: { type: String },
    patientId: { type: String },
    exercices : [],
}, 'programmes');

module.exports = { Programme };