import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from "./routes/auth.route.js";
import cookieParser from 'cookie-parser';
import listingRoute from './routes/listing.route.js';

dotenv.config();

mongoose.connect("mongodb+srv://ayushm850:ayush@cluster0.njvip1g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log('connected to mongodb!'); 
  })
  .catch((err) => {
    console.log("not connected", err);
  });
const app = express();
app.use(express.json()); 
app.use(cookieParser());

app.use("/api/auth", router );
app.use("/api/listing" , listingRoute);



app.use((err, req , res , next) => {
  const statusCode  = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message, 
  })
})  
 
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
 