// Giới hạn số lượng yêu cầu từ một IP (không thay đổi).

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max:100,
});
module.exports = limiter;