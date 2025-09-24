import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv"

dotenv.config();

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

/**
 * Upload file lên Supabase
 * @param {Buffer|File} file - file buffer hoặc file từ form-data
 * @param {string} folder - tên folder trong bucket (avatars, sliders, ...)
 * @param {string} bucket - tên bucket (mặc định 'public')
 */

export const upload = async (file, folder = "default", bucket = "publics") => {
    try {
        const fileExt = file.originalname.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `${folder}/${fileName}`;

        const { error } = await supabase.storage
            .from(bucket)
            .upload(filePath, file.buffer, {
                cacheControl: "3600",
                upsert: false,
                contentType: file.mimetype,
            });
        if (error) throw error;

        const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);

        return { url: data.publicUrl, path: filePath };

    } catch (err) {
        console.error(err);
        throw err;
    }
}