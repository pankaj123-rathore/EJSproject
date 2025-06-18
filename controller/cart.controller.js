import Cart from "../model/cart.model.js";

export const viewCart = async (request, response) => {
  try {
    const userId = request.session.user.id;
    const cartItems = await Cart.getCartItemsByUser(userId);
    response.render("view-cart", { cartItems, currentUser: request.session.user });
  } catch (err) {
    console.error("Cart Fetch Error:", err);
    response.status(500).json({error:"Internal server Error..."});
  }
};

export const removeCartItem = async(req, res) => {
  try{
     const cartItemId = req.params.id;

    await Cart.removeItem(cartItemId); 

    res.redirect("/cart"); 
  }catch(err){
   console.log(err);
   return response.status(500).json({error:"Intenal Server Error"});
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const cartId = req.params.id;
    const newQuantity = parseInt(req.body.quantity);

    if (isNaN(newQuantity) || newQuantity < 1) {
      return res.status(400).send("Invalid quantity");
    }

    await Cart.updateQuantity(cartId, newQuantity);

    res.redirect("/cart"); // ✅ redirect to updated cart
  } catch (err) {
    console.error("Update Cart Error:", err);
    res.status(500).send("Error updating cart item");
  }
};





    