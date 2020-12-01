const express = require('express');
var router = express.Router();

var { Historique } = require('../models/historique');

router.get('/:patientId', (req, res) => {


    Historique.aggregate([
        {
          '$match': {
            'patientId': req.params.patientId 
          }
        }, {
          '$group': {
            '_id': '$exerciceName', 
            'date': {
              '$push': '$date'
            }, 
            'duree': {
              '$push': '$duree'
            }, 
            'nbrRepetitionOrHoldTime': {
              '$push': '$nbrRepetitionOrHoldTime'
            }
          }
        }
      ], (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in retrieving Historique : ' + JSON.stringify(err, undefined, 2)); }
    })

    /*Historique.find(
        { patient_id: req.params.patientId },
        (err, doc) => {
            if (!err) { res.send(doc); }
            else { console.log('Error in retrieving Historique : ' + JSON.stringify(err, undefined, 2)); }
        }
    )*/



});

// doesn't work, Err : document must have an _id before saving
router.post('/', (req, res) => {
    var hist = new Historique({
        patient_id: req.body.patient_id,
        date: req.body.date,
        duree: req.body.duree,
        programme_id: req.body.programme_id
    });

    hist.save((err, doc) => {
        if (!err) {res.send(doc); }
        else { console.log('Error in Historique Save : ' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;