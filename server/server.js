const express = require("express");
const pool = require("./mysql");
require("dotenv").config();

try {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      "CREATE TABLE IF NOT EXISTS ??.?? (id INT AUTO_INCREMENT PRIMARY KEY, data JSON NOT NULL)",
      [process.env.DATABASE, "payment_gateway_app"],
      (error, results, fields) => {
        connection.destroy();
        console.log("Pooling success.");
        if (error) throw error;
      }
    );
  });
} catch (error) {
  console.error(error);
}

const app = express();
const port = 3001;

app.get("/", (req, res) => {
  return res.send("bonjour Istamosh!");
});

const registration = require("./routes/membership/registration");

app.use("/registration", registration);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
