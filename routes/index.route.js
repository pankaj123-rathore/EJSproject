import express from "express";
import {indexPage,signUpPage,signInPage,aboutPage,contactPage} from "../controller/index.controller.js"
const router = express.Router();

router.get("/",indexPage);

router.get("/about",aboutPage);

router.get("/contact",contactPage);

router.get("/sign-in",signInPage);

router.get("/sign-up",signUpPage);


export default router;