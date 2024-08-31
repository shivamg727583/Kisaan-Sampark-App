import User from '../models/user-model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const signup = async (req, res) => {
  try {
    const { name, email, password, userType, details, farmLocation } = req.body;

    const user = await User.findOne({email});
    if (user) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    
    
    if (!['user', 'farmer'].includes(userType)) {
      return res.status(400).json({ message: 'Invalid userType specified' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      userType,
      details: userType === 'farmer' ? details : null,
      farmLocation: userType === 'farmer' ? farmLocation : null,
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      console.log("password error")
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, userType: user.userType },  process.env.JWT_SECRET, { expiresIn: '1h' }
    );



    res.status(201).json({   message: 'Login successful',  token, user  });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const ProfileUpdate = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prepare update object
    const updateData = {};

    // Check if a new profile picture is uploaded
    if (req.file) {
      // Convert the image buffer to a base64 string
      const base64Image = req.file.buffer.toString('base64');
      updateData.profilePic = `data:${req.file.mimetype};base64,${base64Image}`;
    }

    // Update other user fields from request body
    const { name, email, mobile, details, farmLocation } = req.body;
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (mobile) updateData.mobile = mobile;
    if (details) updateData.details = details;
    if (farmLocation) updateData.farmLocation = farmLocation;

    // Use findOneAndUpdate to update user document
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: updateData },
      { new: true } // This option returns the updated document
    );

    res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ error: err.message });
  }
};
