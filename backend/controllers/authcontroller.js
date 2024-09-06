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
      console.log("not user")
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      console.log("password error")
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, userType: user.userType },  process.env.JWT_SECRET
    );

res.cookie('token',token);

    res.status(201).json({   message: 'Login successful',  token, user  });

  } catch (err) {
    console.log("server err")

    res.status(500).json({ error: err.message });
  }
};

export const ProfileUpdate = async (req, res) => {
  try {
    const userId = req.params.id;
    // Find the user in the database
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Log request body and uploaded file (if any)
    console.log("body => ", req.body);
    console.log('Uploaded file:', req.file); 

    // Prepare updateData by merging old data with new data from the request
    const updateData = {
      name: req.body.name || user.name,
      email: req.body.email || user.email,
      farmLocation: req.body.farmLocation || user.farmLocation,
      details:req.body.details || user.details,
      mobile:req.body.mobile || user.mobile,
    };

    // If a new profile picture is uploaded, update the profilePic field
    if (req.file) {
      console.log(req.file)
      const base64Image = req.file.buffer.toString('base64');
      updateData.profilePic = `data:${req.file.mimetype};base64,${base64Image}`;
    } else {
      updateData.profilePic = user.profilePic;  // Keep old profilePic if not updated
    }

    // Find the user and update the profile with the new or old values
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    // Return the updated profile details
    res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ error: err.message });
  }
};


