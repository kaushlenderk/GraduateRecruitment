var faculty_model = require("../model/faculty_model");
var express = require("express");
var router = express.Router();

/** faculty page link **/
router.get("/faculty",function(req,res){
    res.render("faculty",{
        pageTitle:'Faculty Admin Page',
        pageID:'Faculty Admin Page'
    })
});

router.post("/getProfile",function(req,res){  
	faculty_model.getProfile(req.body,function(err, data) {
		if (err)
	    {
	    	throw err;
	    }
	    else
	    {  
	       res.json(data);	
	    }	      
	}); 
});

router.post("/getEducation",function(req,res){  
	faculty_model.getEducationDetail(req.body,function(err, data) {
		if (err)
	    {
	    	throw err;
	    }
	    else
	    {  
	       res.json(data);	
	    }	      
	}); 
});

router.post("/getPublication",function(req,res){  
	faculty_model.getPublicationDetail(req.body,function(err, data) {
		if (err)
	    {
	    	throw err;
	    }
	    else
	    {  
	       res.json(data);	
	    }	      
	}); 
});

router.post("/getWorkExperience",function(req,res){  
	faculty_model.getWorkExperienceDetail(req.body,function(err, data) {
		if (err)
	    {
	    	throw err;
	    }
	    else
	    {  
	       res.json(data);	
	    }	      
	}); 
});

router.post("/faculty",function(req,res){ 
	faculty_model.setProfile(req.body, function(err, data) {	    
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

router.post("/education",function(req,res){ 
	faculty_model.setEducationDetail(req.body, function(err, data) {	    
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

router.post("/publication",function(req,res){ 
	faculty_model.setPublicationDetail(req.body, function(err, data) {	    
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

router.post("/workExperience",function(req,res){ 
	faculty_model.setWorkExperienceDetail(req.body, function(err, data) {	    
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