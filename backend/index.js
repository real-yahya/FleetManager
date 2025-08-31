import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import { connectDB } from './config/db.js';
import { PORT } from './config/env.js';
import vehicleRouter from './routes/vehicles.routes.js';


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());


app.use('/api/v1/vehicles', vehicleRouter)






app.listen(PORT, async ()=> {
    await connectDB();
    console.log(`Server started at http://localhost:${PORT}`);
});



 