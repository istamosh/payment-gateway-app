const express = require("express");
const query = require("./mysql");

query("SELECT 1 + 1 AS solution", (res) => {
  console.log(res.results[0].solution);
});

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
