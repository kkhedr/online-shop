const router = require('express').Router();
const Auth = require("./guards/auth.guards");
const bodyParser = require("body-parser");
const check = require("express-validator").check
const cartController =require('../controllers/cart.controller');

router.get("/",Auth.IsAuth,cartController.GetCart)

router.post("/",
bodyParser.urlencoded({extended : true}),
check("amount").not().isEmpty().withMessage("amount is required").isInt({min:1}).withMessage("Must enter one number or more and not zero"),
Auth.IsAuth,cartController.PostCart)

router.post("/save",
bodyParser.urlencoded({extended : true}),
check("amount").not().isEmpty().withMessage("amount is required").isInt({min:1}).withMessage("Must enter one number or more and not zero"),
Auth.IsAuth,cartController.PostSave)

router.post("/delete",bodyParser.urlencoded({extended : true})
,Auth.IsAuth,cartController.PostDelete)

module.exports= router;