import express from "express";
import { handlePurchase } from "../controller/order.controller.js"; // using the controller you've written
import { auth } from "../middileware/auth.js";

const router = express.Router();

// Handle POST request after purchase form submission
router.post("/purchase", auth, handlePurchase); 

export default router;