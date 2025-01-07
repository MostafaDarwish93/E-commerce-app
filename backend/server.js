import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';

dotenv.config({path:"./.env"}); // to access the environment variables
// app config
const app = express(); // create an instance of express
const port = process.env.PORT || 9000;
connectDB(); // connect to the database
connectCloudinary(); // connect to the cloudinary
// middleware

app.use(express.json()); // to parse the json data
app.use(cors());// to access the api from any domain

// api endpoints
app.use('/api/user', userRouter);

app.get('/',(req,res)=>{
    res.status(200).send('Hello World');
})

// listen

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
}); // to start the server