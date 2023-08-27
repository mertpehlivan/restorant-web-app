const mysql = require('mysql2');


const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'restaurant'
};
const connection = mysql.createConnection(dbConfig);

module.exports = connection;





