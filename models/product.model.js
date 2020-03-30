const mongoose = require('mongoose');

const DB_URL = "mongodb+srv://mongoo:Security!0@cluster0-prcer.mongodb.net/online-shop?retryWrites=true&w=majority";
const productSchema = mongoose.Schema({
name:String,
image:String,
price : Number,
description:String,
category:String
});

const Product =mongoose.model("product",productSchema)
exports.getAllProduct = ()=>{
 
 return new Promise((resolver,reject)=>{
     mongoose.connect(DB_URL).then(()=>{
        return Product.find({})
     }).then(products => {
         mongoose.disconnect();
         resolver(products);
     }).catch(err =>reject(err))
 })

}

exports.getAllProductByCategory = (category)=>{
 
    return new Promise((resolver,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
           return Product.find({category:category})
        }).then(products => {
            mongoose.disconnect();
            resolver(products);
        }).catch(err =>reject(err))
    })
   
   }


   exports.getProductbyId = (productId)=>{
 
    return new Promise((resolver,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
           return Product.findById(productId)
        }).then(product => {
            mongoose.disconnect();
            resolver(product);
        }).catch(err =>reject(err))
    })
   
   }

  exports.AddProduct = (productDetails)=>{
      
   return new Promise((resolve,reject)=>{
       
     mongoose.connect(DB_URL)
     .then(() => {
         let pro = new Product(productDetails)
         return pro.save();
     }).then((data)=>{
        mongoose.disconnect();
        //console.log("resolve here");
      resolve();
     })
     .catch(err => {
        mongoose.disconnect();
        //console.log(err);
        reject(err);
     })
   })
  }