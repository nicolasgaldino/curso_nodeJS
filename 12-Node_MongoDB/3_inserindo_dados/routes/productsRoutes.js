import express from "express";
const router = express.Router();

import ProductController from "../controllers/ProductController.js";

router.get("/", ProductController.showProducts);
router.get("/create", ProductController.createProduct);
router.post("/create", ProductController.createProductPost);

export default router;
