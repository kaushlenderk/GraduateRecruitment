var model = require("../model/home_model");
var model = require("../model/user_model");
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


/** user authentication **/

router.post("/api/verfiyEmail",function(req,res){  
	model.verfiyEmail(req.body,function(err, data) {
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

router.post("/api/verfiyFaculty",function(req,res){  
	model.verfiyFaculty(req.body,function(err, data) {
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

//register user
router.post("/api/registerUser",function(req,res){
	model.registerUser(req.body, function(err, data) {	    
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
