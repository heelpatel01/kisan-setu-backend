const Cart = require("../models/Cart");

// Add Product to Cart
exports.addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, products: [{ productId, quantity }] });
    } else {
      const productIndex = cart.products.findIndex(
        (p) => p.productId.toString() === productId
      );
      if (productIndex !== -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }
    }
    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get Cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate(
      "products.productId"
    );
    res.json(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
