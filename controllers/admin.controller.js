const validationResult = require("express-validator").validationResult
const product = require("../models/product.model")

exports.getAdd = (req,res,next)=>{
res.render("AddProduct",{
    ValidationError : req.flash("ValidationErrors"),
    message: req.flash("message"),
    isUser:true,
    isAdmin :true
})
}

exports.postAdd = (req,res,next)=>{
    // console.log(req.body);
    // if(req.file){ to get imagename
    //     console.log(req.file.filename);
    // }

    if(validationResult(req).isEmpty())
      {
          if(req.file){
              
            product.AddProduct({
                name:req.body.name,
                image:req.file.filename,
                price:req.body.price,
                description:req.body.description,
                category:req.body.category
                
            }).then(()=>{
                req.flash("message","Product was added")
                res.redirect("/admin/addProduct")
            }).catch(err =>{
                next(err);
            })

          }
        
}else{
   req.flash("ValidationErrors",validationResult(req).array())
   res.redirect("/admin/addProduct")
}
    
}