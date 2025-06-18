import express from "express";
import {viewCart,removeCartItem,updateCartItem} from "../controller/cart.controller.js";
import { auth } from "../middileware/auth.js";

const router = express.Router();

router.get("/",auth ,viewCart);
// router.post("/update/:id", updateQuantity);
router.post("/remove/:id",auth, removeCartItem);
router.post("/update/:id", updateCartItem); // ✅ update route


export default router;