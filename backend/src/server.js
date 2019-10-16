const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');


const app = express();
app.use(express.json({limit: '10mb'}));
app.use(cors());

mongoose.connect('mongodb+srv://admin:admin@clusterdev-fp9by.mongodb.net/asyncimage?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use('/api', routes)

app.listen(3001)