// DOC : https://www.youtube.com/watch?v=imR9LlbG3pU

const bcrypt = require('bcryptjs');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

var patientController = require('./controllers/patientController.js');
var physioController = require('./controllers/physioController.js');
var programmeController = require('./controllers/programmeController.js');
var exerciceController = require('./controllers/exerciceController.js');

const mongoose = require('mongoose');

const URI = "mongodb+srv://admin:admin@iphysio-cluster-zq4bh.mongodb.net/iphysioBD-dev?retryWrites=true&w=majority";

mongoose.connect(URI || 'mongodb://localhost:27017/iphysioBD-dev', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify : false
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected !');
});

var app = express();
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200' }));

app.listen(3000, () => console.log('Server started at port : 3000'));

app.use('/physios', physioController);
app.use('/patients', patientController);
app.use('/programmes', programmeController);
app.use('/exercices', exerciceController);
