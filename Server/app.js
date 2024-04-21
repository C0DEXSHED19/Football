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
app.post('/insertTeam', (request, response) => {//inserts a team given its name and number of points it haves
    const { name } = request.body;
    const { points } = request.body;
    const db = dbService.getDbServiceInstance();
    
    const result = db.insertNewTeam(name, points);

    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));

});

app.post('/insertPerson', (request, response) => { //inserts a person given his name and age (this should be done before inserting a player)
    const { name } = request.body;
    const { age } = request.body;
    
    const db = dbService.getDbServiceInstance();
    
    const result = db.insertNewPerson(name, age);

    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));

});

app.post('/insertPlayer', (request, response) => { //inserts  a new player given his name and his team (should exist as a person before inserting)
    const { name } = request.body;
    const { team } = request.body;
    
    const db = dbService.getDbServiceInstance();
    
    const result = db.insertNewPlayer(name, team);

    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));

});

//READ
app.get('/getAllTeams', (request, response) => { //returns all teams with their number of points
    const db = dbService.getDbServiceInstance();

    const result = db.getAllTeams();
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})

app.get('/getAllPlayers', (request, response) => { //returns all players with their teams
    const db = dbService.getDbServiceInstance();

    const result = db.getAllPlayers();
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})

// delete
app.delete('/deleteTeam', (request, response) => {  //deletes a team by name
    const { name } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.deleteTeam(name);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});
app.delete('/deletePlayer', (request, response) => { //deletes a player by name
    const { name } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.deletePlayer(name);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});
// update
app.patch('/updatePoints', (request, response) => { //updates a team's number of points
    const { team, points } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.updatePoints(team,points);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});
app.patch('/updatePlayerNewTeam', (request, response) => {// updates a player's team
    const { name, team } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.updatePlayerNewTeam(name,team);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});
app.listen(process.env.PORT, () => console.log("app is running"));