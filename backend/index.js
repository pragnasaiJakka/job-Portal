import dotenv from "dotenv"; // ✅ Keep only one import
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan"; // For logging
import securityHeaders from "./middlewares/security.js"; // Security middleware

import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

// Load environment variables from .env file in the backend directory
dotenv.config({ path: './backend/.env' });

// Ensure essential environment variables are set
if (!process.env.JWT_SECRET || !process.env.MONGO_URI || !process.env.PORT) {
    throw new Error("Missing essential environment variables!");
}

const app = express();

// Middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());

// Security middleware
app.use(securityHeaders); // Adds security headers

// Logging middleware
app.use(morgan(':method :url :status :response-time ms - :res[content-length]')); // Adds logs for each request

// ✅ FIXED CORS
const corsOptions = {
    origin: "http://localhost:5173", // Allow frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true // Allow cookies & authentication tokens
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;  // Use PORT from .env or default to 3000

// Test route
app.get("/", (req, res) => {
    res.send("Server is running!");
});

// API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
});
