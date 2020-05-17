import mongoose from "mongoose";

const url = "mongodb://127.0.0.1:27017/ecom";

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    return console.log(`Successfully connected to database`);
  })
  .catch((error) => {
    console.log("Error connecting to database: ", error);
  });

let db = mongoose.connection;

export default db;
