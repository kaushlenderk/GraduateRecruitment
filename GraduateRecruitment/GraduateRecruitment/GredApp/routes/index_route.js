var express = require("express");
var router = express.Router(); 

/** Home page link **/

 
router.get("/",function(req,res){
	 
    res.render("index",{
        pageTitle:'Home',
        pageID:'Home' 
    })
     
    
});




/** contact page**/ 

module.exports =router; 