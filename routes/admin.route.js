const router = require("express").Router();
const bodyParser = require("body-parser");
const check = require("express-validator").check
const multer = require("multer");

const adminController = require("../controllers/admin.controller");

const adminguard = require("../routes/guards/admin.guard");

router.get("/addProduct",adminguard,adminController.getAdd)

router.post("/addProduct",multer({
    storage: multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,"images");
        },
        filename:(req,file,cb)=>{
            cb(null,Date.now()+"-"+file.originalname);
        }
    })
}).single('image'),check('image').custom((value,{req})=>{
    if(req.file) return true;
    else throw "image not found";
})
,check('name').not().isEmpty()
,check('price').not().isEmpty()
,check('desc').not().isEmpty()
,check('category').not().isEmpty()
,adminguard,adminController.postAdd)

module.exports = router;