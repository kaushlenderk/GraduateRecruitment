var express = require("express");
var router = express.Router();

/** faculty page link **/
router.get("/faculty",function(req,res){
    res.render("faculty",{
        pageTitle:'Faculty Admin Page',
        pageID:'Faculty Admin Page'
    })
});

module.exports =router; 