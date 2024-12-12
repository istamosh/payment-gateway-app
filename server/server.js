import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();
const port = 3001;

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => console.log("Connected to your database!"));

// const clientOptions = {
//   serverApi: { version: "1", strict: true, deprecationErrors: true },
// };

// async function run() {
//   try {
//     // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
//     await mongoose.connect(uri, clientOptions);
//     await mongoose.connection.db.admin().command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await mongoose.disconnect();
//   }
// }
// run().catch(console.dir);

app.use(express.json());

app.get("/", (req, res) => {
  return res.send("bonjour Istamosh!");
});

import registration from "./routes/registration.js";

app.use("/registration", registration);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
