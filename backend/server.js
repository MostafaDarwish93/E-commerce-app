import express from 'express';
import cors from 'cors';
import 'dotenv/config';

// app config
const app = express(); // create an instance of express
const port = process.env.PORT || 9000;

// middleware

app.use(express.json()); // to parse the json data
app.use(cors());// to access the api from any domain

// api endpoints

app.get('/',(req,res)=>{
    res.status(200).send('Hello World');
})

// listen

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
}); // to start the server