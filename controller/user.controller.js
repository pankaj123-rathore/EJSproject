
  import User from "../model/user.model.js";

  export const uploadProfile = (request,response,next)=>{
    if(request.file){
      let fileName = request.file.filename;
      let currentUser = request.session.user;
      let userId = currentUser.id;
      console.log("current User : ",currentUser);
      User.updateOne(fileName,userId)
      .then(result=>{
        request.session.user.profile = fileName;
        return response.redirect("/");
      }).catch(err=>{
        console.log(err);
      });
    }
    
  }
          
  export const profilePage = (request,response,next)=>{
      return response.render("profile.ejs",{currentUser: request.session.user,isLoggedIn: request.session.isLoggedIn});
  }

  // export const signIn = (request,response,next)=>{
  //     let {email,password} = request.body;
  //     User.find(email,password)
  //     .then(result=>{
  //         if(result.length){
  //             console.log(request);
  //             request.session.isLoggedIn = true;
  //             request.session.currentUser = result[0];
  //             return response.redirect("/");
  //         }
  //         else
  //             return response.redirect("/sign-in");
  //     })
  //     .catch(err=>{
  //         return response.end("something went wrong..");
  //     })
  // }

export const signIn = (request, response, next) => {
  let { email, password } = request.body;

  User.find(email, password)
    .then(result => {
      if (result.length) {
        request.session.isLoggedIn = true;
        request.session.user = {id: result[0].id,name: result[0].name,email: result[0].email,  profile: result[0].profile };

        
        request.session.save(err => {
          if (err) {
            console.error("Session save error:", err);
            return response.status(500).send("Session error");
          }
          return response.redirect("/");
        });
      } else {
        return response.redirect("/sign-in");
      }
    })
    .catch(err => {
      console.error("Sign-in error:", err);
      return response.status(500).send("Something went wrong...");
    });
};

  export const signUp = (request,response,next)=>{
      let {name,email,password,contact} = request.body;
      let user = new User(null,name,email,password,contact);
      user.create().then(result =>{
          return response.redirect("/sign-in")
      }).catch(err=>{
          console.log(err);
          response.end("something went wrong...");
      });
  }

  export const checkForEmail = (request,response,next)=>{
    User.hasEmail(request.params.emailId)
    .then(result=>{
      if(result.length)
      return response.status(200).json({status: true,message: "Email id is alread taken"});
      else
      return response.status(200).json({status: false,message: "Available"});
    }).catch(err=>{
      console.log(err);
    })
  }

  export const signOut = (request,response,next) =>{
      request.session.isLoggedIn = false;
      request.session.user = null;
      request.session.destroy();
      return response.redirect("/");
  }

