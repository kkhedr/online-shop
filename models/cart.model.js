const mongoose = require('mongoose');

const DB_URL = "mongodb+srv://mongoo:Security!0@cluster0-prcer.mongodb.net/online-shop?retryWrites=true&w=majority";

const cartSchema = mongoose.Schema({
name:String,
price:Number,
amount : Number,
userId:String,
productId:String,
timestamp:Number,
status:{
    type:String,
    default: "pending"
}
});

const Cartitem = mongoose.model("cart",cartSchema);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
exports.addNewItem = (user_id,product_id,data) =>{
    return new Promise((resolve,reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
         return Cartitem.findOne({userId:user_id,productId:product_id});
         
        //    if(!prevCart){
        //     let item = new Cartitem(data);
        //     return item.save();
        //    }else{
        //     return prevCart.amount;
        //    }
           //return prevCart;
        }).then((result)=>{
          if(result){
              var amount = +result.amount + +data.amount;
              console.log(amount)
            return Cartitem.updateOne({_id : result._id},{amount: amount})
          }else{
            let item = new Cartitem(data);
            return item.save();
          }
        }).then(()=>{
           mongoose.disconnect();
           resolve();
        }).catch(err => {
            mongoose.disconnect();
            reject(err)
        })
    })
}

exports.editItem= (id,datatoedit) => {
    return new Promise((resolve,reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
           return Cartitem.updateOne({_id : id},datatoedit)
        }).then(()=>{
           mongoose.disconnect();
           resolve();
        }).catch(err => {
            mongoose.disconnect();
            reject(err)
        })
    })
}

exports.deleteCart =(id)=>{
    return new Promise((resolve,reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            return Cartitem.deleteOne({_id:id})
        }).then(()=>{
           mongoose.disconnect();
           resolve("item was Removed");
        }).catch(err => {
            mongoose.disconnect();
            reject(err)
        })
    })
}

exports.getItemByUserId = (userId) => {
    return new Promise((resolve,reject)=>{
      mongoose.connect(DB_URL).then(() => {
       return Cartitem.find({userId : userId},
        {},
        {sort: {timestamp : 1}}
        );
      }).then((items) => {
          mongoose.disconnect();
          resolve(items);
      }).catch(err => {
        mongoose.disconnect();
        reject(err);
      })
    })
}

exports.GetProductsPending=(userId)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL)
        .then(()=>{
           let cartpendings = Cartitem.find({userId:userId,status:"pending"})
           return cartpendings;
        })
        .then((productsPending)=>{
            mongoose.disconnect();
            resolve(productsPending);
        })
        .catch(err => {
            mongoose.disconnect();
            reject(err);
        })
    })
}

exports.closeProductcart = (product_id)=>{
 return new Promise((resolve,reject)=>{
     mongoose.connect(DB_URL)
     .then(()=>{
        return Cartitem.updateOne({productId:product_id},{status:"close"})
     }).then(()=>{
        mongoose.disconnect();
        resolve();
     })
     .catch((err) => {
        mongoose.disconnect();
        reject(err);
     })
 })
}