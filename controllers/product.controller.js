const productModel=require('../models/product.model');

exports.getProductDetails = (req,res,next)=>{
    let ProductId =req.params.id

    productModel.getProductbyId(ProductId).then(product => {
        res.render('product',{
            product : product,
            isUser : req.session.userId,
            isAdmin: req.session.isAdmin
        })
    })

}