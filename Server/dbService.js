const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'your password',
    database: 'Football',
    port: '3306'
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
     console.log('db ' + connection.state);
});

class DbService{
    static getDbServiceInstance(){
        return instance ? instance : new DbService();
    }
    async getAllTeams() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT name, points FROM team;";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            // console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    async getAllPlayers() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT name, Team_Name FROM Player JOIN Person ON Player.player_name=Person.name;";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            // console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    async insertNewTeam(name,points) {
        try {
            const dateAdded = new Date();
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO team (name, points) VALUES (?,?);";

                connection.query(query, [name, points] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);
                })
            });
            return {
                //id : insertId,
                name : name,
                points : points
            };
        } catch (error) {
            console.log(error);
        }
    }
    async insertNewPerson(name,age) {
        try {
            
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO person (name, age) VALUES (?,?);";
                
                

                

                connection.query(query, [name, age] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);
                })
            });
            return {
                //id : insertId,
                name : name,
                age : age,
            };
        } catch (error) {
            console.log(error);
        }
    }
    async insertNewPlayer(name,team) {
        try {
            
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO player (player_name, Team_Name) VALUES (?,?);";

                connection.query(query, [name, team] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);
                })
            });
            return {
                id : insertId,
                name : name,
                team : team,
            };
        } catch (error) {
            console.log(error);
        }
    }
    async deleteTeam(name) {
        try {
             
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM Team WHERE name = ?";
    
                connection.query(query, [name] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async deletePlayer(name) {
        try {
             
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM player WHERE player_name = ?";
    
                connection.query(query, [name] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async updatePoints(team_name, points) {
        try {
            
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE Team SET points = ? WHERE name = ?";
    
                connection.query(query, [points, team_name] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async updatePlayerNewTeam(player_name, newTeam) {
        try {
            
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE Player SET Team_Name = ? WHERE player_name = ?";
    
                connection.query(query, [newTeam, player_name] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }


}

module.exports = DbService;

