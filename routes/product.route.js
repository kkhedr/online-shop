const router = require('express').Router();

const ProductController = require('../controllers/product.controller')


router.get('/',(req,res,next)=>{
    res.setHeader("Content-Type","text/html")
      res.write("<div class='alert alert-danger'><span>Not found</span></div>")
      
      res.end()
   
})
router.get('/:id',ProductController.getProductDetails)

module.exports = router;