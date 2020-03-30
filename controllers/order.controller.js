const cartModel =require("../models/cart.model");
const productModel =require("../models/product.model");
const orderModel =require("../models/manageorder.model");


exports.CreateOrders= (req,res,next)=>{
    res.setHeader('Content-Type', 'text/html');
    cartModel.GetProductsPending(req.session.userId)
    .then((productsPending)=>{
        if(productsPending.length > 0){
            for(let productId of productsPending)
            {
                
                productModel.getProductbyId(productId.productId)
                .then((product)=>{
                    
                 orderModel.addOrder({
                    productname : product.name,
                    address : req.body.address,
                    email :req.body.email,
                    amount : productId.amount,
                    cost : productId.price,
                    time : Date.now()
                 }).then(()=>{
                    
                    cartModel.closeProductcart(productId.productId)
                    .then(()=>{
                        
                        res.redirect("/create/order/orders")
                        next();
                    }).catch(err =>{
                        console.log(err)
                    })
                     
                 }).catch(err => {
                     console.log(err)
                     
                 })
                 
                }).catch(err =>{
                    console.log(err);
                })
            }
        }else{
            res.redirect("/");
        }
        
        
    }).catch(err => {
        console.log(err)
    })
}

exports.GetOrders = (req,res,next)=>{
    orderModel.getAllorders()
    .then((orders) => {
        res.render("manageorder",{
            orders : orders,
            isUser : true,
            isAdmin: true
        })
    }).catch(err => {
        console.log(err)
    })
    
}