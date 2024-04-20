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
app.post('/insertTeam', (request, response) => {
    const { name } = request.body;
    const { points } = request.body;
    const db = dbService.getDbServiceInstance();
    
    const result = db.insertNewTeam(name, points);

    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));

});

app.post('/insertPerson', (request, response) => {
    const { name } = request.body;
    const { age } = request.body;
    
    const db = dbService.getDbServiceInstance();
    
    const result = db.insertNewPerson(name, age);

    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));

});

app.post('/insertPlayer', (request, response) => {
    const { name } = request.body;
    const { team } = request.body;
    
    const db = dbService.getDbServiceInstance();
    
    const result = db.insertNewPlayer(name, team);

    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));

});


app.get('/getAllTeams', (request, response) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllTeams();
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})

app.get('/getAllPlayers', (request, response) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllPlayers();
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})

app.listen(process.env.PORT, () => console.log("app is running"));