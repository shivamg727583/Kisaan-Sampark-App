import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  details: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User model, assuming farmers are users with a specific role
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const Product = mongoose.model('Product', productSchema);

export default  Product;
