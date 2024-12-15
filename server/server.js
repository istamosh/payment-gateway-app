const express = require("express");
// const mongoose = require('mongoose')
// require("dotenv").config();

const app = express();
const port = 3001;

// mongoose.connect(process.env.DATABASE_URL);
// const db = mongoose.connection;
// db.on("error", (err) => console.error(err));
// db.once("open", () => console.log("Connected to your database!"));

app.get("/", (req, res) => {
  return res.send("bonjour Istamosh!");
});

const registration = require('./routes/membership/registration')

app.use("/registration", registration);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});