const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.post('/add-multiple', productController.addMultipleProducts);

module.exports = router;
