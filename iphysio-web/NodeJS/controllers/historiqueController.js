const express = require('express');
var router = express.Router();

var { Historique } = require('../models/historique');
var security = require('./security');

router.get('/:patientId', security.verifyToken, (req, res) => {


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
});

module.exports = router;