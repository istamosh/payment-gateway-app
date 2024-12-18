const express = require("express");
const { checkTable } = require("./models/mysql");

const app = express();
const port = 3001;

checkTable();

app.get("/", (req, res) => {
  return res.send("bonjour Istamosh!");
});

const registration = require("./routes/membership/registration");

app.use("/registration", registration);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
