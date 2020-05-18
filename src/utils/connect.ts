import mongoose from "mongoose";
require("dotenv").config();

const url = process.env.MONGO;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    return console.log(`Success fully  connected to database`);
  })
  .catch((error) => {
    console.log("Error connecting to database: ", error);
  });

export let db = mongoose.connection;
