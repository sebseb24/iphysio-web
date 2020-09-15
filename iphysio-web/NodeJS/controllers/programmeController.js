const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
//require('mongoose').set('debug', true);

var { Patient } = require('../models/patients');
var { Programme } = require('../models/programme');

// => localhost:3000/Patients/
router.get('/', (req, res) => {
    Patient.find((err, docs) => {
        if (!err) {res.send(docs); }
        else { console.log('Error in Retrieving Patients : ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:patientId', (req, res) => {

    Programme.find({ patientId : req.params.patientId}, (err, pro) => {

        if (!err) { res.send(pro); }
        else { 
            console.log('Error in retrieving Patient : ' + JSON.stringify(err, undefined, 2));
            res.status(400).send('Error in retrieving programmes : ' + JSON.stringify(err, undefined, 2));
        }

    });

});

router.delete('/:id', (req, res) => {

    Programme.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Programme Delete: ' + JSON.stringify(err, undefined, 2)); }
    });

});

router.post('/', (req, res) => {
    var pro = new Programme({
        nom: req.body.nom,
        patientId : req.body.patientId,
        exercices : req.body.exercices
    });

    pro.save((err, doc) => {
        if (!err) {res.send(doc); }
        else { console.log('Error in programme Save : ' + JSON.stringify(err, undefined, 2)); }
    });
});



router.put('/', (req, res) => {

    Programme.findByIdAndUpdate(req.body._id,
        
        {
            nom : req.body.nom,
            exercices : req.body.exercices
        },
        
        (err, doc) => {

        if(err) {res.send(err);}
        else {
            res.send(doc);
        }
    }); 

});



module.exports = router;