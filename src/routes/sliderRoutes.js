const express = require('express');
const router = express.Router();
const sliderController = require('../controllers/sliderController');  

router.get('/', sliderController.getSliders);  
router.get('/:id', sliderController.getSliderById);  
router.post('/', sliderController.createSlider);  
router.put('/:id', sliderController.updateSlider);  
router.delete('/:id', sliderController.deleteSlider);  

module.exports = router;
