// app.js
import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import roleRoutes from "./src/routes/roleRoutes.js";
import categoryRoutes from "./src/routes/categoryRoutes.js";
import brandRoutes from "./src/routes/brandRoutes.js";
import colorRoutes from "./src/routes/colorRoutes.js";
import sizeRoutes from "./src/routes/sizeRoutes.js";
import addressRoutes from "./src/routes/addressRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
import variantRoutes from "./src/routes/variantRoutes.js";
import priceRoutes from "./src/routes/priceRoutes.js";
import imageRoutes from "./src/routes/imageRoutes.js";
import cartRoutes from "./src/routes/cartRoutes.js";
import wishlistRoutes from "./src/routes/wishlistRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";
import orderItemRoutes from "./src/routes/orderItemRoutes.js";
import paymentRoutes from "./src/routes/paymentRoutes.js";
import shipmentRoutes from "./src/routes/shipmentRoutes.js";
import returnRoutes from "./src/routes/returnRoutes.js";
import refundRoutes from "./src/routes/refundRoutes.js";
import reviewRoutes from "./src/routes/reviewRoutes.js";
import inventoryRoutes from "./src/routes/inventoryRoutes.js";
import warehouseRoutes from "./src/routes/warehouseRoutes.js";
import couponRoutes from "./src/routes/couponRoutes.js";
import promotionRoutes from "./src/routes/promotionRoutes.js";
import attributeRoutes from "./src/routes/attributeRoutes.js";
import attributeValueRoutes from "./src/routes/attributeValueRoutes.js";
import auditLogRoutes from "./src/routes/auditLogRoutes.js";
import webhookRoutes from "./src/routes/webhookRoutes.js";
import sliderRoutes from "./src/routes/sliderRoutes.js";
import uploadRoute  from "./src/routes/uploadRoutes.js";

import { responseMiddleware } from "./src/middlewares/responseMiddleware.js";
import cors from "cors";
const app = express();
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(cookieParser());
app.use(responseMiddleware);
// mount routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/colors", colorRoutes);
app.use("/api/sizes", sizeRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/products", productRoutes);
app.use("/api/variants", variantRoutes);
app.use("/api/prices", priceRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/wishlists", wishlistRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/order-items", orderItemRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/shipments", shipmentRoutes);
app.use("/api/returns", returnRoutes);
app.use("/api/refunds", refundRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/warehouses", warehouseRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/promotions", promotionRoutes);
app.use("/api/attributes", attributeRoutes);
app.use("/api/attribute-values", attributeValueRoutes);
app.use("/api/audit-logs", auditLogRoutes);
app.use("/api/webhooks", webhookRoutes);
app.use("/api/sliders", sliderRoutes);
app.use("/api/upload", uploadRoute);  
// basic health
app.get("/", (req, res) => res.json({ ok: true }));

export default app;
