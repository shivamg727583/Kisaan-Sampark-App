import Cart from '../models/cart-model.js';

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ buyer: req.user.id }).populate('items.product', 'name price');
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ buyer: req.user.id });

    if (cart) {
      const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
      await cart.save();
      res.json({ message: 'Cart updated successfully', cart });
    } else {
      const newCart = new Cart({
        buyer: req.user.id,
        items: [{ product: productId, quantity }],
      });
      await newCart.save();
      res.status(201).json({ message: 'Product added to cart', newCart });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const cart = await Cart.findOne({ buyer: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    await cart.save();
    res.json({ message: 'Product removed from cart', cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
