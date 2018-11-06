var express = require("express");
var router = express.Router();

/** Home page link **/
router.get("/",function(req,res){
     res.render("index",{
         pageTitle:'Home',
         pageID:'Home'
     })
});


/** Login page link **/
router.get("/login",function(req,res){
 
    res.render("login",{
        pageTitle:'Login',
        pageID:'login'
    })
});

/** Create new account page link **/
router.get("/signup",function(req,res){
 
    res.render("signup",{
        pageTitle:'Create Account',
        pageID:'signup'
    })
});




/** contact page**/ 

module.exports =router; 