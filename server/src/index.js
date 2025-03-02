import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoute from '../src/routes/authRoutes.js';
import messageRoute from '../src/routes/messageRoutes.js'
import cookieParser from "cookie-parser"
import { connectDB } from './lib/db.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoute);
app.use('/api/nessage', messageRoute);
app.use(cors({
    origin: "http://localhost:50173",
    credentials: true
}));

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
    //MONGODB CONNECTION
    connectDB();
});


