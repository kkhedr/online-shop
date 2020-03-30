const authModel =require('../models/auth.model')
const validationResult = require("express-validator").validationResult
exports.getSignup = (req,res,next)=>{
    res.render("signup",{
      ValidationError : req.flash("validationError"),
      isAdmin : false
    })
}

exports.postSignup = (req,res,next)=>{
  
  if(validationResult(req).isEmpty()){
    authModel.CreateNewUser(req.body.username, req.body.email, req.body.password)
    .then(()=>{
      res.redirect("/login")
    }).catch(err => {
      console.log(err)
      res.redirect("/signup")
    })
  }else{
    req.flash("validationError" , validationResult(req).array())
    res.redirect("/signup")
  }
    
}

exports.getLogin = (req,res,next)=>{
    res.render("login",{
      authError : req.flash("AuthErr")[0],
      isAdmin: false
    })
}

exports.postLogin = (req,res,next)=>{
  authModel.Login(req.body.email, req.body.password)
  .then(result =>{
    req.session.userId = result.id;
    req.session.isAdmin = result.isAdmin;
    req.session.userEmail =result.userEmail;
    res.redirect("/");
  }).catch(err => {
    req.flash("AuthErr",err);
    res.redirect("/login");
  })
}

exports.Logout=(req,res,next)=>{
  req.session.destroy(()=>{
    res.redirect('/');
  })
}
