import express from "express";
import dotenv from "dotenv";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
//brings productRoutes.js
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
// import { use } from "express/lib/application";

//calls dotenv
dotenv.config();

//calls connectDB
connectDB();

const app = express();

//middleware example:
// app.use((req, res, next) => {
//   console.log(req.originalUrl);
//   next();
// });

//middleware: allow us to accept json data in the body
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

//mount /api/products : to productRoutes
app.use("/api/products", productRoutes);

//mount /api/users
app.use("/api/users/", userRoutes);

//fall back for 404 errors : for something that is not a valid route
app.use(notFound);

//Create custom error handler
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
