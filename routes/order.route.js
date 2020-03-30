const router = require('express').Router();
const isAdmin = require("./guards/admin.guard");
const bodyParser = require("body-parser");
const check = require("express-validator").check
const orderController =require("../controllers/order.controller")


router.get("/orders",isAdmin,orderController.GetOrders)
router.post("/",bodyParser.urlencoded({extended : true}),isAdmin,orderController.CreateOrders)

module.exports = router;