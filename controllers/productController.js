const Product = require('../models/Product');

exports.addMultipleProducts = async (req, res) => {
  const products = req.body;

  try {
    const createdProducts = await Product.bulkCreate(products);
    res.status(201).json(createdProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
