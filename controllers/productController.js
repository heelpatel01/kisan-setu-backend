const Product = require("../models/Product.js");

// Add Product
exports.addProduct = async (req, res) => {
  const { name, price, description, category } = req.body;
  try {
    let product = new Product({ name, price, description, category });
    await product.save();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
