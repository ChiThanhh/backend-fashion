const express = require('express');
const router = express.Router();
const orderItemController = require('../controllers/orderItemController');

router.get('/', orderItemController.getOrderItems);
router.get('/:id', orderItemController.getOrderItemById);
router.post('/', orderItemController.createOrderItem);
router.put('/:id', orderItemController.updateOrderItem);
router.delete('/:id', orderItemController.deleteOrderItem);

module.exports = router;
