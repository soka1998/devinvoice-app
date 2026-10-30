import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from './config/db.js';


dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
    res.json({
        status: 'success',
        message: 'DevInvoice API is running smoothly ',
        timestamp: new Date()
    });
});
    
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();
app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
});
}

startServer();