const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
//require('mongoose').set('debug', true);

var { Patient } = require('../models/patients');
var { Programme } = require('../models/programme');
//var { Exercice} = require('../models/exercices');

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

//
    /*Programme.find({patientId : req.params.patientId}).populate('exercices.refExercice')
    .exec(function(err, item) {

        if(err) {res.send(err)} 
        else {


            Programme.populate(item,  { path:"exercices", model:"exercices" }, function(err, course){
                //console.log(course);
                 res.send(item);
              });
           
        
        
        }

    });*/
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

    //console.log(req.body._id);
    console.log(req.body);

    Programme.findByIdAndUpdate(req.body._id,
        
        {
            nom : req.body.nom,
            exercices : req.body.exercices
        },
        
        (err, doc) => {

        if(err) {res.send(err);}
        else {

            /*if(req.body.nom != null && req.body.nom != doc.nom) {
                doc.nom = req.body.nom;
                
            }*/

            //doc.update()

            



            console.log("debut");
            //doc.exercices.push({nom : "test", refExercice : ObjectId("5e728ac6782c473c20eb8e78")});
            console.log("fin");
            res.send(doc);

            //doc.exercices.concat(req.body.exercices);

            //doc.exercices = req.exercices;

            //console.log(doc);

            /*doc.save((err, product) => {

            if(!err) {res.send(product);}
            else {res.send(JSON.stringify(err, undefined, 2));}

             });*/
            //res.send(doc);
        }
    }); 

});



module.exports = router;