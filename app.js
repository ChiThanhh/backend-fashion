// app.js
const express = require('express')
const cors = require('cors')
const authRoutes = require('./src/routes/authRoutes')
const contactRoutes = require('./src/routes/contactRoutes')
const menuRoutes = require('./src/routes/menuRoutes')
const categoryRoutes = require('./src/routes/categoryRoutes')
const topicRoutes = require('./src/routes/topicRoutes')
const postRoutes = require('./src/routes/postRoutes')
const productRoutes = require('./src/routes/productRoutes')
const brandRoutes = require('./src/routes/brandRoutes')
const sliderRoutes = require('./src/routes/sliderRoutes')
const bannerRoutes = require('./src/routes/bannerRoutes')
const favoriteProductRoutes = require('./src/routes/favoriteProductRoutes')
const cartRoutes = require('./src/routes/cartRoutes')
const checkoutRoutes = require('./src/routes/checkoutRoutes')
const orderRoutes = require('./src/routes/orderRoutes')
const orderItemRoutes = require('./src/routes/orderItemRoutes')
const shippingRoutes = require('./src/routes/shippingRoutes')
const paymentRoutes = require('./src/routes/paymentRoutes')
const settingRoutes = require('./src/routes/settingRoutes')
const fileRoutes = require('./src/routes/fileRoutes');
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/contacts', contactRoutes)
app.use('/api/menu', menuRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/brand', brandRoutes)
app.use('/api/topic', topicRoutes)
app.use('/api/post', postRoutes)
app.use('/api/product', productRoutes)
app.use('/api/banner', bannerRoutes)
app.use('/api/slider', sliderRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/favorite', favoriteProductRoutes)
app.use('/api/checkout', checkoutRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/order-detail', orderItemRoutes)
app.use('/api/shipping', shippingRoutes)
app.use('/api/payment', paymentRoutes)
app.use('/api/setting', settingRoutes)
app.use('/api/file', fileRoutes)



// Middleware xử lý lỗi 404 (Not Found)
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'API route not found'
    });
});

// Middleware xử lý lỗi chung (500)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: err.message
    });
});

module.exports = app
