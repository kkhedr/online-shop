const router = require("express").Router();
const bodyParser = require("body-parser");
const authController = require('../controllers/auth.controller');
const Auth = require("./guards/auth.guards");

const check = require("express-validator").check
router.get("/signup",Auth.notAuth,authController.getSignup)

router.post("/signup",
bodyParser.urlencoded({extended : true}),
check("username").not().isEmpty(),
check("email").not().isEmpty().isEmail(),
check("password").not().isEmpty().isLength({min: 6}),
check("ConfirmPassword").custom((value,{req})=>{
if(value === req.body.password) return true
else throw "password don't match"
}),
Auth.notAuth,authController.postSignup)

router.get("/login",Auth.notAuth,authController.getLogin)


router.post("/login",
bodyParser.urlencoded({extended : true}),
Auth.notAuth,authController.postLogin)

router.all("/logout",Auth.IsAuth,authController.Logout)

module.exports = router;