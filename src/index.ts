import express from "express";
import connectDB from "./config/db";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ! DB and Server Connection
connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });
