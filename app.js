const express = require("express")
const app = express();
const path = require("path")

const session = require('express-session')
const sessionStore = require('connect-mongodb-session')(session)

const flash = require('connect-flash')

const homeRouter = require("./routes/home.route")
const productRouter = require("./routes/product.route")
const authRouter = require('./routes/auth.route')
const cartRouter = require("./routes/cart.route")
const adminRouterforProduct = require("./routes/admin.route")
const orderroute = require("./routes/order.route");

app.use(express.static(path.join(__dirname,"assets")))
app.use(express.static(path.join(__dirname,"images")))

const store = new sessionStore({
    uri: "mongodb://localhost:27017/online-shop",
    collection : "sessions"
})

app.use(session({
    secret: 'this is my secret secret express ......',
    saveUninitialized:false,
    store:store
}))

app.set("view engine","ejs")
app.set("views","views")//default

app.use(flash());



app.use("/",homeRouter)
app.use("/",authRouter)
app.use("/cart",cartRouter)
app.use("/product",productRouter)
app.use("/admin",adminRouterforProduct)
app.use("/create/order",orderroute)


app.get("/error",(req,res,next)=>{
    res.status(500)
    res.render("errhandle",{
        isUser : req.session.userId,
        isAdmin: req.session.isAdmin
    })
})
app.use((error,req,res,next)=>{
    res.redirect("/error")
})

const port = process.env.PORT || 3000 ;

app.listen(port,()=>{
    console.log('server Listen on port '+port)
})