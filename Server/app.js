const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const dbService = require('./dbService');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

//CREATE
app.post('/insert', (request, response) => {

});


app.get('/getAllTeams', (request, response) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllTeams();
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})

app.listen(process.env.PORT, () => console.log("app is running"));