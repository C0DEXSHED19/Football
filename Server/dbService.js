const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Ubermacht443',
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
                const query = "SELECT name, stadium, wins, losses FROM team;";

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
                const query = "SELECT name, goals, assists, team_name FROM Player JOIN Person ON Player.personid=Person.id;";

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
}

module.exports = DbService;

