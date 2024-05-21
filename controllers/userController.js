const User = require('../models/User');

exports.createUser = async (req, res) => {
  const { name, email, password, address } = req.body;

  try {
    const user = await User.create({ name, email, password, address });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
