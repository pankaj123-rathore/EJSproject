import Product from "../model/product.model.js";

export const indexPage = async (request,response,next)=>{
    const productList = await Product.findAll();
    // const trendingProduct = await Product.findingTrending();
    // console.log(" productList = ", productList);
    return response.render("index.ejs",{products: productList,currentUser: request.session.user,isLoggedIn: request.session.isLoggedIn,});
}
export const contactPage = (request,response,next)=>{
    return response.render("contact.ejs",{currentUser: request.session.user ,isLoggedIn: request.session.isLoggedIn})
}

export const aboutPage =(request,response,next)=>{
    return response.render("about.ejs",{currentUser: request.session.user,isLoggedIn: request.session.isLoggedIn});
}

export const signInPage = (request,response,next)=>{
    return response.render("signin.ejs");
}

export const signUpPage = (request,response,next)=>{
    return response.render("signup.ejs");
}