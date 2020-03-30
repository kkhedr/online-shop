const mongoose = require('mongoose')
const DB_URL = "mongodb://localhost:27017/online-shop";

ManageorderSchema = mongoose.Schema({
email:String,
productname :String,
amount:Number,
cost:Number,
address:String,
status:{
    type:String,
    default : "order Pending"
},
time:Number
});
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
const ManageOrder = mongoose.model("order",ManageorderSchema)

exports.addOrder = (order)=>{
return new Promise((resolve,reject)=>{

mongoose.connect(DB_URL)
.then(()=>{
let orderr = new ManageOrder(order)
return orderr.save();
}).then(()=>{
mongoose.disconnect()
resolve()
}).catch(err => {
    mongoose.disconnect();
    reject(err)
})

})
}


exports.getAllorders=()=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL)
        .then(() => {
           let orders = ManageOrder.find({})
           return orders
            .then((orders)=>{
                mongoose.disconnect()
                resolve(orders);
            }).catch(err =>{
                mongoose.disconnect()
                reject();
            })
        })
        .catch(err => {
            reject(err)
        })
    })
}
