const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

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
        else { console.log('Error in retrieving Patient : ' + JSON.stringify(err, undefined, 2));
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
        patientId : req.body.patientId
    });

    pro.save((err, doc) => {
        if (!err) {res.send(doc); }
        else { console.log('Error in Patient Save : ' + JSON.stringify(err, undefined, 2)); }
    });
});



router.put('/', (req, res) => {


    Programme.findById(req.body._id, (err, doc) => {

        if(req.body.nom != null && req.body.nom != doc.nom) {
            doc.nom = req.body.nom;
        }

        doc.save((err, product) => {

            if(!err) {res.send(product);}
            else {res.send(JSON.stringify(err, undefined, 2));}

        });



    }); 

});



module.exports = router;