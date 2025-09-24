export const responseMiddleware = (req, res, next) => {
    res.success = (data = null, message = "Thành công", status = 200) => {
        return res.status(status).json({
            success: true,
            message,
            data,
            error: null,
        });
    };
    res.error = (message = "Lỗi server", code = "SERVER_ERROR", status = 500, detail = null) => {
        return res.status(status).json({
            success: false,
            message,
            data: null,
            error: {code, detail},
        });
    };

    next();
};