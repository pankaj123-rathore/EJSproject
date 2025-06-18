import Product from "../model/product.model.js";
import Order from "../model/order.model.js";
import Cart from "../model/cart.model.js";
import { response } from "express";

export const addToCart = async (request, response) => {
  try {
   
    const user = request.session.user;
    if (!user) {
      return response.status(401).send("Unauthorized");
    }

    const userId = user.id;
    const { productId } = request.params;

    await Cart.addToCart(userId, productId);

     response.render("profile.ejs",{isLoggedIn: request.session.isLoggedIn,currentUser: request.session.user})
  } catch (err) {
    console.error("Error adding to cart:", err);
    response.status(500).send("Something went wrong");
  }
};

export const getTrendingProducts = async (request,response,next)=>{
   try{
     const  trending = await Product.findingTrending(8);
     return response.render("index.ejs",{trending,isLoggedIn: request.session.isLoggedIn,currentUser: request.session.user})
   }catch(err){
      console.log(err);
       return response.render("index.ejs", {
      trending: [],                            
      isLoggedIn: request.session.isLoggedIn,
      currentUser: request.session.user
    });
   }
}


export const saveInBulk = async(request,response,next)=>{
    try{
        let productList = request.body;
        //console.log(request.body);
        for(let product of productList){
            await Product.create(product);
        }
        return response.status(201).json({message: "All product saved..."});
    }catch(err){
       console.log(err);
    }
} 

export const getProductById = (request,response,next) => {
    Product.findById(request.params.productId)
    .then(result =>{
       // console.log(result[0]);
        return response.render("viewmore.ejs",{product:result[0],isLoggedIn: request.session.isLoggedIn,currentUser: request.session.user});
    })
    .catch(err=>{
        console.log(err);
    });
}

// export const buyNowPage = async(request,response,next) => {
//     try{
//         let result = await Product.findById(request.params.productId);
//         let product = result[0];
//         console.log(product);
//         return response.render("buy-now.ejs",{product:result[0]});
//     }
//     catch(err){
//         console.log(err);
//     }
// }

export const purchasePage = async(request,response,next) => {
    try{
        let result = await Product.findById(request.params.productId);
         let product = result[0];
        console.log(product);
        return response.render("purchase.ejs",{product,isLoggedIn: request.session.isLoggedIn,currentUser: request.session.user});
    }
    catch(err){
        console.log(err);
    }
};

