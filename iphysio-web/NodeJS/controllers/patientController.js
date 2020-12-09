const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var security = require('./security');

var { Patient } = require('../models/patients');

router.get('/', security.verifyToken, (req, res) => {
    Patient.find((err, docs) => {
        if (!err) {res.send(docs); }
        else { console.log('Error in Retrieving Patients : ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:physio_associe_id', security.verifyToken, (req, res) => {
    Patient.find(
        { physio_associe: req.params.physio_associe_id,
           isActive : true },
        (err, doc) => {
            if (!err) { res.send(doc); }
            else { console.log('Error in retrieving Patient : ' + JSON.stringify(err, undefined, 2)); }
        }
    )
});

router.get('/all/:physio_associe_id', security.verifyToken, (req, res) => {
    Patient.find(
        { physio_associe: req.params.physio_associe_id},
        (err, doc) => {
            if (!err) { res.send(doc); }
            else { console.log('Error in retrieving Patient : ' + JSON.stringify(err, undefined, 2)); }
        }
    )
});

router.get('/patient/:id', security.verifyToken, (req, res) => {
    Patient.findById(req.params.id, (err, doc) => {
        if(!err) {res.send(doc);}
        else { console.log('Error in retrieving Patient : ' + JSON.stringify(err, undefined, 2));}
    });
});

router.post('/', security.verifyToken, (req, res) => {
    var emp = new Patient({
        name: req.body.name,
        email: req.body.email,
        isActive : true,
        telephone : req.body.telephone,
        adresse : req.body.adresse,
        physio_associe : req.body.physio_associe,
        patientId : "NA"
    });

    emp.save((err, doc) => {
        if (!err) {res.send(doc); }
        else { console.log('Error in Patient Save : ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', security.verifyToken, (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id :  + ${res.params.id};');

        var pat = new Patient({
            name: req.body.name,
            email: req.body.email,
            notes: req.body.notes,
            telephone : req.body.telephone,
            adresse : req.body.adresse,
            isActive : req.body.isActive,
        });        

        Patient.findByIdAndUpdate(req.params.id, {$set:{notes:req.body.notes, isActive: req.body.isActive, 
            name : pat.name, email: pat.email, telephone: pat.telephone, adresse: pat.adresse}}, 
            function(err, doc)  {
                if (!err) { 
                    res.send(doc);
                }
                else { console.log('Error in Patient Update: ' + JSON.stringify(err, undefined, 2));
             }
        });

        
});

router.delete('/:id', security.verifyToken, (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id :  + ${res.params.id};');

        Patient.findByIdAndRemove(req.params.id, (err, doc) => {
            if (!err) { res.send(doc); }
            else { console.log('Error in Patient Delete: ' + JSON.stringify(err, undefined, 2)); }
        });
});


module.exports = router;