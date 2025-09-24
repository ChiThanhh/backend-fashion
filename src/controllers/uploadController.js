import { upload } from "../config/upload.js";

export const uploadController = async (req, res) => {
  try {
    const { folder } = req.body;
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const result = await upload(req.file, folder);
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};