const express = require('express');
const router = express.Router();
const shippingController = require('../controllers/shippingController');

router.get('/', shippingController.getShippings);
router.get('/:id', shippingController.getShippingById);
router.post('/', shippingController.createShipping);
router.put('/:id', shippingController.updateShipping);
router.delete('/:id', shippingController.deleteShipping);

module.exports = router;
