 import Order from "../model/order.model.js";
 import Product from "../model/product.model.js";



export const handlePurchase = async (request, response) => {
  try {
    const { productId, name, email, phone, address, paymentMethod, quantity, unitPrice } = request.body;

    const totalPrice = quantity * unitPrice;

  
    const order = new Order(
      productId,name,email,phone,address,paymentMethod,quantity,totalPrice,new Date()
    );

  
    await order.create();

     response.render("order-success.ejs", {customerName: name,totalPrice: totalPrice.toFixed(2),currentUser: request.session.user});
  } catch (err) {
    console.log("Order Error:", err);
    response.status(500).send("Something went wrong while placing the order.");
  }
};
