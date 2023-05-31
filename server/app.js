import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import taskRoute from './routes/taskRoute.js';
import userRoute from './routes/userRoute.js';
import dotenv from 'dotenv'
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.connect_db)
.then(()=>console.log('db connected..'))
.catch((err)=>console.log(err))

app.use('/task',taskRoute)
app.use('/user',userRoute)

app.listen(5000,()=>console.log('app running on port 5000'))

