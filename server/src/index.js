import express from 'express';
import dotenv from 'dotenv';
import authRoute from '../src/routes/authRoutes.js';
import { connectDB } from './lib/db.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.use('/api/auth', authRoute);
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
    //MONGODB CONNECTION
    connectDB();
});


