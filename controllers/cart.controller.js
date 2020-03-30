const cartModel = require('../models/cart.model');
const validationResult = require("express-validator").validationResult;

exports.PostCart = (req,res,next)=>{
if(validationResult(req).isEmpty())
{
    cartModel.addNewItem(req.session.userId,req.body.productId,{
        name : req.body.name,
        price : req.body.price,
        amount : req.body.amount,
        userId : req.session.userId,
        productId : req.body.productId,
        timestampp : Date.now(),
    }).then(() =>{
        res.redirect('/cart');
    }).catch(err => {
        console.log(err);
    })
}else{
   req.flash("ValidationErrors",validationResult(req).array())
   res.redirect(req.body.redirect)
}

}

exports.PostSave=(req,res,next)=>{
    if(validationResult(req).isEmpty())
{
    cartModel.editItem(req.body.cart_id,{
        amount : req.body.amount,
        timestamp : Date.now()
    })
    .then(() =>{
        res.redirect('/cart');
    }).catch(err => {
        console.log(err);
    })
}else{
   req.flash("ValidationErrors",validationResult(req).array())
   console.log(validationResult(req).array())
   res.redirect("/cart")
}
}

exports.PostDelete= (req,res,next)=>{
    cartModel.deleteCart(req.body.cart_id)
    .then((deleted)=>{
        req.flash("Deleted",deleted)
        //console.log(deleted)
        res.redirect('/cart');
    }).catch(err=>{
        console.log(err);
    })
}


exports.GetCart=(req,res,next)=>{
    cartModel.getItemByUserId(req.session.userId)
    .then(items => {
        res.render('usercart',{
            Items : items,
            isUser : true,
            userEmail:req.session.userEmail,
            massege : req.flash("ValidationErrors"),
            messageDelete : req.flash("Deleted"),
            isAdmin: req.session.isAdmin
            
        });
    })
    .catch(err => {
        console.log(err)
    })
}


