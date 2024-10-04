import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import morgan from "morgan";
import connectDB from "./infrastructure/config/db";
import userRouter from "./infrastructure/routes/userRouter";
import path from "path";
import cookieParser from 'cookie-parser';

const app = express()

// Config the Dotenv
dotenv.config()

// Use morgan middleware to log HTTP requests
app.use(morgan("dev"))

// Setting Cors 
app.use(cors({
  origin: "https://blog-management-client.vercel.app",
  credentials: true,
}));



app.use(cookieParser())

// For parsing application/json
app.use(express.json()); 
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); 

app.use(express.static(path.join(__dirname, "../infrastructure/public")));

app.use("/api",userRouter)

// Mongodb Connect
connectDB()

// Server 
const PORT = process.env.PORT||4000
app.listen(PORT,()=>{
  console.log("Server is running : http://localhost:4000")
})


export default app