const express = require('express');
var router = express.Router();
var security = require('./security');

var { Statistics } = require('../models/statistics');


// => localhost:3000/Statistics/
router.get('/:patientId', security.verifyToken, (req, res) => {
    
    Statistics.aggregate([
        {
          '$match': {
            'patientId': req.params.patientId
          }
        }, {
          '$group': {
            '_id': '$exerciceName', 
            'exerciceEndTime': {
              '$push': '$exerciceEndTime'
            }, 
            'exerciceStartTime': {
              '$push': '$exerciceStartTime'
            }, 
            'movement': {
              '$push': '$movement'
            }, 
            'bodyPartPos': {
              '$push': '$bodyPartPos'
            }, 
            'timestampOfRepetition': {
              '$push': '$timestampOfRepetition'
            }, 
            'initStartTime': {
              '$push': '$initStartTime'
            }, 
            'numberOfRepetition': {
              '$push': '$numberOfRepetition'
            }, 
            'exerciceType': {
              '$push': '$exerciceType'
            }, 
            'exerciceID': {
              '$push': '$exerciceID'
            }
          }
        }
      ], (err, docs) => {
        if (!err) {res.send(docs); }
        else { console.log('Error in Retrieving Statistics : ' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;