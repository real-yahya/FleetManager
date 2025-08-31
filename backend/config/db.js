import mongoose from "mongoose";
import { CONNECTION_URL, NODE_ENV } from "./env.js";

if(!CONNECTION_URL) {
    throw new Error('Please define the MongoDB_URI environment variable inside .env.<development/production>.local')
}

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(CONNECTION_URL);
        console.log(`Mongo DB Connected: ${conn.connection.host}`);
        console.log(`Connected to database in ${NODE_ENV} mode.`)
    } catch (error) {
        console.error(`Error connecting to database: ${error.message}`);
        process.exit(1);
    }
}