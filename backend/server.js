import express from "express";
import authRoutes from "./routes/auth.routes.js";
import dotenv from "dotenv";
import connectMongoDB from "./db/connectMongoDB.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

/* use() is used to define middleware that executes on every request,
 regardless of the HTTP method (GET, POST, PUT, DELETE, etc.) */
app.use(express.json()); // to parse req body(the data that is coming from the user through the react app)
app.use(express.urlencoded({ extended: true })); // to parse form data(urlencoded)

app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectMongoDB(); // Once our server is started/up and running, we connect to the database
});