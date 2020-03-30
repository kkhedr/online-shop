const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const DB_URL = "mongodb+srv://mongoo:Security!0@cluster0-prcer.mongodb.net/online-shop?retryWrites=true&w=majority";

const authSchema = mongoose.Schema({
username:String,
email:String,
password : String,
isAdminn : {
    type : Boolean,
    default : false
}
});

const User =mongoose.model("user",authSchema)
exports.CreateNewUser = (username,email,password)=>{

    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return User.findOne({email:email})
        }).then(user => {
            if(user){
                mongoose.disconnect();
                reject("email is used")
            }else{
               return bcrypt.hash(password,10)
            }
            
        }).then(passwordHashed => {
            let user =new User({
                username:username,
                email:email,
                password:passwordHashed
            })
            return user.save();
        }).then(()=>{
            mongoose.disconnect();
            resolve();
        }).catch(err=>{
            mongoose.disconnect();
            reject(err);
        })
    })
}
exports.Login = (email,password)=>{
     return new Promise((resolve,reject)=> {
        mongoose.connect(DB_URL).then(()=>User.findOne({email:email})).then(user => {
            if(!user){
                mongoose.disconnect();
                reject("this email not found")
            }else{
               bcrypt.compare(password,user.password).then(same => {
                if(!same){
                    mongoose.disconnect();
                    reject("this password didn't match")
                }else{
                    mongoose.disconnect();
                    
                    resolve({
                        id: user._id,
                        isAdmin :user.isAdminn,
                        userEmail : email
                    })
                }
               });
              
            }
        }).catch(err => {
            mongoose.disconnect();
            reject(err)
        })
     })
}

