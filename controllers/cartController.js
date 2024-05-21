const Cart = require('../models/Cart');
const CartProduct = require('../models/CartProduct');
const User = require('../models/User');
const Product = require('../models/Product')



exports.addToCart = async (req, res) => {
  const { userId, products } = req.body;

  try {
    let cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      cart = await Cart.create({ userId });
    }

    for (const { productId, quantity } of products) {
      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      if (product.quantity < quantity) {
        return res.status(400).json({ error: 'Insufficient product quantity' });
      }

      await CartProduct.upsert({ cartId: cart.id, productId, quantity });
    }

    res.status(200).json({ message: 'Products added to cart' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({
      where: { userId },
      include: {
        model: Product,
        through: {
          attributes: ['quantity'],
        },
      },
    });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const totalSum = cart.Products.reduce((sum, product) => sum + product.price * product.CartProduct.quantity, 0);

    res.status(200).json({ cart, totalSum });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteFromCart = async (req, res) => {
  const { cartId, productIds } = req.body;

  try {
    await CartProduct.destroy({ where: { cartId, productId: productIds } });

    res.status(200).json({ message: 'Products removed from cart' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCartProductQuantity = async (req, res) => {
  const { cartId, productId, quantity } = req.body;

  try {
    const cartProduct = await CartProduct.findOne({ where: { cartId, productId } });
    if (!cartProduct) {
      return res.status(404).json({ error: 'Product not found in cart' });
    }

    const product = await Product.findByPk(productId);
    if (product.quantity < quantity) {
      return res.status(400).json({ error: 'Insufficient product quantity' });
    }

    cartProduct.quantity = quantity;
    await cartProduct.save();

    res.status(200).json({ message: 'Product quantity updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
