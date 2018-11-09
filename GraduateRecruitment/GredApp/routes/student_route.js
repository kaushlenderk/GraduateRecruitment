var express = require("express");
var router = express.Router();

/** student page link **/
router.get("/student",function(req,res){
 
    res.render("student",{
        pageTitle:'Student Admin Page',
        pageID:'Student Admin Page'
    })
});

module.exports =router; 