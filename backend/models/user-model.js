import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile:{
    type:Number,
  },
  profilePic:{
    type:String,
  },
  userType: {
    type: String,
    enum: ['user', 'farmer'],
    default: 'user', // Default to 'user' if not specified
  },
  // Add additional fields for farmers if needed
  details: {
    type: String,
    trim: true,
    default: null, // Only relevant if the user is a farmer
  },
  farmLocation: {
    type: String,
    trim: true,
    default: null, // Only relevant if the user is a farmer
  },
 


});

const User = mongoose.model('User', userSchema);

export default User;


// {
//   "name":"shivam",
//  "email":"f@f.com",
//  "password":"12345",
//  "mobile":"1234567890",
//  "userType":"farmer",
//  "details":"I am Farmer",
//  "farmLocation":"Bhopal"
 
// }