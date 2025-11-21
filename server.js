import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"
import transactionRoutes from "./routes/transactionRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import dashboardRoutes from "./routes/dashboardRoutes.js"
import cookieParser from "cookie-parser";

dotenv.config();
connectDB();


const app = express();

app.use(cors({
    origin: "http://localhost:5173",   // your frontend URL
    credentials: true                 // IMPORTANT
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/users", userRoutes);
app.use("/api/transactions",transactionRoutes)
app.use("/api/categories", categoryRoutes);
app.use("/api/dashboard",dashboardRoutes);

const PORT=process.env.PORT || 5000;

app.listen(PORT ,()=>console.log(`Server running on port ${PORT}`));