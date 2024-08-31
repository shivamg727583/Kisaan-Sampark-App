import express from 'express';
import { login, ProfileUpdate, signup } from '../controllers/authcontroller.js';
import authMiddleware from '../middlewares/authmiddleware.js';
import upload from '../utils/multer.js';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);

router.put('/profile/update/:id', authMiddleware,upload.single('profilepic') ,ProfileUpdate);


export default router;
