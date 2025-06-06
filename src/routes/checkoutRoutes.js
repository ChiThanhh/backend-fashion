const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');

router.get('/', checkoutController.getCheckouts);
router.get('/:id', checkoutController.getCheckoutById);
router.post('/', checkoutController.createCheckout);
router.put('/:id', checkoutController.updateCheckout);
router.delete('/:id', checkoutController.deleteCheckout);

module.exports = router;
