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

/** faculty page link **/
router.get("/faculty",function(req,res){
 
    res.render("faculty",{
        pageTitle:'Faculty Admin Page',
        pageID:'Faculty Admin Page'
    })
});


/** student page link **/
router.get("/student",function(req,res){
 
    res.render("student",{
        pageTitle:'Student Admin Page',
        pageID:'Student Admin Page'
    })
});


module.exports =router; 