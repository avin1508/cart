const express = require('express');
const cartController = require('../controllers/cartController');

const router = express.Router();

router.post('/add', cartController.addToCart);
router.get('/:userId', cartController.getCart);
router.delete('/delete', cartController.deleteFromCart);
router.put('/update', cartController.updateCartProductQuantity);

module.exports = router;
