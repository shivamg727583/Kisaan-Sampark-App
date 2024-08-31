import Order from '../models/order-model.js';

export const createOrder = async (req, res) => {
  try {
    const { products } = req.body;
    let totalAmount = 0;

    products.forEach(item => {
      totalAmount += item.price * item.quantity;
    });

    const order = new Order({
      buyer: req.user.id,
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
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
