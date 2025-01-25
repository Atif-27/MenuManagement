import express, { Request, Response, NextFunction } from "express";
import connectDB from "./config/db";
import dotenv from "dotenv";
import ExpressResponse from "./utils/ExpressResponse.js";
import ExpressError from "./utils/ExpressError";

import categoryRoutes from "./routes/category.route";
import subcategoryRoutes from "./routes/subcategory.route.js";
import itemRoutes from "./routes/item.route.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Routes

app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/subcategories", subcategoryRoutes);
app.use("/api/v1/items", itemRoutes);

// ! Error Handler Middleware
app.use(
  (err: ExpressError, req: Request, res: Response, next: NextFunction) => {
    const { statusCode = 500, message = "Something went wrong" } = err;
    console.log(err.message);
    res.status(statusCode).json({ message });
    next();
  }
);

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
