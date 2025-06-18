import express from "express";
import IndexRouter from "./routes/index.route.js";
import UserRouter from "./routes/user.route.js";
import ProductRouter from "./routes/product.route.js";
import bodyParser from "body-parser";
import session from "express-session";
import OrderRouter from "./routes/order.route.js";
import CartRouter from "./routes/cart.route.js";
const app = express();

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
    secret: "welcomeprogrammers"
}));
app.use(express.static("./public"));
app.use((req, res, next) => {
    res.locals.isLoggedIn = req.session.isLoggedIn || false;
    res.locals.currentUser = req.session.currentUser || null;
    next();
});
app.use("/cart",CartRouter);
app.use("/order",OrderRouter);
app.use("/product",ProductRouter);
app.use("/user",UserRouter);
app.use("/",IndexRouter);

app.listen(3000,()=>{
    console.log("Server Started....")
});

