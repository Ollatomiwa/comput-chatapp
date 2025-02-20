import mongoose from 'mongoose';

export const connection = async() => {
    try {
        const conn = await mongoose.connect(process.env.MongoDB_URL);
        console.log(`MongoDB connected: ${conn.connection.host}`);
        
    } catch (error) {
        console.log('MongoDB connection error:', error);
        
    }
};