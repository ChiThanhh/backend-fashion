// routes/authRoutes.js
const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/profile', authController.getProfile)


router.get('/user', authController.getAllUser)
router.get('/user/:id', authController.getUserById)
router.put('/user/:id', authController.updateUserById)
router.delete('/user/:id', authController.deleteUserById)

module.exports = router;
