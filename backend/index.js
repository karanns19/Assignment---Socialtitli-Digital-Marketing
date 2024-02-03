// Dependencies - Type Module
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import Connection from './database/connection.js';
import router from './apiRoutes/apiRoutes.js';

//.env File Configuration
dotenv.config();

// Express App 
const app = express()
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/', router)

// Database Connection
Connection(process.env.DB_USERNAME, process.env.DB_PASSWORD)

// Listening PORT
app.listen(process.env.PORT, () => console.log(`Server is running successfully on PORT ${process.env.PORT}`));