const mysql = require("mysql");
require("dotenv").config();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

const checkTable = () => {
  pool.getConnection((err, connection) => {
    try {
      if (err) throw err;
      connection.query(
        "CREATE TABLE IF NOT EXISTS ??.?? (id INT AUTO_INCREMENT PRIMARY KEY, data JSON NOT NULL)",
        [process.env.DATABASE, "payment_gateway_app"],
        (error, results, fields) => {
          connection.release();
          console.log("Connection released.");
          if (error) throw error;
        }
      );
    } catch (error) {
      console.error(error);
    }
  });
};

module.exports = { pool, checkTable };
