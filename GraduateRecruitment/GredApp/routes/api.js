var model = require("../model/home-model");
var bodyParser = require("body-parser");
var express = require("express");
var router = express.Router();
 
/*
router.get("/api",function(req,res){
	model.getDepartmentList(function(err, data) {
		if (err)
	    {
	    	throw err;
	    }
	    else
	    {  
	       console.log(data);
	       res.json(data);	
	    }	      
	}); 
});
*/

router.get("/api/getDepartment",function(req,res){
	model.getDepartmentList(function(err, data) {
		if (err)
	    {
	    	throw err;
	    }
	    else
	    {  
	       //console.log(data);
	       res.json(data);	
	    }	      
	}); 
});

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));
 
router.post("/api/contact",function(req,res){
	model.setContactUs(req.body, function(err, data) {	    
	    if (err)
	    {
	    	throw err
	    }
	    else
	    {
	    	res.json(data);	
	    } 
	  });
});

module.exports =router; 

/*var feedback = require("../data/data")

router.get("/api",function(req,res){
     res.json(feedback);
});
*/
