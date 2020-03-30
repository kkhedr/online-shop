const productModel=require('../models/product.model');

exports.getHome = (req,res,next)=>{
    
    let category =req.query.category
    let ValidCatogries =['clothes','phones','computers']
    if(category && ValidCatogries.includes(category)){
        productModel.getAllProductByCategory(category).then(products => {
            res.render('index',{
                products : products,
                isUser : req.session.userId,
                ValidationErrors :req.flash("ValidationErrors")[0],
                isAdmin: req.session.isAdmin
            })
        })
    }else{
        productModel.getAllProduct().then(products =>{
            res.render('index',{
                products : products,
                isUser : req.session.userId,
                ValidationErrors :req.flash("ValidationErrors")[0],
                isAdmin: req.session.isAdmin
            })
        })
    }
}