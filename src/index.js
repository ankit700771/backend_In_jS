// require('dotenv').config
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "../src/app.js";

// this lines are only configure the path of a env file
dotenv.config({
  path: "./env",
});

// here we recive a promiss that's why we use .then() and .catch method
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log("MONGODB connection failed !!", error));

// import express from "express";

// const app = express();

// (async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//     app.on("error", (error) => {
//       console.log(("Error", error));
//       throw error;
//     });

//     app.listen(process.env.PORT, () => {
//       console.log(`App is listing on port ${process.env.PORT}`);
//     });
//   } catch (error) {
//     console.error("Error", error);
//     throw error;
//   }
// })();
