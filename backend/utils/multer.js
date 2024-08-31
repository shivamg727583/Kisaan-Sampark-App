import multer from 'multer';

// Multer memory storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export default upload;
