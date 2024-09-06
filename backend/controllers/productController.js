import Product from '../models/product-model.js';



export const createProduct = async (req, res) => {
  try {
    const { name, category, price, details, farmer } = req.body;

    console.log('Request Body:', req.body);
    console.log('Request File:', req.file);

    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const imageUrl = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

    const product = new Product({
      name,
      category,
      price,
      details,
      imageUrl,
      farmer,
    });

    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('farmer', 'name email');
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('farmer', 'name email');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, category, price, details, imageUrl } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, category, price, details, imageUrl },
      { new: true }
    );
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product updated successfully', product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
