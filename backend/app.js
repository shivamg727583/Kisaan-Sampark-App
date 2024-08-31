import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/indexRouter.js'; // Use .js extension
import connectDB from './config/mongoose-config.js'; // Use .js extension
import cors  from 'cors'
dotenv.config();

// Connect to MongoDB
connectDB();


const app = express();

app.use(cors());
app.use(express.json());

// Define your routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
