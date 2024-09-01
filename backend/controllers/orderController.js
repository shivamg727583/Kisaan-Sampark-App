import Order from '../models/order-model.js';
import Product from '../models/product-model.js'; // Assuming you have a Product model

export const createOrder = async (req, res) => {
  try {
    const { products } = req.body; // products should be an array of objects with product ID and quantity

    let totalAmount = 0;
    const productIds = products.map(item => item.product);

    // Fetch product details from the database
    const productDetails = await Product.find({ '_id': { $in: productIds } }).exec();
    const productMap = productDetails.reduce((map, product) => {
      map[product._id.toString()] = product;
      return map;
    }, {});

    // Calculate total amount based on product prices
    products.forEach(item => {
      const product = productMap[item.product.toString()];
      if (product) {
        totalAmount += product.price * item.quantity;
      } else {
        // Handle case where product is not found
        return res.status(404).json({ message: `Product with ID ${item.product} not found` });
      }
    });

    // Create and save the order
    const order = new Order({
      buyer: req.user.id, // Assuming req.user.id is set from authentication middleware
      products,
      totalAmount,
    });

    await order.save();
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user.id }).populate('products.product', 'name price');
    res.status(201).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
