import express from "express";
import { saveInBulk,getProductById,purchasePage,getTrendingProducts,addToCart } from "../controller/product.controller.js";
import { auth } from "../middileware/auth.js";
const router = express.Router();

router.post("/save-in-bulk",saveInBulk);
// router.get("/buy-now/:productId",buyNowPage);
router.get("/",getTrendingProducts);
router.get("/purchase/:productId",auth,purchasePage);
router.get("/add-to-cart/:productId", auth, addToCart);
// router.post("/purchase",handlePurchase);
router.get("/:productId",getProductById);

export default router;