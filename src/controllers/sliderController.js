import { Slider } from "../models/sliderModel.js";

export const SliderController = {
    async getAll(req, res) {
        try {
            const slider = await Slider.findAll();
            return res.success(slider, "Lấy danh sách slider thành công!")
        } catch (err) {
            console.error(err);
            res.error("Lỗi khi lấy danh sách slider!", "SERVER_ERROR", 500, err.message)
        }
    },
    async getById(req, res) {
        try {
            const slider = await Slider.findById(req.params.id);
            if (!slider) {
                return res.error("Slider không tồn tại", "SLIDER_NOT_FOUND", 400);
            }
            return res.success(slider, "Lấy slider thành công!")

        } catch (err) {
            console.error(err);
            res.error("Lỗi khi lấy id slider", "SERVER_ERROR", 500, err.message)
        }
    },
    async create(req, res) {
        try {
            const slider = await Slider.create(req.body);
            return res.success(slider, "Tạo mới slider thành công", 201);
        } catch (err) {
            console.error(err);
            res.error("Lỗi khi tạo mới slider", "SERVER_ERROR", 500, err.message)
        }
    },
    async update(req, res) {
        try {
            const slider = await Slider.update(req.params.id, req.body);
            if (!slider) {
                return res.error("Slider không tồn tại", "SLIDER_NOT_FOUND", 400);
            }
            return res.success(slider, "Cập nhật slider thành công");
        } catch (err) {
            console.error(err);
            res.error("Lỗi khi cập nhật slider", "SERVER_ERROR", 500, err.message);
        }
    },
    async delete(req, res) {
        try {
            const slider = await Slider.delete(req.params.id);
            if (!slider) {
                return res.error("Không tìm thấy slider", "SLIDER_NOT_FOUND", 400);
            }
            return res.success(slider, "Xóa slider thành công");
        } catch (err) {
            console.error(err);
            res.error("Lỗi khi xóa slider", "SERVER_ERROR", 500, err.message);
        }
    },

}