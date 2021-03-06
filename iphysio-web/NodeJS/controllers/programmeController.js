const express = require('express');
var router = express.Router();
var security = require('./security');


var { Patient } = require('../models/patients');
var { Programme } = require('../models/programme');

// => localhost:3000/Patients/
router.get('/', security.verifyToken, (req, res) => {
    Patient.find((err, docs) => {
        if (!err) {res.send(docs); }
        else { console.log('Error in Retrieving Patients : ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:patientId', security.verifyToken,(req, res) => {

    Programme.aggregate([
        {
          '$match': {
            'patientId': req.params.patientId
          }
        }, {
          '$unwind': {
            'path': '$exercices', 
            'preserveNullAndEmptyArrays': true
          }
        }, {
          '$addFields': {
            'exerciceId': {
              '$toObjectId': '$exercices.exerciceId'
            }
          }
        }, {
          '$lookup': {
            'from': 'exercicesPhysiotec', 
            'localField': 'exerciceId', 
            'foreignField': '_id', 
            'as': 'exerciceInfo'
          }
        }, {
          '$unwind': {
            'path': '$exerciceInfo', 
            'preserveNullAndEmptyArrays': true
          }
        }, {
          '$project': {
            '_id': 1, 
            'nom': 1, 
            'patientId': 1, 
            'exercices': {
              'parametres': '$exercices', 
              'refExercice': '$exerciceInfo'
            }
          }
        }, {
          '$group': {
            '_id': '$_id', 
            'nom': {
              '$first': '$nom'
            }, 
            'patientId': {
              '$first': '$patientId'
            }, 
            'exercices': {
              '$push': '$exercices'
            }
          }
        }, {
            '$sort': {
              '_id': 1
            }
          }
      ], (err, pro) => {
      
        if (!err) {



            for(let programme of pro) {
                if(programme.exercices[0].parametres == null) {
                    programme.exercices = [];
                }
            }

             res.send(pro); 
        } else { 
            console.log('Error in retrieving Patient : ' + JSON.stringify(err, undefined, 2));
            res.status(400).send('Error in retrieving programmes : ' + JSON.stringify(err, undefined, 2));
        }


    });

});

router.delete('/:id', security.verifyToken,(req, res) => {

    Programme.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Programme Delete: ' + JSON.stringify(err, undefined, 2)); }
    });

});

router.post('/', security.verifyToken,(req, res) => {


    let exer = req.body.exercices.map(a => a.parametres);

    var pro = new Programme({
        nom: req.body.nom,
        patientId : req.body.patientId,
        exercices : exer
    });

    pro.save((err, doc) => {
        if (!err) {res.send(doc); }
        else { console.log('Error in programme Save : ' + JSON.stringify(err, undefined, 2)); }
    });
});



router.put('/', security.verifyToken,(req, res) => {

    let exer = req.body.exercices.map(a => a.parametres);

    Programme.findByIdAndUpdate(req.body._id,
        
        {
            nom : req.body.nom,
            exercices : exer
        },
        
        (err, doc) => {

        if(err) {res.send(err);}
        else {
            res.send(doc);
        }
    }); 

});



module.exports = router;