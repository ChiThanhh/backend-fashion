const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController'); // Sử dụng controller cho giỏ hàng

router.get('/', cartController.getCarts); // Lấy tất cả giỏ hàng
router.get('/:id', cartController.getCartById); // Lấy giỏ hàng theo ID
router.post('/', cartController.createCart); // Tạo giỏ hàng mới
router.put('/:id', cartController.updateCart); // Cập nhật giỏ hàng
router.delete('/:id', cartController.deleteCart); // Xoá giỏ hàng

module.exports = router;
