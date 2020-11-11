const mongoose = require('mongoose');


const MovementStatistics = new mongoose.Schema({

    angleAvg : [Number],
    position0_X : [Number],
    position0_Y : [Number],
    
    position1_X : [Number],
    position1_Y : [Number],

    position2_X : [Number],
    position2_Y : [Number]
});

const ExerciceStatistique = new mongoose.Schema({

    timeStamp : [Number],
    numberOfRepetition : [Number],
    speedOfRepetition : [Number],
    holdTime : [Number],
    notMovingInitList : [Number],

    iniStartTime : Number,
    exerciceStartTime : Number,
    exerciceEndTime : Number,
    movements : [MovementStatistics]
});

var Patient = mongoose.model('Patient', {
    name: { type: String },
    email: { type: String },
    physio_associe: { type: Array},
    notes: { type: String },
    telephone : {type : String},
    adresse : { type : String},
    isActive : {type : Boolean},
    historique_activite : [ExerciceStatistique]
}, 'patients');

module.exports = { Patient };