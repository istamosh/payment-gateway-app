const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

const execute = (query, callback) => {
  connection.connect((err) => {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + connection.threadId);
  });

  connection.query(query, (error, results, fields) => {
    if (error) {
      throw error;
    }
    callback({ error, results, fields });
  });

  connection.end((err) => {
    if (err) {
      throw err;
    }
    console.log("connection ended gracefully.");
  });
};

module.exports = execute;
