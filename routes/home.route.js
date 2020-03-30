const router = require('express').Router();

const homeController = require('../controllers/home.controller')
//const Authguard = require("./guards/auth.guards");

router.get('/',homeController.getHome);

module.exports = router;