const express = require('express');
const router = express.Router();
const favoriteProductController = require('../controllers/favoriteProductController');

router.get('/', favoriteProductController.getFavoriteProducts);
router.get('/:id', favoriteProductController.getFavoriteProductById);
router.post('/', favoriteProductController.createFavoriteProduct);
router.put('/:id', favoriteProductController.updateFavoriteProduct);
router.delete('/:id', favoriteProductController.deleteFavoriteProduct); 

module.exports = router;
