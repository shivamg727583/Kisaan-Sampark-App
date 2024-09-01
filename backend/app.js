import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/indexRouter.js'; // Use .js extension
import connectDB from './config/mongoose-config.js'; // Use .js extension
import cors  from 'cors';
import productRoutes from './routes/productRouter.js';
import cartRoutes from './routes/cartRouter.js';
import orderRoutes from './routes/orderRouter.js';
import cookieParser from 'cookie-parser';
dotenv.config();

// Connect to MongoDB
connectDB();


const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
// Define your routes
app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/cart', cartRoutes);




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
